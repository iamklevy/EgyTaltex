import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { alternatesFor } from "@/lib/seo";
import { clientLogos } from "@/content/images";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/motion";

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
      <PageHero eyebrow={c("heroEyebrow")} title={c("heroTitle")} lead={c("heroLead")} />

      {/* BODY */}
      <section className="py-24 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="heading-serif max-w-2xl text-4xl md:text-5xl">{c("bodyTitle")}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{c("bodyText")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {clientLogos.map((m) => (
                <div
                  key={m.name}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
                >
                  <Image
                    src={m.logo}
                    alt={m.name}
                    width={200}
                    height={48}
                    className="h-10 w-auto max-w-[75%] object-contain grayscale transition-all duration-500 group-hover:grayscale-0 md:h-12"
                  />
                  <span className="text-center text-xs tracking-widest2 text-ink-muted uppercase">{m.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ink py-24 text-sand-50 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="font-serif text-7xl leading-none text-gold">“</span>
            <blockquote className="heading-serif -mt-6 max-w-4xl text-3xl text-sand-50 md:text-4xl">
              {c("testimonialQuote")}
            </blockquote>
            <p className="mt-6 text-sm tracking-widest2 text-gold-light uppercase">— {c("testimonialName")}</p>
          </Reveal>
        </div>
      </section>

      {/* SISTER COMPANIES */}
      <section className="py-24 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{c("sisterTitle")}</span>
            <h2 className="heading-serif mt-4 text-4xl md:text-5xl">{c("sisterTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-muted">{c("sisterText")}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {sisters.map((s) => (
                <li
                  key={s.name}
                  className="rounded-2xl border border-ink/10 bg-white/50 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
                >
                  <p className="font-serif text-lg text-ink">{s.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{s.role}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
