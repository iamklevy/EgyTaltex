"use client";

import { useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-links";
import { WhatsAppIcon } from "./brand-icons";
import { useProductLinks } from "./products-menu";
import type { NavTone } from "./use-nav-tone";

const WHATSAPP = `https://wa.me/${PHONE_1.replace(/\D/g, "")}`;

/** Reports whether the panel is in the DOM (true from open until its close animation ends). */
function PanelMounted({ onChange }: { onChange: (mounted: boolean) => void }) {
  // layout effect: the bar must hide in the same frame the panel first paints over it
  useLayoutEffect(() => {
    onChange(true);
    return () => onChange(false);
  }, [onChange]);
  return null;
}

/**
 * Small-screen menu. The panel sits exactly over the floating bar and unclips downward from the
 * bar's shape (or, while the header rests on the home hero, from the menu button's chip), so the
 * bar itself appears to grow into the menu; closing reverses it. It starts in the bar's glass and
 * tone, then fades in a denser tint so the links stay readable. Radix supplies focus trap, Escape
 * and scroll lock.
 */
export function MobileMenu({ tone, rest }: { tone: NavTone; rest: boolean }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const products = useProductLinks();
  const close = () => setOpen(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* data-panel hides this button (and, outside the resting state, the whole bar: see SiteHeader)
          while the panel covers it, so the two never show at once */}
      <Dialog.Trigger
        data-panel={panelShown ? "" : undefined}
        className="glass-chip grid size-11 place-items-center rounded-full data-panel:opacity-0 lg:hidden nav-rest:before:opacity-100"
        aria-label={t("common.menu")}
      >
        <Menu className="size-6" strokeWidth={1.5} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[55] bg-ink/25 duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />

        {/* Must be a direct child of Portal: Radix waits for *this* element's close animation before
            unmounting. Placed exactly where the header bar is (container-x gutters, top-3). While the
            header rests (no bar, logo on the gutter) it's 0.5rem wider each side, so the panel clears
            the logo and the row's px-2 still lands the logo and X exactly where the header has them. */}
        <Dialog.Content
          aria-describedby={undefined}
          data-tone={tone}
          data-rest={rest ? "" : undefined}
          className="group menu-origin glass-layer fixed inset-x-5 top-3 z-[60] isolate data-rest:inset-x-3 flex max-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-(--ui-radius) text-ink outline-none data-[tone=dark]:text-paper data-[state=closed]:animate-menu-close data-[state=open]:animate-menu-open motion-reduce:animate-none! md:inset-x-10 md:data-rest:inset-x-8 lg:hidden"
        >
          <PanelMounted onChange={setPanelShown} />
          <Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>

          {/* denser tint fades in as the panel grows, so the links read over busy pages */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-paper/85 duration-300 group-data-[state=closed]:animate-out group-data-[state=closed]:fade-out-0 group-data-[state=open]:animate-in group-data-[state=open]:fade-in-0 nav-dark:bg-ink/80"
          />

          {/* same row as the bar (logo, menu button), so nothing moves when the panel takes over */}
          <div className="flex h-16 shrink-0 items-center justify-between px-2">
            <Link
              href="/"
              onClick={close}
              aria-label={t("common.homeLabel")}
              className="flex h-11 items-center px-3 group-data-rest:px-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto nav-dark:brightness-0 nav-dark:invert" />
            </Link>
            <Dialog.Close className="grid size-11 place-items-center rounded-full" aria-label={t("nav.close")}>
              <X
                className="size-6 duration-300 group-data-[state=open]:animate-in group-data-[state=open]:fade-in-0 group-data-[state=open]:spin-in-90"
                strokeWidth={1.5}
              />
            </Dialog.Close>
          </div>

          <nav className="min-h-0 overflow-y-auto overscroll-contain px-5 pt-2 pb-6 duration-300 group-data-[state=open]:animate-in group-data-[state=open]:fade-in-0 group-data-[state=open]:slide-in-from-top-2">
            <ul>
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href} className="border-b border-ink/10 nav-dark:border-paper/15">
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={cn(
                        "block flex-1 py-3.5 text-xl font-medium tracking-tight",
                        !isActive(href) && "text-ink-muted nav-dark:text-paper/70",
                      )}
                    >
                      {t(`nav.${key}`)}
                    </Link>
                    {key === "products" && (
                      <button
                        type="button"
                        onClick={() => setProductsOpen((o) => !o)}
                        aria-label={t("nav.products")}
                        aria-expanded={productsOpen}
                        aria-controls="mobile-products"
                        className="-me-2 p-2"
                      >
                        <ChevronDown
                          className={cn("size-5 transition-transform duration-300", productsOpen && "rotate-180")}
                          strokeWidth={1.5}
                        />
                      </button>
                    )}
                  </div>
                  {key === "products" && (
                    // 0fr -> 1fr rows: the list slides open instead of jumping; inert while closed
                    <div
                      id="mobile-products"
                      inert={!productsOpen}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        productsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="grid grid-cols-2 gap-x-4 pb-4">
                          {products.map((p) => (
                            <li key={p.href}>
                              <Link
                                href={p.href}
                                onClick={close}
                                className="block py-1.5 text-sm text-ink-muted hover:text-ink nav-dark:text-paper/70 nav-dark:hover:text-paper"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={close}
              className="btn-primary mt-6 w-full nav-dark:bg-paper nav-dark:text-ink nav-dark:hover:bg-surface"
            >
              {t("nav.cta")}
            </Link>
            <div className="mt-5 flex flex-col gap-2 text-sm text-ink-muted nav-dark:text-paper/70">
              <a href={`mailto:${EMAIL}`} className="self-start hover:text-ink nav-dark:hover:text-paper">
                {EMAIL}
              </a>
              <a href={telHref(PHONE_1)} dir="ltr" className="self-start hover:text-ink nav-dark:hover:text-paper">
                {PHONE_1}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 self-start hover:text-ink nav-dark:hover:text-paper"
              >
                <WhatsAppIcon className="size-4" />
                {t("nav.whatsapp")}
              </a>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
