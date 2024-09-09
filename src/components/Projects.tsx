'use client'

import { Project as ProjectPayloadType } from '@/payload-types'
import { Media as MediaPayloadType } from '@/payload-types'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface ProjectsComponentProps {
  projects: ProjectPayloadType[]
}

export default function ProjectsComponent({ projects }: ProjectsComponentProps) {
  const variants: Variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    hidden: { opacity: 0, y: 50 },
  }

  return (
    <>
      <div className="mx-auto my-16 flex max-w-[1000px] flex-col space-y-8">
        <div className="mx-auto w-full max-w-[580px] flex-grow px-8">
          <div className="flex w-full text-3xl font-bold">
            <p>projects</p>
            <p className="flex-grow"></p>
          </div>
        </div>

        <div className="flex grow flex-col space-y-8 px-4">
          {projects.map((project: ProjectPayloadType) => {
            const thumbnail = project.thumbnail as MediaPayloadType

            return (
              <motion.div
                className="flex flex-col space-y-2"
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                key={project.id}
              >
                <Link href={project.url}>
                  <div className="rounded-md border-2 border-gray-500">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        alt={thumbnail.alt}
                        fill
                        src={thumbnail.url!}
                        className="rounded-sm object-cover"
                      ></Image>
                    </AspectRatio>
                  </div>
                </Link>
                <div className="space-y-1">
                  <p dangerouslySetInnerHTML={{ __html: project.title_html! }} />
                  <p
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{ __html: project.description_html! }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
