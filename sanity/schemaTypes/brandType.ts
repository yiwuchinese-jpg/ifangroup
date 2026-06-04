import { defineField, defineType } from 'sanity'

export const brandType = defineType({
    name: 'brand',
    title: '品牌管理',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: '品牌名称',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'series',
            title: '所属系列/地区',
            type: 'string',
            description: '例如：德国系列、意大利系列、IFAN官方系列。',
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
            name: 'logo',
            title: '品牌 Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroImage',
            title: '品牌首图 (Hero Image)',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: '品牌单页顶部的全屏大图。建议尺寸：1920x1080',
        }),
        defineField({
            name: 'description',
            title: '品牌介绍',
            type: 'text',
            description: '简要介绍品牌的市场定位。',
        }),
        defineField({
            name: 'coverImage',
            title: '包装/物料展示图',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'advantages',
            title: '核心优势',
            type: 'array',
            of: [{ type: 'string' }],
            description: '列出关键卖点（例如：欧洲标准、高压耐用）。',
        }),
        defineField({
            name: 'externalUrl',
            title: '官网外部链接',
            type: 'url',
            description: '该品牌独立站的链接。',
        }),
        defineField({
            name: 'packaging3dModel',
            title: '3D 包装展示模型 (GLB/GLTF)',
            type: 'file',
            options: {
                accept: '.glb,.gltf',
            },
            description: '请上传此品牌的包装盒 3D 模型文件 (.glb 格式推荐)。',
        }),
        defineField({
            name: 'packagingMaterials',
            title: '包装图片',
            type: 'array',
            of: [{ type: 'image' }],
            description: '品牌包装物料图片合集',
        }),
        defineField({
            name: 'marketingMaterials',
            title: '宣传物料图片',
            type: 'array',
            of: [{ type: 'image' }],
            description: '品牌宣传物料图片合集',
        }),
    ],
})
