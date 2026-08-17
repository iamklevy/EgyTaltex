import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { contactInfo } from '../i18n/translations.js'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/company', label: t.nav.company },
    { to: '/products', label: t.nav.products },
    { to: '/clients', label: t.nav.clients },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-sand-100">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200">{t.footer.blurb}</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-widest2 text-gold-light">{t.footer.explore}</h4>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-sand-200 transition-colors hover:text-sand-50 link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs uppercase tracking-widest2 text-gold-light">{t.footer.contact}</h4>
          <ul className="mt-5 space-y-3 text-sm text-sand-200">
            <li>{t.contact.address}</li>
            <li>
              <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="hover:text-sand-50">
                {contactInfo.phone1}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-sand-50">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-3 border-t border-sand-50/10 py-6 text-xs text-sand-200 sm:flex-row">
        <p>© {year} {t.common.brand}. {t.footer.rights}</p>
        <p className="tracking-widest2 uppercase">{t.footer.madeWith}</p>
      </div>
    </footer>
  )
}
