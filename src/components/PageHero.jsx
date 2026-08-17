import { motion } from 'framer-motion'

export default function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-sand-50 md:pt-44 md:pb-28">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-gold-light"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-serif mt-4 max-w-3xl text-5xl text-sand-50 md:text-7xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-200"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  )
}
