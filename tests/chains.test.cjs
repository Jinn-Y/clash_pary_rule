const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');

const source = readFileSync(require('node:path').join(__dirname, '..', 'clash_party_rule.js'), 'utf8');
function processConfig(names, extra = {}) {
  return runInNewContext(`${source}\nmain(input)`, {
    input: { proxies: names.map(name => ({ name, type: 'vless' })), ...extra }
  });
}
function matches(config, region, name) {
  const group = config['proxy-groups'].find(group => group.name === region);
  return Boolean(group && new RegExp(group.filter).test(name));
}

function reprocess(config) {
  return runInNewContext(`${source}\nmain(input)`, { input: config });
}

function groupOf(config, name) {
  return config['proxy-groups'].find(group => group.name === name);
}

test('全局与美国链路具有独立入口和出口，原始节点继续可选', () => {
  const names = ['HK01', 'SG01', 'JP01', 'USA01', 'US02 VMISS'];
  const config = processConfig(names);
  const global = groupOf(config, '⛓️ 链式代理');
  const us = groupOf(config, '⛓️ 美国链式代理');
  assert.ok(groupOf(config, '🚀 节点选择').proxies.includes(global.name));
  assert.deepEqual(Array.from(groupOf(config, '🇺🇸 美国').proxies), [us.name]);
  assert.equal(groupOf(config, '🇺🇸 美国').default, 'US02 VMISS');
  for (const name of names) {
    assert.ok(matches(config, '⛓️ 入口节点', name));
    assert.ok(matches(config, '⛓️ 美国入口节点', name));
    const globalExit = config.proxies.find(proxy => proxy.name === `⛓️出口 :: ${name}`);
    assert.equal(globalExit['dialer-proxy'], '⛓️ 入口节点');
    assert.ok(matches(config, global.name, globalExit.name));
    assert.ok(!matches(config, us.name, globalExit.name));
  }
  for (const name of ['USA01', 'US02 VMISS']) {
    assert.ok(matches(config, '🇺🇸 美国', name));
    const usExit = config.proxies.find(proxy => proxy.name === `⛓️美国出口 :: ${name}`);
    assert.equal(usExit['dialer-proxy'], '⛓️ 美国入口节点');
    assert.ok(matches(config, us.name, usExit.name));
    assert.ok(!matches(config, global.name, usExit.name));
  }
  assert.equal(config.proxies.filter(proxy => proxy.name.startsWith('⛓️美国出口 :: ')).length, 2);
  for (const proxy of config.proxies.filter(proxy => proxy['dialer-proxy'])) {
    for (const group of ['⛓️ 入口节点', '⛓️ 美国入口节点', '🇺🇸 美国', '🇭🇰 香港', '⚡ 自动选择']) {
      assert.ok(!matches(config, group, proxy.name), `${group} 混入出口副本`);
    }
  }
  const before = JSON.stringify(config);
  assert.equal(JSON.stringify(reprocess(config)), before);
});

test('无 VMISS 时仍默认选择原始美国节点', () => {
  assert.equal(groupOf(processConfig(['JP01', 'USA01']), '🇺🇸 美国').default, 'USA01');
});

test('无可用美国出口时不生成美国链路，provider 配置不生成空链路', () => {
  const cases = [
    processConfig(['JP01']),
    processConfig([], { 'proxy-providers': { subscription: { type: 'http' } } }),
    processConfig([], { proxies: [{ name: 'USA01', type: 'hysteria2' }, { name: 'JP01', type: 'vless' }] }),
    processConfig(['USA01', 'JP01'], { 'x-script-options': { chainProxyNamePattern: '^JP' } }),
    processConfig(['USA01'], { 'x-script-options': { enableChainProxy: false } }),
    processConfig(['USA01', 'US02'], { 'x-script-options': { maxChainProxyCount: 1 } }),
  ];
  for (const config of cases) {
    assert.ok(!groupOf(config, '⛓️ 美国链式代理'));
    assert.ok(!groupOf(config, '⛓️ 美国入口节点'));
    assert.ok(!groupOf(config, '🇺🇸 美国')?.proxies?.includes('⛓️ 美国链式代理'));
  }
});

test('关闭链式功能及美国节点消失后清理旧副本和旧组', () => {
  const config = processConfig(['USA01', 'JP01']);
  config['x-script-options'] = { enableChainProxy: false };
  const disabled = reprocess(config);
  assert.equal(disabled.proxies.length, 2);
  assert.ok(!disabled['proxy-groups'].some(group => group.name.startsWith('⛓️')));
  assert.ok(!disabled['proxy-groups'].some(group => group.proxies?.some(name => name.startsWith('⛓️'))));

  const removed = processConfig(['USA01', 'JP01']);
  removed.proxies = removed.proxies.filter(proxy => proxy.name !== 'USA01');
  const result = reprocess(removed);
  assert.ok(groupOf(result, '⛓️ 链式代理'));
  assert.ok(!groupOf(result, '⛓️ 美国链式代理'));
  assert.ok(!groupOf(result, '⛓️ 美国入口节点'));
  assert.ok(!result.proxies.some(proxy => proxy.name.startsWith('⛓️美国出口 :: ')));
  assert.ok(!result['proxy-groups'].some(group => group.proxies?.includes('⛓️ 美国链式代理')));
});

test('保留 default 的 Amazon/AWS 策略及 provider 混用地区组行为', () => {
  const config = processConfig(['JP01'], { 'proxy-providers': { subscription: { type: 'http' } } });
  assert.ok(config.rules.includes('RULE-SET,amazon,🇺🇸 美国'));
  assert.ok(config.rules.includes('RULE-SET,aws,🇺🇸 美国'));
  assert.ok(!config.rules.includes('RULE-SET,amazon,DIRECT'));
  assert.ok(!config.rules.includes('RULE-SET,aws,DIRECT'));
  assert.ok(!groupOf(config, '🇺🇸 美国'));
  const providerOnly = processConfig([], { 'proxy-providers': { subscription: { type: 'http' } } });
  assert.ok(groupOf(providerOnly, '🇺🇸 美国'));
});