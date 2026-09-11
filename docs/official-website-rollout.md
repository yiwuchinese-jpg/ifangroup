# 官网身份收敛 · 落地手册

**问题**：至少 8 个站点在网上声称属于「Zhuji Fengfan Piping Co., Ltd.」。
搜索引擎和 AI 助手无法判断哪个是集团官网，默认挑最老、外链最多的 `ifanpiping.com`。

**目标**：让「IFAN 集团官网 = ifanholding.com」成为人和机器都能交叉验证的事实。

站内部分已完成（见本文档末尾「已上线」）。**决定成败的是站外部分——必须由你手动执行。**

---

## 一、给业务员站的粘贴包（优先级最高）

8 个站同时指认一个官网，是压倒性的信号，比站内做任何事都管用。
把下面两段发给每个站的负责人，要求原样粘贴。

### 1.1 页脚声明（粘到每个页面的页脚）

```html
<!-- IFAN Group official website notice -->
<p style="font-size:13px;line-height:1.6;color:#666;margin:16px 0;">
  This website is operated by an independent sales representative of IFAN Group.
  The official corporate website of IFAN Group (Zhuji Fengfan Piping Co., Ltd.) is
  <a href="https://www.ifanholding.com" rel="noopener">www.ifanholding.com</a>,
  which is also the website printed on IFAN product packaging.
  For official specifications, certifications and company information, see
  <a href="https://www.ifanholding.com/official-website" rel="noopener">www.ifanholding.com/official-website</a>.
</p>
```

**链接必须是普通 follow 链接，不要加 `nofollow`。** 我们要的就是这条链接传递的关联权重。

### 1.2 结构化数据（粘到每个页面的 `<head>`）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://REPLACE-WITH-THIS-SITE.com",
  "name": "IFAN — sales representative site",
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.ifanholding.com/#organization",
    "name": "IFAN Group",
    "legalName": "Zhuji Fengfan Piping Co., Ltd",
    "url": "https://www.ifanholding.com",
    "sameAs": ["https://www.ifanholding.com"]
  }
}
</script>
```

**这段里最关键的是 `"@id": "https://www.ifanholding.com/#organization"`。**
它告诉谷歌：这个站谈论的那个组织实体，其规范定义在 ifanholding.com 上。
8 个站都写这一句，等于把 8 个互相竞争的实体折叠成 1 个，指向你。

### 1.3 必须让他们删掉的东西

- 任何自称 "official website" / "official site" / "官网" 的措辞
- 自己站上 `Organization` 结构化数据里 `"name": "IFAN Group"` 配自己域名 `url` 的写法
  （改成上面 1.2 的 `WebSite` + `publisher` 形式）

### 1.4 域名确认清单 ⚠️ 上线前必须逐条核实

`src/lib/officialSite.ts` 的 `DOMAIN_REGISTRY` 里，`confirmed: false` 的条目**不会渲染**。
确认「确实由 IFAN 业务员或区域伙伴运营」后，再逐条改成 `true`：

| 域名 | 当前状态 | 需确认 |
|---|---|---|
| `ifanpiping.com` | ✅ 已上线 | — |
| `ifanplus.com` | ✅ 已上线 | — |
| `ifanplumbing.com` | ⬜ 待确认 | 运营方是谁？ |
| `ifan-plast.com` | ⬜ 待确认 | 运营方是谁？ |
| `ifan-solution.com` | ⬜ 待确认 | 运营方是谁？ |
| `ifan-solutions.com` | ⬜ 待确认 | 运营方是谁？ |
| `ifanpro.com` | ⬜ 待确认 | 运营方是谁？IFANPRO 是自有品牌，域名是否也是自己人？ |
| `waterpipefactory.com` | ⬜ 待确认 | 已知是兄弟站（别团队管），要不要公开列进去？ |

**不要因为搜索引擎列出来了就默认改 true。** 把一个其实与我方无关的第三方
写成「我司业务员站」是不实陈述，会带来真实的法律风险。

---

## 二、闭环 sameAs（本周就能做完，成本为零）

`sameAs` 只有**双向**才算强信号。现在站上声明了这三个账号，但账号那边没指回来：

| 平台 | 动作 | 状态 |
|---|---|---|
| YouTube `@IFANGroup-plumbing` | 频道简介 / 链接区填 `https://www.ifanholding.com` | ⬜ |
| LinkedIn `company/99164793` | 公司主页 Website 字段填 `https://www.ifanholding.com` | ⬜ |
| Facebook `IFANPlus13656666030` | 主页 Website 字段填 `https://www.ifanholding.com` | ⬜ |

