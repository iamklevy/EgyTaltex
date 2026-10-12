import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EMAIL, PHONE_1, telHref } from "@/lib/contact";
import { Arrow } from "@/components/site/editorial";

/** Closing enquiry band shared by the main pages. */
export async function ProgrammeCta() {
  const h = await getTranslations("home");

  return (
    <section className="bg-ink text-paper">
      <div className="container-x grid gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="h-section">{h("ctaTitle")}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{h("ctaBody")}</p>
          <Link href="/contact" className="btn mt-8 bg-paper text-ink hover:bg-surface">
            {h("ctaButton")} <Arrow />
          </Link>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-sm text-paper/60">{h("ctaOr")}</p>
          <a href={`mailto:${EMAIL}`} className="mt-3 block text-xl hover:underline">
            {EMAIL}
          </a>
          <a href={telHref(PHONE_1)} dir="ltr" className="mt-1 block text-xl text-paper/70 hover:text-paper">
            {PHONE_1}
          </a>
        </div>
      </div>
    </section>
  );
}
