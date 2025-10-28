// DNS 配置 (源自 clash-yaml.yaml)
const dnsConfig = {
  "enable": true,
  "ipv6": true,
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "nameserver": [
    "https://120.53.53.53/dns-query",
    "https://223.5.5.5/dns-query"
  ],
  "proxy-server-nameserver": [
    "https://120.53.53.53/dns-query",
    "https://223.5.5.5/dns-query"
  ],
  "nameserver-policy": {
    "geosite:cn,private": [
      "https://120.53.53.53/dns-query",
      "https://223.5.5.5/dns-query"
    ],
    "geosite:geolocation-!cn": [
      "https://dns.cloudflare.com/dns-query",
      "https://dns.google/dns-query"
    ]
  }
};

// GeoIP/Geosite 相关配置 (源自 clash-yaml.yaml)
const geoConfig = {
  "geodata-mode": true,
  "geo-auto-update": true,
  "geodata-loader": "standard",
  "geo-update-interval": 24,
  "geox-url": {
    "geoip": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    "geosite": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    "mmdb": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    "asn": "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  }
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "mrs",
  "interval": 86400
};

// 规则集配置 (源自 clash-yaml.yaml)
const ruleProviders = {
  "category-ads-all": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs", "path": "./ruleset/category-ads-all.mrs" },
  "category-ai-!cn": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-!cn.mrs", "path": "./ruleset/category-ai-!cn.mrs" },
  "bilibili": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bilibili.mrs", "path": "./ruleset/bilibili.mrs" },
  "youtube": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs", "path": "./ruleset/youtube.mrs" },
  "google": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/google.mrs", "path": "./ruleset/google.mrs" },
  "geolocation-cn": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.mrs", "path": "./ruleset/geolocation-cn.mrs" },
  "cn": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/cn.mrs", "path": "./ruleset/cn.mrs" },
  "github": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs", "path": "./ruleset/github.mrs" },
  "gitlab": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.mrs", "path": "./ruleset/gitlab.mrs" },
  "microsoft": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs", "path": "./ruleset/microsoft.mrs" },
  "apple": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs", "path": "./ruleset/apple.mrs" },
  "facebook": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.mrs", "path": "./ruleset/facebook.mrs" },
  "instagram": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.mrs", "path": "./ruleset/instagram.mrs" },
  "twitter": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.mrs", "path": "./ruleset/twitter.mrs" },
  "tiktok": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs", "path": "./ruleset/tiktok.mrs" },
  "linkedin": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/linkedin.mrs", "path": "./ruleset/linkedin.mrs" },
  "netflix": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.mrs", "path": "./ruleset/netflix.mrs" },
  "hulu": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hulu.mrs", "path": "./ruleset/hulu.mrs" },
  "disney": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/disney.mrs", "path": "./ruleset/disney.mrs" },
  "hbo": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hbo.mrs", "path": "./ruleset/hbo.mrs" },
  "amazon": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/amazon.mrs", "path": "./ruleset/amazon.mrs" },
  "bahamut": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bahamut.mrs", "path": "./ruleset/bahamut.mrs" },
  "steam": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/steam.mrs", "path": "./ruleset/steam.mrs" },
  "epicgames": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/epicgames.mrs", "path": "./ruleset/epicgames.mrs" },
  "ea": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ea.mrs", "path": "./ruleset/ea.mrs" },
  "ubisoft": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ubisoft.mrs", "path": "./ruleset/ubisoft.mrs" },
  "blizzard": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/blizzard.mrs", "path": "./ruleset/blizzard.mrs" },
  "coursera": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/coursera.mrs", "path": "./ruleset/coursera.mrs" },
  "edx": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/edx.mrs", "path": "./ruleset/edx.mrs" },
  "udemy": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/udemy.mrs", "path": "./ruleset/udemy.mrs" },
  "khanacademy": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/khanacademy.mrs", "path": "./ruleset/khanacademy.mrs" },
  "category-scholar-!cn": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.mrs", "path": "./ruleset/category-scholar-!cn.mrs" },
  "paypal": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/paypal.mrs", "path": "./ruleset/paypal.mrs" },
  "visa": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/visa.mrs", "path": "./ruleset/visa.mrs" },
  "mastercard": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/mastercard.mrs", "path": "./ruleset/mastercard.mrs" },
  "stripe": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/stripe.mrs", "path": "./ruleset/stripe.mrs" },
  "wise": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/wise.mrs", "path": "./ruleset/wise.mrs" },
  "aws": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/aws.mrs", "path": "./ruleset/aws.mrs" },
  "azure": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/azure.mrs", "path": "./ruleset/azure.mrs" },
  "digitalocean": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/digitalocean.mrs", "path": "./ruleset/digitalocean.mrs" },
  "heroku": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/heroku.mrs", "path": "./ruleset/heroku.mrs" },
  "dropbox": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dropbox.mrs", "path": "./ruleset/dropbox.mrs" },
  "geolocation-!cn": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.mrs", "path": "./ruleset/geolocation-!cn.mrs" },
  "private": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/private.mrs", "path": "./ruleset/private.mrs" },
  "telegram": { ...ruleProviderCommon, "behavior": "ipcidr", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/telegram.mrs", "path": "./ruleset/telegram.mrs" },
};

// 规则 (源自 clash-yaml.yaml)
const rules = [
  // ******** 自定义规则 ********************* //
  "DOMAIN-SUFFIX,rustdesk.251123.xyz,🚀 节点选择",
  "DOMAIN-SUFFIX,linux.do,🇯🇵 日本",
  // ******** 自定义规则 END ********************* //
  // ******** 工作规则 ********************* //
  "DOMAIN-SUFFIX,starboss.biz,🏢 工作直连",
  "RULE-SET,amazon,🏢 工作直连",
  "RULE-SET,aws,🏢 工作直连",
  "DOMAIN-KEYWORD,starpay,🏢 工作直连",
  "DOMAIN-SUFFIX,starboss.biz,🏢 工作直连",
  "DOMAIN-KEYWORD,atlassian,🏢 工作直连",
   // ******** 工作规则 END ********************* //
  "RULE-SET,category-ads-all,🛑 广告拦截",
  "RULE-SET,category-ai-!cn,💬 AI 服务",
  "RULE-SET,bilibili,📺 哔哩哔哩",
  "RULE-SET,youtube,📹 油管视频",
  "RULE-SET,google,🔍 谷歌服务",
  "RULE-SET,geolocation-cn,🔒 国内服务",
  "RULE-SET,cn,🔒 国内服务",
  "RULE-SET,github,🐱 Github",
  "RULE-SET,gitlab,🐱 Github",
  "RULE-SET,microsoft,Ⓜ️ 微软服务",
  "RULE-SET,apple,🍏 苹果服务",
  "RULE-SET,facebook,🌐 社交媒体",
  "RULE-SET,instagram,🌐 社交媒体",
  "RULE-SET,twitter,🌐 社交媒体",
  "RULE-SET,tiktok,🌐 社交媒体",
  "RULE-SET,linkedin,🌐 社交媒体",
  "RULE-SET,netflix,🎬 流媒体",
  "RULE-SET,hulu,🎬 流媒体",
  "RULE-SET,disney,🎬 流媒体",
  "RULE-SET,hbo,🎬 流媒体",
  "RULE-SET,bahamut,🎬 流媒体",
  "RULE-SET,steam,🎮 游戏平台",
  "RULE-SET,epicgames,🎮 游戏平台",
  "RULE-SET,ea,🎮 游戏平台",
  "RULE-SET,ubisoft,🎮 游戏平台",
  "RULE-SET,blizzard,🎮 游戏平台",
  "RULE-SET,coursera,📚 教育资源",
  "RULE-SET,edx,📚 教育资源",
  "RULE-SET,udemy,📚 教育资源",
  "RULE-SET,khanacademy,📚 教育资源",
  "RULE-SET,category-scholar-!cn,📚 教育资源",
  "RULE-SET,paypal,💰 金融服务",
  "RULE-SET,visa,💰 金融服务",
  "RULE-SET,mastercard,💰 金融服务",
  "RULE-SET,stripe,💰 金融服务",
  "RULE-SET,wise,💰 金融服务",
  "RULE-SET,azure,☁️ 云服务",
  "RULE-SET,digitalocean,☁️ 云服务",
  "RULE-SET,heroku,☁️ 云服务",
  "RULE-SET,dropbox,☁️ 云服务",
  "RULE-SET,geolocation-!cn,🌐 非中国",
  "RULE-SET,google,🔍 谷歌服务,no-resolve",
  "RULE-SET,private,🏠 私有网络,no-resolve",
  "RULE-SET,cn,🔒 国内服务,no-resolve",
  "RULE-SET,telegram,📲 电报消息,no-resolve",
  "MATCH,🐟 漏网之鱼"
];

// 代理组 (源自 clash-yaml.yaml, 已简化并添加地区分组)

// 地区关键词映射表 (参考 clash-js.js)
const regionKeywords = {
  "🇭🇰 香港": { keywords: ["港", "HK", "Hong Kong"] },
  "🇹🇼 台湾": { keywords: ["台", "TW", "Taiwan"] },
  "🇯🇵 日本": { keywords: ["日", "JP", "Japan", "大阪"] },
  "🇺🇸 美国": { keywords: ["美", "US", "United States", "硅谷"] },
  "🇸🇬 新加坡": { keywords: ["新", "SG", "Singapore", "sgp"] },
  "🇰🇷 韩国": { keywords: ["韩", "KR", "Korea", "首尔"] },
};

// 生成地区分组
const regionGroupNames = Object.keys(regionKeywords);
const regionGroups = Object.entries(regionKeywords).map(([name, { keywords }]) => ({
    name,
    type: "select",
    "include-all": true,
    filter: keywords.join("|"),
}));

// 为其他策略组提供的可选代理/策略组
const ruleGroupProxies = ['🚀 节点选择', 'DIRECT', 'REJECT', '⚡ 自动选择', ...regionGroupNames];

const ruleGroupNames = [
    '💬 AI 服务', '📺 哔哩哔哩', '📹 油管视频', '🔍 谷歌服务', '🏠 私有网络',
    '🔒 国内服务', '📲 电报消息', '🐱 Github', 'Ⓜ️ 微软服务', '🍏 苹果服务',
    '🌐 社交媒体', '🎬 流媒体', '🎮 游戏平台', '📚 教育资源', '💰 金融服务',
    '☁️ 云服务', '🌐 非中国', '🐟 漏网之鱼'
];

const otherRuleGroups = ruleGroupNames.map(name => ({
  "type": 'select',
  "name": name,
  "proxies": ruleGroupProxies
}));

const proxyGroups = [
  {
    "type": "select",
    "name": "🚀 节点选择",
    "proxies": [ "DIRECT", "REJECT", "⚡ 自动选择"],
    "include-all": true // 自动包含所有代理节点
  },
  {
    "name": "⚡ 自动选择",
    "type": "url-test",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 300,
    "lazy": false,
    "include-all": true // 自动包含所有代理节点
  },
  ...regionGroups, // 添加地区分组实体
  {
    "type": "select",
    "name": "🛑 广告拦截",
    "proxies": [ "REJECT", "DIRECT" ]
  },
  {
    "type": "select",
    "name": "🏢 工作直连",
    "proxies": [ "DIRECT" ]
  },
  ...otherRuleGroups
];

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // --- 自定义链式代理生成 ---
  const originalProxyNames = (config.proxies || []).map(p => p.name);

  // 1. 创建入口和出口选择组
  const entryGroup = {
      name: '⛓️ 入口节点',
      type: 'select',
      proxies: originalProxyNames,
  };

  const exitGroup = {
      name: '⛓️ 出口节点',
      type: 'select',
      proxies: [...originalProxyNames, 'DIRECT'],
  };

  // 2. 创建一个 'relay' 代理组，它本身就是一个可用的代理
  const relayChainGroup = {
      name: '⛓️ 自定义链式代理',
      type: 'relay',
      proxies: ['⛓️ 入口节点', '⛓️ 出口节点'],
  };

  // 3. 将新创建的组添加到总的代理组列表中
  const finalProxyGroups = [...proxyGroups, entryGroup, exitGroup, relayChainGroup];

  // 4. 将新的 "自定义链式代理" 添加到主选择器中，使其可以被规则使用
  const mainSelector = finalProxyGroups.find(g => g.name === '🚀 节点选择');
  if (mainSelector) {
      // 插入到 '⚡ 自动选择' 之后
      mainSelector.proxies.splice(3, 0, '⛓️ 自定义链式代理');
  }

  // 5. 将 "自定义链式代理" 添加到其他所有策略组中，方便直接选用
  finalProxyGroups.forEach(group => {
      if (ruleGroupNames.includes(group.name) && !group.proxies.includes('⛓️ 自定义链式代理')) {
          group.proxies.splice(4, 0, '⛓️ 自定义链式代理');
      }
  });
  // --- 结束自定义链式代理生成 ---

  // 覆盖 DNS 配置
  config.dns = dnsConfig;

  // 覆盖 GeoIP/Geosite 相关配置
  Object.assign(config, geoConfig);

  // 覆盖 规则集、代理组和规则
  config["rule-providers"] = ruleProviders;
  config["proxy-groups"] = finalProxyGroups;
  config.rules = rules;

  // 返回修改后的配置
  return config;
}