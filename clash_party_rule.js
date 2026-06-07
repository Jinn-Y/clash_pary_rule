const rules = [
  // ******** 针对特定应用去代理检测跳过 (SGModule 转换) ******** //
  "DOMAIN,msmp.abchina.com.cn,REJECT",
  "DOMAIN,www.baidu.com,DIRECT",
  "DOMAIN,yunbusiness.ccb.com,DIRECT",
  "DOMAIN,wxh.wo.cn,DIRECT",
  "DOMAIN,gate.lagou.com,DIRECT",
  "DOMAIN,www.abchina.com.cn,DIRECT",
  "DOMAIN,www.shanbay.com,DIRECT",
  "DOMAIN,login-service.mobile-bank.psbc.com,DIRECT",
  "DOMAIN,mobile-bank.psbc.com,DIRECT",
  "DOMAIN,id6.me,DIRECT",
  "DOMAIN,www.163.com,DIRECT",
  "DOMAIN,easy-login.10099.com.cn,DIRECT",
  "DOMAIN-KEYWORD,-update.xoyocdn.com,DIRECT",
  "DOMAIN,open.e.189.cn,DIRECT",
  // ******** 针对特定应用去代理检测跳过 (SGModule 转换) ******** //
  // ******** 工作规则 ********************* //
  "DOMAIN-SUFFIX,jinnll.xyz,🚀 节点选择",
  "DOMAIN-SUFFIX,weajp.com,DIRECT",
  "DOMAIN-SUFFIX,starboss.biz,DIRECT",
  "RULE-SET,amazon,DIRECT",
  "RULE-SET,aws,DIRECT",
  "DOMAIN-KEYWORD,starpay,DIRECT",
  "DOMAIN-KEYWORD,atlassian,DIRECT",
  // ******** 工作规则 ********************* //
  "RULE-SET,category-bank-cn,DIRECT",
  "RULE-SET,category-ads-all,🛑 广告拦截",
  "RULE-SET,talkatone-ads,🛑 广告拦截",
  "RULE-SET,talkatone,🌐 社交媒体",
  "RULE-SET,whatsapp,🌐 社交媒体",
  "RULE-SET,category-ai-!cn,💬 AI 服务",
  "RULE-SET,bilibili,📺 哔哩哔哩",
  "RULE-SET,youtube,📹 油管视频",
  "RULE-SET,google,🔍 谷歌服务",
  "RULE-SET,google-ip,🔍 谷歌服务,no-resolve",
  "RULE-SET,geolocation-cn,🔒 国内服务",
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
  "RULE-SET,crypto,💹 交易所",
  "RULE-SET,azure,☁️ 云服务",
  "RULE-SET,digitalocean,☁️ 云服务",
  "RULE-SET,heroku,☁️ 云服务",
  "RULE-SET,dropbox,☁️ 云服务",
  "RULE-SET,geolocation-!cn,🌐 非中国",
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
    "geoip": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/geoip.dat",
    "geosite": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/geosite.dat",
    "mmdb": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/country.mmdb",
    "asn": "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  }
};

const defaultScriptOptions = {
  enableChainProxy: true,
  maxChainProxyCount: 80,
  chainProxyNamePattern: ""
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "mrs",
  "interval": 86400
};

function metaRulesDatUrl(type, name) {
  return `https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/${type}/${name}.mrs`;
}

function metaRulesDatProvider(type, name, behavior) {
  return {
    ...ruleProviderCommon,
    behavior,
    url: metaRulesDatUrl(type, name),
    path: `./ruleset/${name}.mrs`
  };
}

