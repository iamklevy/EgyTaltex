"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE } from "@/components/site/motion";

/** A hand-drawn red thread that sews itself under a headline word. */
export function StitchUnderline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 -bottom-[0.12em] h-[0.22em] w-full overflow-visible", className)}
    >
      <motion.path
        d="M2 14 C 60 4, 110 22, 170 12 S 280 4, 330 13 S 385 18, 398 9"
        fill="none"
        stroke="var(--color-stitch)"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
      />
    </svg>
  );
}

export type JourneyStep = {
  title: string;
  body: string;
  /** who does this step, e.g. ["Egytaltex"] or ["Odiba Textile"] */
  who: string[];
  sister: boolean;
};

/**
 * "From fibre to finish": a dashed seam runs down the list of steps and a red
 * thread is pulled along it as the reader scrolls, ticking off each station.
 */
export function ThreadJourney({
  steps,
  inHouseLabel,
  sisterLabel,
}: {
  steps: JourneyStep[];
  inHouseLabel: string;
  sisterLabel: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <ol ref={ref} className="relative">
      {/* the seam, then the thread pulled through it */}
      <span aria-hidden className="absolute start-[19px] top-2 bottom-2 border-s border-dashed border-ink/25" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : progress }}
        className="absolute start-[18px] top-2 bottom-2 w-[3px] origin-top rounded-full bg-stitch"
      />

      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-6 pb-12 last:pb-0 md:gap-8">
          <motion.span
            // hex, not CSS vars: Motion can only tween colours it can parse
            initial={reduce ? false : { backgroundColor: "#f4efe6", color: "#131b2e" }}
            whileInView={{ backgroundColor: "#b23a2a", color: "#f4efe6" }}
            viewport={{ once: true, margin: "0px 0px -45% 0px" }}
            transition={{ duration: 0.4 }}
            className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-ink/20 font-mono text-xs"
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>

          <div className="pt-1.5">
            <h3 className="font-serif text-3xl leading-tight text-ink md:text-4xl">{s.title}</h3>
            <p className="mt-2 max-w-md leading-relaxed text-ink-muted">{s.body}</p>
            <p className="label-mono mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1",
                  s.sister ? "border-stitch/40 text-stitch-deep" : "border-ink/20 text-ink",
                )}
              >
                {s.sister ? sisterLabel : inHouseLabel}
              </span>
              <span dir="ltr">{s.who.join(" · ")}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
