import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { categoryPhotos, clientLogos, heroPhoto } from "@/content/images";
import { JOURNEY_OWNERS } from "@/content/group";
import { Arrow } from "@/components/site/editorial";
import { PRODUCT_SLUGS } from "@/components/site/nav-links";
import { ProductTile } from "@/components/site/product-tile";
import { ProgrammeCta } from "@/components/site/programme-cta";

const pad = (n: number) => String(n).padStart(2, "0");

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const h = await getTranslations("home");

  const products = (t.raw("products.items") as { name: string; desc: string }[]).map((p, i) => ({
    ...p,
    slug: PRODUCT_SLUGS[i],
    photo: categoryPhotos[PRODUCT_SLUGS[i]],
  }));
  const featured = products.filter((p) => p.photo);
  const journey = (h.raw("journey") as { title: string; body: string }[]).map((s, i) => ({ ...s, ...JOURNEY_OWNERS[i] }));
  const work = h.raw("work") as { title: string; body: string }[];
  const glance = h.raw("glance") as { label: string; value: string }[];

  const stats = [
    { value: "2001", label: h("statFounded") },
    { value: "3,000", label: h("statDaily") },
    { value: "100%", label: h("statExport") },
    { value: "4", label: h("statMarkets") },
  ];

  return (
    <>
      {/* HERO: full-bleed photo, centred copy. The floating header sits over the top of it. */}
      <section>
        <div
          data-nav-dark
          className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-ink text-paper"
        >
          <Image
            src={heroPhoto}
            alt={h("heroImageAlt")}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[center_40%]"
          />
          {/* darkens the photo so white type reads on any part of it */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-ink/55 via-ink/45 to-ink/70" />

          <div className="container-x flex flex-col items-center pt-[calc(var(--header-h)+3rem)] pb-20 text-center md:pb-24">
            <h1 className="h-display max-w-4xl">{h("heroTitle")}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">{h("heroLead")}</p>
            <p className="mt-5 text-sm text-paper/80">{h("heroKicker")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn bg-paper text-ink hover:bg-surface">
                {h("heroCtaPrimary")}
              </Link>
              <Link
                href="/products"
                className="btn border border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
              >
                {h("heroCtaProducts")}
              </Link>
            </div>
          </div>
        </div>

        <div className="container-x">
          <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse py-8">
                <dt className="label mt-2">{s.label}</dt>
                <dd className="text-4xl font-medium tracking-tight tabular-nums md:text-5xl rtl:text-right" dir="ltr">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="border-y border-line">
        <div className="container-x pt-12">
          <p className="label">{h("clientsLabel")}</p>
        </div>
        {/* Two identical halves slide by -50% for a seamless loop; each half repeats the logos so it
            outruns wide screens. Kept LTR so the loop direction doesn't flip in Arabic. */}
        <div dir="ltr" className="group mt-8 overflow-hidden pb-12 mask-x-from-90% mask-x-to-100%">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
            {[0, 1].map((half) => (
              <ul
                key={half}
                aria-hidden={half === 1 || undefined}
                className={`flex shrink-0 items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${half === 1 ? "motion-reduce:hidden" : ""}`}
              >
                {[...clientLogos, ...clientLogos].map((c, i) => (
                  <li
                    key={`${c.name}-${i}`}
                    aria-hidden={i >= clientLogos.length || undefined}
                    className={`flex h-12 items-center px-8 md:px-12 ${i >= clientLogos.length ? "motion-reduce:hidden" : ""}`}
                  >
                    <Image
                      src={c.logo}
                      alt={half === 0 && i < clientLogos.length ? c.name : ""}
                      width={140}
                      height={56}
                      className="max-h-10 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE MAKE */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="h-section">{h("productsTitle")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">{h("productsLead")}</p>
            </div>
            <Link href="/products" className="link inline-flex items-center gap-2">
              {h("productsCta")} <Arrow />
            </Link>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-3">
            {featured.map((p) => (
              <Link key={p.slug} href={`/products#${p.slug}`} className="group">
                <ProductTile src={p.photo} alt={p.name} sizes="(min-width: 640px) 33vw, 100vw" />
                <h3 className="mt-4 text-lg font-medium">{p.name}</h3>
                <p className="mt-1 text-ink-muted">{p.desc}</p>
              </Link>
            ))}
          </div>

          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {products
              .filter((p) => !p.photo)
              .map((p) => (
                <li key={p.slug} className="border-b border-line">
                  <Link href={`/products#${p.slug}`} className="flex items-center justify-between py-4 hover:text-ink-muted">
                    {p.name} <Arrow />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* HOW IT'S MADE */}
      <section id="process" className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 className="h-section">{h("processTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{h("processLead")}</p>
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-paper p-6 md:p-7">
                <span className="text-sm text-ink-muted tabular-nums">{pad(i + 1)}</span>
                <h3 className="mt-6 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                <p className="mt-auto pt-6 text-xs text-ink-muted">
                  <span className={s.sister ? "text-ink" : undefined}>{s.sister ? h("sister") : h("inHouse")}</span>
                  <span dir="ltr"> · {s.who}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WORKING WITH US */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="h-section">{h("workTitle")}</h2>
            <ol className="mt-10 border-t border-line">
              {work.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                  <span className="text-ink-muted tabular-nums">{pad(i + 1)}</span>
                  <div>
                    <h3 className="text-lg font-medium">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="h-section">{h("glanceTitle")}</h2>
            <dl className="mt-10 border-t border-line">
              {glance.map((g) => (
                <div key={g.label} className="border-b border-line py-5">
                  <dt className="label">{g.label}</dt>
                  <dd className="mt-1">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ProgrammeCta />
    </>
  );
}
