import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Counter, Reveal } from "@/components/site/motion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/company") };
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getTranslations("company");

  const values = [1, 2, 3, 4].map((i) => ({ title: c(`value${i}Title`), body: c(`value${i}Body`) }));

  const facts = [
    { to: 100, suffix: "%", label: c("fact1Label") },
    { to: 3000, suffix: "+", label: c("fact2Label") },
    { to: 4, suffix: "", label: c("fact3Label") },
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
      <PageHero eyebrow={c("heroEyebrow")} title={c("heroTitle")} lead={c("heroLead")} />

      {/* STORY */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">{c("storyTitle")}</span>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{c("storyP1")}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c("storyP2")}</p>
          </Reveal>
          <Reveal direction="left">
            <div className="overflow-hidden rounded-4xl border border-ink/10 shadow-card">
              <Image
                src="/products/jacket-blue.png"
                alt={c("storyTitle")}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACTS */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{c("factsEyebrow")}</span>
            <h2 className="heading-serif mt-4 max-w-xl text-3xl md:text-4xl">{c("factsTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink/10 bg-white/50 p-7">
                  <p className="font-serif text-4xl text-ink md:text-5xl">
                    <Counter to={f.to} suffix={f.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-white/50 p-6">
              <span className="text-xs font-medium tracking-widest2 text-ink-muted uppercase">{c("marketsLabel")}</span>
              <div className="flex flex-wrap gap-2">
                {markets.map((m) => (
                  <span key={m} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-sm text-ink">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ink py-24 text-sand-50 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif text-4xl text-sand-50 md:text-5xl">{c("valuesTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex gap-5 rounded-2xl border border-sand-50/10 bg-sand-50/3 p-7 transition-colors duration-500 hover:border-gold/50">
                  <span className="font-serif text-4xl text-gold-light">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-sand-50">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand-200">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif text-4xl md:text-5xl">{c("timelineTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div className="relative pt-8">
                  <div className="absolute start-0 top-0 h-px w-full bg-linear-to-r from-gold to-transparent rtl:bg-linear-to-l" />
                  <span className="font-serif text-5xl text-ink">{item.year}</span>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link href="/products" className="btn-dark mt-14">
              {t("nav.products")} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
