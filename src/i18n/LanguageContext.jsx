import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'ar', label: 'ع', name: 'العربية' },
]

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('egytaltex-lang') || 'en')

  const dir = translations[lang].dir

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem('egytaltex-lang', lang)
  }, [lang, dir])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const idx = languages.findIndex((l) => l.code === prev)
      return languages[(idx + 1) % languages.length].code
    })
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dir, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
