import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { categoryPhotos, poloGallery, productionGallery } from "@/content/images";
import { Arrow } from "@/components/site/editorial";
import { PRODUCT_SLUGS } from "@/components/site/nav-links";
import { PageHero } from "@/components/site/page-hero";
import { ProductTile } from "@/components/site/product-tile";
import { ProgrammeCta } from "@/components/site/programme-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/products") };
}

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
      <PageHero title={p("heroTitle")} lead={p("heroLead")} />

      {/* CATALOGUE */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <h2 className="sr-only">{p("catalogueTitle")}</h2>
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <article key={item.slug} id={item.slug} className="group">
                <ProductTile
                  src={item.photo}
                  alt={item.name}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  eager={i < 4} // first row of the 4-column grid is above the fold
                />
                <h3 className="mt-4 text-lg font-medium">{item.name}</h3>
                <p className="mt-1 leading-relaxed text-ink-muted">{item.desc}</p>
                <Link href="/contact" className="link mt-3 inline-flex items-center gap-2 text-sm">
                  {p("enquire")} <Arrow />
                </Link>
              </article>
            ))}

            {/* anything else they can knit */}
            <Link href="/contact" data-nav-dark className="flex aspect-4/5 flex-col justify-end bg-ink p-6 text-paper hover:bg-ink-soft">
              <span className="text-2xl font-medium tracking-tight">{p("customTitle")}</span>
              <span className="mt-3 leading-relaxed text-paper/70">{p("customBody")}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm">
                {p("enquire")} <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* THE POLO */}
      <section className="border-t border-line bg-surface py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="grid grid-cols-2 content-start gap-3 lg:col-span-7">
            {poloGallery.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden bg-surface-2">
                <Image
                  src={src}
                  alt={`${items[0].name} ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="h-section">{p("featureTitle")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{p("featureBody")}</p>
              <dl className="mt-10 border-t border-line">
                {specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 gap-4 border-b border-line py-4">
                    <dt className="label">{s.label}</dt>
                    <dd className="col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="btn-primary mt-10">
                {t("nav.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="h-section lg:col-span-4">{p("finishTitle")}</h2>
          <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
            {finishes.map((f) => (
              <li key={f} className="border-b border-line py-4">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-section">{p("galleryTitle")}</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {productionGallery.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={src}
                  alt={`${t("common.brand")} ${t("common.production")} ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgrammeCta />
    </>
  );
}
