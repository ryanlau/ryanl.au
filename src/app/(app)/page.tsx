import dynamic from 'next/dynamic'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const HomeComponent = dynamic(() => import('@/components/Home'), { ssr: false })

export default async function HomePage() {
  const payload = await getPayloadHMR({ config })
  const result = await payload.findGlobal({ slug: 'home' })

  return (
    <HomeComponent
      title={result.title}
      body_html={result.body_html}
      links={result.links}
    ></HomeComponent>
  )
}
