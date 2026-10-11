import { defineRouting } from "next-intl/routing";

/**
 * English stays un-prefixed at `/`; Italian and Arabic each get their own
 * indexable tree (`/it/...`, `/ar/...`). The old site kept the language in
 * localStorage, so search engines only ever saw English.
 */
export const routing = defineRouting({
  locales: ["en", "it", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const isRtl = (locale: string) => locale === "ar";

/** Labels for the language switcher, in the order they're listed. */
export const languages: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "ar", label: "ع", name: "العربية" },
];
