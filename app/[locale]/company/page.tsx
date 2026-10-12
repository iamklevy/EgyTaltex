import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { CAPACITY, FLOOR_PHOTOS, companyHeroPhoto } from "@/content/company";
import { GROUP, JOURNEY_OWNERS } from "@/content/group";
import { Arrow } from "@/components/site/editorial";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/company") };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("company");
  const h = await getTranslations("home");

  // each company with the chain steps it runs (an owner like "Egytaltex · Italian Touch" counts for both)
  const journey = h.raw("journey") as { title: string }[];
  const group = GROUP.map((co) => ({
    ...co,
    steps: journey.filter((_, i) => JOURNEY_OWNERS[i].who.split(" · ").includes(co.name)).map((s) => s.title),
  }));

  const floor = (c.raw("floor") as { title: string; body: string }[]).map((s, i) => ({ ...s, photo: FLOOR_PHOTOS[i] }));
  const qualitySteps = c.raw("qualitySteps") as { title: string; body: string }[];
  const timeline = c.raw("timeline") as { year: string; body: string }[];
  const markets = c.raw("markets") as string[];

  return (
    <>
      {/* HERO: full-bleed photo, copy anchored bottom-start. Dark, so the header starts smoked. */}
      <section
        data-nav-dark
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink text-paper"
      >
        <Image
          src={companyHeroPhoto}
          alt={c("heroImageAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_42%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-ink/50 via-ink/35 to-ink/80" />
        <div className="container-x pt-[calc(var(--header-h)+4rem)] pb-14 md:pb-20">
          <p className="text-sm text-paper/75">{c("heroKicker")}</p>
          <h1 className="h-display mt-4 max-w-4xl">{c("heroTitle")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">{c("heroLead")}</p>
        </div>
      </section>

      {/* STORY: one big line, the story, and the founder's quote */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <p className="label lg:col-span-3">{c("storyLabel")}</p>
          <div className="lg:col-span-9">
            <p className="text-3xl leading-tight font-medium tracking-[-0.02em] text-balance md:text-4xl rtl:tracking-normal">
              {c("manifesto")}
            </p>
            <div className="mt-10 grid gap-6 text-lg leading-relaxed text-ink-muted md:grid-cols-2 md:gap-10">
              <p>{c("storyP1")}</p>
              <p>{c("storyP2")}</p>
            </div>
            <figure className="mt-14 border-s-2 border-ink ps-6">
              <blockquote className="text-2xl leading-snug font-medium text-balance">“{c("quote")}”</blockquote>
              <figcaption className="label mt-4">— {c("quoteBy")}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* THE GROUP: who does what along the chain */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <p className="label">{c("groupLabel")}</p>
          <h2 className="h-section mt-3 max-w-3xl">{c("groupTitle")}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{c("groupLead")}</p>

          {/* the chain at a glance */}
          <ol className="mt-12 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {journey.map((s, i) => (
              <li key={s.title} className="flex items-center gap-3">
                <span className="tabular-nums text-ink-muted">{pad(i + 1)}</span>
                <span>{s.title}</span>
                {i < journey.length - 1 && <Arrow />}
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {group.map((co) => (
              <article key={co.id} className="flex flex-col bg-paper p-6 md:p-7">
                <p className="label">{co.sister ? c("groupSister") : c("groupHome")}</p>
                <h3 className="mt-3 text-xl font-medium">{co.name}</h3>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-ink-muted">{c("groupRole")}</dt>
                    {/* TODO(owners): what this company does */}
                    <dd className="mt-1">{c("tbd")}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">{c("groupSteps")}</dt>
                    <dd className="mt-1">{co.steps.length ? co.steps.join(", ") : c("tbd")}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE THE FACTORY: one tile per step; placeholders until the real photos arrive */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <p className="label">{c("floorLabel")}</p>
          <h2 className="h-section mt-3">{c("floorTitle")}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{c("floorLead")}</p>

          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {floor.map((s, i) => (
              <article key={s.title}>
                <div className="relative aspect-4/3 overflow-hidden bg-surface">
                  {s.photo ? (
                    <Image src={s.photo} alt={s.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm text-ink-muted">{c("photoSoon")}</div>
                  )}
                </div>
                <p className="mt-4 text-sm text-ink-muted tabular-nums">{pad(i + 1)}</p>
                <h3 className="mt-1 text-lg font-medium">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAPACITY */}
      <section className="border-y border-line">
        <div className="container-x py-16 md:py-20">
          <p className="label">{c("capacityLabel")}</p>
          <h2 className="h-section mt-3">{c("capacityTitle")}</h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 border-t border-line md:grid-cols-4">
            {CAPACITY.map((f) => (
              <div key={f.key} className="flex flex-col-reverse border-b border-line py-7">
                <dt className="label mt-2">{c(`capacity.${f.key}`)}</dt>
                <dd className="text-3xl font-medium tracking-tight tabular-nums md:text-4xl rtl:text-right" dir="ltr">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* QUALITY & COMPLIANCE */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">{c("qualityLabel")}</p>
            <h2 className="h-section mt-3">{c("qualityTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c("qualityLead")}</p>
          </div>
          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {qualitySteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] border-b border-line py-6">
                <span className="text-sm text-ink-muted tabular-nums">{pad(i + 1)}</span>
                <div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* TODO(owners): certifications / audits with their logos */}
        <div className="container-x mt-16">
          <h3 className="text-lg font-medium">{c("certsTitle")}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li
                key={n}
                className="grid aspect-3/2 place-items-center border border-dashed border-ink/20 text-sm text-ink-muted"
              >
                {c("tbd")}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARKETS */}
      <section className="bg-surface py-20 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="label">{c("marketsLabel")}</p>
            <h2 className="h-section mt-3">{c("marketsTitle")}</h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-3xl font-medium tracking-tight md:text-4xl rtl:tracking-normal">
              {markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <Link href="/clients" className="link mt-8 inline-flex items-center gap-2">
              {c("marketsLink")} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* TIMELINE. TODO(owners): real milestones with years */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-section">{c("timelineTitle")}</h2>
          <ol className="mt-12 border-t border-line">
            {timeline.map((item, i) => (
              <li key={i} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
                <span className="text-lg font-medium tabular-nums sm:col-span-2">{item.year}</span>
                <p className="leading-relaxed text-ink-muted sm:col-span-8">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VISIT: a buyer-specific close instead of the generic enquiry band */}
      <section data-nav-dark className="bg-ink text-paper">
        <div className="container-x flex flex-col items-start gap-8 py-20 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-section">{c("visitTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">{c("visitBody")}</p>
          </div>
          <Link href="/contact" className="btn shrink-0 bg-paper text-ink hover:bg-surface">
            {c("visitButton")} <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
