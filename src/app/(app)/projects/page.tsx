import dynamic from 'next/dynamic'
import { unstable_cache } from 'next/cache'

import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const ProjectsComponent = dynamic(() => import('@/components/Projects'), { ssr: false })

const getData = unstable_cache(
  async () => {
    const payload = await getPayloadHMR({ config })
    return await payload.find({ collection: 'projects', pagination: false, sort: '-date' })
  },
  [],
  { tags: ['projects'] },
)

export default async function ProjectsPage() {
  const data = await getData()

  return <ProjectsComponent projects={data.docs}></ProjectsComponent>
}
