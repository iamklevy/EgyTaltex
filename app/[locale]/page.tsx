import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { clientLogos, unsplash } from "@/content/images";
import { cn } from "@/lib/utils";
import { Appear, Reveal } from "@/components/site/motion";
import { Arrow, Chapter } from "@/components/site/editorial";
import { PRODUCT_SLUGS } from "@/components/site/nav-links";
import { ProgrammeCta } from "@/components/site/programme-cta";
import { StitchUnderline, ThreadJourney, type JourneyStep } from "@/components/home/stitch";

/** Who runs each station of the chain, in messages `home.journey` order. */
const JOURNEY_OWNERS: { who: string[]; sister: boolean }[] = [
  { who: ["Global Textile Industries"], sister: true },
  { who: ["Egytaltex"], sister: false },
  { who: ["Odiba Textile"], sister: true },
  { who: ["Egytaltex"], sister: false },
  { who: ["Egytaltex"], sister: false },
  { who: ["Egytaltex", "Italian Touch"], sister: false },
  { who: ["Egytaltex"], sister: false },
  { who: ["Egytaltex"], sister: false },
];

/** Route codes shown over each export market, in messages `home.markets` order. */
const MARKET_ROUTES = ["CAI → ITA", "CAI → USA", "CAI → GBR", "CAI → ZAF"];

