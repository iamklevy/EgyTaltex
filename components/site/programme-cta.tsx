import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { Reveal } from "@/components/site/motion";
import { Arrow, Chapter } from "@/components/site/editorial";

/** "Have a programme in mind?" — the closing enquiry block shared by editorial pages. */
export async function ProgrammeCta({ chapter }: { chapter?: string }) {
  const h = await getTranslations("home");

  return (
    <section className="py-28 md:py-40">
      <div className="container-x">
        <Reveal>
          <Chapter>{chapter ?? h("ctaChapter")}</Chapter>
          <h2 className="heading-serif mt-6 max-w-4xl text-[clamp(3rem,7.5vw,6.75rem)] leading-[0.98]">
            {h("ctaTitle")}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-12 border-t border-ink/15 pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">{h("ctaBody")}</p>
            <Link href="/contact" className="btn-dark mt-9">
              {h("ctaButton")} <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="label-mono text-ink-muted">{h("ctaOr")}</p>
            <a href={`mailto:${EMAIL}`} className="link-underline mt-4 inline-block font-serif text-3xl text-ink">
              {EMAIL}
            </a>
            <a href={telHref(PHONE_1)} dir="ltr" className="mt-2 block font-serif text-3xl text-ink-muted hover:text-ink">
              {PHONE_1}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
