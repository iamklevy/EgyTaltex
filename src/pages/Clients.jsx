import { useLang } from '../i18n/LanguageContext.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Clients() {
  const { t } = useLang()
  const c = t.clients

  const marks = [
    { name: 'OVS', logo: '/clients/ovs.svg' },
    { name: 'Coin', logo: '/clients/coin.png' },
    { name: 'Delta Galil', logo: '/clients/delta-galil.svg' },
    { name: 'Bob Company', logo: '/clients/bob-company.png' },
    { name: 'La Societe', logo: '/clients/la-societe.png' },
    { name: 'Del Mare 1911', logo: '/clients/del-mare-1911.png' },
    { name: 'Roy Rogers', logo: '/clients/roy-rogers.png' },
    { name: 'Klevy', logo: '/clients/klevy.jpg' },
  ]

  return (
    <>
      <PageHero eyebrow={c.heroEyebrow} title={c.heroTitle} lead={c.heroLead} />

      {/* BODY */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif max-w-2xl text-4xl md:text-5xl">{c.bodyTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{c.bodyText}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {marks.map((m, i) => (
                <div
                  key={i}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
                >
                  {m.logo ? (
                    <>
                      <img
                        src={m.logo}
                        alt={m.name}
                        className="h-10 max-w-[75%] object-contain grayscale transition-all duration-500 group-hover:grayscale-0 md:h-12"
                      />
                      <span className="text-center text-xs uppercase tracking-widest2 text-ink-muted">{m.name}</span>
                    </>
                  ) : (
                    <span className="font-serif text-xl italic text-ink-muted">{m.name}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ink py-24 text-sand-50 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="font-serif text-7xl leading-none text-gold">“</span>
            <blockquote className="heading-serif -mt-6 max-w-4xl text-3xl text-sand-50 md:text-4xl">
              {c.testimonialQuote}
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-widest2 text-gold-light">— {c.testimonialName}</p>
          </Reveal>
        </div>
      </section>

      {/* SISTER COMPANIES */}
      <section className="py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{c.sisterTitle}</span>
            <h2 className="heading-serif mt-4 text-4xl md:text-5xl">{c.sisterTitle}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-muted">{c.sisterText}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.sisterList.map((s, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-ink/10 bg-white/50 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
                >
                  <p className="font-serif text-lg text-ink">{s.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{s.role}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
