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

test('编号、国旗和大小写命名均进入正确地区，避免英文单词误匹配', () => {
  const cases = [
    ['🇺🇸 美国', ['USA01', 'US02', 'us03', '🇺🇸 节点一']],
    ['🇭🇰 香港', ['HKA05', 'HK01', 'hk02', '🇭🇰 节点二']],
    ['🇯🇵 日本', ['JP01', 'jp02', '🇯🇵 节点三']],
    ['🇸🇬 新加坡', ['SG01', 'sg02', '🇸🇬 节点四']],
    ['🇹🇼 台湾', ['TW01', 'tw02', '🇹🇼 节点五']]
  ];
  const names = cases.flatMap(([, names]) => names);
  const config = processConfig([...names, 'AUS01', 'RUS01', 'DEMO', 'THINK', 'VMISS']);
  for (const [region, names] of cases) {
    for (const name of names) assert.ok(matches(config, region, name), `${region} 漏分 ${name}`);
  }
  for (const name of ['AUS01', 'RUS01', 'VMISS']) {
    assert.ok(!matches(config, '🇺🇸 美国', name), `美国误收 ${name}`);
  }
  for (const [region, name] of [['🇩🇪 德国', 'DEMO'], ['🇹🇭 泰国', 'THINK']]) {
    assert.ok(!matches(config, region, name), `${region} 误收 ${name}`);
  }
  for (const name of names) {
    const region = cases.find(([, names]) => names.includes(name))[0];
    assert.ok(!matches(config, region, `⛓️出口 :: ${name}`), `地区组混入链式出口 ${name}`);
  }
});

test('静态节点和 provider 混用时仍创建 provider 需要的地区组', () => {
  const config = processConfig(['JP01'], { 'proxy-providers': { subscription: { type: 'http' } } });
  assert.ok(matches(config, '🇺🇸 美国', 'USA01'));
});

test('全部 20 个地区的代码编号、小写名称和国旗均能匹配运行时筛选器', () => {
  const regions = runInNewContext(`${source}\nObject.entries(regionKeywords)`);
  const cases = regions.map(([region, { keywords }]) => [region, [
    `${keywords.find(keyword => /^[A-Z]{2}$/.test(keyword))}01`,
    keywords.find(keyword => /^[A-Za-z ]{4,}$/.test(keyword)).toLowerCase(),
    `${region.split(' ')[0]} 节点`
  ]]);
  for (const extra of [{}, { 'proxy-providers': { subscription: { type: 'http' } } }]) {
    const config = processConfig(extra['proxy-providers'] ? [] : cases.flatMap(([, names]) => names), extra);
    for (const [region, names] of cases) {
      for (const name of names) assert.ok(matches(config, region, name), `${region} 漏分 ${name}`);
    }
  }
});

test('实际 YML 中所有带地区国旗的原始节点均归组，重复覆写结果稳定', t => {
  // 只从私有配置提取名称，凭据不进入测试输出或测试文件。
  const path = require('node:path').join(__dirname, '..', 'clash-party.yml');
  if (!require('node:fs').existsSync(path)) return t.skip('未提供本地私有 YML');
  const text = readFileSync(path, 'utf8').split(/\r?\n(?=\S)/)[0];
  const names = [...text.matchAll(/^  - name: (.+)\r?$/gm)]
    .map(match => match[1].trim()).filter(name => !name.includes('⛓️出口 ::'));
  assert.ok(names.length > 0);
  const config = processConfig(names);
  const groups = config['proxy-groups'];
  for (const name of names) {
    const flag = name.split(' ')[0];
    const group = groups.find(group => group.name.startsWith(flag));
    assert.ok(group && matches(config, group.name, name), `实际配置漏分 ${name}`);
  }
  const again = runInNewContext(`${source}\nmain(input)`, { input: config });
  assert.equal(JSON.stringify(again['proxy-groups']), JSON.stringify(groups));
});
