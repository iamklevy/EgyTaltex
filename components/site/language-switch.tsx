"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { dropdownWrap, useHoverMenu } from "./use-hover-menu";

/**
 * Header language switcher: shows only the current language; hovering (or tapping, on touch)
 * drops a frosted-glass list of the others.
 */
export function LanguageMenu({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const { open, setOpen, toggle, rootProps } = useHoverMenu();
  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <div {...rootProps} data-lang-menu className={cn("relative", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-label={t("changeLanguage")}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-9 items-center gap-1 rounded-(--ui-radius) px-2.5 text-sm text-ink transition-colors hover:bg-ink/5 max-lg:h-11 max-lg:px-3.5 nav-dark:text-paper nav-dark:hover:bg-paper/10"
      >
        {current.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} strokeWidth={1.75} />
      </button>

      <div className={cn(dropdownWrap(open), "end-0")}>
        <ul className="glass-dense min-w-40 rounded-(--ui-radius) p-1.5">
          {languages.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <Link
                  href={pathname}
                  locale={l.code}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-[calc(var(--ui-radius)-0.375rem)] px-3.5 py-2 text-sm hover:bg-ink/5",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {/* the current language is marked with a tick, so the only background is the hover one.
                      No transition on rows: a fading highlight lingers on the row just left and reads as a glitch. */}
                  <span lang={l.code} className="flex-1">
                    {l.name}
                  </span>
                  {active ? (
                    <Check className="size-4" strokeWidth={2} aria-hidden />
                  ) : (
                    <span className="w-4 text-center text-xs text-ink-muted">{l.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