// 规则集配置
const ruleProviders = {
  "category-ads-all": metaRulesDatProvider("geosite", "category-ads-all", "domain"),
  "talkatone-ads": { "type": "http", "behavior": "classical", "format": "text", "interval": 86400, "url": "https://raw.githubusercontent.com/LOWERTOP/Shadowrocket-First/main/TalkatoneAntiAds.list", "path": "./ruleset/talkatone-ads.list" },
  "category-ai-!cn": metaRulesDatProvider("geosite", "category-ai-!cn", "domain"),
  "bilibili": metaRulesDatProvider("geosite", "bilibili", "domain"),
  "youtube": metaRulesDatProvider("geosite", "youtube", "domain"),
  "google": metaRulesDatProvider("geosite", "google", "domain"),
  "google-ip": { ...metaRulesDatProvider("geoip", "google", "ipcidr"), path: "./ruleset/google-ip.mrs" },
  "geolocation-cn": metaRulesDatProvider("geosite", "geolocation-cn", "domain"),
  "cn": metaRulesDatProvider("geoip", "cn", "ipcidr"),
  "github": metaRulesDatProvider("geosite", "github", "domain"),
  "gitlab": metaRulesDatProvider("geosite", "gitlab", "domain"),
  "microsoft": metaRulesDatProvider("geosite", "microsoft", "domain"),
  "apple": metaRulesDatProvider("geosite", "apple", "domain"),
  "facebook": metaRulesDatProvider("geosite", "facebook", "domain"),
  "instagram": metaRulesDatProvider("geosite", "instagram", "domain"),
  "twitter": metaRulesDatProvider("geosite", "twitter", "domain"),
  "tiktok": metaRulesDatProvider("geosite", "tiktok", "domain"),
  "linkedin": metaRulesDatProvider("geosite", "linkedin", "domain"),
  "netflix": metaRulesDatProvider("geosite", "netflix", "domain"),
  "hulu": metaRulesDatProvider("geosite", "hulu", "domain"),
  "disney": metaRulesDatProvider("geosite", "disney", "domain"),
  "hbo": metaRulesDatProvider("geosite", "hbo", "domain"),
  "amazon": metaRulesDatProvider("geosite", "amazon", "domain"),
  "bahamut": metaRulesDatProvider("geosite", "bahamut", "domain"),
  "steam": metaRulesDatProvider("geosite", "steam", "domain"),
  "epicgames": metaRulesDatProvider("geosite", "epicgames", "domain"),
  "ea": metaRulesDatProvider("geosite", "ea", "domain"),
  "ubisoft": metaRulesDatProvider("geosite", "ubisoft", "domain"),
  "blizzard": metaRulesDatProvider("geosite", "blizzard", "domain"),
  "coursera": metaRulesDatProvider("geosite", "coursera", "domain"),
  "edx": metaRulesDatProvider("geosite", "edx", "domain"),
  "udemy": metaRulesDatProvider("geosite", "udemy", "domain"),
  "khanacademy": metaRulesDatProvider("geosite", "khanacademy", "domain"),
  "category-scholar-!cn": metaRulesDatProvider("geosite", "category-scholar-!cn", "domain"),
  "paypal": metaRulesDatProvider("geosite", "paypal", "domain"),
  "visa": metaRulesDatProvider("geosite", "visa", "domain"),
  "mastercard": metaRulesDatProvider("geosite", "mastercard", "domain"),
  "stripe": metaRulesDatProvider("geosite", "stripe", "domain"),
  "wise": metaRulesDatProvider("geosite", "wise", "domain"),
  "crypto": { "type": "http", "behavior": "classical", "format": "text", "interval": 86400, "url": "https://raw.githubusercontent.com/iab0x00/ProxyRules/main/Rule/Crypto.txt", "path": "./ruleset/crypto.txt" },
  "aws": metaRulesDatProvider("geosite", "aws", "domain"),
  "azure": metaRulesDatProvider("geosite", "azure", "domain"),
  "digitalocean": metaRulesDatProvider("geosite", "digitalocean", "domain"),
  "heroku": metaRulesDatProvider("geosite", "heroku", "domain"),
  "dropbox": metaRulesDatProvider("geosite", "dropbox", "domain"),
  "geolocation-!cn": metaRulesDatProvider("geosite", "geolocation-!cn", "domain"),
  "private": metaRulesDatProvider("geoip", "private", "ipcidr"),
  "telegram": metaRulesDatProvider("geoip", "telegram", "ipcidr"),
  "talkatone": metaRulesDatProvider("geosite", "talkatone", "domain"),
  "whatsapp": metaRulesDatProvider("geosite", "whatsapp", "domain"),
  "category-bank-cn": metaRulesDatProvider("geosite", "category-bank-cn", "domain"),
};


