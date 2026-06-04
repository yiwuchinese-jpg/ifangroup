import { defineField, defineType } from 'sanity'

export const articleType = defineType({
    name: 'article',
    title: '文章管理',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '文章标题 (英文)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: '唯一标识 (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: '作者',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: '封面图',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: '发布时间',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: '正文内容 (英文)',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
            ],
        }),
        // ── 适配 Evolution 301 及 SEO 相关字段 ──────────────────────────────
        defineField({ 
            name: 'htmlContent', 
            title: 'Raw HTML Content (301 Auto)', 
            type: 'text', 
            rows: 20,
            description: '从 Evolution 301 自动导入的原生带样式的HTML内容区'
        }),
        defineField({ 
            name: 'wordpressId', 
            title: 'WordPress ID (301 Sync)', 
            type: 'string',
            description: '保留由 Evolution 301 指定的一一关联重写用 ID' 
        }),
        defineField({ 
            name: 'wordpressMediaId', 
            title: 'WP Media ID (封面图)', 
            type: 'string',
            description: '封面图对应的 wordpressMediaId，冗余存储便于查询' 
        }),
        defineField({ 
            name: 'category', 
            title: '分类', 
            type: 'string',
            description: '文章分类名称（支持动态新增，不受 options.list 限制）'
        }),
        defineField({ 
            name: 'tags', 
            title: '标签', 
            type: 'string',
            description: '逗号分隔的标签列表'
        }),
        defineField({ 
            name: 'seoTitle', 
            title: 'SEO Title (301 Auto)', 
            type: 'string' 
        }),
        defineField({ 
            name: 'seoDescription', 
            title: 'SEO Description (301 Auto)', 
            type: 'text' 
        }),

        // ── 多语言翻译字段 ──────────────────────────────
        defineField({
            name: 'translations',
            title: '多语言翻译 (自动生成)',
            type: 'object',
            description: '通过运行翻译脚本自动填充，请勿手动编辑',
            fields: [
                // 西班牙语
                defineField({
                    name: 'es',
                    title: '🇪🇸 西班牙语',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: '标题', type: 'string' }),
                        defineField({
                            name: 'body', title: '正文', type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
                // 葡萄牙语
                defineField({
                    name: 'pt',
                    title: '🇧🇷 葡萄牙语',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: '标题', type: 'string' }),
                        defineField({
                            name: 'body', title: '正文', type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
                // 俄语
                defineField({
                    name: 'ru',
                    title: '🇷🇺 俄语',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: '标题', type: 'string' }),
                        defineField({
                            name: 'body', title: '正文', type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
                // 阿拉伯语
                defineField({
                    name: 'ar',
                    title: '🇸🇦 阿拉伯语',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: '标题', type: 'string' }),
                        defineField({
                            name: 'body', title: '正文', type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
                // 法语
                defineField({
                    name: 'fr',
                    title: '🇫🇷 法语',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: '标题', type: 'string' }),
                        defineField({
                            name: 'body', title: '正文', type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
            ],
        }),
    ],
})