/** Lookbook frames; `range` is the index of the caption in messages `products.items`. */
const LOOKBOOK = [
  { src: "/products/polo-blue-detail.png", range: 0, span: "col-span-6", aspect: "aspect-[16/10]" },
  { src: "/products/jacket-red.png", range: 2, span: "col-span-3", aspect: "aspect-square" },
  { src: "/products/tee-burgundy.png", range: 1, span: "col-span-3 md:mt-14", aspect: "aspect-square" },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const h = await getTranslations("home");

  const journey: JourneyStep[] = (h.raw("journey") as { title: string; body: string }[]).map((s, i) => ({
    ...s,
    ...JOURNEY_OWNERS[i],
  }));
  const range = (t.raw("products.items") as { name: string }[]).map((p) => p.name);
  const markets = h.raw("markets") as string[];

  const stats = [
    { value: "2001", label: h("statFounded") },
    { value: "3,000", label: h("statDaily") },
    { value: "100%", label: h("statExport") },
    { value: "4", label: h("statMarkets") },
  ];

  return (
    <>
      {/* HERO — the cover page */}
      <section className="relative overflow-hidden pt-28 md:pt-32">
        <div className="container-x">
          <Appear
            y={0}
            duration={0.8}
            className="label-mono border-b border-ink/15 pb-4 text-ink-muted"
          >
            <span>{h("heroKicker")}</span>
          </Appear>

          <div className="grid gap-12 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col justify-between lg:col-span-7">
              <h1 className="heading-serif text-[clamp(3.4rem,9vw,8.25rem)] leading-[0.95]">
                <Appear as="span" y={40} delay={0.1} className="block">
                  {h("heroLine1")}
                </Appear>
                <Appear as="span" y={40} delay={0.3} className="block italic">
                  <span className="relative inline-block">
                    {h("heroLine2")}
                    <StitchUnderline />
                  </span>
                </Appear>
              </h1>

              <div className="mt-10 lg:mt-0">
                <Appear as="p" y={20} delay={0.5} className="max-w-xl text-lg leading-relaxed text-ink-muted">
                  {h("heroLead")}
                </Appear>
                <Appear y={20} delay={0.65} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link href="/contact" className="btn-dark">
                    {h("heroCtaPrimary")} <Arrow />
                  </Link>
                  <a href="#journey" className="link-underline inline-flex items-center gap-2 font-medium text-ink">
                    {h("heroCtaSecondary")} <span aria-hidden>↓</span>
                  </a>
                </Appear>
              </div>
            </div>

            <Appear y={30} delay={0.35} duration={1} className="lg:col-span-5">
              <figure>
                <div className="relative aspect-4/5 overflow-hidden bg-paper-2">
                  <Image
                    src={unsplash("hero", 1000)}
                    alt={h("heroCaption")}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="label-mono mt-3 text-ink-muted">{h("heroCaption")}</figcaption>
              </figure>
            </Appear>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-y border-ink/15 md:mt-20 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className={cn(
                  "flex flex-col-reverse gap-2 py-7 md:px-8",
                  i % 2 === 1 && "border-s border-ink/15 ps-6",
                  i > 1 && "border-t border-ink/15 md:border-t-0",
                  i === 2 && "md:border-s md:ps-8",
                  i === 0 && "md:ps-0",
                )}
              >
                <dt className="label-mono text-ink-muted">{s.label}</dt>
                <dd className="font-serif text-5xl text-ink md:text-6xl" dir="ltr">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* I — THE HOUSE */}
      <section className="py-28 md:py-40">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Chapter>{h("manifestoChapter")}</Chapter>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <blockquote className="heading-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.06]">
                <span className="text-stitch">“</span>
                {h("manifestoQuote")}
                <span className="text-stitch">”</span>
              </blockquote>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-ink-muted">{h("manifestoBody")}</p>
              </Reveal>
              <Reveal delay={0.2} className="flex flex-col items-start justify-end gap-5 md:items-end md:text-end">
                <p className="font-serif text-2xl text-ink italic">— {h("manifestoSign")}</p>
                <Link href="/company" className="link-underline inline-flex items-center gap-2 font-medium text-ink">
                  {h("manifestoLink")} <Arrow />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* II — FROM FIBRE TO FINISH */}
      <section id="journey" className="scroll-mt-20 border-y border-ink/10 bg-paper-2 py-28 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Chapter>{h("journeyChapter")}</Chapter>
                <h2 className="heading-serif mt-6 text-5xl md:text-6xl">{h("journeyTitle")}</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">{h("journeyLead")}</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ThreadJourney steps={journey} inHouseLabel={h("inHouse")} sisterLabel={h("sister")} />
          </div>
        </div>
      </section>

      {/* III — THE RANGE */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Chapter>{h("rangeChapter")}</Chapter>
              <h2 className="heading-serif mt-6 text-5xl md:text-6xl">{h("rangeTitle")}</h2>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col items-start justify-end gap-5 lg:col-span-5">
              <p className="text-lg leading-relaxed text-ink-muted">{h("rangeLead")}</p>
              <Link href="/products" className="link-underline inline-flex items-center gap-2 font-medium text-ink">
                {h("rangeCta")} <Arrow />
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ol className="border-t border-ink/15">
                {range.map((name, i) => (
                  <li key={name} className="border-b border-ink/15">
                    <Link
                      href={`/products#${PRODUCT_SLUGS[i]}`}
                      className="group flex items-baseline gap-5 py-3.5 transition-colors hover:text-stitch"
                    >
                      <span className="label-mono w-6 text-ink-muted group-hover:text-stitch">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-3xl rtl:group-hover:-translate-x-2">
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="grid grid-cols-6 content-start gap-4 md:gap-6 lg:col-span-7">
              {LOOKBOOK.map((f, i) => (
                <Reveal key={f.src} delay={i * 0.1} className={f.span}>
                  <figure>
                    <div className={cn("relative overflow-hidden bg-paper-2", f.aspect)}>
                      <Image
                        src={f.src}
                        alt={range[f.range]}
                        fill
                        sizes="(min-width: 1024px) 30vw, 50vw"
                        // multiply melts the photos' white studio backdrops into the paper
                        className="object-cover mix-blend-multiply transition-transform duration-1000 ease-out hover:scale-105"
                      />
                    </div>
                    <figcaption className="label-mono mt-3 text-ink-muted">
                      Fig. {String(i + 2).padStart(2, "0")} — {range[f.range]}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IV — WORN IN */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper md:py-36">
        <div className="weave-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <Reveal>
            <Chapter className="text-stitch-light">{h("marketsChapter")}</Chapter>
            <h2 className="heading-serif mt-6 max-w-3xl text-5xl text-paper md:text-6xl">{h("marketsTitle")}</h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((m, i) => (
              <Reveal key={m} delay={i * 0.08} className="border-t border-paper/20 py-6">
                <p className="label-mono text-stitch-light" dir="ltr">
                  {MARKET_ROUTES[i]}
                </p>
                <p className="mt-3 font-serif text-4xl md:text-5xl">{m}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-20">
            <p className="label-mono text-paper/60">{h("clientsLabel")}</p>
            <div className="mt-6 grid grid-cols-2 gap-px bg-paper/10 sm:grid-cols-4">
              {clientLogos.map((c) => (
                <div key={c.name} className="group grid h-28 place-items-center bg-paper px-6">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={160}
                    height={64}
                    className="max-h-12 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* V — YOUR PROGRAMME */}
      <ProgrammeCta />
    </>
  );
}