// 地区关键词映射表 (参考 clash-js.js)
const regionKeywords = {
  "🇭🇰 香港": { keywords: ["香港", "HK", "Hong Kong", "HKG"] },
  "🇹🇼 台湾": { keywords: ["台湾", "台灣", "TW", "Taiwan", "Taipei"] },
  "🇯🇵 日本": { keywords: ["日本", "东京", "東京", "大阪", "埼玉", "JP", "Japan", "Tokyo", "Osaka", "Saitama"] },
  "🇺🇸 美国": { keywords: ["美国", "美國", "US", "USA", "United States", "America", "Los Angeles", "San Francisco", "Silicon Valley"] },
  "🇸🇬 新加坡": { keywords: ["新加坡", "SG", "Singapore", "SGP"] },
  "🇰🇷 韩国": { keywords: ["韩国", "韓國", "KR", "Korea", "Seoul"] },
  "🇬🇧 英国": { keywords: ["英国", "英國", "UK", "GB", "United Kingdom", "London", "Britain", "England"] },
  "🇩🇪 德国": { keywords: ["德国", "德國", "DE", "Germany", "Frankfurt"] },
  "🇫🇷 法国": { keywords: ["法国", "法國", "FR", "France", "Paris"] },
  "🇨🇦 加拿大": { keywords: ["加拿大", "CA", "Canada", "Montreal", "Toronto", "Vancouver"] },
  "🇦🇺 澳大利亚": { keywords: ["澳大利亚", "澳洲", "AU", "Australia", "Sydney"] },
  "🇮🇳 印度": { keywords: ["印度", "IN", "India", "Mumbai"] },
  "🇷🇺 俄罗斯": { keywords: ["俄罗斯", "俄羅斯", "RU", "Russia", "Moscow"] },
  "🇳🇱 荷兰": { keywords: ["荷兰", "荷蘭", "NL", "Netherlands", "Amsterdam"] },
  "🇹🇷 土耳其": { keywords: ["土耳其", "TR", "Turkey", "Istanbul"] },
  "🇦🇷 阿根廷": { keywords: ["阿根廷", "AR", "Argentina"] },
  "🇵🇭 菲律宾": { keywords: ["菲律宾", "菲律賓", "PH", "Philippines"] },
  "🇲🇾 马来西亚": { keywords: ["马来西亚", "馬來西亞", "MY", "Malaysia"] },
  "🇹🇭 泰国": { keywords: ["泰国", "泰國", "TH", "Thailand"] },
  "🇻🇳 越南": { keywords: ["越南", "VN", "Vietnam"] }
};

// 地区分组生成逻辑已移入 main 函数以支持动态过滤

