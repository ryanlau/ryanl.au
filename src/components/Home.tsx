'use client'

import { Home as HomePayloadType } from '@/payload-types'

import Link from 'next/link'
import { useScramble } from 'use-scramble'
import { motion, Variants } from 'framer-motion'

export default function HomeComponent({
  title,
  body_html,
  links,
}: Pick<HomePayloadType, 'title' | 'body_html' | 'links'>) {
  const { ref } = useScramble({
    text: title || undefined,
    range: [65, 125],
    speed: 0.3,
    tick: 5,
    step: 1,
    scramble: 10,
    seed: 3,
    chance: 1,
    overdrive: false,
    overflow: false,
  })

  const variants: Variants = {
    visible: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0 },
  }

  return (
    <>
      <motion.div
        className="mx-auto my-16 flex max-w-[580px] flex-col space-y-8 px-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.5, delayChildren: 0 } },
        }}
      >
        <motion.p variants={variants} className="text-3xl font-bold" ref={ref}>
          {title}
        </motion.p>

        <motion.p
          className="[&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4"
          variants={variants}
          dangerouslySetInnerHTML={{ __html: body_html! }}
        />

        <div className="flex space-x-3">
          {links.map((link) => (
            <motion.p variants={variants} key={link.id}>
              <Link
                className="font-semibold text-gray-400 underline underline-offset-4 transition-colors hover:text-inherit"
                href={link.href}
              >
                {link.text}
              </Link>
            </motion.p>
          ))}
        </div>
      </motion.div>
    </>
  )
}
