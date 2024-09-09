import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  //
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_S3_URL_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_S3_URL_HOSTNAME,
      },
    ],
  },
}

export default withPayload(nextConfig)
