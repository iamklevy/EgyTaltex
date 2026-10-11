import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Printer, type LucideIcon } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EMAIL, FAX, PHONE_1, PHONE_2, telHref } from "@/lib/contact";
import { alternatesFor } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/motion";
import { ContactForm } from "@/components/site/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/contact") };
}

const MAP_SRC =
  "https://maps.google.com/maps?q=Egytaltex%20-%20Egyptian%20Italian%20For%20Textiles%20%26%20Garments%2C%20Free%20Zone%2C%20Nasr%20City%2C%20Cairo%2C%20Egypt&output=embed";

type InfoRow = { icon: LucideIcon; label: string; value: string; sub?: string; href?: string; ltr?: boolean };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getTranslations("contact");

  const info: InfoRow[] = [
    { icon: MapPin, label: c("addressLabel"), value: c("address") },
    { icon: Phone, label: c("phoneLabel"), value: PHONE_1, sub: PHONE_2, href: telHref(PHONE_1), ltr: true },
    { icon: Mail, label: c("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Printer, label: c("faxLabel"), value: FAX, ltr: true },
    { icon: Clock, label: c("hoursLabel"), value: c("hours") },
  ];

  return (
    <>
      <PageHero eyebrow={c("heroEyebrow")} title={c("heroTitle")} lead={c("heroLead")} />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white shadow-soft lg:grid-cols-5">
              {/* ---- INFO PANEL ---- */}
              <div className="relative overflow-hidden bg-ink p-9 text-sand-50 md:p-12 lg:col-span-2">
                <div className="weave-bg pointer-events-none absolute inset-0 opacity-25" />
                <div className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
                <div className="relative">
                  <h3 className="font-serif text-3xl text-sand-50">{c("infoTitle")}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand-200">{c("heroLead")}</p>

                  <ul className="mt-10 space-y-7">
                    {info.map((row) => {
                      const Icon = row.icon;
                      const content = (
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-sand-50/4 text-gold-light">
                            <Icon className="h-5 w-5" strokeWidth={1.6} />
                          </span>
                          <div>
                            <p className="text-[11px] tracking-widest2 text-gold-light uppercase">{row.label}</p>
                            <p className="mt-1 leading-relaxed text-sand-100" dir={row.ltr ? "ltr" : undefined}>
                              {row.value}
                            </p>
                            {row.sub && (
                              <p className="leading-relaxed text-sand-200" dir={row.ltr ? "ltr" : undefined}>
                                {row.sub}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                      return (
                        <li key={row.label}>
                          {row.href ? (
                            <a href={row.href} className="block transition-opacity hover:opacity-80">
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-12 flex flex-wrap gap-3">
                    <a href={telHref(PHONE_1)} className="btn bg-sand-50 px-5! py-2.5! text-xs text-ink hover:bg-white">
                      <Phone className="h-5 w-5" strokeWidth={1.6} /> {c("phoneLabel")}
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="btn border border-sand-50/30 px-5! py-2.5! text-xs text-sand-50 hover:bg-sand-50 hover:text-ink"
                    >
                      <Mail className="h-5 w-5" strokeWidth={1.6} /> {c("emailLabel")}
                    </a>
                  </div>
                </div>
              </div>

              {/* ---- FORM PANEL ---- */}
              <div className="p-9 md:p-12 lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-soft">
              <div className="border-b border-ink/10 bg-white px-9 py-6 md:px-12">
                <h3 className="font-serif text-2xl text-ink">{c("mapTitle")}</h3>
              </div>
              <iframe
                title={t("common.mapIframe")}
                src={MAP_SRC}
                className="h-105 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
