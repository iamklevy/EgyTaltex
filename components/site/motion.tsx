"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Motion primitives.
 *
 * Each is a thin client wrapper around server-rendered `children`, so the copy
 * stays in the HTML for crawlers — the client bundle only carries the
 * animation. Everything collapses to "just show it" under prefers-reduced-motion.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** The mounted flag never changes after hydration, so nothing to subscribe to. */
const subscribeNoop = () => () => {};

type Direction = "up" | "left" | "right";

const offset = (d: Direction) => ({
  y: d === "up" ? 28 : 0,
  x: d === "left" ? 28 : d === "right" ? -28 : 0,
});

/** Fade + slide as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, ...offset(direction) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Fade + rise on first paint (above-the-fold content). */
export function Appear({
  children,
  delay = 0,
  y = 24,
  scale,
  duration = 0.7,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
  as?: "div" | "span" | "p" | "h1";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: scale ? 0 : y, scale: scale ?? 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Image-style zoom-out as it scrolls into view. */
export function ZoomIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { scale: 1.15 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to `to` once it scrolls into view. */
export function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  // The server renders the real figure; we only drop to 0 once the client is
  // live, so a no-JS render never states a wrong number.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  const n = !mounted || reduce ? to : value;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Bobbing line under the hero's "Scroll" label. */
export function ScrollCue({ label }: { label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted lg:flex"
    >
      <span className="text-[10px] tracking-widest2 uppercase">{label}</span>
      <motion.span
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="block h-8 w-px bg-ink-muted"
      />
    </motion.div>
  );
}
