import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'

export default function Company() {
  const { t } = useLang()
  const c = t.company

  const values = [
    { title: c.value1Title, body: c.value1Body },
    { title: c.value2Title, body: c.value2Body },
    { title: c.value3Title, body: c.value3Body },
    { title: c.value4Title, body: c.value4Body },
  ]

  const facts = [
    { to: 100, suffix: '%', label: c.fact1Label },
    { to: 3000, suffix: '+', label: c.fact2Label },
    { to: 4, suffix: '', label: c.fact3Label },
  ]

  const timeline = [
    { year: '2001', body: c.t2001 },
    { year: '2008', body: c.t2008 },
    { year: '2015', body: c.t2015 },
    { year: '2019', body: c.tToday },
  ]

  return (
    <>
      <PageHero eyebrow={c.heroEyebrow} title={c.heroTitle} lead={c.heroLead} />

      {/* STORY */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">{c.storyTitle}</span>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{c.storyP1}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c.storyP2}</p>
          </Reveal>
          <Reveal direction="left">
            <div className="overflow-hidden rounded-[2rem] border border-ink/10 shadow-card">
              <img
                src="/products/jacket-blue.png"
                alt={c.storyTitle}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACTS */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{c.factsEyebrow}</span>
            <h2 className="heading-serif mt-4 max-w-xl text-3xl md:text-4xl">{c.factsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink/10 bg-white/50 p-7">
                  <p className="font-serif text-4xl text-ink md:text-5xl">
                    <Counter to={f.to} suffix={f.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-white/50 p-6">
              <span className="text-xs font-medium uppercase tracking-widest2 text-ink-muted">{c.marketsLabel}</span>
              <div className="flex flex-wrap gap-2">
                {c.markets.map((m, i) => (
                  <span key={i} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-sm text-ink">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ink py-24 text-sand-50 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif text-4xl text-sand-50 md:text-5xl">{c.valuesTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex gap-5 rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] p-7 transition-colors duration-500 hover:border-gold/50">
                  <span className="font-serif text-4xl text-gold-light">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-sand-50">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand-200">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif text-4xl md:text-5xl">{c.timelineTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative pt-8">
                  <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-gold to-transparent" />
                  <span className="font-serif text-5xl text-ink">{item.year}</span>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link to="/products" className="btn-dark mt-14">
              {t.nav.products} <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
