"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/site/motion";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/components/site/nav-links";

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find((l) => l.code === locale);

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-sand-50/85 shadow-[0_1px_0_rgba(28,26,23,0.06)] backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <Link href="/" aria-label={t("common.homeLabel")}>
          <Logo alt={t("common.brand")} />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "link-underline text-sm tracking-wide transition-colors",
                isActive(l.href) ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium tracking-widest2 text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-sand-50"
              aria-label={t("common.changeLanguage")}
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
                  className="absolute end-0 top-full mt-2 min-w-36 overflow-hidden rounded-xl border border-ink/10 bg-sand-50 py-1 shadow-lg"
                >
                  {languages.map((l) => (
                    <Link
                      key={l.code}
                      href={pathname}
                      locale={l.code}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2 text-sm transition-colors",
                        l.code === locale ? "bg-ink text-sand-50" : "text-ink hover:bg-sand-100"
                      )}
                    >
                      <span>{l.name}</span>
                      <span className="text-xs tracking-widest2 uppercase opacity-70">{l.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/contact" className="btn-dark hidden px-5! py-2.5! sm:inline-flex">
            {t("nav.cta")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-label={t("common.menu")}
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={cn("block h-px w-5 bg-ink transition-transform", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("block h-px w-5 bg-ink transition-opacity", open && "opacity-0")} />
              <span className={cn("block h-px w-5 bg-ink transition-transform", open && "-translate-y-1.5 -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-ink/10 bg-sand-50/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base transition-colors",
                    isActive(l.href) ? "bg-ink text-sand-50" : "text-ink hover:bg-sand-100"
                  )}
                >
                  {t(`nav.${l.key}`)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
