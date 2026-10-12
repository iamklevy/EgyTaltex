import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { alternatesFor } from "@/lib/seo";
import { clientLogos } from "@/content/images";
import { PageHero } from "@/components/site/page-hero";
import { ProgrammeCta } from "@/components/site/programme-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clients" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/clients") };
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("clients");
  const sisters = c.raw("sisterList") as { name: string; role: string }[];

  return (
    <>
      <PageHero title={c("heroTitle")} lead={c("heroLead")} />

      {/* LOGOS */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 className="h-section">{c("bodyTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c("bodyText")}</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {clientLogos.map((m) => (
              <li key={m.name} className="flex aspect-3/2 flex-col items-center justify-center gap-4 bg-paper p-6">
                <Image src={m.logo} alt={m.name} width={200} height={64} className="max-h-12 w-auto max-w-[70%] object-contain" />
                <span className="text-xs text-ink-muted">{m.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <figure className="max-w-3xl">
            <blockquote className="text-2xl leading-snug font-medium tracking-tight md:text-3xl">
              {c("testimonialQuote")}
            </blockquote>
            <figcaption className="label mt-6">{c("testimonialName")}</figcaption>
          </figure>
        </div>
      </section>

      {/* SISTER COMPANIES */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h-section">{c("sisterTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c("sisterText")}</p>
          </div>
          <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
            {sisters.map((s) => (
              <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-5">
                <span className="text-lg font-medium">{s.name}</span>
                <span className="text-ink-muted">{s.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProgrammeCta />
    </>
  );
}
