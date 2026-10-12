/** Opening block of an inner page: a heading and one paragraph, then a hairline. */
export function PageHero({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="border-b border-line">
      <div className="container-x pt-16 pb-14 md:pt-24 md:pb-20">
        <h1 className="h-display max-w-4xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>}
      </div>
    </section>
  );
}
