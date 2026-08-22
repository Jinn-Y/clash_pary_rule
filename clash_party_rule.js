const rules = [
  "DOMAIN-SUFFIX,jinnll.cc,DIRECT",
  "DOMAIN,msmp.abchina.com.cn,REJECT",
  "DOMAIN,yunbusiness.ccb.com,DIRECT",
  "DOMAIN,wxh.wo.cn,DIRECT",
  "DOMAIN,gate.lagou.com,DIRECT",
  "DOMAIN,www.abchina.com.cn,DIRECT",
  "DOMAIN,www.shanbay.com,DIRECT",
  "DOMAIN,login-service.mobile-bank.psbc.com,DIRECT",
  "DOMAIN,mobile-bank.psbc.com,DIRECT",
  "DOMAIN,id6.me,DIRECT",
  "DOMAIN,easy-login.10099.com.cn,DIRECT",
  "DOMAIN-KEYWORD,-update.xoyocdn.com,DIRECT",
  "DOMAIN,open.e.189.cn,DIRECT",

  "RULE-SET,private,🏠 私有网络,no-resolve",

  "DOMAIN-SUFFIX,jinnll.xyz,🚀 节点选择",
  "DOMAIN-SUFFIX,weajp.com,DIRECT",
  "DOMAIN-SUFFIX,starboss.biz,DIRECT",
  "RULE-SET,amazon,🇺🇸 美国",
  "RULE-SET,aws,🇺🇸 美国",
  "DOMAIN-KEYWORD,starpay,DIRECT",
  "DOMAIN-KEYWORD,atlassian,DIRECT",

  "DOMAIN-SUFFIX,turingfraud.net,💹 交易所",
  "DOMAIN,firebaseinstallations.googleapis.com,💹 交易所",
  "RULE-SET,category-ads-all,🛑 广告拦截",
  "RULE-SET,talkatone-ads,🛑 广告拦截",
  "RULE-SET,category-bank-cn,DIRECT",
  "RULE-SET,talkatone,🌐 社交媒体",
  "RULE-SET,whatsapp,🌐 社交媒体",
  "RULE-SET,telegram,📲 电报消息,no-resolve",
  "RULE-SET,category-ai-!cn,💬 AI 服务",
  "RULE-SET,bilibili,📺 哔哩哔哩",
  "RULE-SET,youtube,📹 油管视频",
  "RULE-SET,google,🔍 谷歌服务",
  "RULE-SET,google-ip,🔍 谷歌服务,no-resolve",
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
  "RULE-SET,geolocation-cn,🔒 国内服务",
  "RULE-SET,cn,🔒 国内服务",
  "MATCH,🐟 漏网之鱼"
];

// GitHub 在部分国内网络中会间歇性不可达；所有 GitHub 规则与 Geo 数据统一经此代理下载。
// 如需使用自建代理，只修改此前缀，末尾必须保留 `/`。
const githubProxyPrefix = "https://gh-proxy.com/";

function githubProxyUrl(url) {
  return `${githubProxyPrefix}${url}`;
}

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

