import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import Logo from './Logo.jsx'

export default function Navbar() {
  const { t, lang, setLang, languages } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const langRef = useRef(null)
  const currentLang = languages.find((l) => l.code === lang)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/company', label: t.nav.company },
    { to: '/products', label: t.nav.products },
    { to: '/clients', label: t.nav.clients },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-sand-50/85 backdrop-blur-md shadow-[0_1px_0_rgba(28,26,23,0.06)]' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <Link to="/" aria-label="Egytaltex home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors link-underline ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium tracking-widest2 uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-sand-50"
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              {currentLang?.label}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 top-full mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-ink/10 bg-sand-50 py-1 shadow-lg"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors ${
                        l.code === lang ? 'bg-ink text-sand-50' : 'text-ink hover:bg-sand-100'
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-xs uppercase tracking-widest2 opacity-70">{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/contact" className="btn-dark hidden sm:inline-flex !px-5 !py-2.5">
            {t.nav.cta}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-ink transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-ink transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-sand-50/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base transition-colors ${
                      isActive ? 'bg-ink text-sand-50' : 'text-ink hover:bg-sand-100'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
