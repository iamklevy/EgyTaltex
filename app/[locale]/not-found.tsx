import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="relative overflow-hidden bg-sand-50 pt-44 pb-24">
      <div className="weave-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative text-center">
        <p className="font-serif text-8xl text-gold">404</p>
        <h1 className="heading-serif mt-4 text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ink-muted">{t("body")}</p>
        <Link href="/" className="btn-dark mt-9">
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
