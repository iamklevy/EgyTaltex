"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Arrow } from "./editorial";
import { PRODUCT_SLUGS } from "./nav-links";
import { dropdownWrap, useHoverMenu } from "./use-hover-menu";

/** Every product category, linking to its anchor on the products page. */
export function useProductLinks() {
  const t = useTranslations("products");
  return (t.raw("items") as { name: string }[]).map((p, i) => ({
    name: p.name,
    href: `/products#${PRODUCT_SLUGS[i]}`,
  }));
}

/** Header "Products" link; hovering (or the chevron, on touch/keyboard) drops a frosted list of every category. */
export function ProductsMenu({ active }: { active: boolean }) {
  const t = useTranslations("nav");
  const products = useProductLinks();
  const { open, setOpen, toggle, rootProps } = useHoverMenu();

  return (
    <div {...rootProps} className="relative flex items-center gap-1">
      <Link
        href="/products"
        aria-current={active ? "page" : undefined}
        className={cn(
          "py-2 transition-colors",
          active || open
            ? "text-ink nav-dark:text-paper"
            : "text-ink-muted hover:text-ink nav-dark:text-paper/75 nav-dark:hover:text-paper",
        )}
      >
        {t("products")}
      </Link>
      <button
        type="button"
        onClick={toggle}
        aria-label={t("products")}
        aria-expanded={open}
        aria-haspopup="true"
        className="-me-1 rounded-full p-1 text-ink-muted transition-colors hover:text-ink nav-dark:text-paper/75 nav-dark:hover:text-paper"
      >
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} strokeWidth={1.75} />
      </button>

      <div className={cn(dropdownWrap(open), "-start-4")}>
        <div className="glass-dense w-[30rem] rounded-(--ui-radius) p-2">
          <ul className="grid grid-cols-2">
            {products.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[calc(var(--ui-radius)-0.5rem)] px-3.5 py-2.5 text-sm text-ink-muted hover:bg-ink/5 hover:text-ink"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-[calc(var(--ui-radius)-0.5rem)] border-t border-ink/5 px-3.5 py-3 text-sm font-medium text-ink hover:bg-ink/5"
          >
            {t("allProducts")} <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
