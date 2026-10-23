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
