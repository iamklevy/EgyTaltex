import { Appear } from "@/components/site/motion";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-sand-50 md:pt-44 md:pb-28">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x relative">
        <Appear as="span" y={16} duration={0.6} className="eyebrow text-gold-light">
          {eyebrow}
        </Appear>
        <Appear as="h1" delay={0.1} className="heading-serif mt-4 max-w-3xl text-5xl text-sand-50 md:text-7xl">
          {title}
        </Appear>
        {lead && (
          <Appear as="p" delay={0.2} className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-200">
            {lead}
          </Appear>
        )}
      </div>
    </section>
  );
}
