import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Garment photo on a light grey tile. The studio shots have white backdrops,
 * so multiply melts them into the tile. Categories without a photo show their
 * name instead.
 */
export function ProductTile({
  src,
  alt,
  sizes,
  className,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-4/5 overflow-hidden bg-surface", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-lg text-ink-muted">{alt}</div>
      )}
    </div>
  );
}
