// 官方网站声明页的数据层。
//
// 背景：搜 "IFAN official website" 时，谷歌和 AI 助手返回的是 ifanpiping.com——
// 因为至少 8 个站点同时声称自己属于「Zhuji Fengfan Piping Co., Ltd.」，
// AI 只能挑最老、外链最多的那个。这页的存在意义是给人和机器一个可引用的权威口径：
// 一个集团、一个官网、多个销售渠道。
//
// 域名表沿用支柱层 `verified` 那套约定：未经人工确认的条目不上线。
// 把一个其实与我方无关的第三方域名写成「我司业务员站」是不实陈述，
// 所以 confirmed 必须由人逐条打开，不要因为搜索引擎列出来了就默认 true。

import type { AppLocale } from "@/lib/seo";

export const OFFICIAL_DOMAIN = "www.ifanholding.com";
export const OFFICIAL_URL = "https://www.ifanholding.com";
export const LEGAL_ENTITY = "Zhuji Fengfan Piping Co., Ltd.";
export const HEAD_OFFICE_EMAIL = "ifanholding@gmail.com";

// 声明生效日期。写死而不是 new Date()：这是一份法律性质的声明，
// 生效日必须稳定，不能每次构建都变成「今天」。
export const STATEMENT_EFFECTIVE_DATE = "2026-08-24";

export type DomainEntry = {
    domain: string;
    /** official = 集团官网；rep = 业务员/区域伙伴自建站 */
    role: "official" | "rep";
    /**
     * 人工确认开关。false 的条目不渲染、不进 FAQ、不进 schema。
     * 打开前必须核实：这个域名确实由 IFAN 业务员或区域伙伴运营。
     */
    confirmed: boolean;
};

export const DOMAIN_REGISTRY: DomainEntry[] = [
    { domain: "www.ifanholding.com", role: "official", confirmed: true },

    // —— 以下为业务员 / 区域伙伴自建站 ——
    // confirmed: true 的两个是已核实条目。
    { domain: "ifanpiping.com", role: "rep", confirmed: true },
    { domain: "ifanplus.com", role: "rep", confirmed: true },

    // 待确认：搜索结果里出现、引用同一法人主体，但尚未逐一核实运营方。
    // 确认「确由我方业务员/区域伙伴运营」后再把 confirmed 改成 true。
    { domain: "ifanplumbing.com", role: "rep", confirmed: false },
    { domain: "ifan-plast.com", role: "rep", confirmed: false },
    { domain: "ifan-solution.com", role: "rep", confirmed: false },
    { domain: "ifan-solutions.com", role: "rep", confirmed: false },
    { domain: "ifanpro.com", role: "rep", confirmed: false },
    { domain: "waterpipefactory.com", role: "rep", confirmed: false },
];

export const VISIBLE_DOMAINS = DOMAIN_REGISTRY.filter((d) => d.confirmed);
export const REP_DOMAINS = VISIBLE_DOMAINS.filter((d) => d.role === "rep");

/** 官方账号。与 schema.ts 的 Organization.sameAs 必须保持一致——
 *  页面上可见的清单和结构化数据对不上，等于自己削弱自己的消歧信号。 */
