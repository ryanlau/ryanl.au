import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import dynamic from 'next/dynamic'

const ProjectsComponent = dynamic(() => import('@/components/Projects'), { ssr: false })

export default async function ProjectsPage() {
  const payload = await getPayloadHMR({ config })
  const result = await payload.find({ collection: 'projects' })

  return <ProjectsComponent projects={result.docs}></ProjectsComponent>
}
