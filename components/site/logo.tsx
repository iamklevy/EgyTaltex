import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ alt, light = false }: { alt: string; light?: boolean }) {
  return (
    <div className="flex flex-col select-none">
      <Image
        src="/logo.png"
        alt={alt}
        width={160}
        height={32}
        priority
        className={cn("h-8 w-auto self-start", light && "brightness-0 invert")}
      />
      <span className={cn("mt-1 text-[10px] tracking-widest2 uppercase", light ? "text-sand-200" : "text-ink-muted")}>
        Textiles &amp; Garments
      </span>
    </div>
  );
}
