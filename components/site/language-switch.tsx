"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** EN · IT · ع — the current language is dark, the others grey. */
export function LanguageSwitch({ className, onSelect }: { className?: string; onSelect?: () => void }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-3 text-sm", className)} aria-label={t("changeLanguage")}>
      {languages.map((l) => (
        <Link
          key={l.code}
          href={pathname}
          locale={l.code}
          onClick={onSelect}
          aria-current={l.code === locale ? "true" : undefined}
          title={l.name}
          className={cn("transition-colors", l.code === locale ? "text-ink" : "text-ink-muted hover:text-ink")}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