export const OFFICIAL_CHANNELS = [
    { label: "YouTube", url: "https://www.youtube.com/@IFANGroup-plumbing" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/99164793/" },
    { label: "Facebook", url: "https://www.facebook.com/IFANPlus13656666030" },
];

export const GROUP_BRANDS = ["IFAN", "IFANPLUS", "IFANPRO", "IFANNova", "IFANUltra"];

type Faq = { q: string; a: string };
type Step = { title: string; body: string };

export type OfficialSiteCopy = {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    eyebrow: string;
    h1: string;
    lede: string;
    statementTitle: string;
    statement: string[];
    whyTitle: string;
    whyBody: string[];
    registryTitle: string;
    registryIntro: string;
    colDomain: string;
    colRole: string;
    roleOfficial: string;
    roleRep: string;
    registryFootnote: string;
    verifyTitle: string;
    verifyIntro: string;
    verifySteps: Step[];
    channelsTitle: string;
    channelsIntro: string;
    buyersTitle: string;
    buyersBody: string[];
    faqTitle: string;
    faqs: Faq[];
    effectiveLabel: string;
    contactCta: string;
    contactHref: string;
};

const en: OfficialSiteCopy = {
    metaTitle: "Official Website of IFAN Group — ifanholding.com",
    metaDescription:
        "www.ifanholding.com is the official corporate website of IFAN Group (Zhuji Fengfan Piping Co., Ltd.) and the only domain printed on IFAN product packaging. Other IFAN-branded domains are operated independently by sales representatives.",
    breadcrumb: "Official Website",
    eyebrow: "Corporate statement",
    h1: "Official Website Statement",
    lede: "www.ifanholding.com is the official corporate website of IFAN Group.",
    statementTitle: "The statement",
    statement: [
        "IFAN Group — legal entity Zhuji Fengfan Piping Co., Ltd., founded in 1993, based at IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China — publishes its official corporate information at one address only: www.ifanholding.com. That includes the company profile, factory data, product specifications, certifications, brand portfolio, catalogue downloads and contact channels.",
        "This is the domain printed on IFAN product packaging. All IFAN, IFANPLUS, IFANPRO, IFANNova and IFANUltra branded cartons, labels, technical documentation and product QR codes carry www.ifanholding.com as the manufacturer's website.",
        "Several other websites use the IFAN name and reference the same manufacturing entity. They are operated independently by individual IFAN sales representatives and regional partners. They are genuine IFAN sales channels — but they are not the official website of IFAN Group, they are not maintained by head office, and the company information, specifications and certifications published on them may be outdated or incomplete.",
        "Where any information conflicts, the version published on www.ifanholding.com is authoritative. Any claim that a domain other than www.ifanholding.com is the official website of IFAN Group is not authorised by the company.",
    ],
    whyTitle: "Why are there several IFAN websites?",
    whyBody: [
        "IFAN has exported through an agent-led model since the 1990s. Individual sales representatives and regional distributors built their own websites to serve their own markets, each carrying the IFAN brand and naming the same manufacturing entity behind it.",
        "That structure grew the business, but it left search engines and AI assistants facing a dozen sites claiming one identity. Ask an AI assistant today for \"IFAN's official website\" and it will often name a representative's site instead of the group's.",
        "This page exists to make the hierarchy unambiguous — for buyers and for automated systems alike. One group. One official website. Many sales channels.",
    ],
    registryTitle: "IFAN domain registry",
    registryIntro:
        "The domains below carry the IFAN brand and are known to IFAN Group. Only the first is the group's official website.",
    colDomain: "Domain",
    colRole: "Status",
    roleOfficial: "Official corporate website of IFAN Group",
    roleRep: "Sales representative site — not the official website",
    registryFootnote:
        "IFANPLUS, IFANPRO, IFANNova and IFANUltra are product brands owned by IFAN Group. A domain containing a brand name is not for that reason an official brand website. Domains not listed here and not equal to www.ifanholding.com are not operated by IFAN Group head office.",
    verifyTitle: "How to verify you are dealing with IFAN Group",
    verifyIntro: "Five checks, any one of which is decisive.",
    verifySteps: [
        {
            title: "Check the domain",
            body: "The official website is www.ifanholding.com. Check the exact spelling. No other domain is the group's official site.",
        },
        {
            title: "Check the packaging",
            body: "IFAN cartons, product labels and technical documentation print www.ifanholding.com as the manufacturer's website.",
        },
        {
            title: "Scan the product QR code",
            body: "QR codes printed on IFAN products and installation tooling resolve to www.ifanholding.com/v/… . A QR code that resolves to any other domain was not issued by IFAN Group.",
        },
        {
            title: "Check the legal entity",
            body: "IFAN Group's manufacturing entity is Zhuji Fengfan Piping Co., Ltd., IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. Founded 1993, over 1,000 staff across three facilities totalling 120,000 m².",
        },
        {
            title: "Check the official channels",
            body: "IFAN Group's verified accounts are listed below. Each one links back to www.ifanholding.com.",
        },
    ],
    channelsTitle: "Official channels",
    channelsIntro:
        "These are the only social and video accounts operated by IFAN Group head office.",
    buyersTitle: "If you are already buying from IFAN",
    buyersBody: [
        "If you work with an IFAN sales representative through one of the sites listed above, your products are genuine IFAN products from the same factory. You do not need to change your contact.",
        "What changes is where the authoritative information lives. For current specifications, certificate copies, catalogue downloads, factory data and warranty terms, use www.ifanholding.com.",
        "If you want an order, a quotation or a supplier contact verified by head office, email ifanholding@gmail.com and we will confirm it in writing.",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
        {
            q: "What is the official website of IFAN Group?",
            a: "The official website of IFAN Group is www.ifanholding.com. It is operated by IFAN Group head office — legal entity Zhuji Fengfan Piping Co., Ltd. — and it is the domain printed on IFAN product packaging and product QR codes.",
        },
        {
            q: "Is ifanpiping.com the official IFAN website?",
            a: "No. ifanpiping.com is operated independently by an IFAN sales representative. It is a genuine IFAN sales channel, but it is not the official website of IFAN Group and it is not maintained by head office. The official website of IFAN Group is www.ifanholding.com.",
        },
        {
            q: "Is ifanplus.com the official IFAN website?",
            a: "No. IFANPLUS is a product brand owned by IFAN Group, but the domain ifanplus.com is operated independently by an IFAN sales representative and is not the group's official website. The official website of IFAN Group, including for the IFANPLUS brand, is www.ifanholding.com.",
        },
        {
            q: "Which website is printed on IFAN product packaging?",
            a: "www.ifanholding.com. All IFAN, IFANPLUS, IFANPRO, IFANNova and IFANUltra branded cartons, labels and technical documentation print www.ifanholding.com as the manufacturer's website, and product QR codes resolve to www.ifanholding.com/v/… .",
        },
        {
            q: "Are products sold through the other IFAN websites genuine?",
            a: "Yes. Those sites are operated by IFAN sales representatives and the goods come from the same factory in Zhuji, Zhejiang. What they are not is authoritative: the specifications, certifications and company information published on them are not maintained by IFAN Group head office and may be outdated. Verify against www.ifanholding.com.",
        },
        {
            q: "Who is the legal manufacturer behind the IFAN brand?",
            a: "Zhuji Fengfan Piping Co., Ltd., founded in 1993 and located at IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. It manufactures PPR, PVC, CPVC, PPSU, HDPE, PEX and PE-RT pipes and fittings, brass fittings and brass valves, and exports to more than 120 countries.",
        },
        {
            q: "Which brands belong to IFAN Group?",
            a: "IFAN, IFANPLUS, IFANPRO, IFANNova and IFANUltra. All five are product brands owned by IFAN Group and manufactured by Zhuji Fengfan Piping Co., Ltd. All five are represented officially at www.ifanholding.com.",
        },
        {
            q: "How do I verify an IFAN supplier or an IFAN product?",
            a: "Scan the QR code on the product or its packaging — it must resolve to www.ifanholding.com/v/… . For a supplier, an order or a quotation, email IFAN Group head office at ifanholding@gmail.com and we will confirm in writing whether the contact is one of our representatives.",
        },
    ],
    effectiveLabel: "Effective from",
    contactCta: "Verify with head office",
    contactHref: "/contact",
};

const es: OfficialSiteCopy = {
    metaTitle: "Sitio web oficial de IFAN Group — ifanholding.com",
    metaDescription:
        "www.ifanholding.com es el sitio web corporativo oficial de IFAN Group (Zhuji Fengfan Piping Co., Ltd.) y el único dominio impreso en el embalaje de los productos IFAN. Otros dominios con la marca IFAN son gestionados de forma independiente por representantes de ventas.",
    breadcrumb: "Sitio web oficial",
    eyebrow: "Declaración corporativa",
    h1: "Declaración de sitio web oficial",
    lede: "www.ifanholding.com es el sitio web corporativo oficial de IFAN Group.",
    statementTitle: "La declaración",
    statement: [
        "IFAN Group — entidad jurídica Zhuji Fengfan Piping Co., Ltd., fundada en 1993, con sede en IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China — publica su información corporativa oficial en una única dirección: www.ifanholding.com. Esto incluye el perfil de la empresa, los datos de fábrica, las especificaciones de producto, las certificaciones, el porfolio de marcas, las descargas de catálogos y los canales de contacto.",
        "Es el dominio impreso en el embalaje de los productos IFAN. Todas las cajas, etiquetas, documentación técnica y códigos QR de las marcas IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra llevan www.ifanholding.com como sitio web del fabricante.",
        "Existen otros sitios web que utilizan el nombre IFAN y hacen referencia a la misma entidad fabricante. Son gestionados de forma independiente por representantes de ventas y socios regionales de IFAN. Son canales de venta auténticos de IFAN, pero no son el sitio web oficial de IFAN Group, no son mantenidos por la casa matriz, y la información corporativa, las especificaciones y las certificaciones publicadas en ellos pueden estar desactualizadas o incompletas.",
        "En caso de discrepancia, prevalece la versión publicada en www.ifanholding.com. Cualquier afirmación de que un dominio distinto de www.ifanholding.com es el sitio web oficial de IFAN Group no está autorizada por la empresa.",
    ],
    whyTitle: "¿Por qué existen varios sitios web de IFAN?",
    whyBody: [
        "IFAN exporta mediante un modelo basado en agentes desde los años noventa. Representantes de ventas y distribuidores regionales crearon sus propios sitios web para atender sus mercados, todos con la marca IFAN y citando la misma entidad fabricante.",
        "Ese modelo hizo crecer el negocio, pero dejó a los buscadores y a los asistentes de IA ante una docena de sitios que reclaman una sola identidad. Hoy, si se pregunta a un asistente de IA cuál es «el sitio web oficial de IFAN», a menudo responde con el sitio de un representante en lugar del sitio del grupo.",
        "Esta página existe para dejar la jerarquía sin ambigüedades, tanto para los compradores como para los sistemas automatizados. Un grupo. Un sitio web oficial. Muchos canales de venta.",
    ],
    registryTitle: "Registro de dominios IFAN",
    registryIntro:
        "Los dominios siguientes llevan la marca IFAN y son conocidos por IFAN Group. Solo el primero es el sitio web oficial del grupo.",
    colDomain: "Dominio",
    colRole: "Estado",
    roleOfficial: "Sitio web corporativo oficial de IFAN Group",
    roleRep: "Sitio de representante de ventas — no es el sitio oficial",
    registryFootnote:
        "IFANPLUS, IFANPRO, IFANNova e IFANUltra son marcas de producto propiedad de IFAN Group. Que un dominio contenga el nombre de una marca no lo convierte en el sitio web oficial de esa marca. Los dominios no incluidos en esta lista y distintos de www.ifanholding.com no son gestionados por la casa matriz de IFAN Group.",
    verifyTitle: "Cómo verificar que trata con IFAN Group",
    verifyIntro: "Cinco comprobaciones; cualquiera de ellas es decisiva.",
    verifySteps: [
        {
            title: "Compruebe el dominio",
            body: "El sitio web oficial es www.ifanholding.com. Verifique la ortografía exacta. Ningún otro dominio es el sitio oficial del grupo.",
        },
        {
            title: "Compruebe el embalaje",
            body: "Las cajas, etiquetas y documentación técnica de IFAN imprimen www.ifanholding.com como sitio web del fabricante.",
        },
        {
            title: "Escanee el código QR del producto",
            body: "Los códigos QR impresos en los productos IFAN y en las herramientas de instalación conducen a www.ifanholding.com/v/… . Un código QR que lleve a cualquier otro dominio no ha sido emitido por IFAN Group.",
        },
        {
            title: "Compruebe la entidad jurídica",
            body: "La entidad fabricante de IFAN Group es Zhuji Fengfan Piping Co., Ltd., IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. Fundada en 1993, más de 1.000 empleados en tres instalaciones que suman 120.000 m².",
        },
        {
            title: "Compruebe los canales oficiales",
            body: "Las cuentas verificadas de IFAN Group se enumeran a continuación. Todas enlazan de vuelta a www.ifanholding.com.",
        },
    ],
    channelsTitle: "Canales oficiales",
    channelsIntro:
        "Estas son las únicas cuentas sociales y de vídeo gestionadas por la casa matriz de IFAN Group.",
    buyersTitle: "Si ya compra a IFAN",
    buyersBody: [
        "Si trabaja con un representante de ventas de IFAN a través de alguno de los sitios listados arriba, sus productos son productos IFAN auténticos de la misma fábrica. No necesita cambiar de contacto.",
        "Lo que cambia es dónde reside la información autorizada. Para especificaciones vigentes, copias de certificados, descargas de catálogo, datos de fábrica y condiciones de garantía, utilice www.ifanholding.com.",
        "Si desea que la casa matriz verifique un pedido, una oferta o un contacto de proveedor, escriba a ifanholding@gmail.com y se lo confirmaremos por escrito.",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
        {
            q: "¿Cuál es el sitio web oficial de IFAN Group?",
            a: "El sitio web oficial de IFAN Group es www.ifanholding.com. Está gestionado por la casa matriz de IFAN Group — entidad jurídica Zhuji Fengfan Piping Co., Ltd. — y es el dominio impreso en el embalaje y en los códigos QR de los productos IFAN.",
        },
        {
            q: "¿Es ifanpiping.com el sitio web oficial de IFAN?",
            a: "No. ifanpiping.com es gestionado de forma independiente por un representante de ventas de IFAN. Es un canal de venta auténtico de IFAN, pero no es el sitio web oficial de IFAN Group ni es mantenido por la casa matriz. El sitio web oficial de IFAN Group es www.ifanholding.com.",
        },
        {
            q: "¿Es ifanplus.com el sitio web oficial de IFAN?",
            a: "No. IFANPLUS es una marca de producto propiedad de IFAN Group, pero el dominio ifanplus.com es gestionado de forma independiente por un representante de ventas y no es el sitio web oficial del grupo. El sitio web oficial de IFAN Group, también para la marca IFANPLUS, es www.ifanholding.com.",
        },
        {
            q: "¿Qué sitio web está impreso en el embalaje de los productos IFAN?",
            a: "www.ifanholding.com. Todas las cajas, etiquetas y documentación técnica de las marcas IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra imprimen www.ifanholding.com como sitio web del fabricante, y los códigos QR de producto conducen a www.ifanholding.com/v/… .",
        },
        {
            q: "¿Son auténticos los productos vendidos a través de los otros sitios web de IFAN?",
            a: "Sí. Esos sitios están gestionados por representantes de ventas de IFAN y la mercancía procede de la misma fábrica en Zhuji, Zhejiang. Lo que no son es autorizados: las especificaciones, certificaciones e información corporativa publicadas en ellos no son mantenidas por la casa matriz de IFAN Group y pueden estar desactualizadas. Verifíquelas en www.ifanholding.com.",
        },
        {
            q: "¿Quién es el fabricante legal detrás de la marca IFAN?",
            a: "Zhuji Fengfan Piping Co., Ltd., fundada en 1993 y ubicada en IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. Fabrica tuberías y accesorios de PPR, PVC, CPVC, PPSU, HDPE, PEX y PE-RT, accesorios de latón y válvulas de latón, y exporta a más de 120 países.",
        },
        {
            q: "¿Qué marcas pertenecen a IFAN Group?",
            a: "IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra. Las cinco son marcas de producto propiedad de IFAN Group y fabricadas por Zhuji Fengfan Piping Co., Ltd. Las cinco están representadas oficialmente en www.ifanholding.com.",
        },
        {
            q: "¿Cómo verifico un proveedor o un producto IFAN?",
            a: "Escanee el código QR del producto o de su embalaje: debe conducir a www.ifanholding.com/v/… . Para verificar un proveedor, un pedido o una oferta, escriba a la casa matriz de IFAN Group a ifanholding@gmail.com y le confirmaremos por escrito si el contacto es uno de nuestros representantes.",
        },
    ],
    effectiveLabel: "En vigor desde",
    contactCta: "Verificar con la casa matriz",
    contactHref: "/contact",
};

const pt: OfficialSiteCopy = {
    metaTitle: "Site oficial da IFAN Group — ifanholding.com",
    metaDescription:
        "www.ifanholding.com é o site corporativo oficial da IFAN Group (Zhuji Fengfan Piping Co., Ltd.) e o único domínio impresso nas embalagens dos produtos IFAN. Outros domínios com a marca IFAN são operados de forma independente por representantes comerciais.",
    breadcrumb: "Site oficial",
    eyebrow: "Declaração corporativa",
    h1: "Declaração de site oficial",
    lede: "www.ifanholding.com é o site corporativo oficial da IFAN Group.",
    statementTitle: "A declaração",
    statement: [
        "A IFAN Group — entidade jurídica Zhuji Fengfan Piping Co., Ltd., fundada em 1993, sediada no IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China — publica as suas informações corporativas oficiais num único endereço: www.ifanholding.com. Isso inclui o perfil da empresa, os dados de fábrica, as especificações de produto, as certificações, o portfólio de marcas, os downloads de catálogo e os canais de contacto.",
        "É o domínio impresso nas embalagens dos produtos IFAN. Todas as caixas, etiquetas, documentação técnica e códigos QR das marcas IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra trazem www.ifanholding.com como site do fabricante.",
        "Existem outros sites que utilizam o nome IFAN e referem a mesma entidade fabricante. São operados de forma independente por representantes comerciais e parceiros regionais da IFAN. São canais de venda genuínos da IFAN — mas não são o site oficial da IFAN Group, não são mantidos pela sede, e as informações corporativas, especificações e certificações neles publicadas podem estar desatualizadas ou incompletas.",
        "Em caso de divergência, prevalece a versão publicada em www.ifanholding.com. Qualquer afirmação de que um domínio diferente de www.ifanholding.com é o site oficial da IFAN Group não é autorizada pela empresa.",
    ],
    whyTitle: "Porque existem vários sites da IFAN?",
    whyBody: [
        "A IFAN exporta através de um modelo baseado em agentes desde a década de 1990. Representantes comerciais e distribuidores regionais construíram os seus próprios sites para servir os seus mercados, todos com a marca IFAN e citando a mesma entidade fabricante.",
        "Esse modelo fez crescer o negócio, mas deixou os motores de busca e os assistentes de IA perante uma dezena de sites a reivindicar uma única identidade. Hoje, se perguntar a um assistente de IA qual é «o site oficial da IFAN», ele indicará frequentemente o site de um representante em vez do site do grupo.",
        "Esta página existe para tornar a hierarquia inequívoca — tanto para compradores como para sistemas automatizados. Um grupo. Um site oficial. Muitos canais de venda.",
    ],
    registryTitle: "Registo de domínios IFAN",
    registryIntro:
        "Os domínios abaixo usam a marca IFAN e são conhecidos da IFAN Group. Apenas o primeiro é o site oficial do grupo.",
    colDomain: "Domínio",
    colRole: "Estado",
    roleOfficial: "Site corporativo oficial da IFAN Group",
    roleRep: "Site de representante comercial — não é o site oficial",
    registryFootnote:
        "IFANPLUS, IFANPRO, IFANNova e IFANUltra são marcas de produto pertencentes à IFAN Group. O facto de um domínio conter o nome de uma marca não o torna o site oficial dessa marca. Os domínios não listados aqui e diferentes de www.ifanholding.com não são operados pela sede da IFAN Group.",
    verifyTitle: "Como verificar que está a lidar com a IFAN Group",
    verifyIntro: "Cinco verificações; qualquer uma delas é decisiva.",
    verifySteps: [
        {
            title: "Verifique o domínio",
            body: "O site oficial é www.ifanholding.com. Confirme a grafia exata. Nenhum outro domínio é o site oficial do grupo.",
        },
        {
            title: "Verifique a embalagem",
            body: "As caixas, etiquetas e documentação técnica da IFAN imprimem www.ifanholding.com como site do fabricante.",
        },
        {
            title: "Leia o código QR do produto",
            body: "Os códigos QR impressos nos produtos IFAN e nas ferramentas de instalação conduzem a www.ifanholding.com/v/… . Um código QR que conduza a qualquer outro domínio não foi emitido pela IFAN Group.",
        },
        {
            title: "Verifique a entidade jurídica",
            body: "A entidade fabricante da IFAN Group é a Zhuji Fengfan Piping Co., Ltd., IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. Fundada em 1993, mais de 1.000 colaboradores em três instalações que totalizam 120.000 m².",
        },
        {
            title: "Verifique os canais oficiais",
            body: "As contas verificadas da IFAN Group estão listadas abaixo. Todas ligam de volta a www.ifanholding.com.",
        },
    ],
    channelsTitle: "Canais oficiais",
    channelsIntro:
        "Estas são as únicas contas sociais e de vídeo operadas pela sede da IFAN Group.",
    buyersTitle: "Se já compra à IFAN",
    buyersBody: [
        "Se trabalha com um representante comercial da IFAN através de um dos sites listados acima, os seus produtos são produtos IFAN genuínos, da mesma fábrica. Não precisa de mudar de contacto.",
        "O que muda é onde reside a informação autorizada. Para especificações atuais, cópias de certificados, downloads de catálogo, dados de fábrica e condições de garantia, utilize www.ifanholding.com.",
        "Se quiser que a sede verifique uma encomenda, uma proposta ou um contacto de fornecedor, escreva para ifanholding@gmail.com e confirmaremos por escrito.",
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
        {
            q: "Qual é o site oficial da IFAN Group?",
            a: "O site oficial da IFAN Group é www.ifanholding.com. É operado pela sede da IFAN Group — entidade jurídica Zhuji Fengfan Piping Co., Ltd. — e é o domínio impresso nas embalagens e nos códigos QR dos produtos IFAN.",
        },
        {
            q: "ifanpiping.com é o site oficial da IFAN?",
            a: "Não. O ifanpiping.com é operado de forma independente por um representante comercial da IFAN. É um canal de venda genuíno da IFAN, mas não é o site oficial da IFAN Group nem é mantido pela sede. O site oficial da IFAN Group é www.ifanholding.com.",
        },
        {
            q: "ifanplus.com é o site oficial da IFAN?",
            a: "Não. IFANPLUS é uma marca de produto pertencente à IFAN Group, mas o domínio ifanplus.com é operado de forma independente por um representante comercial e não é o site oficial do grupo. O site oficial da IFAN Group, incluindo para a marca IFANPLUS, é www.ifanholding.com.",
        },
        {
            q: "Que site está impresso nas embalagens dos produtos IFAN?",
            a: "www.ifanholding.com. Todas as caixas, etiquetas e documentação técnica das marcas IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra imprimem www.ifanholding.com como site do fabricante, e os códigos QR de produto conduzem a www.ifanholding.com/v/… .",
        },
        {
            q: "Os produtos vendidos através dos outros sites da IFAN são genuínos?",
            a: "Sim. Esses sites são operados por representantes comerciais da IFAN e a mercadoria vem da mesma fábrica em Zhuji, Zhejiang. O que não são é autorizados: as especificações, certificações e informações corporativas neles publicadas não são mantidas pela sede da IFAN Group e podem estar desatualizadas. Confirme em www.ifanholding.com.",
        },
        {
            q: "Quem é o fabricante legal por trás da marca IFAN?",
            a: "A Zhuji Fengfan Piping Co., Ltd., fundada em 1993 e localizada no IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, China. Fabrica tubos e acessórios em PPR, PVC, CPVC, PPSU, HDPE, PEX e PE-RT, acessórios de latão e válvulas de latão, e exporta para mais de 120 países.",
        },
        {
            q: "Que marcas pertencem à IFAN Group?",
            a: "IFAN, IFANPLUS, IFANPRO, IFANNova e IFANUltra. As cinco são marcas de produto pertencentes à IFAN Group e fabricadas pela Zhuji Fengfan Piping Co., Ltd. As cinco estão representadas oficialmente em www.ifanholding.com.",
        },
        {
            q: "Como verifico um fornecedor ou um produto IFAN?",
            a: "Leia o código QR do produto ou da embalagem: deve conduzir a www.ifanholding.com/v/… . Para verificar um fornecedor, uma encomenda ou uma proposta, escreva para a sede da IFAN Group, ifanholding@gmail.com, e confirmaremos por escrito se o contacto é um dos nossos representantes.",
        },
    ],
    effectiveLabel: "Em vigor desde",
    contactCta: "Verificar com a sede",
    contactHref: "/contact",
};

const ru: OfficialSiteCopy = {
    metaTitle: "Официальный сайт IFAN Group — ifanholding.com",
    metaDescription:
        "www.ifanholding.com — официальный корпоративный сайт IFAN Group (Zhuji Fengfan Piping Co., Ltd.) и единственный домен, напечатанный на упаковке продукции IFAN. Другие домены с брендом IFAN ведут торговые представители самостоятельно.",
    breadcrumb: "Официальный сайт",
    eyebrow: "Заявление компании",
    h1: "Заявление об официальном сайте",
    lede: "www.ifanholding.com — официальный корпоративный сайт IFAN Group.",
    statementTitle: "Заявление",
    statement: [
        "IFAN Group — юридическое лицо Zhuji Fengfan Piping Co., Ltd., основано в 1993 году, адрес: IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Китай — публикует официальную корпоративную информацию по одному-единственному адресу: www.ifanholding.com. Это профиль компании, данные о производстве, спецификации продукции, сертификаты, портфель брендов, каталоги для скачивания и контактные каналы.",
        "Именно этот домен печатается на упаковке продукции IFAN. На всех коробах, этикетках, технической документации и QR-кодах брендов IFAN, IFANPLUS, IFANPRO, IFANNova и IFANUltra в качестве сайта производителя указан www.ifanholding.com.",
        "Существует ряд других сайтов, использующих название IFAN и ссылающихся на то же юридическое лицо. Их самостоятельно ведут отдельные торговые представители и региональные партнёры IFAN. Это подлинные каналы продаж IFAN, но они не являются официальным сайтом IFAN Group, не поддерживаются головным офисом, а опубликованные на них сведения о компании, спецификации и сертификаты могут быть устаревшими или неполными.",
        "При любых расхождениях приоритет имеет версия, опубликованная на www.ifanholding.com. Любое утверждение о том, что официальным сайтом IFAN Group является домен, отличный от www.ifanholding.com, компанией не санкционировано.",
    ],
    whyTitle: "Почему существует несколько сайтов IFAN?",
    whyBody: [
        "IFAN экспортирует продукцию через агентскую модель с 1990-х годов. Торговые представители и региональные дистрибьюторы создавали собственные сайты для своих рынков — каждый с брендом IFAN и ссылкой на одно и то же производственное предприятие.",
        "Такая структура помогла бизнесу вырасти, но поисковые системы и ИИ-ассистенты столкнулись с десятком сайтов, претендующих на одну и ту же идентичность. Сегодня на вопрос «официальный сайт IFAN» ИИ-ассистент часто называет сайт представителя, а не сайт группы.",
        "Эта страница существует для того, чтобы иерархия была однозначной — и для покупателей, и для автоматизированных систем. Одна группа. Один официальный сайт. Много каналов продаж.",
    ],
    registryTitle: "Реестр доменов IFAN",
    registryIntro:
        "Перечисленные ниже домены используют бренд IFAN и известны IFAN Group. Официальным сайтом группы является только первый.",
    colDomain: "Домен",
    colRole: "Статус",
    roleOfficial: "Официальный корпоративный сайт IFAN Group",
    roleRep: "Сайт торгового представителя — не официальный сайт",
    registryFootnote:
        "IFANPLUS, IFANPRO, IFANNova и IFANUltra — товарные бренды, принадлежащие IFAN Group. Наличие названия бренда в домене не делает его официальным сайтом этого бренда. Домены, не указанные здесь и отличные от www.ifanholding.com, головным офисом IFAN Group не управляются.",
    verifyTitle: "Как убедиться, что вы имеете дело с IFAN Group",
    verifyIntro: "Пять проверок, любая из которых решающая.",
    verifySteps: [
        {
            title: "Проверьте домен",
            body: "Официальный сайт — www.ifanholding.com. Сверьте написание посимвольно. Никакой другой домен не является официальным сайтом группы.",
        },
        {
            title: "Проверьте упаковку",
            body: "На коробах, этикетках и технической документации IFAN в качестве сайта производителя напечатан www.ifanholding.com.",
        },
        {
            title: "Отсканируйте QR-код на изделии",
            body: "QR-коды на продукции IFAN и монтажном инструменте ведут на www.ifanholding.com/v/… . QR-код, ведущий на любой другой домен, выпущен не IFAN Group.",
        },
        {
            title: "Проверьте юридическое лицо",
            body: "Производственное предприятие IFAN Group — Zhuji Fengfan Piping Co., Ltd., IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Китай. Основано в 1993 году, свыше 1 000 сотрудников на трёх площадках общей площадью 120 000 м².",
        },
        {
            title: "Проверьте официальные каналы",
            body: "Подтверждённые аккаунты IFAN Group перечислены ниже. Каждый из них ссылается на www.ifanholding.com.",
        },
    ],
    channelsTitle: "Официальные каналы",
    channelsIntro:
        "Это единственные аккаунты в социальных сетях и видеосервисах, которыми управляет головной офис IFAN Group.",
    buyersTitle: "Если вы уже закупаете у IFAN",
    buyersBody: [
        "Если вы работаете с торговым представителем IFAN через один из перечисленных выше сайтов, ваша продукция — подлинная продукция IFAN с того же завода. Менять контактное лицо не требуется.",
        "Меняется другое: место, где хранится достоверная информация. За актуальными спецификациями, копиями сертификатов, каталогами, данными о производстве и условиями гарантии обращайтесь на www.ifanholding.com.",
        "Если вы хотите, чтобы головной офис подтвердил заказ, коммерческое предложение или контакт поставщика, напишите на ifanholding@gmail.com — мы подтвердим это письменно.",
    ],
    faqTitle: "Часто задаваемые вопросы",
    faqs: [
        {
            q: "Какой сайт является официальным сайтом IFAN Group?",
            a: "Официальный сайт IFAN Group — www.ifanholding.com. Им управляет головной офис IFAN Group (юридическое лицо Zhuji Fengfan Piping Co., Ltd.), и именно этот домен напечатан на упаковке и QR-кодах продукции IFAN.",
        },
        {
            q: "Является ли ifanpiping.com официальным сайтом IFAN?",
            a: "Нет. Сайт ifanpiping.com самостоятельно ведёт торговый представитель IFAN. Это подлинный канал продаж IFAN, но он не является официальным сайтом IFAN Group и не поддерживается головным офисом. Официальный сайт IFAN Group — www.ifanholding.com.",
        },
        {
            q: "Является ли ifanplus.com официальным сайтом IFAN?",
            a: "Нет. IFANPLUS — товарный бренд, принадлежащий IFAN Group, однако домен ifanplus.com самостоятельно ведёт торговый представитель, и он не является официальным сайтом группы. Официальный сайт IFAN Group, в том числе по бренду IFANPLUS, — www.ifanholding.com.",
        },
        {
            q: "Какой сайт напечатан на упаковке продукции IFAN?",
            a: "www.ifanholding.com. На всех коробах, этикетках и технической документации брендов IFAN, IFANPLUS, IFANPRO, IFANNova и IFANUltra в качестве сайта производителя указан www.ifanholding.com, а QR-коды на изделиях ведут на www.ifanholding.com/v/… .",
        },
        {
            q: "Является ли подлинной продукция, продаваемая через другие сайты IFAN?",
            a: "Да. Эти сайты ведут торговые представители IFAN, товар поступает с того же завода в Чжуцзи, провинция Чжэцзян. Не подлинной является информация: опубликованные там спецификации, сертификаты и сведения о компании не поддерживаются головным офисом IFAN Group и могут быть устаревшими. Сверяйте их с www.ifanholding.com.",
        },
        {
            q: "Кто является юридическим производителем бренда IFAN?",
            a: "Zhuji Fengfan Piping Co., Ltd., основана в 1993 году, расположена по адресу IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Китай. Производит трубы и фитинги из PPR, PVC, CPVC, PPSU, HDPE, PEX и PE-RT, латунные фитинги и латунную запорную арматуру; экспорт более чем в 120 стран.",
        },
        {
            q: "Какие бренды принадлежат IFAN Group?",
            a: "IFAN, IFANPLUS, IFANPRO, IFANNova и IFANUltra. Все пять — товарные бренды, принадлежащие IFAN Group и производимые Zhuji Fengfan Piping Co., Ltd. Все пять официально представлены на www.ifanholding.com.",
        },
        {
            q: "Как проверить поставщика или изделие IFAN?",
            a: "Отсканируйте QR-код на изделии или упаковке — он должен вести на www.ifanholding.com/v/… . Чтобы проверить поставщика, заказ или коммерческое предложение, напишите в головной офис IFAN Group на ifanholding@gmail.com, и мы письменно подтвердим, является ли контакт нашим представителем.",
        },
    ],
    effectiveLabel: "Действует с",
    contactCta: "Проверить в головном офисе",
    contactHref: "/contact",
};

const ar: OfficialSiteCopy = {
    metaTitle: "الموقع الرسمي لمجموعة IFAN — ifanholding.com",
    metaDescription:
        "www.ifanholding.com هو الموقع المؤسسي الرسمي لمجموعة IFAN (Zhuji Fengfan Piping Co., Ltd.) والنطاق الوحيد المطبوع على عبوات منتجات IFAN. أما النطاقات الأخرى التي تحمل علامة IFAN فيديرها مندوبو مبيعات بشكل مستقل.",
    breadcrumb: "الموقع الرسمي",
    eyebrow: "بيان مؤسسي",
    h1: "بيان الموقع الرسمي",
    lede: "www.ifanholding.com هو الموقع المؤسسي الرسمي لمجموعة IFAN.",
    statementTitle: "نص البيان",
    statement: [
        "تنشر مجموعة IFAN — الكيان القانوني Zhuji Fengfan Piping Co., Ltd.، التي تأسست عام 1993 ومقرها IFAN Industrial Park، بلدة ديانكو، مدينة تشوجي، مقاطعة تشجيانغ، الصين — معلوماتها المؤسسية الرسمية على عنوان واحد فقط: www.ifanholding.com. ويشمل ذلك نبذة الشركة وبيانات المصنع ومواصفات المنتجات والشهادات ومحفظة العلامات التجارية وملفات الكتالوجات وقنوات التواصل.",
        "وهذا هو النطاق المطبوع على عبوات منتجات IFAN. فجميع الكراتين والملصقات والوثائق الفنية ورموز الاستجابة السريعة الخاصة بعلامات IFAN وIFANPLUS وIFANPRO وIFANNova وIFANUltra تحمل www.ifanholding.com بوصفه موقع الشركة المصنِّعة.",
        "توجد مواقع أخرى تستخدم اسم IFAN وتشير إلى الكيان المصنِّع نفسه، ويديرها بشكل مستقل مندوبو مبيعات وشركاء إقليميون تابعون لـ IFAN. وهي قنوات بيع أصلية لـ IFAN، لكنها ليست الموقع الرسمي لمجموعة IFAN، ولا يتولى المكتب الرئيسي صيانتها، وقد تكون معلومات الشركة والمواصفات والشهادات المنشورة عليها قديمة أو ناقصة.",
        "وعند أي تعارض في المعلومات، تكون النسخة المنشورة على www.ifanholding.com هي المعتمدة. وأي ادعاء بأن نطاقًا غير www.ifanholding.com هو الموقع الرسمي لمجموعة IFAN هو ادعاء غير مصرَّح به من الشركة.",
    ],
    whyTitle: "لماذا توجد عدة مواقع لـ IFAN؟",
    whyBody: [
        "تصدّر IFAN منتجاتها عبر نموذج قائم على الوكلاء منذ تسعينيات القرن الماضي. فقد أنشأ مندوبو المبيعات والموزعون الإقليميون مواقعهم الخاصة لخدمة أسواقهم، وكلٌّ منها يحمل علامة IFAN ويشير إلى الكيان المصنِّع نفسه.",
        "هذا النموذج وسّع الأعمال، لكنه ترك محركات البحث ومساعدي الذكاء الاصطناعي أمام عشرات المواقع التي تدّعي هوية واحدة. واليوم، إذا سألت مساعد ذكاء اصطناعي عن «الموقع الرسمي لـ IFAN» فغالبًا ما يذكر موقع أحد المندوبين بدلًا من موقع المجموعة.",
        "وُجدت هذه الصفحة لجعل التسلسل واضحًا بلا لبس — للمشترين وللأنظمة الآلية على حد سواء. مجموعة واحدة. موقع رسمي واحد. قنوات بيع متعددة.",
    ],
    registryTitle: "سجل نطاقات IFAN",
    registryIntro:
        "النطاقات أدناه تحمل علامة IFAN ومعروفة لدى مجموعة IFAN. والأول منها فقط هو الموقع الرسمي للمجموعة.",
    colDomain: "النطاق",
    colRole: "الحالة",
    roleOfficial: "الموقع المؤسسي الرسمي لمجموعة IFAN",
    roleRep: "موقع مندوب مبيعات — ليس الموقع الرسمي",
    registryFootnote:
        "IFANPLUS وIFANPRO وIFANNova وIFANUltra علامات منتجات مملوكة لمجموعة IFAN. واحتواء النطاق على اسم علامة تجارية لا يجعله الموقع الرسمي لتلك العلامة. أما النطاقات غير المدرجة هنا والمختلفة عن www.ifanholding.com فلا يديرها المكتب الرئيسي لمجموعة IFAN.",
    verifyTitle: "كيف تتحقق من أنك تتعامل مع مجموعة IFAN",
    verifyIntro: "خمس عمليات تحقق، وأيٌّ منها حاسمة.",
    verifySteps: [
        {
            title: "تحقق من النطاق",
            body: "الموقع الرسمي هو www.ifanholding.com. تأكد من التهجئة حرفًا بحرف. لا يوجد نطاق آخر هو الموقع الرسمي للمجموعة.",
        },
        {
            title: "تحقق من العبوة",
            body: "تطبع كراتين IFAN وملصقات المنتجات والوثائق الفنية www.ifanholding.com بوصفه موقع الشركة المصنِّعة.",
        },
        {
            title: "امسح رمز QR على المنتج",
            body: "رموز QR المطبوعة على منتجات IFAN وأدوات التركيب تؤدي إلى www.ifanholding.com/v/… . وأي رمز QR يؤدي إلى نطاق آخر لم تصدره مجموعة IFAN.",
        },
        {
            title: "تحقق من الكيان القانوني",
            body: "الكيان المصنِّع لمجموعة IFAN هو Zhuji Fengfan Piping Co., Ltd.، IFAN Industrial Park، بلدة ديانكو، مدينة تشوجي، مقاطعة تشجيانغ، الصين. تأسست عام 1993، وتضم أكثر من 1000 موظف في ثلاثة مصانع بمساحة إجمالية 120,000 متر مربع.",
        },
        {
            title: "تحقق من القنوات الرسمية",
            body: "حسابات مجموعة IFAN الموثقة مدرجة أدناه، وكلٌّ منها يرتبط عائدًا إلى www.ifanholding.com.",
        },
    ],
    channelsTitle: "القنوات الرسمية",
    channelsIntro:
        "هذه هي حسابات التواصل الاجتماعي والفيديو الوحيدة التي يديرها المكتب الرئيسي لمجموعة IFAN.",
    buyersTitle: "إذا كنت تشتري بالفعل من IFAN",
    buyersBody: [
        "إذا كنت تتعامل مع مندوب مبيعات لـ IFAN عبر أحد المواقع المذكورة أعلاه، فمنتجاتك منتجات IFAN أصلية من المصنع نفسه، ولا حاجة إلى تغيير جهة الاتصال.",
        "ما يتغير هو مكان المعلومات المعتمدة. فللحصول على المواصفات الحالية ونسخ الشهادات وملفات الكتالوجات وبيانات المصنع وشروط الضمان، استخدم www.ifanholding.com.",
        "وإذا رغبت في أن يتحقق المكتب الرئيسي من طلب أو عرض سعر أو جهة اتصال مورِّد، راسلنا على ifanholding@gmail.com وسنؤكد ذلك كتابةً.",
    ],
    faqTitle: "الأسئلة الشائعة",
    faqs: [
        {
            q: "ما هو الموقع الرسمي لمجموعة IFAN؟",
            a: "الموقع الرسمي لمجموعة IFAN هو www.ifanholding.com. يديره المكتب الرئيسي لمجموعة IFAN — الكيان القانوني Zhuji Fengfan Piping Co., Ltd. — وهو النطاق المطبوع على عبوات منتجات IFAN ورموز QR الخاصة بها.",
        },
        {
            q: "هل ifanpiping.com هو الموقع الرسمي لـ IFAN؟",
            a: "لا. يدير ifanpiping.com بشكل مستقل أحد مندوبي مبيعات IFAN. وهو قناة بيع أصلية لـ IFAN، لكنه ليس الموقع الرسمي لمجموعة IFAN ولا يتولى المكتب الرئيسي صيانته. الموقع الرسمي لمجموعة IFAN هو www.ifanholding.com.",
        },
        {
            q: "هل ifanplus.com هو الموقع الرسمي لـ IFAN؟",
            a: "لا. IFANPLUS علامة منتجات مملوكة لمجموعة IFAN، لكن نطاق ifanplus.com يديره بشكل مستقل أحد مندوبي المبيعات وليس الموقع الرسمي للمجموعة. الموقع الرسمي لمجموعة IFAN، بما في ذلك علامة IFANPLUS، هو www.ifanholding.com.",
        },
        {
            q: "أي موقع مطبوع على عبوات منتجات IFAN؟",
            a: "www.ifanholding.com. جميع الكراتين والملصقات والوثائق الفنية لعلامات IFAN وIFANPLUS وIFANPRO وIFANNova وIFANUltra تطبع www.ifanholding.com بوصفه موقع الشركة المصنِّعة، ورموز QR على المنتجات تؤدي إلى www.ifanholding.com/v/… .",
        },
        {
            q: "هل المنتجات المباعة عبر مواقع IFAN الأخرى أصلية؟",
            a: "نعم. تدير تلك المواقع مندوبو مبيعات IFAN، والبضائع تأتي من المصنع نفسه في تشوجي بمقاطعة تشجيانغ. لكنها ليست مصدرًا معتمدًا للمعلومات: فالمواصفات والشهادات ومعلومات الشركة المنشورة عليها لا يتولى المكتب الرئيسي صيانتها وقد تكون قديمة. تحقق منها عبر www.ifanholding.com.",
        },
        {
            q: "من هي الجهة المصنِّعة القانونية وراء علامة IFAN؟",
            a: "Zhuji Fengfan Piping Co., Ltd.، تأسست عام 1993 وتقع في IFAN Industrial Park، بلدة ديانكو، مدينة تشوجي، مقاطعة تشجيانغ، الصين. تصنّع أنابيب ووصلات PPR وPVC وCPVC وPPSU وHDPE وPEX وPE-RT، ووصلات وصمامات نحاسية، وتصدّر إلى أكثر من 120 دولة.",
        },
        {
            q: "ما العلامات التجارية التابعة لمجموعة IFAN؟",
            a: "IFAN وIFANPLUS وIFANPRO وIFANNova وIFANUltra. جميعها علامات منتجات مملوكة لمجموعة IFAN ومصنَّعة بواسطة Zhuji Fengfan Piping Co., Ltd.، وجميعها ممثَّلة رسميًا على www.ifanholding.com.",
        },
        {
            q: "كيف أتحقق من مورِّد أو منتج من IFAN؟",
            a: "امسح رمز QR على المنتج أو عبوته — يجب أن يؤدي إلى www.ifanholding.com/v/… . وللتحقق من مورِّد أو طلب أو عرض سعر، راسل المكتب الرئيسي لمجموعة IFAN على ifanholding@gmail.com وسنؤكد كتابةً ما إذا كانت جهة الاتصال أحد مندوبينا.",
        },
    ],
    effectiveLabel: "ساري اعتبارًا من",
    contactCta: "التحقق عبر المكتب الرئيسي",
    contactHref: "/contact",
};

const fr: OfficialSiteCopy = {
    metaTitle: "Site officiel d'IFAN Group — ifanholding.com",
    metaDescription:
        "www.ifanholding.com est le site institutionnel officiel d'IFAN Group (Zhuji Fengfan Piping Co., Ltd.) et le seul domaine imprimé sur les emballages des produits IFAN. Les autres domaines portant la marque IFAN sont exploités de façon indépendante par des représentants commerciaux.",
    breadcrumb: "Site officiel",
    eyebrow: "Déclaration de l'entreprise",
    h1: "Déclaration de site officiel",
    lede: "www.ifanholding.com est le site institutionnel officiel d'IFAN Group.",
    statementTitle: "La déclaration",
    statement: [
        "IFAN Group — entité juridique Zhuji Fengfan Piping Co., Ltd., fondée en 1993, établie à IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Chine — publie ses informations institutionnelles officielles à une seule adresse : www.ifanholding.com. Cela comprend le profil de l'entreprise, les données d'usine, les spécifications produits, les certifications, le portefeuille de marques, les catalogues téléchargeables et les canaux de contact.",
        "C'est le domaine imprimé sur les emballages des produits IFAN. Tous les cartons, étiquettes, documents techniques et QR codes des marques IFAN, IFANPLUS, IFANPRO, IFANNova et IFANUltra portent www.ifanholding.com comme site du fabricant.",
        "Plusieurs autres sites utilisent le nom IFAN et renvoient à la même entité de fabrication. Ils sont exploités de façon indépendante par des représentants commerciaux et des partenaires régionaux d'IFAN. Ce sont de véritables canaux de vente IFAN, mais ce ne sont pas le site officiel d'IFAN Group, ils ne sont pas maintenus par le siège, et les informations d'entreprise, spécifications et certifications qui y figurent peuvent être obsolètes ou incomplètes.",
        "En cas de divergence, la version publiée sur www.ifanholding.com fait foi. Toute affirmation selon laquelle un domaine autre que www.ifanholding.com serait le site officiel d'IFAN Group n'est pas autorisée par l'entreprise.",
    ],
    whyTitle: "Pourquoi existe-t-il plusieurs sites IFAN ?",
    whyBody: [
        "IFAN exporte selon un modèle fondé sur les agents depuis les années 1990. Représentants commerciaux et distributeurs régionaux ont construit leurs propres sites pour servir leurs marchés, chacun portant la marque IFAN et citant la même entité de fabrication.",
        "Ce modèle a fait croître l'activité, mais il a laissé les moteurs de recherche et les assistants IA face à une dizaine de sites revendiquant une seule identité. Aujourd'hui, si l'on demande à un assistant IA « le site officiel d'IFAN », il cite souvent le site d'un représentant plutôt que celui du groupe.",
        "Cette page existe pour lever toute ambiguïté sur la hiérarchie — pour les acheteurs comme pour les systèmes automatisés. Un groupe. Un site officiel. De nombreux canaux de vente.",
    ],
    registryTitle: "Registre des domaines IFAN",
    registryIntro:
        "Les domaines ci-dessous portent la marque IFAN et sont connus d'IFAN Group. Seul le premier est le site officiel du groupe.",
    colDomain: "Domaine",
    colRole: "Statut",
    roleOfficial: "Site institutionnel officiel d'IFAN Group",
    roleRep: "Site de représentant commercial — pas le site officiel",
    registryFootnote:
        "IFANPLUS, IFANPRO, IFANNova et IFANUltra sont des marques de produits détenues par IFAN Group. Le fait qu'un domaine contienne un nom de marque n'en fait pas le site officiel de cette marque. Les domaines non listés ici et différents de www.ifanholding.com ne sont pas exploités par le siège d'IFAN Group.",
    verifyTitle: "Comment vérifier que vous traitez avec IFAN Group",
    verifyIntro: "Cinq vérifications ; chacune est décisive.",
    verifySteps: [
        {
            title: "Vérifiez le domaine",
            body: "Le site officiel est www.ifanholding.com. Vérifiez l'orthographe exacte. Aucun autre domaine n'est le site officiel du groupe.",
        },
        {
            title: "Vérifiez l'emballage",
            body: "Les cartons, étiquettes produits et documents techniques IFAN impriment www.ifanholding.com comme site du fabricant.",
        },
        {
            title: "Scannez le QR code du produit",
            body: "Les QR codes imprimés sur les produits IFAN et l'outillage de pose renvoient vers www.ifanholding.com/v/… . Un QR code renvoyant vers tout autre domaine n'a pas été émis par IFAN Group.",
        },
        {
            title: "Vérifiez l'entité juridique",
            body: "L'entité de fabrication d'IFAN Group est Zhuji Fengfan Piping Co., Ltd., IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Chine. Fondée en 1993, plus de 1 000 collaborateurs répartis sur trois sites totalisant 120 000 m².",
        },
        {
            title: "Vérifiez les canaux officiels",
            body: "Les comptes vérifiés d'IFAN Group sont listés ci-dessous. Chacun renvoie vers www.ifanholding.com.",
        },
    ],
    channelsTitle: "Canaux officiels",
    channelsIntro:
        "Ce sont les seuls comptes sociaux et vidéo exploités par le siège d'IFAN Group.",
    buyersTitle: "Si vous achetez déjà chez IFAN",
    buyersBody: [
        "Si vous travaillez avec un représentant commercial IFAN via l'un des sites listés ci-dessus, vos produits sont d'authentiques produits IFAN issus de la même usine. Vous n'avez pas à changer d'interlocuteur.",
        "Ce qui change, c'est l'endroit où se trouve l'information faisant foi. Pour les spécifications à jour, les copies de certificats, les catalogues, les données d'usine et les conditions de garantie, utilisez www.ifanholding.com.",
        "Si vous souhaitez qu'une commande, une offre ou un contact fournisseur soit vérifié par le siège, écrivez à ifanholding@gmail.com et nous vous le confirmerons par écrit.",
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
        {
            q: "Quel est le site officiel d'IFAN Group ?",
            a: "Le site officiel d'IFAN Group est www.ifanholding.com. Il est exploité par le siège d'IFAN Group — entité juridique Zhuji Fengfan Piping Co., Ltd. — et c'est le domaine imprimé sur les emballages et les QR codes des produits IFAN.",
        },
        {
            q: "ifanpiping.com est-il le site officiel d'IFAN ?",
            a: "Non. ifanpiping.com est exploité de façon indépendante par un représentant commercial IFAN. C'est un véritable canal de vente IFAN, mais ce n'est pas le site officiel d'IFAN Group et il n'est pas maintenu par le siège. Le site officiel d'IFAN Group est www.ifanholding.com.",
        },
        {
            q: "ifanplus.com est-il le site officiel d'IFAN ?",
            a: "Non. IFANPLUS est une marque de produits détenue par IFAN Group, mais le domaine ifanplus.com est exploité de façon indépendante par un représentant commercial et n'est pas le site officiel du groupe. Le site officiel d'IFAN Group, y compris pour la marque IFANPLUS, est www.ifanholding.com.",
        },
        {
            q: "Quel site est imprimé sur les emballages des produits IFAN ?",
            a: "www.ifanholding.com. Tous les cartons, étiquettes et documents techniques des marques IFAN, IFANPLUS, IFANPRO, IFANNova et IFANUltra impriment www.ifanholding.com comme site du fabricant, et les QR codes produits renvoient vers www.ifanholding.com/v/… .",
        },
        {
            q: "Les produits vendus via les autres sites IFAN sont-ils authentiques ?",
            a: "Oui. Ces sites sont exploités par des représentants commerciaux IFAN et la marchandise provient de la même usine à Zhuji, Zhejiang. Ce qu'ils ne sont pas, c'est une source faisant foi : les spécifications, certifications et informations d'entreprise qui y sont publiées ne sont pas maintenues par le siège d'IFAN Group et peuvent être obsolètes. Vérifiez-les sur www.ifanholding.com.",
        },
        {
            q: "Qui est le fabricant légal derrière la marque IFAN ?",
            a: "Zhuji Fengfan Piping Co., Ltd., fondée en 1993 et située à IFAN Industrial Park, Diankou Town, Zhuji, Zhejiang, Chine. Elle fabrique des tubes et raccords PPR, PVC, CPVC, PPSU, HDPE, PEX et PE-RT, des raccords en laiton et des robinets en laiton, et exporte vers plus de 120 pays.",
        },
        {
            q: "Quelles marques appartiennent à IFAN Group ?",
            a: "IFAN, IFANPLUS, IFANPRO, IFANNova et IFANUltra. Toutes cinq sont des marques de produits détenues par IFAN Group et fabriquées par Zhuji Fengfan Piping Co., Ltd. Toutes cinq sont officiellement représentées sur www.ifanholding.com.",
        },
        {
            q: "Comment vérifier un fournisseur ou un produit IFAN ?",
            a: "Scannez le QR code du produit ou de son emballage : il doit renvoyer vers www.ifanholding.com/v/… . Pour vérifier un fournisseur, une commande ou une offre, écrivez au siège d'IFAN Group à ifanholding@gmail.com et nous confirmerons par écrit si le contact est l'un de nos représentants.",
        },
    ],
    effectiveLabel: "En vigueur depuis le",
    contactCta: "Vérifier auprès du siège",
    contactHref: "/contact",
};

export const OFFICIAL_SITE_COPY: Record<AppLocale, OfficialSiteCopy> = {
    en,
    es,
    pt,
    ru,
    ar,
    fr,
};

export function getOfficialSiteCopy(locale: string): OfficialSiteCopy {
    return OFFICIAL_SITE_COPY[locale as AppLocale] ?? en;
}
