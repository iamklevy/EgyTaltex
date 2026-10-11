"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { Link, usePathname } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { DARK_HERO_PATHS, HEADER_LINKS } from "./nav-links";
import { ProductsMenu } from "./products-menu";
import { MobileMenu } from "./mobile-menu";

/**
 * Masthead: a thin label line over a full-width frosted bar whose bottom edge
 * is a dashed seam. A red thread is pulled along the seam as the page is read.
 * At the very top it lies flat and clear over the hero; once scrolled the
 * label line folds away and the bar frosts over.
 */
export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [productsOpen, setProductsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const { scrollYProgress } = useScroll();
  const thread = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // inner pages that still open on the dark PageHero need light type up top;
  // an open products panel is paper, so the bar goes paper with it
  const frosted = scrolled || productsOpen;
  const onDark = !frosted && DARK_HERO_PATHS.some((p) => pathname.startsWith(p));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-500", onDark ? "text-paper" : "text-ink")}>
      {/* label line — folds away on scroll */}
      <div
        className={cn(
          "hidden transition-[grid-template-rows,opacity] duration-500 ease-out md:grid",
          frosted ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "container-x label-mono flex h-9 items-center justify-between gap-6",
              onDark ? "text-paper/60" : "text-ink-muted",
            )}
          >
            <span>{t("common.brandFull")}</span>
            <span className="flex items-center gap-5">
              <a href={`mailto:${EMAIL}`} className="normal-case transition-colors hover:text-stitch">
                {EMAIL}
              </a>
              <a href={telHref(PHONE_1)} dir="ltr" className="transition-colors hover:text-stitch">
                {PHONE_1}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* the bar */}
      <div className="relative">
        {/* the frost lives on its own layer: a backdrop-filter on the bar itself
            would stop the products panel inside it from blurring the page */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 transition-[background-color,backdrop-filter] duration-500",
            frosted ? "bg-paper/75 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent",
          )}
        />
        <div className="container-x flex h-16 items-center gap-8">
          <Link href="/" aria-label={t("common.homeLabel")} className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={t("common.brand")}
              className={cn("h-7 w-auto transition-[filter] duration-500", onDark && "brightness-0 invert")}
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-9 text-[0.92rem] lg:flex">
            <ProductsMenu open={productsOpen} setOpen={setProductsOpen} active={pathname.startsWith("/products")} />
            {HEADER_LINKS.map(({ href, key }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn("stitch-link py-2", active && "is-active")}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-6 lg:ms-0">
            {/* language — inline, like a masthead edition line */}
            <div className="label-mono hidden items-center gap-2 sm:flex" aria-label={t("common.changeLanguage")}>
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="opacity-30">
                      /
                    </span>
                  )}
                  <Link
                    href={pathname}
                    locale={l.code}
                    aria-current={l.code === locale ? "true" : undefined}
                    title={l.name}
                    className={cn("transition-opacity", l.code === locale ? "opacity-100" : "opacity-50 hover:opacity-100")}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className={cn(
                "hidden rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:inline-flex",
                onDark ? "bg-paper text-ink hover:bg-paper-2" : "bg-ink text-paper hover:bg-ink-soft",
              )}
            >
              {t("home.heroCtaPrimary")}
            </Link>

            <MobileMenu onDark={onDark} />
          </div>
        </div>

        {/* the seam, and the thread pulled along it */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 border-b border-dashed transition-colors duration-500",
            onDark ? "border-paper/20" : frosted ? "border-ink/25" : "border-ink/12",
          )}
        />
        <motion.span
          aria-hidden
          style={{ scaleX: reduce ? scrollYProgress : thread }}
          className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-stitch rtl:origin-right"
        />
      </div>
    </header>
  );
}
