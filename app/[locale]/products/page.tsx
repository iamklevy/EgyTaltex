import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { categoryPhotos, poloGallery, productionGallery } from "@/content/images";
import { Appear, Reveal } from "@/components/site/motion";
import { Arrow, Chapter } from "@/components/site/editorial";
import { PRODUCT_SLUGS } from "@/components/site/nav-links";
import { ProgrammeCta } from "@/components/site/programme-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/products") };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const p = await getTranslations("products");

  const items = (p.raw("items") as { name: string; desc: string }[]).map((item, i) => ({
    ...item,
    slug: PRODUCT_SLUGS[i],
    photo: categoryPhotos[PRODUCT_SLUGS[i]],
  }));
  const specs = p.raw("specs") as { label: string; value: string }[];
  const finishes = p.raw("finishes") as string[];

  return (
    <>
      {/* HERO — title page of the catalogue, with its index */}
      <section className="pt-28 md:pt-32">
        <div className="container-x">
          <Appear y={0} duration={0.8} className="border-b border-ink/15 pb-4">
            <Chapter>{p("heroChapter")}</Chapter>
          </Appear>

          <div className="grid gap-14 pt-10 pb-20 md:pt-14 md:pb-28 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Appear as="h1" y={40} delay={0.1} className="heading-serif text-[clamp(3.2rem,8vw,7.25rem)] leading-[0.95]">
                {p("heroTitle")}
              </Appear>
              <Appear as="p" y={20} delay={0.3} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
                {p("heroLead")}
              </Appear>
            </div>

            <Appear y={20} delay={0.4} className="lg:col-span-5 lg:pt-4">
              <nav aria-label={p("indexLabel")}>
                <p className="label-mono text-ink-muted">{p("indexLabel")}</p>
                <ol className="mt-4 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-8">
                  {items.map((item, i) => (
                    <li key={item.slug} className="border-b border-ink/15">
                      <a
                        href={`#${item.slug}`}
                        className="group flex items-baseline gap-3 py-2.5 transition-colors hover:text-stitch"
                      >
                        <span className="label-mono text-ink-muted group-hover:text-stitch">{pad(i + 1)}</span>
                        <span className="text-[0.95rem]">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Appear>
          </div>
        </div>
      </section>

      {/* FEATURE — the polo, where the whole chain shows */}
      <section className="border-y border-ink/10 bg-paper-2 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="grid grid-cols-2 content-start gap-4 md:gap-5 lg:col-span-7">
            {[categoryPhotos["polo-shirts"]!, ...poloGallery].map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.08} className={i === 0 ? "col-span-2" : undefined}>
                <figure>
                  <div className={`relative overflow-hidden bg-paper-3 ${i === 0 ? "aspect-[16/10]" : "aspect-square"}`}>
                    <Image
                      src={src}
                      alt={`${items[0].name} ${i + 1}`}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"}
                      // multiply melts the photos' white studio backdrops into the paper
                      className="object-cover mix-blend-multiply transition-transform duration-1000 ease-out hover:scale-105"
                    />
                  </div>
                  <figcaption className="label-mono mt-2.5 text-ink-muted">
                    Fig. {pad(i + 1)} — {items[0].name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Chapter>{p("featureChapter")}</Chapter>
                <h2 className="heading-serif mt-6 text-5xl md:text-6xl">{p("featureTitle")}</h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-muted">{p("featureBody")}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <dl className="mt-10 border-t border-ink/15">
                  {specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-5 gap-4 border-b border-ink/15 py-4">
                      <dt className="label-mono col-span-2 pt-1.5 text-ink-muted">{s.label}</dt>
                      <dd className="col-span-3 font-serif text-xl text-ink md:text-2xl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/contact" className="btn-dark mt-10">
                  {p("enquire")} <Arrow />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE — one swatch card per category */}
      <section className="py-28 md:py-36">
        <div className="container-x">
          <Reveal>
            <Chapter>{p("catalogueChapter")}</Chapter>
            <h2 className="heading-serif mt-6 text-5xl md:text-6xl">{p("catalogueTitle")}</h2>
          </Reveal>

          <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.slug} id={item.slug} delay={(i % 3) * 0.08} className="scroll-mt-28">
                <article className="group">
                  <div className="relative aspect-4/3 overflow-hidden bg-paper-2 sm:aspect-4/5">
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    ) : (
                      // not photographed yet: a knitted swatch carrying the reference number
                      <div className="knit-texture absolute inset-0 grid place-items-center transition-transform duration-1000 ease-out group-hover:scale-105">
                        <span className="font-serif text-[7rem] leading-none text-ink/85 italic" dir="ltr">
                          {pad(i + 1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="label-mono mt-4 flex items-center justify-between text-ink-muted">
                    <span>
                      {p("ref")} {pad(i + 1)}
                    </span>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 text-ink hover:text-stitch">
                      {p("enquire")} <Arrow />
                    </Link>
                  </div>
                  <h3 className="mt-3 font-serif text-3xl text-ink">{item.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.desc}</p>
                </article>
              </Reveal>
            ))}

            {/* fills the twelfth slot of the grid: anything else they can knit */}
            <Reveal delay={0.16} className="sm:col-span-2 lg:col-span-1">
              <Link
                href="/contact"
                className="group flex h-full min-h-80 flex-col justify-between bg-ink p-8 text-paper transition-colors hover:bg-ink-soft"
              >
                <span className="label-mono text-stitch-light">
                  {p("ref")} {pad(items.length + 1)}
                </span>
                <span>
                  <span className="block font-serif text-4xl md:text-5xl">{p("customTitle")}</span>
                  <span className="mt-4 block max-w-xs leading-relaxed text-paper-3">{p("customBody")}</span>
                  <span className="label-mono mt-8 inline-flex items-center gap-2 text-paper group-hover:text-stitch-light">
                    {p("enquire")} <Arrow />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MADE TO YOUR SPEC */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <div className="weave-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <Reveal>
            <Chapter className="text-stitch-light">{p("finishChapter")}</Chapter>
            <h2 className="heading-serif mt-6 max-w-3xl text-5xl text-paper md:text-6xl">{p("finishTitle")}</h2>
          </Reveal>
          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4 border-t border-paper/20 py-5">
                <span className="label-mono text-stitch-light">{pad(i + 1)}</span>
                <span className="font-serif text-2xl">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FROM OUR FLOOR — real production photography */}
      <section className="pt-28 md:pt-36">
        <div className="container-x">
          <Reveal>
            <Chapter>{p("galleryChapter")}</Chapter>
            <h2 className="heading-serif mt-6 max-w-xl text-5xl md:text-6xl">{p("galleryTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
            {productionGallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.06}>
                <div className="group relative aspect-square overflow-hidden bg-paper-2">
                  <Image
                    src={src}
                    alt={`${t("common.brand")} ${t("common.production")} ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProgrammeCta chapter={t("nav.cta")} />
    </>
  );
}
