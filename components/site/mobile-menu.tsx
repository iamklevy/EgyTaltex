"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-links";
import { WhatsAppIcon } from "./brand-icons";
import { useProductLinks } from "./products-menu";

const WHATSAPP = `https://wa.me/${PHONE_1.replace(/\D/g, "")}`;

/** Full-screen white sheet for small screens. Radix supplies focus trap, Escape and scroll lock. */
export function MobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const products = useProductLinks();
  const close = () => setOpen(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="glass-chip grid size-11 place-items-center rounded-full lg:hidden nav-rest:before:opacity-100"
        aria-label={t("common.menu")}
      >
        <Menu className="size-6" strokeWidth={1.5} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper text-ink outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden"
        >
          <Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>

          <div className="container-x pt-3">
            <div className="flex h-16 items-center justify-between px-2">
              <Link href="/" onClick={close} aria-label={t("common.homeLabel")} className="flex h-11 items-center px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto" />
              </Link>
              <Dialog.Close className="grid size-11 place-items-center" aria-label={t("nav.close")}>
                <X className="size-6" strokeWidth={1.5} />
              </Dialog.Close>
            </div>
          </div>

          <nav className="container-x flex flex-1 flex-col pt-4 pb-8">
            <ul>
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href} className="border-b border-line">
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={cn(
                        "block flex-1 py-4 text-2xl font-medium tracking-tight",
                        !isActive(href) && "text-ink-muted",
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
                          className={cn("size-6 transition-transform duration-200", productsOpen && "rotate-180")}
                          strokeWidth={1.5}
                        />
                      </button>
                    )}
                  </div>
                  {key === "products" && productsOpen && (
                    <ul id="mobile-products" className="grid grid-cols-2 gap-x-4 pb-5">
                      {products.map((p) => (
                        <li key={p.href}>
                          <Link href={p.href} onClick={close} className="block py-2 text-ink-muted hover:text-ink">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Link href="/contact" onClick={close} className="btn-primary w-full">
                {t("nav.cta")}
              </Link>
              <div className="mt-6 flex flex-col gap-2 text-sm text-ink-muted">
                <a href={`mailto:${EMAIL}`} className="hover:text-ink">
                  {EMAIL}
                </a>
                <a href={telHref(PHONE_1)} dir="ltr" className="self-start hover:text-ink">
                  {PHONE_1}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 self-start hover:text-ink">
                  <WhatsAppIcon className="size-4" />
                  {t("nav.whatsapp")}
                </a>
              </div>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
