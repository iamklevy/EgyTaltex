import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { contactInfo } from '../i18n/translations.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

/* ---- Small inline icons (stroke = currentColor) ---- */
const icons = {
  location: (
    <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 7l-10 6L2 7" />
  ),
  clock: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2" />,
  fax: (
    <path d="M6 3h9l3 3v4H6V3Z M6 10h12v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9Z M9 14h6 M9 17h6" />
  ),
}

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {icons[name]}
    </svg>
  )
}

/* ---- Labeled input field ---- */
function Field({ label, type = 'text', name, textarea }) {
  const base =
    'w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/50 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20'
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest2 text-ink-muted">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required className={`${base} resize-none`} placeholder={label} />
      ) : (
        <input name={name} type={type} required className={base} placeholder={label} />
      )}
    </label>
  )
}

// Create a form at https://formspree.io (free tier is fine) and replace this with your form ID.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSent(true)
      e.target.reset()
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const info = [
    { icon: 'location', label: c.addressLabel, value: c.address },
    { icon: 'phone', label: c.phoneLabel, value: contactInfo.phone1, sub: contactInfo.phone2, href: `tel:${contactInfo.phone1.replace(/\s/g, '')}` },
    { icon: 'mail', label: c.emailLabel, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: 'fax', label: c.faxLabel, value: contactInfo.fax },
    { icon: 'clock', label: c.hoursLabel, value: c.hours },
  ]

  return (
    <>
      <PageHero eyebrow={c.heroEyebrow} title={c.heroTitle} lead={c.heroLead} />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white shadow-soft lg:grid-cols-5">
              {/* ---- INFO PANEL ---- */}
              <div className="relative overflow-hidden bg-ink p-9 text-sand-50 md:p-12 lg:col-span-2">
                <div className="weave-bg pointer-events-none absolute inset-0 opacity-25" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
                <div className="relative">
                  <h3 className="font-serif text-3xl text-sand-50">{c.infoTitle}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand-200">{c.heroLead}</p>

                  <ul className="mt-10 space-y-7">
                    {info.map((row, i) => {
                      const content = (
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-sand-50/[0.04] text-gold-light">
                            <Icon name={row.icon} />
                          </span>
                          <div>
                            <p className="text-[11px] uppercase tracking-widest2 text-gold-light">{row.label}</p>
                            <p className="mt-1 leading-relaxed text-sand-100">{row.value}</p>
                            {row.sub && <p className="leading-relaxed text-sand-200">{row.sub}</p>}
                          </div>
                        </div>
                      )
                      return (
                        <li key={i}>
                          {row.href ? (
                            <a href={row.href} className="block transition-opacity hover:opacity-80">
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </li>
                      )
                    })}
                  </ul>

                  <div className="mt-12 flex flex-wrap gap-3">
                    <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="btn bg-sand-50 text-ink hover:bg-white !px-5 !py-2.5 text-xs">
                      <Icon name="phone" /> {c.phoneLabel}
                    </a>
                    <a href={`mailto:${contactInfo.email}`} className="btn border border-sand-50/30 text-sand-50 hover:bg-sand-50 hover:text-ink !px-5 !py-2.5 text-xs">
                      <Icon name="mail" /> {c.emailLabel}
                    </a>
                  </div>
                </div>
              </div>

              {/* ---- FORM PANEL ---- */}
              <div className="p-9 md:p-12 lg:col-span-3">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label={c.formName} name="name" />
                    <Field label={c.formEmail} type="email" name="email" />
                  </div>
                  <Field label={c.formCompany} name="company" />
                  <Field label={c.formMessage} name="message" textarea />

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button type="submit" disabled={submitting} className="btn-dark disabled:opacity-60">
                      {c.formSubmit} <span aria-hidden>→</span>
                    </button>
                    {sent && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-olive"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-olive text-sand-50 text-[11px]">✓</span>
                        {c.formSent}
                      </motion.span>
                    )}
                    {error && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-700"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-red-700 text-sand-50 text-[11px]">!</span>
                        {c.formError}
                      </motion.span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-soft">
              <div className="border-b border-ink/10 bg-white px-9 py-6 md:px-12">
                <h3 className="font-serif text-2xl text-ink">{c.mapTitle}</h3>
              </div>
              <iframe
                title="Egytaltex location"
                src="https://maps.google.com/maps?q=Egytaltex%20-%20Egyptian%20Italian%20For%20Textiles%20%26%20Garments%2C%20Free%20Zone%2C%20Nasr%20City%2C%20Cairo%2C%20Egypt&output=embed"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
