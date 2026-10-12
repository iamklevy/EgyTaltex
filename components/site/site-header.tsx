"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HEADER_LINKS } from "./nav-links";
import { LanguageMenu } from "./language-switch";
import { MobileMenu } from "./mobile-menu";
import { ProductsMenu } from "./products-menu";
import { useNavTone } from "./use-nav-tone";

/** Pages that open on a dark full-bleed hero, so the header is server-rendered dark there (no flash). */
const DARK_HERO_ROUTES = ["/", "/company"];

/** Frosted-glass panel floating over the top of the page; heroes pad by `--header-h` to clear it. */
export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  // Over dark sections the glass smokes and the contents turn white (the `nav-dark:` variant).
  // Pages with a dark hero start dark on the server, so there's no light-to-dark flash on load.
  const { tone, animate } = useNavTone(bar, DARK_HERO_ROUTES.includes(pathname) ? "dark" : "light", [pathname]);

  // MediaPrint-style: at the very top of the home page the mobile bar "rests" (no bar, just the
  // logo and language on the photo, the menu button in its own glass chip) and expands into the
  // full pill once you scroll. Desktop
  // ignores it (every rest style is max-lg). Set before paint so a mid-page reload never flips.
  const [scrolled, setScrolled] = useState(false);
  useLayoutEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);
  const rest = pathname === "/" && !scrolled;

  return (
    <header className="fixed inset-x-0 top-2 z-50 lg:top-3">
      <div className="container-x">
        <div
          ref={bar}
          data-tone={tone}
          data-rest={rest ? "" : undefined}
          className={cn(
            "glass-layer relative isolate flex h-16 items-center gap-10 rounded-(--ui-radius) ps-2 pe-2 text-ink data-[tone=dark]:text-paper lg:px-6",
            // resting (mobile, top of home): the bar's own glass and padding fall away
            "max-lg:data-rest:px-0 max-lg:data-rest:before:opacity-0",
            // the mobile menu panel grows out of the bar and covers it exactly, so hide the bar while
            // it's up. Resting has no bar to hide: the logo stays (the panel's own logo lands on it) and
            // only the language button hides here, the menu button in MobileMenu.
            "[&:has([data-panel]):not([data-rest])]:opacity-0 [&:has([data-panel])_[data-lang-menu]]:opacity-0",
            // on load/navigation everything must switch instantly; after that, scroll changes animate
            animate
              ? "transition-[color,padding] duration-500 ease-out"
              : "transition-none! before:transition-none! [&_*]:transition-none! [&_*]:before:transition-none!",
          )}
        >
          <Link
            href="/"
            aria-label={t("common.homeLabel")}
            className="flex shrink-0 items-center transition-[padding] duration-500 ease-out max-lg:h-11 max-lg:px-3 max-lg:nav-rest:px-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto transition-[filter] duration-300 nav-dark:brightness-0 nav-dark:invert" />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.95rem] lg:flex">
            {HEADER_LINKS.map(({ href, key }) => {
              const active = pathname.startsWith(href);
              if (key === "products") return <ProductsMenu key={href} active={active} />;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-2 transition-colors",
                    active ? "text-ink nav-dark:text-paper" : "text-ink-muted hover:text-ink nav-dark:text-paper/75 nav-dark:hover:text-paper",
                  )}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-2 sm:gap-3 lg:gap-5">
            <LanguageMenu />
            <Link href="/contact" className="btn-primary hidden h-10 px-5 text-sm sm:inline-flex nav-dark:bg-paper nav-dark:text-ink nav-dark:hover:bg-surface">
              {t("nav.cta")}
            </Link>
            <MobileMenu tone={tone} rest={rest} />
          </div>
        </div>
      </div>
    </header>
  );
}
