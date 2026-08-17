import { useLang } from '../i18n/LanguageContext.jsx'

export default function Logo({ light = false }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col select-none">
      <img
        src="/logo.png"
        alt={t.common.brand}
        className={`h-8 w-auto self-start ${light ? 'brightness-0 invert' : ''}`}
      />
      <span className={`mt-1 text-[10px] uppercase tracking-widest2 ${light ? 'text-sand-200' : 'text-ink-muted'}`}>
        Textiles &amp; Garments
      </span>
    </div>
  )
}
