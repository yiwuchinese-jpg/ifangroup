import { defineField, defineType } from 'sanity'

export const subscriberType = defineType({
    name: 'subscriber',
    title: 'Subscriber',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'subscribedAt',
            title: 'Subscribed At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }),
        defineField({
            name: 'source',
            title: 'Signup Source',
            type: 'string',
            initialValue: 'Footer Newsletter',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Unsubscribed', value: 'unsubscribed' }
                ],
            },
            initialValue: 'active',
        })
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'subscribedAt',
        },
    },
})
