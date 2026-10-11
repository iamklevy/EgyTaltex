import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/components/site/nav-links";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-sand-100">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo alt={t("common.brand")} light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200">{t("footer.blurb")}</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs tracking-widest2 text-gold-light uppercase">{t("footer.explore")}</h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-sm text-sand-200 transition-colors hover:text-sand-50">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs tracking-widest2 text-gold-light uppercase">{t("footer.contact")}</h4>
          <ul className="mt-5 space-y-3 text-sm text-sand-200">
            <li>{t("contact.address")}</li>
            <li>
              <a href={telHref(PHONE_1)} dir="ltr" className="hover:text-sand-50">
                {PHONE_1}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-sand-50">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-3 border-t border-sand-50/10 py-6 text-xs text-sand-200 sm:flex-row">
        <p>
          © {year} {t("common.brand")}. {t("footer.rights")}
        </p>
        <p className="tracking-widest2 uppercase">{t("footer.madeWith")}</p>
      </div>
    </footer>
  );
}
