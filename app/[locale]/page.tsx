import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { categoryPhotos, clientLogos, unsplash } from "@/content/images";
import { Arrow } from "@/components/site/editorial";
import { PRODUCT_SLUGS } from "@/components/site/nav-links";
import { ProductTile } from "@/components/site/product-tile";
import { ProgrammeCta } from "@/components/site/programme-cta";

/** Who runs each step of the chain, in messages `home.journey` order. */
const JOURNEY_OWNERS: { who: string; sister: boolean }[] = [
  { who: "Global Textile Industries", sister: true },
  { who: "Egytaltex", sister: false },
  { who: "Odiba Textile", sister: true },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex · Italian Touch", sister: false },
  { who: "Egytaltex", sister: false },
  { who: "Egytaltex", sister: false },
];

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
      {/* HERO */}
      <section>
        <div className="container-x grid gap-10 pt-12 pb-16 md:pt-20 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="label">{h("heroKicker")}</p>
            <h1 className="h-display mt-5">{h("heroTitle")}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{h("heroLead")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {h("heroCtaPrimary")}
              </Link>
              <Link href="/products" className="btn-secondary">
                {h("heroCtaProducts")}
              </Link>
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden bg-surface lg:col-span-6 lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src={unsplash("hero", 1200)}
              alt={h("heroImageAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-x">
          <dl className="grid grid-cols-2 gap-x-6 border-t border-line md:grid-cols-4">
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
        <div className="container-x py-12">
          <p className="label">{h("clientsLabel")}</p>
          <ul className="mt-8 grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
            {clientLogos.map((c) => (
              <li key={c.name} className="flex h-12 items-center justify-center">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={140}
                  height={56}
                  className="max-h-10 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
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
      <section id="process" className="scroll-mt-16 bg-surface py-20 md:py-28">
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
