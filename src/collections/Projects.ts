import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'thumbnail',
      relationTo: 'media',
      type: 'upload',
      required: true,
    },
    {
      name: 'title',
      type: 'richText',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'github',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
        description: 'Used solely for ordering',
      },
      required: true,
    },
    lexicalHTML('title', { name: 'title_html' }),
    lexicalHTML('description', { name: 'description_html' }),
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('projects')
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('projects')
      },
    ],
  },
}
