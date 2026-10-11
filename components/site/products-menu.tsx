"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { categoryPhotos } from "@/content/images";
import { EASE } from "./motion";
import { PRODUCT_SLUGS } from "./nav-links";

/**
 * Products trigger plus its full-width catalogue panel. The panel is
 * positioned against the header (this wrapper is static), so it spans the
 * whole bar like a fold-out index page.
 *
 * Hover opens only where hovering is real; a short close delay lets the
 * pointer travel from the trigger down into the panel.
 */
export function ProductsMenu({
  open,
  setOpen,
  active,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
}) {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const names = (t.raw("products.items") as { name: string }[]).map((p) => p.name);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // close on outside click and on Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={wrap}
      onMouseEnter={() => canHover() && openNow()}
      onMouseLeave={() => canHover() && closeSoon()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? setOpen(false) : openNow())}
        className={cn("stitch-link inline-flex items-center gap-1.5 py-2", (open || active) && "is-active")}
      >
        {t("nav.products")}
        <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-dashed border-ink/25 bg-paper/90 text-ink backdrop-blur-2xl backdrop-saturate-150"
          >
            <div className="container-x grid gap-10 py-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="label-mono text-ink-muted">{t("products.indexLabel")}</p>
                <ol className="mt-5 grid grid-cols-3 gap-x-8 border-t border-ink/12">
                  {names.map((name, i) => (
                    <li key={PRODUCT_SLUGS[i]} className="border-b border-ink/12">
                      <Link
                        href={`/products#${PRODUCT_SLUGS[i]}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-3 py-2.5 transition-colors hover:text-stitch"
                      >
                        <span className="label-mono text-ink-muted group-hover:text-stitch">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-xl leading-tight">{name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-b border-ink/12">
                    <Link
                      href="/products"
                      onClick={() => setOpen(false)}
                      className="label-mono flex h-full items-center gap-2 py-2.5 text-ink hover:text-stitch"
                    >
                      {t("nav.allProducts")} <span className="rtl:-scale-x-100">→</span>
                    </Link>
                  </li>
                </ol>
              </div>

              <Link
                href="/products#polo-shirts"
                onClick={() => setOpen(false)}
                className="group lg:col-span-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryPhotos["polo-shirts"]}
                    alt=""
                    className="size-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="label-mono mt-3 text-stitch">{t("products.featureChapter")}</p>
                <p className="mt-1 font-serif text-2xl">{t("products.featureTitle")}</p>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
