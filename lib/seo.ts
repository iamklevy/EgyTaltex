import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

/** URL of `path` in `locale` — English is un-prefixed (`localePrefix: "as-needed"`). */
export const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;

/** Canonical + hreflang alternates for a page, so each language is indexed separately. */
export function alternatesFor(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, path)])),
      "x-default": path,
    },
  };
}
