import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: '分类管理',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '分类标题',
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
            name: 'description',
            title: '分类描述',
            type: 'text',
        }),
    ],
})
