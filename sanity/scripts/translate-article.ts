#!/usr/bin/env npx ts-node
/**
 * 文章自动翻译脚本
 *
 * 用法：
 *   npx ts-node scripts/translate-article.ts <article-id>   # 翻译单篇文章
 *   npx ts-node scripts/translate-article.ts --all           # 翻译所有未翻译文章
 *
 * 环境变量 (.env.local)：
 *   OPENAI_API_KEY=sk-xxx
 *   SANITY_PROJECT_ID=m2e07kon
 *   SANITY_DATASET=production
 *   SANITY_API_TOKEN=skXXX...   (需要 Editor 权限)
 */

import 'dotenv/config'
import OpenAI from 'openai'
import { createClient } from '@sanity/client'

// ── 配置 ────────────────────────────────────────────────────────────────────
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL  // 自定义接口地址（可选）
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'm2e07kon'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN

if (!OPENAI_API_KEY) {
    console.error('❌ 缺少 OPENAI_API_KEY，请在 .env.local 中配置')
    process.exit(1)
}
if (!SANITY_API_TOKEN) {
    console.error('❌ 缺少 SANITY_API_TOKEN，请在 .env.local 中配置')
    process.exit(1)
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    ...(OPENAI_BASE_URL ? { baseURL: OPENAI_BASE_URL } : {}),
})

const sanity = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    token: SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// ── 目标语言 ────────────────────────────────────────────────────────────────
const TARGET_LANGUAGES: { code: string; name: string }[] = [
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
]

// ── 辅助函数：提取 Portable Text 中的纯文字 ─────────────────────────────────
function portableTextToPlain(blocks: any[]): string {
    if (!blocks) return ''
    return blocks
        .filter((b: any) => b._type === 'block')
        .map((b: any) =>
            (b.children || []).map((c: any) => c.text || '').join('')
        )
        .join('\n\n')
}

// ── 辅助函数：将翻译后的文本转回 Portable Text ───────────────────────────────
function plainToPortableText(text: string, originalBlocks: any[]): any[] {
    const paragraphs = text.split(/\n\n+/).filter(Boolean)
    // 保留原有 block 的 markDefs / style 结构，只替换文本
    return paragraphs.map((para, i) => {
        const original = originalBlocks?.find((b: any) => b._type === 'block')
        return {
            _type: 'block',
            _key: `translated_${i}`,
            style: original?.style || 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: `span_${i}`, text: para, marks: [] }],
        }
    })
}

// ── 核心翻译函数 ─────────────────────────────────────────────────────────────
async function translateText(text: string, targetLanguage: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
            {
                role: 'system',
                content: `You are a professional translator for B2B industrial content. 
Translate the following text from English to ${targetLanguage}. 
Rules:
- Keep product names (PPR, PEX, HDPE, IFAN) as-is
- Maintain technical terminology
- Preserve paragraph structure
- Return ONLY the translated text, no explanations`,
            },
            { role: 'user', content: text },
        ],
        temperature: 0.3,
    })
    return response.choices[0]?.message?.content?.trim() || ''
}

// ── 翻译单篇文章 ─────────────────────────────────────────────────────────────
async function translateArticle(articleId: string) {
    console.log(`\n📄 正在获取文章: ${articleId}`)

    const article = await sanity.fetch(
        `*[_type == "article" && _id == $id][0]{
            _id, title, body, translations
        }`,
        { id: articleId }
    )

    if (!article) {
        console.error(`❌ 找不到文章 ID: ${articleId}`)
        return
    }

    console.log(`📝 标题: ${article.title}`)

    const bodyPlain = portableTextToPlain(article.body || [])
    const translations: Record<string, any> = {}

    for (const lang of TARGET_LANGUAGES) {
        // 如果已有翻译则跳过
        if (article.translations?.[lang.code]?.title) {
            console.log(`⏭  ${lang.code.toUpperCase()} 已有翻译，跳过`)
            translations[lang.code] = article.translations[lang.code]
            continue
        }

        console.log(`🔄 翻译为 ${lang.name} (${lang.code.toUpperCase()})...`)

        const [translatedTitle, translatedBody] = await Promise.all([
            translateText(article.title, lang.name),
            bodyPlain ? translateText(bodyPlain, lang.name) : Promise.resolve(''),
        ])

        translations[lang.code] = {
            title: translatedTitle,
            body: translatedBody ? plainToPortableText(translatedBody, article.body) : [],
        }

        console.log(`  ✅ ${lang.code.toUpperCase()} 完成: "${translatedTitle}"`)
    }

    // 写回 Sanity
    await sanity
        .patch(article._id)
        .set({ translations })
        .commit()

    console.log(`\n🎉 文章翻译完成，已保存到 Sanity！`)
}

// ── 翻译所有未翻译文章 ───────────────────────────────────────────────────────
async function translateAllArticles() {
    const articles = await sanity.fetch(
        `*[_type == "article" && !defined(translations.es.title)]{_id, title}`
    )

    if (articles.length === 0) {
        console.log('✅ 所有文章都已翻译完毕！')
        return
    }

    console.log(`📚 找到 ${articles.length} 篇未翻译的文章`)

    for (const article of articles) {
        await translateArticle(article._id)
        // 避免 API 限速
        await new Promise(r => setTimeout(r, 1000))
    }

    console.log('\n🎉 全部翻译完成！')
}

// ── 主入口 ───────────────────────────────────────────────────────────────────
async function main() {
    const args = process.argv.slice(2)

    if (args.length === 0) {
        console.log(`
翻译脚本使用方法：

  # 翻译单篇文章（传入 Sanity 文档 ID）
  npx ts-node scripts/translate-article.ts <article-id>

  # 翻译所有未翻译的文章
  npx ts-node scripts/translate-article.ts --all
`)
        process.exit(0)
    }

    if (args[0] === '--all') {
        await translateAllArticles()
    } else {
        await translateArticle(args[0])
    }
}

main().catch(err => {
    console.error('❌ 脚本出错:', err.message)
    process.exit(1)
})
