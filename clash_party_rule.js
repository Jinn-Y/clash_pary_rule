const rules = [
  "RULE-SET,talkatone,🇺🇸 美国",
  // ******** 工作规则 ********************* //
  "DOMAIN-SUFFIX,jinnll.xyz,🇺🇸 美国",
  "DOMAIN-SUFFIX,weajp.com,🏢 工作直连",
  "DOMAIN-SUFFIX,starboss.biz,🏢 工作直连",
  "RULE-SET,amazon,🏢 工作直连",
  "RULE-SET,aws,🏢 工作直连",
  "DOMAIN-KEYWORD,starpay,🏢 工作直连",
  "DOMAIN-SUFFIX,starboss.biz,🏢 工作直连",
  "DOMAIN-KEYWORD,atlassian,🏢 工作直连",
  // ******** 工作规则 ********************* //
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
  "talkatone": { ...ruleProviderCommon, "behavior": "domain", "url": "https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/talkatone.mrs", "path": "./ruleset/talkatone.mrs" },
};


// 地区关键词映射表 (参考 clash-js.js)
const regionKeywords = {
  "🇭🇰 香港": { keywords: ["港", "HK", "Hong Kong", "HKG"] },
  "🇹🇼 台湾": { keywords: ["台", "TW", "Taiwan", "Taipei"] },
  "🇯🇵 日本": { keywords: ["日", "JP", "Japan", "Tokyo", "Osaka", "Saitama"] },
  "🇺🇸 美国": { keywords: ["美", "US", "United States", "America", "Los Angeles", "San Francisco", "Silicon Valley"] },
  "🇸🇬 新加坡": { keywords: ["新", "SG", "Singapore", "SGP"] },
  "🇰🇷 韩国": { keywords: ["韩", "KR", "Korea", "Seoul"] },
  "🇬🇧 英国": { keywords: ["英", "UK", "United Kingdom", "London", "Britain", "England"] },
  "🇩🇪 德国": { keywords: ["德", "DE", "Germany", "Frankfurt"] },
  "🇫🇷 法国": { keywords: ["法", "FR", "France", "Paris"] },
  "🇨🇦 加拿大": { keywords: ["加", "CA", "Canada", "Montreal", "Toronto", "Vancouver"] },
  "🇦🇺 澳大利亚": { keywords: ["澳", "AU", "Australia", "Sydney"] },
  "🇮🇳 印度": { keywords: ["印", "IN", "India", "Mumbai"] },
  "🇷🇺 俄罗斯": { keywords: ["俄", "RU", "Russia", "Moscow"] },
  "🇳🇱 荷兰": { keywords: ["荷", "NL", "Netherlands", "Amsterdam"] },
  "🇹🇷 土耳其": { keywords: ["土", "TR", "Turkey", "Istanbul"] },
  "🇦🇷 阿根廷": { keywords: ["阿", "AR", "Argentina"] },
  "🇵🇭 菲律宾": { keywords: ["菲", "PH", "Philippines"] },
  "🇲🇾 马来西亚": { keywords: ["马", "MY", "Malaysia"] },
  "🇹🇭 泰国": { keywords: ["泰", "TH", "Thailand"] },
  "🇻🇳 越南": { keywords: ["越", "VN", "Vietnam"] }
};

// 地区分组生成逻辑已移入 main 函数以支持动态过滤

const ruleGroupNames = [
  '💬 AI 服务', '📺 哔哩哔哩', '📹 油管视频', '🔍 谷歌服务', '🏠 私有网络',
  '🔒 国内服务', '📲 电报消息', '🐱 Github', 'Ⓜ️ 微软服务', '🍏 苹果服务',
  '🌐 社交媒体', '🎬 流媒体', '🎮 游戏平台', '📚 教育资源', '💰 金融服务',
  '☁️ 云服务', '🌐 非中国', '🐟 漏网之鱼'
];

// 为每个规则组定义默认节点
const ruleGroupDefaults = {
  '💬 AI 服务': '🇺🇸 美国',      // AI 服务使用自动选择
  '📺 哔哩哔哩': 'DIRECT',          // 哔哩哔哩直连
  '📹 油管视频': '🇭🇰 香港',        // 油管使用香港节点
  '🔍 谷歌服务': '🇺🇸 美国',      // 谷歌服务使用自动选择
  '🏠 私有网络': 'DIRECT',          // 私有网络直连
  '🔒 国内服务': 'DIRECT',          // 国内服务直连
  '📲 电报消息': '🚀 节点选择',      // 电报使用自动选择
  '🐱 Github': '🚀 节点选择',        // Github 使用自动选择
  'Ⓜ️ 微软服务': '⚡ 自动选择',     // 微软服务使用自动选择
  '🍏 苹果服务': 'DIRECT',          // 苹果服务直连
  '🌐 社交媒体': '🇺🇸 美国',      // 社交媒体使用自动选择
  '🎬 流媒体': '🚀 节点选择',          // 流媒体使用香港节点
  '🎮 游戏平台': '🚀 节点选择',        // 游戏平台使用日本节点
  '📚 教育资源': '⚡ 自动选择',      // 教育资源使用自动选择
  '💰 金融服务': '🇺🇸 美国',        // 金融服务使用美国节点
  '☁️ 云服务': '🇺🇸 美国',        // 云服务使用自动选择
  '🌐 非中国': '🚀 节点选择',        // 非中国地区使用自动选择
  '🐟 漏网之鱼': '🚀 节点选择'       // 漏网之鱼使用节点选择
};

