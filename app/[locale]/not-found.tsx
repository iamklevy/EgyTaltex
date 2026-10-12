import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container-x pt-[calc(var(--header-h)+7rem)] pb-28 md:pt-[calc(var(--header-h)+10rem)] md:pb-40">
      <p className="label">404</p>
      <h1 className="h-display mt-4">{t("title")}</h1>
      <p className="mt-5 max-w-md text-lg text-ink-muted">{t("body")}</p>
      <Link href="/" className="btn-primary mt-9">
        {t("back")}
      </Link>
    </section>
  );
}
