import dynamic from 'next/dynamic'
import { unstable_cache } from 'next/cache'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const HomeComponent = dynamic(() => import('@/components/Home'), { ssr: false })

const getData = unstable_cache(
  async () => {
    const payload = await getPayloadHMR({ config })
    return await payload.findGlobal({ slug: 'home' })
  },
  [],
  { tags: ['home'] },
)

export default async function HomePage() {
  const data = await getData()

  return (
    <HomeComponent title={data.title} body_html={data.body_html} links={data.links}></HomeComponent>
  )
}
