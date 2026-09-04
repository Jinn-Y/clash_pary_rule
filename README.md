# clash_pary_rule

用于 Clash.Meta / Mihomo 的 JavaScript 配置覆写脚本。脚本在保留原订阅配置的基础上，补充分流规则、远程规则集、DNS、Geo 数据源、地区策略组和二级链式代理。

> 项目名中的 `pary` 是仓库现有命名；核心脚本为 [`clash_party_rule.js`](./clash_party_rule.js)。

## 当前分支与 `work` 分支的区别

两个分支只有 Amazon / AWS 的分流策略不同，其余脚本逻辑一致：

| 规则集 | 当前分支（`default`） | `work` 分支（与 `main` 一致） |
| --- | --- | --- |
| `amazon` | `🇺🇸 美国` | `DIRECT` |
| `aws` | `🇺🇸 美国` | `DIRECT` |

- 当前 `default` 分支固定让 Amazon 和 AWS 流量使用 `🇺🇸 美国` 策略组，适合需要美国出口 IP 的场景。使用前应确保订阅中存在能被脚本识别的美国节点。
- `work` / `main` 分支让 Amazon 和 AWS 流量直连，适合本地网络可正常访问、且不希望云服务绕行代理的场景。

切换分支：

```bash
# Amazon / AWS 使用美国节点
git switch default

# Amazon / AWS 直连
git switch work
```

## 功能概览

### 规则分流

内置 AI、Google、GitHub、微软、苹果、社交媒体、流媒体、游戏平台、教育资源、金融服务、交易所、云服务、国内服务、广告拦截等策略，并以 `MATCH,🐟 漏网之鱼` 兜底。

