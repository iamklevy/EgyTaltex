import { cn } from "@/lib/utils";

/** Chapter mark that opens an editorial section: a short rule, then a mono label. */
export function Chapter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-stitch", className)}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Forward arrow that flips in RTL. */
export function Arrow() {
  return (
    <span aria-hidden className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}