// 策略组生成逻辑已移入 main 函数

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // --- 动态生成节点组 ---
  const allProxies = config.proxies || [];

  // 1. 过滤存在的地区
  const validRegionGroups = [];
  const validRegionNames = [];
  for (const [name, { keywords }] of Object.entries(regionKeywords)) {
    // 检查是否有节点匹配该地区的关键字
    const regex = new RegExp(keywords.join("|"));
    if (allProxies.some(p => regex.test(p.name))) {
      const regionGroup = {
        name,
        type: "select",
        "include-all": true,
        filter: keywords.join("|"),
      };

      // 为美国节点组设置默认节点(优先选择VMISS)
      if (name === "🇺🇸 美国") {
        const vmissNode = allProxies.find(p =>
          regex.test(p.name) && p.name.includes("VMISS")
        );
        if (vmissNode) {
          regionGroup.default = vmissNode.name;
        }
      }

      validRegionGroups.push(regionGroup);
      validRegionNames.push(name);
    }
  }

  // 2. 生成 ruleGroupProxies (动态)
  const dynamicRuleGroupProxies = ['🚀 节点选择', 'DIRECT', 'REJECT', '⚡ 自动选择', ...validRegionNames];

  // 3. 生成 otherRuleGroups (动态)
  const dynamicOtherRuleGroups = ruleGroupNames.map(name => {
    let defaultProxy = ruleGroupDefaults[name] || '🚀 节点选择';
    // 如果默认节点是地区组，且该地区组不存在，则降级为 '🚀 节点选择'
    if (regionKeywords[defaultProxy] && !validRegionNames.includes(defaultProxy)) {
      defaultProxy = '🚀 节点选择';
    }
    const proxies = [defaultProxy, ...dynamicRuleGroupProxies.filter(p => p !== defaultProxy)];

    return {
      "type": 'select',
      "name": name,
      "proxies": proxies
    };
  });

  // 4. 组装基础 proxyGroups
  const baseProxyGroups = [
    {
      "type": "select",
      "name": "🚀 节点选择",
      "proxies": ["DIRECT", "REJECT", "⚡ 自动选择"],
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
    ...validRegionGroups, // 添加有效的地区分组实体
    {
      "type": "select",
      "name": "🛑 广告拦截",
      "proxies": ["REJECT", "DIRECT"]
    },
    {
      "type": "select",
      "name": "🏢 工作直连",
      "proxies": ["DIRECT"]
    },
    ...dynamicOtherRuleGroups
  ];

  // --- 基于 dialer-proxy 的二级链式代理生成 ---
  const originalProxies = allProxies;

  // 1. 为每个原始节点创建两个链式副本
  // L1: 第一级(入口)节点
  // L2: 第二级(出口)节点,通过L1中转

  const level1Proxies = [];  // 第一级(入口)
  const level2Proxies = [];  // 第二级(出口)

  originalProxies.forEach(proxy => {
    // L1: 第一级节点,不设置 dialer-proxy
    const l1Proxy = { ...proxy };
    l1Proxy.name = `${proxy.name} ↗️`;
    level1Proxies.push(l1Proxy);

    // L2: 出口节点,直接通过第一级中转 (L1 → L2)
    const l2Proxy = { ...proxy };
    l2Proxy.name = `${proxy.name} ↘️`;
    l2Proxy['dialer-proxy'] = '⛓️ 入口节点';
    level2Proxies.push(l2Proxy);
  });

  // 将所有链式节点添加到配置中
  config.proxies = [...originalProxies, ...level1Proxies, ...level2Proxies];

  // 2. 为所有使用 include-all 的基础代理组添加 filter,排除链式节点
  const excludeChainFilter = '^(?!.*(↗️|↘️)).*$';
  baseProxyGroups.forEach(group => {
    if (group['include-all'] && !group.filter) {
      // 如果已有 include-all 但没有 filter,添加排除链式节点的 filter
      group.filter = excludeChainFilter;
    } else if (group['include-all'] && group.filter) {
      // 如果已有 filter,需要同时满足原 filter 和排除链式节点
      const originalFilter = group.filter;
      group.filter = `^(?=.*(?:${originalFilter}))(?!.*(↗️|↘️)).*$`;
    }
  });

  // 3. 创建入口节点选择组
  const chainLevel1Group = {
    name: '⛓️ 入口节点',
    type: 'select',
    'include-all': true,
    filter: '↗️', // 只包含入口节点
  };

  // 4. 创建出口节点选择组
  const chainExitGroup = {
    name: '⛓️ 出口节点',
    type: 'select',
    'include-all': true,
    filter: '↘️', // 只包含出口节点
  };

  // 5. 创建链式代理组(指向出口节点)
  const chainGroup = {
    name: '⛓️ 链式代理',
    type: 'select',
    proxies: ['⛓️ 出口节点'],
  };

  // 6. 组装最终的代理组列表
  const finalProxyGroups = [
    ...baseProxyGroups,
    chainGroup,          // 链式代理
    chainLevel1Group,    // 入口节点选择
    chainExitGroup,      // 出口节点选择
  ];

  // 7. 将"链式代理"添加到主选择器中
  const mainSelector = finalProxyGroups.find(g => g.name === '🚀 节点选择');
  if (mainSelector) {
    // 插入到 '⚡ 自动选择' 之后
    mainSelector.proxies.splice(3, 0, '⛓️ 链式代理');
  }

  // 8. 将"链式代理"添加到其他所有策略组中
  finalProxyGroups.forEach(group => {
    if (ruleGroupNames.includes(group.name) && !group.proxies.includes('⛓️ 链式代理')) {
      group.proxies.splice(4, 0, '⛓️ 链式代理');
    }
  });
  // --- 结束二级链式代理生成 ---

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