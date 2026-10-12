import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EMAIL, PHONE_1, PHONE_2, telHref } from "@/lib/contact";
import { NAV_LINKS } from "@/components/site/nav-links";
import { LanguageSwitch } from "@/components/site/language-switch";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={t("common.brand")} className="h-7 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">{t("footer.blurb")}</p>
        </div>

        <nav className="md:col-span-2">
          <h2 className="text-sm font-medium">{t("footer.explore")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm font-medium">{t("footer.contact")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            <li>{t("contact.address")}</li>
            {[PHONE_1, PHONE_2].map((p) => (
              <li key={p}>
                <a href={telHref(p)} dir="ltr" className="hover:text-ink">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-ink">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-medium">{t("footer.language")}</h2>
          <LanguageSwitch className="mt-4" />
        </div>
      </div>

      <div className="container-x">
        <p className="border-t border-line py-6 text-sm text-ink-muted">
          © {year} {t("common.brandFull")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
