import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EMAIL, FAX, PHONE_1, PHONE_2, telHref } from "@/lib/contact";
import { alternatesFor } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/contact") };
}

const MAP_SRC =
  "https://maps.google.com/maps?q=Egytaltex%20-%20Egyptian%20Italian%20For%20Textiles%20%26%20Garments%2C%20Free%20Zone%2C%20Nasr%20City%2C%20Cairo%2C%20Egypt&output=embed";

type InfoRow = { label: string; lines: { text: string; href?: string }[]; ltr?: boolean };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getTranslations("contact");

  const info: InfoRow[] = [
    { label: c("emailLabel"), lines: [{ text: EMAIL, href: `mailto:${EMAIL}` }] },
    {
      label: c("phoneLabel"),
      lines: [PHONE_1, PHONE_2].map((p) => ({ text: p, href: telHref(p) })),
      ltr: true,
    },
    { label: c("faxLabel"), lines: [{ text: FAX }], ltr: true },
    { label: c("addressLabel"), lines: [{ text: c("address") }] },
    { label: c("hoursLabel"), lines: [{ text: c("hours") }] },
  ];

  return (
    <>
      <PageHero title={c("heroTitle")} lead={c("heroLead")} />

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <dl className="border-t border-line lg:col-span-4 lg:col-start-9">
            {info.map((row) => (
              <div key={row.label} className="border-b border-line py-5">
                <dt className="label">{row.label}</dt>
                {row.lines.map((l) => (
                  <dd key={l.text} className="mt-1" dir={row.ltr ? "ltr" : undefined}>
                    {l.href ? (
                      <a href={l.href} className="link">
                        {l.text}
                      </a>
                    ) : (
                      l.text
                    )}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line">
        <h2 className="sr-only">{c("mapTitle")}</h2>
        <iframe
          title={t("common.mapIframe")}
          src={MAP_SRC}
          className="block h-[28rem] w-full border-0 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
