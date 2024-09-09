import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { HTMLConverterFeature, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
// import sharp from 'sharp'

import { HomePage } from './globals/HomePage'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'

import { s3Storage } from '@payloadcms/storage-s3'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  globals: [HomePage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // The HTMLConverter Feature is the feature which manages the HTML serializers.
      // If you do not pass any arguments to it, it will use the default serializers.
      HTMLConverterFeature({}),
      LinkFeature({
        // Example showing how to customize the built-in fields
        // of the Link feature
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'custom-css-classes',
            type: 'text',
            defaultValue: '',
          },
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
  }),
  // sharp,
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || '',
    defaultFromName: process.env.RESEND_FROM_NAME || '',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB, written in bytes
    },
  },
  plugins: [
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
    }),
  ],
})
