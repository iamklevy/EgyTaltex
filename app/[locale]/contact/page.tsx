import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";

import { EMAIL, FAX, PHONE_1, PHONE_2, telHref } from "@/lib/contact";
import { alternatesFor } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { WhatsAppIcon } from "@/components/site/brand-icons";
import { contactPhoto } from "@/content/images";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/contact") };
}

const MAP_SRC =
  "https://maps.google.com/maps?q=Egytaltex%20-%20Egyptian%20Italian%20For%20Textiles%20%26%20Garments%2C%20Free%20Zone%2C%20Nasr%20City%2C%20Cairo%2C%20Egypt&output=embed";

const WHATSAPP = `https://wa.me/${PHONE_1.replace(/\D/g, "")}`;

type Channel = { icon: React.ReactNode; label: string; value: string; href?: string; ltr?: boolean; external?: boolean };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getTranslations("contact");
  const co = await getTranslations("company");

  const icon = "size-[1.15rem]";
  const channels: Channel[] = [
    { icon: <Mail className={icon} strokeWidth={1.5} />, label: c("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: <WhatsAppIcon className={icon} />,
      label: t("nav.whatsapp"),
      value: PHONE_1,
      href: WHATSAPP,
      ltr: true,
      external: true,
    },
    { icon: <Phone className={icon} strokeWidth={1.5} />, label: c("phoneLabel"), value: PHONE_2, href: telHref(PHONE_2), ltr: true },
  ];

  return (
    <>
      <PageHero title={c("heroTitle")} lead={c("heroLead")} />

      <section className="py-12 md:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* the form, on a soft card */}
          <div className="rounded-[2rem] bg-surface p-6 sm:p-8 md:p-10 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
            {/* a face for the place: the floor, with the visit invitation */}
            <div className="relative isolate flex min-h-72 flex-1 items-end overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:p-8">
              <Image
                src={contactPhoto}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-10 object-cover object-[center_80%]"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/50 to-ink/0" />
              <div>
                <p className="text-xl font-medium tracking-tight text-balance rtl:tracking-normal">{co("visitTitle")}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/75">{co("visitBody")}</p>
              </div>
            </div>

            {/* talk to us directly */}
            <div className="rounded-[2rem] border border-line p-6 sm:p-8">
              <p className="text-lg font-medium">{c("directTitle")}</p>
              <ul className="mt-5 space-y-2">
                {channels.map((ch) => (
                  <li key={ch.label}>
                    <a
                      href={ch.href}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener" : undefined}
                      className="group/ch -mx-3 flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface transition-colors group-hover/ch:bg-ink group-hover/ch:text-paper">
                        {ch.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-ink-muted">{ch.label}</span>
                        <span className="block truncate" dir={ch.ltr ? "ltr" : undefined}>
                          {ch.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid gap-5 border-t border-line pt-6 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-ink-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-ink-muted">{c("addressLabel")}</dt>
                    <dd className="mt-0.5">{c("address")}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-ink-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-ink-muted">{c("hoursLabel")}</dt>
                    <dd className="mt-0.5">{c("hours")}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Printer className="mt-0.5 size-4 shrink-0 text-ink-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-ink-muted">{c("faxLabel")}</dt>
                    <dd className="mt-0.5" dir="ltr">
                      {FAX}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <h2 className="sr-only">{c("mapTitle")}</h2>
        <iframe
          title={t("common.mapIframe")}
          src={MAP_SRC}
          className="block h-[24rem] w-full rounded-[2rem] border-0 bg-surface md:h-[28rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
