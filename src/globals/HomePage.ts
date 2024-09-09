import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    lexicalHTML('body', { name: 'body_html' }),
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('home')
      },
    ],
  },
}