改完之后，把这三个账号补进 `officialSite.ts` 的注释确认日期。

---

## 三、新增权威实体锚点（对 AI 影响最大）

按性价比排序：

1. **Wikidata 条目** ⬜
   给 IFAN Group 建条目，填属性 `P856 official website` = `https://www.ifanholding.com`。
   Wikidata 是几乎所有 LLM 训练与检索管线的实体源，一条 P856 顶得上几十条外链。
   同时填 `P1454 法人形式`、`P571 成立时间 1993`、`P159 总部 诸暨`。

2. **Google Business Profile** ⬜
   （`schema.ts` 里已标 TODO，方法论列为 P0。）
   网站字段填 ifanholding.com，地址与 schema 里的 PostalAddress 逐字一致。

3. **Alibaba 旺铺 / Made-in-China 店铺** ⬜
   注意：`ifanplus.en.made-in-china.com` 和 `ifanppr.en.made-in-china.com` 目前
   都挂着「Zhuji Fengfan Piping」。这两个店铺的公司简介里加一句官网声明，
   等于在 B2B 平台侧也做了消歧。

4. **产品包装 + 二维码** ⬜（你已在做）
   这是唯一无法被其他站复制的线下证据。包装印 `www.ifanholding.com`，
   二维码走已有的 `/v/[code]` 路由。
   ⚠️ `qrVideos.ts` 里的 code **永不可改名删除**——码已印在实体产品上。

---

## 四、提交与追踪（你手动执行，我不代操作）

### 4.1 提交给 GSC 的 URL 清单

发布后在 Search Console 用 URL 检查工具逐条 Request Indexing：

```
https://www.ifanholding.com/official-website
https://www.ifanholding.com/es/official-website
https://www.ifanholding.com/pt/official-website
https://www.ifanholding.com/ru/official-website
https://www.ifanholding.com/ar/official-website
https://www.ifanholding.com/fr/official-website
https://www.ifanholding.com/
```

首页也要重提——它的 JSON-LD 这次改了（孤儿实体节点已合并）。

### 4.2 效果怎么看

不要看排名，看 **AI 答案本身**。每隔几周用这几句原话问一遍
ChatGPT / Gemini / Perplexity / Google AI Overview：

- "What is the official website of IFAN Group?"
- "Is ifanpiping.com the official IFAN website?"
- "IFAN PPR pipe manufacturer official site"

记录哪个域名被点名。这类实体认知的收敛周期通常是 **1–3 个月**，
且和「有多少个外部来源指认同一个答案」强相关——所以第一节的业务员站
粘贴包做没做，直接决定这件事要 1 个月还是 1 年。

---

## 已上线（站内）

| 改动 | 文件 |
|---|---|
| 六语言官方声明页（含可见 FAQ + 域名对照表 + 验证五步） | `src/app/[locale]/official-website/page.tsx` |
| 六语言文案与域名注册表（`confirmed` 开关） | `src/lib/officialSite.ts` |
| Organization 节点收敛：抽出 `organizationNode()`，新增 `buildOfficialSiteSchema()`，补 `subjectOf` | `src/lib/schema.ts` |
| 首页孤儿 `ManufacturingBusiness` 节点删除，改走共用 `#organization` | `src/app/[locale]/page.tsx` |
| 员工数全站统一 1000（此前首页 1000+ / schema 600 / 业务员站 610 三处打架） | `src/lib/schema.ts` |
| 页脚全站入口 | `src/components/layout/Footer.tsx` + `messages/*.json` |
| sitemap 收录（priority 0.9，对齐 about-us） | `src/app/sitemap.ts` |

`proxy.ts` 无需改动：`/official-website` 在 `[locale]` 段内，中间件默认就会处理。
