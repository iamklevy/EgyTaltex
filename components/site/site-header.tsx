"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HEADER_LINKS } from "./nav-links";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";

/** Plain white bar with a hairline under it, pinned to the top. */
export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="container-x flex h-16 items-center gap-10">
        <Link href="/" aria-label={t("common.homeLabel")} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 text-[0.95rem] lg:flex">
          {HEADER_LINKS.map(({ href, key }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn("py-2 transition-colors", active ? "text-ink" : "text-ink-muted hover:text-ink")}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-6">
          <LanguageSwitch className="hidden sm:flex" />
          <Link href="/contact" className="btn-primary hidden h-10 px-5 text-sm sm:inline-flex">
            {t("nav.cta")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
