import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EMAIL, PHONE_1, PHONE_2, telHref } from "@/lib/contact";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/components/site/nav-links";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper-2">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-x relative">
        {/* the slogan, set as the closing line of the magazine */}
        <p className="heading-serif border-b border-paper/15 py-16 text-[clamp(2.6rem,6vw,5.5rem)] leading-[1] text-paper md:py-24">
          {t("home.heroLine1")} <span className="text-stitch-light italic">{t("home.heroLine2")}</span>
        </p>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo alt={t("common.brand")} light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper-3">{t("footer.blurb")}</p>
          </div>

          <nav className="md:col-span-3">
            <h4 className="label-mono text-stitch-light">{t("footer.explore")}</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-paper-3 transition-colors hover:text-paper">
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h4 className="label-mono text-stitch-light">{t("footer.contact")}</h4>
            <ul className="mt-5 space-y-3 text-sm text-paper-3">
              <li>{t("contact.address")}</li>
              {[PHONE_1, PHONE_2].map((p) => (
                <li key={p}>
                  <a href={telHref(p)} dir="ltr" className="hover:text-paper">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-paper">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="label-mono flex flex-col items-center justify-between gap-3 border-t border-paper/15 py-6 text-paper/55 sm:flex-row">
          <p>
            © {year} {t("common.brand")}. {t("footer.rights")}
          </p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