function escapeRegexValue(value) {
  return value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

function createRegionFilter(keywords) {
  return keywords
    .map(keyword => {
      const escapedKeyword = escapeRegexValue(keyword);
      if (/^[A-Za-z0-9]{2,3}$/.test(keyword)) {
        return `(?:^|[^A-Za-z0-9])${escapedKeyword}(?:$|[^A-Za-z0-9])`;
      }
      return escapedKeyword;
    })
    .join("|");
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function combineFilters(left, right) {
  if (!left) {
    return right;
  }
  if (!right || left === right) {
    return left;
  }
  return `^(?=.*(?:${left}))(?=.*(?:${right})).*$`;
}

function mergeProxyGroup(existingGroup, generatedGroup) {
  const merged = { ...existingGroup, ...generatedGroup };

  if (Array.isArray(existingGroup.proxies) && Array.isArray(generatedGroup.proxies)) {
    merged.proxies = uniqueList([...existingGroup.proxies, ...generatedGroup.proxies]);
  }

  if (existingGroup.filter && generatedGroup.filter) {
    merged.filter = combineFilters(existingGroup.filter, generatedGroup.filter);
  }

  if (existingGroup["include-all"] || generatedGroup["include-all"]) {
    merged["include-all"] = true;
  }

  return merged;
}

function mergeProxyGroups(existingGroups, generatedGroups) {
  const groups = new Map();
  const existing = Array.isArray(existingGroups) ? existingGroups : [];
  const generated = Array.isArray(generatedGroups) ? generatedGroups : [];

  existing.forEach(group => {
    if (group?.name) {
      groups.set(group.name, group);
    }
  });
  generated.forEach(group => {
    const existingGroup = groups.get(group.name);
    groups.set(group.name, existingGroup ? mergeProxyGroup(existingGroup, group) : group);
  });
  return [...groups.values()];
}

function mergeRules(existingRules, generatedRules) {
  const existing = Array.isArray(existingRules) ? existingRules : [];
  const existingNonMatch = existing.filter(rule => !String(rule).startsWith("MATCH,"));
  const existingMatch = existing.find(rule => String(rule).startsWith("MATCH,"));
  const generatedNonMatch = generatedRules.filter(rule => !String(rule).startsWith("MATCH,"));
  const generatedMatch = generatedRules.find(rule => String(rule).startsWith("MATCH,"));
  return uniqueList([
    ...existingNonMatch,
    ...generatedNonMatch,
    existingMatch || generatedMatch
  ]);
}

function mergeDnsConfig(existingDns, generatedDns) {
  return {
    ...(existingDns || {}),
    ...generatedDns,
    "nameserver-policy": {
      ...((existingDns || {})["nameserver-policy"] || {}),
      ...(generatedDns["nameserver-policy"] || {})
    }
  };
}

function createOptionalRegex(pattern) {
  if (!pattern) {
    return null;
  }
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

function resolveScriptOptions(config) {
  const userOptions = config?.["x-script-options"];
  if (!userOptions || typeof userOptions !== "object") {
    return { ...defaultScriptOptions };
  }

  const maxChainProxyCount = Number(userOptions.maxChainProxyCount);
  return {
    ...defaultScriptOptions,
    ...userOptions,
    maxChainProxyCount: Number.isFinite(maxChainProxyCount) && maxChainProxyCount > 0
      ? maxChainProxyCount
      : defaultScriptOptions.maxChainProxyCount
  };
}

function getProxyName(proxy) {
  return typeof proxy?.name === "string" ? proxy.name : "";
}

const ruleGroupNames = [
  '💬 AI 服务', '📺 哔哩哔哩', '📹 油管视频', '🔍 谷歌服务', '🏠 私有网络',
  '🔒 国内服务', '📲 电报消息', '🐱 Github', 'Ⓜ️ 微软服务', '🍏 苹果服务',
  '🌐 社交媒体', '🎬 流媒体', '🎮 游戏平台', '📚 教育资源', '💰 金融服务', '💹 交易所',
  '☁️ 云服务', '🌐 非中国', '🐟 漏网之鱼'
];

// 为每个规则组定义默认节点
const ruleGroupDefaults = {
  '💬 AI 服务': '🇺🇸 美国',      // AI 服务默认使用美国节点
  '📺 哔哩哔哩': 'DIRECT',          // 哔哩哔哩直连
  '📹 油管视频': '🇭🇰 香港',        // 油管使用香港节点
  '🔍 谷歌服务': '🇺🇸 美国',      // 谷歌服务默认使用美国节点
  '🏠 私有网络': 'DIRECT',          // 私有网络直连
  '🔒 国内服务': 'DIRECT',          // 国内服务直连
  '📲 电报消息': '🚀 节点选择',      // 电报使用自动选择
  '🐱 Github': '🚀 节点选择',        // Github 使用自动选择
  'Ⓜ️ 微软服务': '⚡ 自动选择',     // 微软服务使用自动选择
  '🍏 苹果服务': 'DIRECT',          // 苹果服务直连
  '🌐 社交媒体': '🇺🇸 美国',      // 社交媒体默认使用美国节点
  '🎬 流媒体': '🚀 节点选择',          // 流媒体默认使用主选择器
  '🎮 游戏平台': '🚀 节点选择',        // 游戏平台默认使用主选择器
  '📚 教育资源': '⚡ 自动选择',      // 教育资源使用自动选择
  '💰 金融服务': '🇺🇸 美国',        // 金融服务使用美国节点
  '💹 交易所': '🇯🇵 日本',          // 交易所使用日本节点
  '☁️ 云服务': '🇺🇸 美国',        // 云服务默认使用美国节点
  '🌐 非中国': '🚀 节点选择',        // 非中国地区使用自动选择
  '🐟 漏网之鱼': '🚀 节点选择'       // 漏网之鱼使用节点选择
};

// 策略组生成逻辑已移入 main 函数

// 程序入口
function main(config) {
  config = config || {};

  const userScriptOptions = resolveScriptOptions(config);
  const scriptWarnings = [];
  const allProxies = Array.isArray(config.proxies) ? config.proxies : [];
  const proxyProviders = config["proxy-providers"];
  const proxyCount = allProxies.length;
  const proxyProviderCount =
    proxyProviders && typeof proxyProviders === "object" ? Object.keys(proxyProviders).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // --- 动态生成节点组 ---
  const hasStaticProxies = allProxies.length > 0;
  const hasProxyProviders = proxyProviderCount > 0;

  // 1. 过滤存在的地区
  const validRegionGroups = [];
  const validRegionNames = [];

  function createRegionGroup(name, keywords, defaultName) {
    const regionGroup = {
      name,
      type: "select",
      "include-all": true,
      filter: createRegionFilter(keywords),
    };

    if (defaultName) {
      regionGroup.default = defaultName;
    }

    return regionGroup;
  }

  for (const [name, { keywords }] of Object.entries(regionKeywords)) {
    // 仅使用 proxy-providers 时，无法提前枚举节点名；此时保留地区分组，由 include-all + filter 动态匹配。
    if (!hasStaticProxies && hasProxyProviders) {
      validRegionGroups.push(createRegionGroup(name, keywords));
      validRegionNames.push(name);
      continue;
    }

    // 检查是否有节点匹配该地区的关键字
    const regex = new RegExp(createRegionFilter(keywords), "i");
    if (!allProxies.some(p => regex.test(getProxyName(p)))) {
      continue;
    }

    let defaultName;

    // 为美国节点组设置默认节点(优先选择VMISS)
    if (name === "🇺🇸 美国") {
      const vmissNode = allProxies.find(p =>
        regex.test(getProxyName(p)) && getProxyName(p).toUpperCase().includes("VMISS")
      );
      if (vmissNode) {
        defaultName = vmissNode.name;
      }
    }

    validRegionGroups.push(createRegionGroup(name, keywords, defaultName));
    validRegionNames.push(name);
  }

  // 2. 生成 ruleGroupProxies (动态)
  const dynamicRuleGroupProxies = ['🚀 节点选择', 'DIRECT', '⚡ 自动选择', ...validRegionNames];

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
    ...dynamicOtherRuleGroups
  ];

  // --- 基于 dialer-proxy 的精简版链式代理生成 ---
  const originalProxies = allProxies;
  const chainProxyRegex = createOptionalRegex(userScriptOptions.chainProxyNamePattern);
  const chainCandidateProxies = originalProxies.filter(proxy => getProxyName(proxy));
  const chainSourceProxies = chainProxyRegex
    ? chainCandidateProxies.filter(proxy => chainProxyRegex.test(getProxyName(proxy)))
    : chainCandidateProxies;
  const exceedsChainProxyLimit = chainSourceProxies.length > userScriptOptions.maxChainProxyCount;
  const canBuildChainProxy =
    hasStaticProxies &&
    userScriptOptions.enableChainProxy &&
    chainSourceProxies.length > 0 &&
    !exceedsChainProxyLimit;

  if (hasStaticProxies && userScriptOptions.enableChainProxy && exceedsChainProxyLimit) {
    scriptWarnings.push(
      `链式代理未启用：匹配节点数 ${chainSourceProxies.length} 超过 maxChainProxyCount=${userScriptOptions.maxChainProxyCount}`
    );
  }

  if (canBuildChainProxy) {
    // 1. 仅为出口节点创建带有拨号代理的克隆 (入口直接复用原节点)
    const level2Proxies = [];  // 出口节点

    chainSourceProxies.forEach(proxy => {
      // 出口节点,通过 ⛓️ 入口节点 中转
      const l2Proxy = { ...proxy };
      l2Proxy.name = `${getProxyName(proxy)} ↘️`;
      l2Proxy['dialer-proxy'] = '⛓️ 入口节点';
      level2Proxies.push(l2Proxy);
    });

    // 将链式出口节点添加到配置中 (不再添加 ↗️ 入口节点)
    config.proxies = [...originalProxies, ...level2Proxies];
  }

  // 2. 为所有使用 include-all 的基础代理组添加 filter,排除链式节点
  const excludeChainFilter = '^(?!.*(↘️)).*$';
  baseProxyGroups.forEach(group => {
    if (group['include-all'] && !group.filter) {
      // 如果已有 include-all 但没有 filter,添加排除链式节点的 filter
      group.filter = excludeChainFilter;
    } else if (group['include-all'] && group.filter) {
      // 如果已有 filter,需要同时满足原 filter 和排除链式节点
      // 使用 combineFilters() 避免将原 filter 直接嵌入 lookahead，
      // 防止原 filter 内的 ^ / $ 锚点在 lookahead 上下文中失效
      group.filter = combineFilters(group.filter, excludeChainFilter);
    }
  });

  // 3. 组装最终的代理组列表
  const finalProxyGroups = [...baseProxyGroups];

  if (canBuildChainProxy) {
    // 4. 创建入口节点选择组 (自动吸纳所有不带 ↘️ 的普通节点)
    const chainLevel1Group = {
      name: '⛓️ 入口节点',
      type: 'select',
      'include-all': true,
      filter: excludeChainFilter, // 只包含常规节点
    };

    // 5. 创建链式代理组 (自动吸纳所有带 ↘️ 的出口节点)
    const chainGroup = {
      name: '⛓️ 链式代理',
      type: 'select',
      'include-all': true,
      filter: '↘️', // 只包含出口落地节点
    };

    finalProxyGroups.push(
      chainLevel1Group,    // 入口节点选择
      chainGroup,          // 链式代理落地选择
    );
  }

  // 7. 将"链式代理"添加到主选择器中
  const mainSelector = finalProxyGroups.find(g => g.name === '🚀 节点选择');
  if (canBuildChainProxy && Array.isArray(mainSelector?.proxies) && !mainSelector.proxies.includes('⛓️ 链式代理')) {
    // 插入到 '⚡ 自动选择' 之后
    mainSelector.proxies.splice(3, 0, '⛓️ 链式代理');
  }

  // 8. 将"链式代理"添加到其他所有策略组中
  finalProxyGroups.forEach(group => {
    if (!canBuildChainProxy) {
      return;
    }
    if (ruleGroupNames.includes(group.name) && Array.isArray(group.proxies) && !group.proxies.includes('⛓️ 链式代理')) {
      // 使用 Math.min 防止 validRegionNames 为空时 proxies 不足 4 个元素导致插入位置越界
      const insertPos = Math.min(4, group.proxies.length);
      group.proxies.splice(insertPos, 0, '⛓️ 链式代理');
    }
  });
  // --- 结束二级链式代理生成 ---

  // 合并 DNS 配置
  config.dns = mergeDnsConfig(config.dns, dnsConfig);

  // 覆盖 GeoIP/Geosite 相关配置
  Object.assign(config, geoConfig);

  // 合并规则集、代理组和规则，保留原订阅中的自定义内容
  config["rule-providers"] = { ...(config["rule-providers"] || {}), ...ruleProviders };
  config["proxy-groups"] = mergeProxyGroups(config["proxy-groups"], finalProxyGroups);
  config.rules = mergeRules(config.rules, rules);

  if (scriptWarnings.length > 0) {
    const existingWarnings = Array.isArray(config["x-script-warnings"]) ? config["x-script-warnings"] : [];
    config["x-script-warnings"] = uniqueList([...existingWarnings, ...scriptWarnings]);
  }

  // 返回修改后的配置
  return config;
}
