"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades its `[data-reveal-item]` children up as they scroll (or swipe) into view; items that
 * arrive together are staggered. Only items that start out of view are hidden, so nothing on
 * screen flickers on load, and without JS or with reduced motion everything simply shows.
 */
export function RevealGroup({ as: Tag = "div", className, children }: { as?: "div" | "ol"; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0;
    };
    const pending = items.filter((el) => !inView(el));
    pending.forEach((el) => (el.dataset.reveal = "pending"));

    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        arriving
          .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left || a.getBoundingClientRect().top - b.getBoundingClientRect().top)
          .forEach((el, i) => {
            el.style.setProperty("--reveal-delay", `${Math.min(i, 3) * 90}ms`);
            el.dataset.reveal = "shown";
            io.unobserve(el);
          });
      },
      { threshold: 0.15 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
