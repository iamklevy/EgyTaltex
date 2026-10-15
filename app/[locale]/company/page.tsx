import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FileDown } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { PROFILE_PDF } from "@/lib/contact";
import { alternatesFor } from "@/lib/seo";
import { CAPACITY, CERTIFICATIONS, FLOOR_PHOTOS, MACHINERY, companyHeroPhoto } from "@/content/company";
import { GROUP } from "@/content/group";
import { Arrow } from "@/components/site/editorial";
import { RevealGroup } from "@/components/site/reveal-group";
import { StepPhoto } from "@/components/site/step-photo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/company") };
}

const pad = (n: number) => String(n).padStart(2, "0");

// The same label / title / lead opening on every section.
function SectionHead({ label, title, lead, className }: { label: string; title: string; lead?: string; className?: string }) {
  return (
    <div className={className}>
      <p className="label">{label}</p>
      <h2 className="h-section mt-3 max-w-3xl">{title}</h2>
      {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted md:mt-5">{lead}</p>}
    </div>
  );
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("company");
  const h = await getTranslations("home");

  // each company with its role (sisters' roles live with the clients page)
  const journey = h.raw("journey") as { title: string }[];
  const sisterRoles = (await getTranslations("clients")).raw("sisterList") as { name: string; role: string }[];
  const group = GROUP.map((co) => ({
    ...co,
    role: co.sister ? sisterRoles.find((s) => s.name === co.name)?.role : c("groupHomeRole"),
  }));

  const floor = (c.raw("floor") as { title: string; body: string }[]).map((s, i) => ({ ...s, photo: FLOOR_PHOTOS[i] }));
  const qualitySteps = c.raw("qualitySteps") as { title: string; body: string }[];
  const timeline = c.raw("timeline") as { year: string; body: string }[];
  const markets = c.raw("markets") as string[];
  // two possible LCP images (one per orientation), so eager + high priority rather than a preload
  const heroCommon = { alt: "", sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { srcSet: heroLandscape } = getImageProps({ ...heroCommon, ...companyHeroPhoto.landscape }).props;
  const { props: heroPortrait } = getImageProps({ ...heroCommon, ...companyHeroPhoto.portrait });
  const machinery = MACHINERY.map((d) => ({ ...d, total: d.machines.reduce((n, m) => n + m.count, 0) }));

  const machineList = (d: (typeof machinery)[number]) => (
    <ul>
      {d.machines.map((m) => (
        <li key={m.key} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
          <span>
            {c(`machines.${m.key}`)}
            {m.detail && (
              <span dir="ltr" className="mt-0.5 block text-ink-muted rtl:text-right">
                {m.detail}
              </span>
            )}
          </span>
          <span className="tabular-nums">{m.count}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* HERO: full-bleed photo, copy anchored bottom-start. Dark, so the header starts smoked. */}
      <section
        data-nav-dark
        className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-paper md:min-h-[70svh]"
      >
        {/* art direction: a wide crop of the machine for landscape screens, the portrait shot for portrait ones */}
        <picture>
          <source media="(orientation: landscape)" srcSet={heroLandscape} sizes="100vw" />
          <img
            {...heroPortrait}
            alt={c("heroImageAlt")}
            className="absolute inset-0 -z-10 size-full object-cover object-[center_42%] landscape:object-center"
          />
        </picture>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-ink/50 via-ink/35 to-ink/85" />
        <div className="container-x pt-[calc(var(--header-h)+4rem)] pb-12 md:pb-20">
          <p className="text-sm text-paper/75">{c("heroKicker")}</p>
          <h1 className="h-display mt-4 max-w-4xl">{c("heroTitle")}</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-paper/80 md:mt-6 md:text-lg">{c("heroLead")}</p>
        </div>
      </section>

      {/* STORY: one big line, the story, and the founder's quote */}
      <section className="py-16 md:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="label lg:col-span-3">{c("storyLabel")}</p>
          <div className="lg:col-span-9">
            <p className="text-2xl leading-tight font-medium tracking-[-0.02em] text-balance sm:text-3xl md:text-4xl rtl:tracking-normal">
              {c("manifesto")}
            </p>
            <div className="mt-8 grid gap-5 leading-relaxed text-ink-muted md:mt-10 md:grid-cols-2 md:gap-10 md:text-lg">
              <p>{c("storyP1")}</p>
              <p>{c("storyP2")}</p>
            </div>
            <figure className="mt-10 border-s-2 border-ink ps-5 md:mt-14 md:ps-6">
              <blockquote className="text-xl leading-snug font-medium text-balance md:text-2xl">“{c("quote")}”</blockquote>
              <figcaption className="label mt-3 md:mt-4">{c("quoteBy")}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* HISTORY: right after the story it continues. Stages from the archived egytaltex.com (2018–2024);
          only 2001 is a firm year. TODO(owners): real years per milestone */}
      <section className="bg-surface py-16 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHead label={c("timelineLabel")} title={c("timelineTitle")} className="lg:col-span-4" />
          <ol className="border-t border-line lg:col-span-8">
            {timeline.map((item, i) => (
              <li key={i} className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6 md:py-6">
                <span className="font-medium tabular-nums md:text-lg">{item.year}</span>
                <p className="leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE GROUP: who does what along the chain */}
      <section className="py-16 md:py-28">
        <div className="container-x">
          <SectionHead label={c("groupLabel")} title={c("groupTitle")} lead={c("groupLead")} />

          {/* the chain at a glance: a two-column list on phones, an arrowed line from sm up */}
          <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-2 md:mt-12">
            {journey.map((s, i) => (
              <li key={s.title} className="flex items-center gap-2 sm:gap-3">
                <span className="tabular-nums text-ink-muted">{pad(i + 1)}</span>
                <span>{s.title}</span>
                {i < journey.length - 1 && (
                  <span className="hidden sm:inline-flex">
                    <Arrow />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {group.map((co) => (
              <article key={co.id} className={`flex flex-col p-5 md:p-7 ${co.sister ? "bg-paper" : "bg-surface"}`}>
                <p className="label">{co.sister ? c("groupSister") : c("groupHome")}</p>
                <h3 className="mt-2 text-lg font-medium md:mt-3 md:text-xl">{co.name}</h3>
                <dl className="mt-4 text-sm md:mt-6">
                  <dt className="text-ink-muted">{c("groupRole")}</dt>
                  <dd className="mt-1">{co.role ?? c("tbd")}</dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE THE FACTORY: one portrait photo per step; a swipeable row on phones, a grid from sm up */}
      <section className="bg-surface py-16 md:py-28">
        <div className="container-x">
          <SectionHead label={c("floorLabel")} title={c("floorTitle")} lead={c("floorLead")} />
          <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted sm:hidden">
            {c("floorSwipe")} <Arrow />
          </p>

          <RevealGroup className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {floor.map((s) => (
              <article key={s.title} data-reveal-item className="group w-[78%] shrink-0 snap-start sm:w-auto">
                <StepPhoto
                  src={s.photo}
                  alt={s.title}
                  title={s.title}
                  titleAs="h3"
                  fallback={c("photoSoon")}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
                  className="aspect-4/5 sm:aspect-3/4"
                />
                <p className="mt-4 px-1 text-sm leading-relaxed text-ink-muted md:text-base">{s.body}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CAPACITY: figure on top, label under it, so the figures line up even when a label wraps */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionHead label={c("capacityLabel")} title={c("capacityTitle")} />
          <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line md:mt-10 md:grid-cols-4">
            {CAPACITY.map((f) => (
              <div key={f.key} className="flex flex-col border-b border-line py-5 md:py-7">
                <dd className="order-first text-3xl font-medium tracking-tight tabular-nums md:text-4xl rtl:text-right" dir="ltr">
                  {f.value}
                </dd>
                <dt className="label mt-1.5 md:mt-2">{c(`capacity.${f.key}`)}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* MACHINERY: the machine park by department. Phones get one collapsible row per department;
          from md up every list is shown in two columns. */}
      <section className="bg-surface py-16 md:py-28">
        <div className="container-x grid gap-8 md:gap-12 lg:grid-cols-12">
          <SectionHead label={c("machineryLabel")} title={c("machineryTitle")} lead={c("machineryLead")} className="lg:col-span-4" />

          <div className="border-t border-ink md:hidden">
            {machinery.map((d) => (
              <details key={d.dept} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {c(`machineryDepts.${d.dept}`)}
                  <span className="flex items-center gap-3 text-sm font-normal text-ink-muted tabular-nums">
                    {d.total}
                    <span aria-hidden className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <div className="pb-3 [&_li:last-child]:border-b-0">{machineList(d)}</div>
              </details>
            ))}
          </div>

          <div className="hidden gap-x-10 md:block md:columns-2 lg:col-span-8">
            {machinery.map((d) => (
              <div key={d.dept} className="mb-10 break-inside-avoid">
                <h3 className="flex items-baseline justify-between border-b border-ink pb-3 text-lg font-medium">
                  {c(`machineryDepts.${d.dept}`)}
                  <span className="text-sm text-ink-muted tabular-nums">{d.total}</span>
                </h3>
                {machineList(d)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY & COMPLIANCE: the three checks, then the certificates */}
      <section className="py-16 md:py-28">
        <div className="container-x grid gap-8 md:gap-12 lg:grid-cols-12">
          <SectionHead label={c("qualityLabel")} title={c("qualityTitle")} lead={c("qualityLead")} className="lg:col-span-5" />
          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {qualitySteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-5 md:grid-cols-[3rem_1fr] md:py-6">
                <span className="text-sm text-ink-muted tabular-nums">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-medium md:text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted md:text-base">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="container-x mt-12 md:mt-16">
          <h3 className="label">{c("certsTitle")}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {CERTIFICATIONS.map((cert) => (
              <li
                key={cert.key}
                className="flex items-center justify-between gap-4 border border-line px-5 py-4 sm:flex-col sm:items-start sm:gap-8 sm:p-6"
              >
                <span dir="ltr" className="text-xl font-medium tracking-tight tabular-nums sm:text-2xl">
                  {cert.code}
                </span>
                <span className="text-end text-sm text-ink-muted sm:text-start">{c(`certs.${cert.key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARKETS */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHead label={c("marketsLabel")} title={c("marketsTitle")} className="lg:col-span-5" />
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-3xl font-medium tracking-tight md:gap-x-8 md:text-4xl rtl:tracking-normal">
              {markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <Link href="/clients" className="link mt-6 inline-flex items-center gap-2 md:mt-8">
              {c("marketsLink")} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* VISIT: a buyer-specific close instead of the generic enquiry band */}
      <section data-nav-dark className="bg-ink text-paper">
        <div className="container-x flex flex-col items-stretch gap-8 py-16 sm:items-start md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-section">{c("visitTitle")}</h2>
            <p className="mt-4 leading-relaxed text-paper/70 md:mt-5 md:text-lg">{c("visitBody")}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="btn bg-paper text-ink hover:bg-surface">
              {c("visitButton")} <Arrow />
            </Link>
            <a
              href={PROFILE_PDF}
              target="_blank"
              rel="noopener"
              className="btn border border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
            >
              <FileDown className="size-4" strokeWidth={1.75} /> {c("profileButton")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
