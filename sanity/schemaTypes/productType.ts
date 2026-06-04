import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: '产品管理',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: '产品名称 / 型号',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: '唯一标识 (Slug)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'brand',
            title: '所属品牌',
            type: 'reference',
            to: [{ type: 'brand' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: '所属分类',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: '产品主图',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'images',
            title: '更多细节图',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'description',
            title: '产品描述',
            type: 'text',
        }),
        defineField({
            name: 'variants',
            title: '产品规格变体 (Sizes/SKUs)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'code', title: '产品代码 (Code)', type: 'string' },
                        { name: 'size', title: '尺寸规格 (Size)', type: 'string' },
                        { name: 'packing', title: '包装规格 (Packing)', type: 'string' },
                        { name: 'weight', title: '重量 (Weight G)', type: 'string' },
                        { name: 'volume', title: '体积 (Volume CBM)', type: 'string' },
                    ],
                },
            ],
            description: '用于聚合同一产品的不同尺寸型号。注意：严格禁止填写任何涉及价格的列，确保不留比价漏洞。',
        }),
        defineField({
            name: 'specifications',
            title: '技术参数 (用于大类对比)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: '参数名称', type: 'string' },
                        { name: 'value', title: '参数值', type: 'string' },
                    ],
                },
            ],
            description: '例如：材质: PPR, 压力: PN20。',
        }),
    ],
})
