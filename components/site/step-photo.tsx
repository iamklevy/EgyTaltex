import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A manufacturing-step photo as a rounded card: the step title sits on a dark fade at the
 * bottom of the photo. Hovering anything inside a `group` ancestor eases the photo in slightly.
 * With no `src`, the card shows `fallback`.
 */
export function StepPhoto({
  src,
  alt,
  title,
  titleAs: Title = "p",
  sizes,
  fallback,
  className,
}: {
  src?: string | null;
  alt: string;
  title: string;
  titleAs?: "p" | "h3";
  sizes: string;
  fallback?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-(--ui-radius) bg-surface-2", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <div className="absolute inset-0 -z-10 grid place-items-center text-sm text-ink-muted">{fallback}</div>
      )}
      {src && <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-ink/75 via-ink/30 to-transparent" />}

      <Title
        className={cn(
          "absolute inset-x-4 bottom-4 text-lg leading-snug font-medium text-balance md:inset-x-5 md:bottom-5",
          src ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </Title>

      {/* a hairline inside the edge, so pale photos don't melt into a pale section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-ink/10 ring-inset" />
    </div>
  );
}