大部分规则集来自 [`MetaCubeX/meta-rules-dat`](https://github.com/MetaCubeX/meta-rules-dat)，脚本会生成相应的 `rule-providers` 配置。

### 地区策略组

脚本根据节点名称识别香港、台湾、日本、美国、新加坡、韩国、英国、德国等 20 个地区。

- 配置含静态 `proxies` 时，只创建实际匹配到节点的地区组。
- 配置仅含 `proxy-providers` 时，无法预先枚举节点，因此保留全部地区组，并通过 `include-all` 和正则表达式在运行时筛选。
- 业务组偏好的地区不存在时，自动回退到 `🚀 节点选择`。
- 美国组会优先选择名称中包含 `VMISS` 的匹配节点。

### 业务策略组

脚本会生成 `🚀 节点选择`、`⚡ 自动选择`、`🛑 广告拦截` 以及各业务策略组。自动选择组使用 `https://www.gstatic.com/generate_204` 测速，间隔为 300 秒。

### DNS 与 Geo 数据

- 启用 `fake-ip`、IPv6 和 `respect-rules`。
- 国内及私有域名使用腾讯、阿里 DoH。
- 非中国域名使用 Cloudflare、Google DoH。
- 启用 GeoIP / Geosite 自动更新，更新间隔为 24 小时。

### 二级链式代理

存在静态节点时，脚本会为符合条件的原始节点生成以 `⛓️出口 :: ` 开头的出口副本，并通过 `dialer-proxy` 连接到 `⛓️ 入口节点`，最终组成 `⛓️ 链式代理`。

链路关系如下：

```text
应用流量 -> 出口节点（⛓️出口） -> ⛓️ 入口节点 -> 目标网络
```

为避免节点过多导致配置膨胀，默认仅在候选节点不超过 80 个时生成链式代理。脚本会清理自身上一次生成的出口副本，因此重复执行不会叠加生成节点；若出口名称冲突则跳过并写入警告。仅使用 `proxy-providers` 的配置不会生成链式代理。

Hysteria、Hysteria2、TUIC、WireGuard、ShadowTLS 不会被用作链式出口，以避免不兼容的 UDP 或 TLS 伪装链路。此脚本默认允许带 Reality 配置的节点作为链式出口，以便当前订阅生成链式代理；若内核或上游链路不兼容，可通过 `enableRealityChainProxy: false` 关闭。跳过原因会写入 `x-script-warnings`。

## 使用方法

1. 在支持 JavaScript 配置覆写的 Clash.Meta / Mihomo 客户端中导入原始订阅。
2. 将 [`clash_party_rule.js`](./clash_party_rule.js) 添加为本地或远程覆写脚本。
3. 重新加载配置，确认生成的策略组和规则集可用。
4. 按需选择 `🚀 节点选择` 或各业务策略组的出口。

客户端中的入口可能叫“脚本”“配置覆写”“覆写脚本”或 “JavaScript Config Processor”。脚本入口函数为：

```js
main(config)
```

输入配置必须至少包含非空的 `proxies` 或 `proxy-providers`，否则脚本会抛出 `配置文件中未找到任何代理`。

## 脚本选项

可在原始配置中通过 `x-script-options` 控制链式代理：

```yaml
x-script-options:
  enableChainProxy: true
  enableRealityChainProxy: true
  maxChainProxyCount: 80
  chainProxyNamePattern: "US|美国|VMISS"
```

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `enableChainProxy` | `true` | 是否生成链式代理 |
| `enableRealityChainProxy` | `true` | 是否允许带 Reality 配置的节点作为链式出口；不兼容时设为 `false` |
| `maxChainProxyCount` | `80` | 候选节点上限；超过后跳过生成 |
| `chainProxyNamePattern` | `""` | 用 JavaScript 正则筛选参与链式代理的节点；空字符串表示不过滤 |

正则无效时会被忽略。候选节点超过上限时，原因会写入返回配置的 `x-script-warnings`。

## 配置合并行为

脚本不是简单替换整个订阅，具体行为如下：

| 配置项 | 行为 |
| --- | --- |
| `dns` | 保留原有字段，再以脚本配置覆盖同名字段；`nameserver-policy` 单独合并 |
| `rule-providers` | 保留原有规则集，脚本内同名规则集优先 |
| `proxy-groups` | 保留非脚本管理的原有组；脚本管理的同名组以脚本生成的节点、筛选条件和 `include-all` 为准，防止订阅预填节点与动态节点重复 |
| `rules` | 原规则在前、脚本规则在后并去重；最终只保留一个 `MATCH` 规则 |
| Geo 配置 | 脚本配置覆盖同名字段 |
| `proxies` | 仅在启用链式代理时追加出口节点副本 |

由于原有规则排在脚本规则之前，原配置中的同类规则可能优先命中。历史组名 `💱 交易所` 会自动归一为 `💹 交易所`，避免同一业务出现两个策略组。修改分流行为时，先检查原订阅已有规则，别把规则顺序当摆设。

## 常见问题

### 地区组为空或缺失

节点名称必须包含可识别的地区关键词，例如 `HK`、`JP`、`US`、`Singapore`。静态节点没有匹配项时，对应地区组不会创建。

### 没有生成链式代理

依次检查：

1. 是否存在静态 `proxies`；
2. `enableChainProxy` 是否为 `true`；
3. `chainProxyNamePattern` 是否能匹配节点名称；
4. 候选节点数是否超过 `maxChainProxyCount`。

### 远程规则集无法下载

脚本已将所有 GitHub Raw、Release 与 Geo 数据 URL 改写为 `https://gh-proxy.com/<原始 GitHub URL>`，用于规避部分国内网络对 GitHub 的间歇性阻断；无需额外设置代理组。

- 代理前缀集中在 `clash_party_rule.js` 的 `githubProxyPrefix`。若你有自建 GitHub 代理，替换该值即可，且末尾必须保留 `/`。
- 这是第三方转发服务，能看到下载请求；不要用它下载私有仓库或任何带令牌的 URL。需要更强的可信度时应使用自建代理。
- 若规则仍无法更新，先在浏览器访问 `https://gh-proxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs`，再检查客户端日志。
- Mihomo 内核仍须支持 `mrs` 格式规则集。

## 自定义入口

常见修改位置都在 [`clash_party_rule.js`](./clash_party_rule.js)：

- `rules`：分流规则及顺序
- `dnsConfig`：DNS 行为
- `ruleProviders`：远程规则集
- `regionKeywords`：地区识别
- `ruleGroupNames` / `ruleGroupDefaults`：业务组及默认策略
- `defaultScriptOptions`：链式代理默认参数

修改前先弄清规则优先级和策略组引用关系。能运行不等于配置正确。
