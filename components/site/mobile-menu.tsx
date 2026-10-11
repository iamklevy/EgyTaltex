"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { languages } from "@/i18n/routing";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { EASE } from "./motion";
import { NAV_LINKS } from "./nav-links";
import { WhatsAppIcon } from "./brand-icons";

const WHATSAPP = `https://wa.me/${PHONE_1.replace(/\D/g, "")}`;

// links stitch in one after another once the sheet has unrolled
const list: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
};
const item: Variants = {
  closed: { opacity: 0, y: 14, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/**
 * Mobile menu: a full-screen frosted sheet that unrolls from the top like a
 * bolt of cloth, with the pages set as a numbered contents list. Radix Dialog
 * supplies focus trap, Escape and scroll lock; forceMount + AnimatePresence
 * lets Motion play the exit.
 */
export function MobileMenu({ onDark }: { onDark: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("common.menu")}
          className="label-mono flex items-center gap-2.5 py-2 lg:hidden"
        >
          {t("common.menu")}
          <span aria-hidden className="flex w-5 flex-col gap-[5px]">
            <span className={cn("h-px w-full", onDark ? "bg-paper" : "bg-ink")} />
            <span className={cn("h-px w-3/5 self-end", onDark ? "bg-paper" : "bg-ink")} />
          </span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, delay: 0.15, ease: EASE } }}
                transition={{ duration: 0.6, ease: EASE }}
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-paper/85 text-ink outline-none backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
              >
                <Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>

                <div className="relative">
                  <div className="container-x flex h-16 items-center justify-between">
                    <Link href="/" onClick={close} aria-label={t("common.homeLabel")}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto" />
                    </Link>
                    <Dialog.Close className="label-mono flex items-center gap-2 py-2">
                      <span className="sr-only">{t("nav.close")}</span>
                      <X className="size-5" strokeWidth={1.5} />
                    </Dialog.Close>
                  </div>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 border-b border-dashed border-ink/25" />
                </div>

                <motion.nav
                  variants={list}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="container-x flex flex-1 flex-col pt-6 pb-10"
                >
                  <ol>
                    {NAV_LINKS.map(({ href, key }, i) => (
                      <motion.li key={href} variants={item} className="border-b border-dashed border-ink/20">
                        <Link
                          href={href}
                          onClick={close}
                          aria-current={isActive(href) ? "page" : undefined}
                          className="group flex items-baseline gap-5 py-4"
                        >
                          <span className={cn("label-mono", isActive(href) ? "text-stitch" : "text-ink-muted")}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-serif text-[2.6rem] leading-none transition-colors group-hover:text-stitch",
                              isActive(href) && "italic",
                            )}
                          >
                            {t(`nav.${key}`)}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ol>

                  <motion.div variants={item} className="mt-auto pt-10">
                    <div className="label-mono flex gap-2">
                      {languages.map((l) => (
                        <Link
                          key={l.code}
                          href={pathname}
                          locale={l.code}
                          onClick={close}
                          aria-current={l.code === locale ? "true" : undefined}
                          className={cn(
                            "flex-1 border py-2.5 text-center normal-case transition-colors",
                            l.code === locale ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink hover:border-ink",
                          )}
                        >
                          {l.name}
                        </Link>
                      ))}
                    </div>

                    <Link href="/contact" onClick={close} className="btn-dark mt-4 w-full">
                      {t("home.heroCtaPrimary")}
                    </Link>

                    <div className="label-mono mt-6 flex flex-col gap-2 text-ink-muted">
                      <a href={`mailto:${EMAIL}`} className="normal-case hover:text-ink">
                        {EMAIL}
                      </a>
                      <a href={telHref(PHONE_1)} dir="ltr" className="self-start hover:text-ink">
                        {PHONE_1}
                      </a>
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 self-start hover:text-ink"
                      >
                        <WhatsAppIcon className="size-3.5" />
                        {t("nav.whatsapp")}
                      </a>
                    </div>
                  </motion.div>
                </motion.nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
