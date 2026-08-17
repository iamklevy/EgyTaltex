import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import { homeImg } from '../data/homeImages.js'

function Pillar({ index, title, body }) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="group h-full rounded-2xl border border-ink/10 bg-white/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card">
        <span className="font-serif text-3xl text-gold">0{index + 1}</span>
        <h3 className="mt-4 font-serif text-2xl text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
        <div className="mt-6 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-full" />
      </div>
    </Reveal>
  )
}

function Step({ n, title, body, last }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 bg-sand-50 font-serif text-lg text-gold">
          {n}
        </div>
        {!last && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-gold/40 to-transparent" />}
      </div>
      <div className="pb-12">
        <h4 className="font-serif text-2xl text-ink">{title}</h4>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useLang()
  const h = t.home

  const stats = [
    { to: new Date().getFullYear() - 2001, suffix: '+', label: h.statYears },
    { to: 100, suffix: '%', label: h.statVertical },
    { to: 1, suffix: '', label: h.statCotton, custom: '★' },
    { to: 24, suffix: '/7', label: h.statClients },
  ]

  const pillars = [
    { title: h.pillar1Title, body: h.pillar1Body },
    { title: h.pillar2Title, body: h.pillar2Body },
    { title: h.pillar3Title, body: h.pillar3Body },
    { title: h.pillar4Title, body: h.pillar4Body },
  ]

  const steps = [
    { title: h.step1, body: h.step1Body },
    { title: h.step2, body: h.step2Body },
    { title: h.step3, body: h.step3Body },
    { title: h.step4, body: h.step4Body },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-sand-50 pt-32 md:pt-0">
        <div className="weave-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-x relative grid min-h-screen items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              {h.heroEyebrow}
            </motion.span>
            <h1 className="heading-serif mt-5 text-5xl sm:text-6xl md:text-7xl">
              {[h.heroTitle1].map((w) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block italic shimmer-text"
              >
                {h.heroTitleHighlight}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {h.heroTitle2}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              {h.heroLead}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-dark">
                {h.heroCtaPrimary}
                <span aria-hidden>→</span>
              </Link>
              <Link to="/company" className="btn-ghost">
                {h.heroCtaSecondary}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="animate-float-slow overflow-hidden rounded-[2rem] border border-ink/10 shadow-soft">
              <img
                src={homeImg('hero', 900)}
                alt={h.heroTitleHighlight}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-2 text-xs uppercase tracking-widest2 text-sand-50 shadow-soft">
              {t.common.since}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted lg:flex"
        >
          <span className="text-[10px] uppercase tracking-widest2">{h.scroll}</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="block h-8 w-px bg-ink-muted"
          />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="border-y border-ink/10 bg-white/50">
        <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-center md:text-start">
                <div className="font-serif text-5xl text-ink md:text-6xl">
                  {s.custom ? s.custom : <Counter to={s.to} suffix={s.suffix} />}
                </div>
                <p className="mt-2 text-xs uppercase tracking-widest2 text-ink-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">{h.introEyebrow}</span>
              <h2 className="heading-serif mt-4 text-4xl md:text-5xl">{h.introTitle}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink-muted">{h.introBody}</p>
              <Link to="/company" className="mt-8 inline-flex items-center gap-2 font-medium text-ink link-underline">
                {t.common.readMore} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-ink py-24 text-sand-50 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow text-gold-light">{h.pillarsEyebrow}</span>
            <h2 className="heading-serif mt-4 max-w-2xl text-4xl text-sand-50 md:text-5xl">{h.pillarsTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-sand-50/[0.06]">
                  <span className="font-serif text-3xl text-gold-light">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-2xl text-sand-50">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand-200">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">{h.processEyebrow}</span>
              <h2 className="heading-serif mt-4 text-4xl md:text-5xl">{h.processTitle}</h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <div className="overflow-hidden rounded-[2rem] border border-ink/10 shadow-soft">
                <img
                  src={homeImg('process', 700)}
                  alt={h.processTitle}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Step n={i + 1} title={s.title} body={s.body} last={i === steps.length - 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink to-ink-soft px-8 py-16 text-center md:px-16 md:py-24">
            <div className="weave-bg pointer-events-none absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <h2 className="heading-serif mx-auto max-w-2xl text-4xl text-sand-50 md:text-5xl">{h.ctaTitle}</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-sand-200">{h.ctaBody}</p>
              <Link to="/contact" className="btn mt-9 bg-sand-50 text-ink hover:bg-white">
                {h.ctaButton}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
