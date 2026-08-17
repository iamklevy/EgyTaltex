import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { img, productMedia, featureImage, productionGallery } from '../data/productImages.js'

// Editorial bento spans (desktop). Index matches translation items order.
const spans = [
  'md:col-span-4 md:row-span-2', // 0 Cotton Yarn — large feature
  'md:col-span-2 md:row-span-1', // 1 Knitted Fabrics
  'md:col-span-2 md:row-span-1', // 2 T-Shirts
  'md:col-span-2 md:row-span-2', // 3 Polo — tall
  'md:col-span-4 md:row-span-1', // 4 Loungewear — wide
  'md:col-span-4 md:row-span-1', // 5 Private Label — wide
]

function ProductCard({ i, name, desc }) {
  const media = productMedia[i]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-[260px] overflow-hidden rounded-3xl bg-sand-200 ${spans[i]}`}
    >
      <img
        src={media.src}
        alt={name}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${media.pos} transition-transform duration-[1.2s] ease-out group-hover:scale-110`}
      />
      {/* gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
      {/* index chip */}
      <span className="absolute top-5 left-5 rounded-full bg-sand-50/85 px-3 py-1 text-[11px] font-medium uppercase tracking-widest2 text-ink backdrop-blur-sm">
        0{i + 1}
      </span>
      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3 className="font-serif text-2xl text-sand-50 md:text-3xl">{name}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-100/0 transition-all duration-500 group-hover:text-sand-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {desc}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-gold-light opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="h-px w-6 bg-gold-light" /> Egytaltex
        </span>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const { t } = useLang()
  const p = t.products
  const tags = [p.tag1, p.tag2, p.tag3, p.tag4]

  return (
    <>
      <PageHero eyebrow={p.heroEyebrow} title={p.heroTitle} lead={p.heroLead} />

      {/* BENTO GALLERY */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {p.items.map((item, i) => (
              <ProductCard key={i} i={i} name={item.name} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE — split image + copy */}
      <section className="py-8 md:py-16">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-ink lg:grid-cols-2">
            <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
              <motion.img
                src={featureImage}
                alt={p.featureTitle}
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/40" />
            </div>
            <div className="relative p-9 text-sand-50 md:p-14">
              <div className="weave-bg pointer-events-none absolute inset-0 opacity-10" />
              <div className="relative">
                <span className="eyebrow text-gold-light">{p.heroEyebrow}</span>
                <h2 className="heading-serif mt-4 text-4xl text-sand-50 md:text-5xl">{p.featureTitle}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-sand-200">{p.featureBody}</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-sand-50/10 bg-sand-50/[0.04] px-4 py-3 text-sm transition-colors duration-500 hover:border-gold/50"
                    >
                      <span className="text-gold-light">✦</span>
                      <span className="text-sand-100">{tag}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn mt-9 bg-sand-50 text-ink hover:bg-white">
                  {t.nav.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FROM OUR FLOOR — real production photography */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{p.galleryEyebrow}</span>
            <h2 className="heading-serif mt-4 max-w-xl text-4xl md:text-5xl">{p.galleryTitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
              {productionGallery.map((src, i) => (
                <div
                  key={i}
                  className="group aspect-square overflow-hidden rounded-2xl bg-sand-200"
                >
                  <img
                    src={src}
                    alt={`${t.common.brand} production ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
