import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { alternatesFor } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { ProgrammeCta } from "@/components/site/programme-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/company") };
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("company");

  const values = [1, 2, 3, 4].map((i) => ({ title: c(`value${i}Title`), body: c(`value${i}Body`) }));

  const facts = [
    { value: "100%", label: c("fact1Label") },
    { value: "3,000+", label: c("fact2Label") },
    { value: "4", label: c("fact3Label") },
  ];

  const timeline = [
    { year: "2001", body: c("t2001") },
    { year: "2008", body: c("t2008") },
    { year: "2015", body: c("t2015") },
    { year: "2019", body: c("tToday") },
  ];

  const markets = c.raw("markets") as string[];

  return (
    <>
      <PageHero title={c("heroTitle")} lead={c("heroLead")} />

      {/* STORY */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="h-section">{c("storyTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{c("storyP1")}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c("storyP2")}</p>
            <blockquote className="mt-10 border-s-2 border-ink ps-5 text-xl leading-snug font-medium">
              {c("quote")}
            </blockquote>
          </div>
          <div className="relative aspect-4/5 overflow-hidden bg-surface lg:col-span-5 lg:col-start-8">
            <Image
              src="/products/jacket-blue.png"
              alt={c("storyTitle")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="border-y border-line">
        <div className="container-x">
          <h2 className="sr-only">{c("factsTitle")}</h2>
          <dl className="grid gap-x-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse border-b border-line py-8 sm:border-b-0">
                <dt className="label mt-2">{f.label}</dt>
                <dd className="text-4xl font-medium tracking-tight tabular-nums rtl:text-right" dir="ltr">
                  {f.value}
                </dd>
              </div>
            ))}
            <div className="py-8">
              <dt className="label">{c("marketsLabel")}</dt>
              <dd className="mt-2 leading-relaxed">{markets.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-section">{c("valuesTitle")}</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-lg font-medium">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-section">{c("timelineTitle")}</h2>
          <ol className="mt-12 border-t border-line">
            {timeline.map((item) => (
              <li key={item.year} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                <span className="text-lg font-medium tabular-nums sm:col-span-2">{item.year}</span>
                <p className="leading-relaxed text-ink-muted sm:col-span-8">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProgrammeCta />
    </>
  );
}