// GeoIP/Geosite 基础数据
const geoConfig = {
  "geodata-mode": true,
  "geo-auto-update": true,
  "geodata-loader": "standard",
  "geo-update-interval": 24,
  "geox-url": {
    "geoip": githubProxyUrl("https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/geoip.dat"),
    "geosite": githubProxyUrl("https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/geosite.dat"),
    "mmdb": githubProxyUrl("https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/release/country.mmdb"),
    "asn": githubProxyUrl("https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb")
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
  return githubProxyUrl(`https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/${type}/${name}.mrs`);
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
  "talkatone-ads": { "type": "http", "behavior": "classical", "format": "text", "interval": 86400, "url": githubProxyUrl("https://raw.githubusercontent.com/LOWERTOP/Shadowrocket-First/main/TalkatoneAntiAds.list"), "path": "./ruleset/talkatone-ads.list" },
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
  "crypto": { "type": "http", "behavior": "classical", "format": "text", "interval": 86400, "url": githubProxyUrl("https://raw.githubusercontent.com/iab0x00/ProxyRules/main/Rule/Crypto.txt"), "path": "./ruleset/crypto.txt" },
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


// 地区特征正则映射表
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

const ruleGroupDefaults = {
  '💬 AI 服务': '🇺🇸 美国',
  '📺 哔哩哔哩': 'DIRECT',
  '📹 油管视频': '🇭🇰 香港',
  '🔍 谷歌服务': '🇺🇸 美国',
  '🏠 私有网络': 'DIRECT',
  '🔒 国内服务': 'DIRECT',
  '📲 电报消息': '🚀 节点选择',
  '🐱 Github': '🚀 节点选择',
  'Ⓜ️ 微软服务': '⚡ 自动选择',
  '🍏 苹果服务': 'DIRECT',
  '🌐 社交媒体': '🇺🇸 美国',
  '🎬 流媒体': '🚀 节点选择',
  '🎮 游戏平台': '🚀 节点选择',
  '📚 教育资源': '⚡ 自动选择',
  '💰 金融服务': '🇺🇸 美国',
  '💹 交易所': '🇯🇵 日本',
  '☁️ 云服务': '🇺🇸 美国',
  '🌐 非中国': '🚀 节点选择',
  '🐟 漏网之鱼': '🚀 节点选择'
};

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

  // 动态生成节点组
  const hasStaticProxies = allProxies.length > 0;
  const hasProxyProviders = proxyProviderCount > 0;

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
    // 仅使用 proxy-providers 时，由于无法提前枚举节点名，故保留地区分组并使用 include-all + filter 延迟匹配。
    if (!hasStaticProxies && hasProxyProviders) {
      validRegionGroups.push(createRegionGroup(name, keywords));
      validRegionNames.push(name);
      continue;
    }

    const regex = new RegExp(createRegionFilter(keywords), "i");
    if (!allProxies.some(p => regex.test(getProxyName(p)))) {
      continue;
    }

    let defaultName;

    // 优先匹配美国 VMISS 落地节点
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

  const dynamicRuleGroupProxies = ['🚀 节点选择', 'DIRECT', '⚡ 自动选择', ...validRegionNames];

  const dynamicOtherRuleGroups = ruleGroupNames.map(name => {
    let defaultProxy = ruleGroupDefaults[name] || '🚀 节点选择';
    // 若默认偏好地区组当前节点池并不匹配，则安全降级
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

  const baseProxyGroups = [
    {
      "type": "select",
      "name": "🚀 节点选择",
      "proxies": ["DIRECT", "REJECT", "⚡ 自动选择"],
      "include-all": true
    },
    {
      "name": "⚡ 自动选择",
      "type": "url-test",
      "url": "https://www.gstatic.com/generate_204",
      "interval": 300,
      "lazy": false,
      "include-all": true
    },
    ...validRegionGroups,
    {
      "type": "select",
      "name": "🛑 广告拦截",
      "proxies": ["REJECT", "DIRECT"]
    },
    ...dynamicOtherRuleGroups
  ];

  // 链式代理生成 (基于 dialer-proxy)
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
    const level2Proxies = [];

    chainSourceProxies.forEach(proxy => {
      const l2Proxy = { ...proxy };
      l2Proxy.name = `${getProxyName(proxy)} ↘️`;
      l2Proxy['dialer-proxy'] = '⛓️ 入口节点';
      level2Proxies.push(l2Proxy);
    });

    config.proxies = [...originalProxies, ...level2Proxies];
  }

  const excludeChainFilter = '^(?!.*(↘️)).*$';
  baseProxyGroups.forEach(group => {
    if (group['include-all'] && !group.filter) {
      group.filter = excludeChainFilter;
    } else if (group['include-all'] && group.filter) {
      // 避免原 filter 直接嵌入 lookahead，防范其内部的 ^ / $ 在此失效
      group.filter = combineFilters(group.filter, excludeChainFilter);
    }
  });

  const finalProxyGroups = [...baseProxyGroups];

  if (canBuildChainProxy) {
    const chainLevel1Group = {
      name: '⛓️ 入口节点',
      type: 'select',
      'include-all': true,
      filter: excludeChainFilter,
    };

    const chainGroup = {
      name: '⛓️ 链式代理',
      type: 'select',
      'include-all': true,
      filter: '↘️',
    };

    finalProxyGroups.push(chainLevel1Group, chainGroup);
  }

  const mainSelector = finalProxyGroups.find(g => g.name === '🚀 节点选择');
  if (canBuildChainProxy && Array.isArray(mainSelector?.proxies) && !mainSelector.proxies.includes('⛓️ 链式代理')) {
    mainSelector.proxies.splice(3, 0, '⛓️ 链式代理');
  }

  finalProxyGroups.forEach(group => {
    if (!canBuildChainProxy) {
      return;
    }
    if (ruleGroupNames.includes(group.name) && Array.isArray(group.proxies) && !group.proxies.includes('⛓️ 链式代理')) {
      // 边界防御：若 validRegionNames 为空，限制位置避免越界
      const insertPos = Math.min(4, group.proxies.length);
      group.proxies.splice(insertPos, 0, '⛓️ 链式代理');
    }
  });

  // 配置数据合并与下发
  config.dns = mergeDnsConfig(config.dns, dnsConfig);
  Object.assign(config, geoConfig);

  config["rule-providers"] = { ...(config["rule-providers"] || {}), ...ruleProviders };
  config["proxy-groups"] = mergeProxyGroups(config["proxy-groups"], finalProxyGroups);
  config.rules = mergeRules(config.rules, rules);

  if (scriptWarnings.length > 0) {
    const existingWarnings = Array.isArray(config["x-script-warnings"]) ? config["x-script-warnings"] : [];
    config["x-script-warnings"] = uniqueList([...existingWarnings, ...scriptWarnings]);
  }

  return config;
}
