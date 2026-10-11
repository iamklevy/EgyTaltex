import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { featureImage, productMedia, productionGallery } from "@/content/images";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, ZoomIn } from "@/components/site/motion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("heroTitle"), description: t("heroLead"), alternates: alternatesFor(locale, "/products") };
}

// Editorial bento spans (desktop). Index matches messages `products.items` order.
const spans = [
  "md:col-span-4 md:row-span-2", // 0 Cotton Yarn — large feature
  "md:col-span-2 md:row-span-1", // 1 Knitted Fabrics
  "md:col-span-2 md:row-span-1", // 2 T-Shirts
  "md:col-span-2 md:row-span-2", // 3 Polo — tall
  "md:col-span-4 md:row-span-1", // 4 Loungewear — wide
  "md:col-span-4 md:row-span-1", // 5 Private Label — wide
];

function ProductCard({ i, name, desc }: { i: number; name: string; desc: string }) {
  const media = productMedia[i];
  return (
    <Reveal delay={(i % 3) * 0.08} className={cn("group relative min-h-65 overflow-hidden rounded-3xl bg-sand-200", spans[i])}>
      <Image
        src={media.src}
        alt={name}
        fill
        sizes="(min-width: 768px) 66vw, 100vw"
        className={cn("object-cover transition-transform duration-1200 ease-out group-hover:scale-110", media.pos)}
      />
      {/* gradient veil */}
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
      {/* index chip */}
      <span className="absolute start-5 top-5 rounded-full bg-sand-50/85 px-3 py-1 text-[11px] font-medium tracking-widest2 text-ink uppercase backdrop-blur-sm">
        0{i + 1}
      </span>
      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3 className="font-serif text-2xl text-sand-50 md:text-3xl">{name}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-100/0 transition-all duration-500 group-hover:text-sand-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {desc}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-widest2 text-gold-light uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="h-px w-6 bg-gold-light" /> Egytaltex
        </span>
      </div>
    </Reveal>
  );
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const p = await getTranslations("products");
  const items = p.raw("items") as { name: string; desc: string }[];
  const tags = [p("tag1"), p("tag2"), p("tag3"), p("tag4")];

  return (
    <>
      <PageHero eyebrow={p("heroEyebrow")} title={p("heroTitle")} lead={p("heroLead")} />

      {/* BENTO GALLERY */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {items.map((item, i) => (
              <ProductCard key={i} i={i} name={item.name} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE — split image + copy */}
      <section className="py-8 md:py-16">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-ink lg:grid-cols-2">
            <div className="relative min-h-85 overflow-hidden lg:min-h-full">
              <ZoomIn className="absolute inset-0">
                <Image src={featureImage} alt={p("featureTitle")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
              </ZoomIn>
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-ink/40 rtl:bg-linear-to-l" />
            </div>
            <div className="relative p-9 text-sand-50 md:p-14">
              <div className="weave-bg pointer-events-none absolute inset-0 opacity-10" />
              <div className="relative">
                <span className="eyebrow text-gold-light">{p("heroEyebrow")}</span>
                <h2 className="heading-serif mt-4 text-4xl text-sand-50 md:text-5xl">{p("featureTitle")}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-sand-200">{p("featureBody")}</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-3 rounded-xl border border-sand-50/10 bg-sand-50/4 px-4 py-3 text-sm transition-colors duration-500 hover:border-gold/50"
                    >
                      <span className="text-gold-light">✦</span>
                      <span className="text-sand-100">{tag}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn mt-9 bg-sand-50 text-ink hover:bg-white">
                  {t("nav.cta")} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FROM OUR FLOOR — real production photography */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{p("galleryEyebrow")}</span>
            <h2 className="heading-serif mt-4 max-w-xl text-4xl md:text-5xl">{p("galleryTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
              {productionGallery.map((src, i) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-200">
                  <Image
                    src={src}
                    alt={`${t("common.brand")} ${t("common.production")} ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
