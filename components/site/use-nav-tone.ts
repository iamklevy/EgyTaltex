"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type NavTone = "light" | "dark";

/**
 * "dark" while the floating header sits over a section marked `data-nav-dark`, else "light".
 * Samples three points along the bar's middle (start, centre, end) and goes dark when most of
 * them land on a dark section, so a half-covered edge doesn't make it flicker.
 *
 * `initial` is what the server renders, so pages that open on a dark hero are right from the
 * first frame. On load and route changes the tone is set before paint with `animate` false (no
 * transitions), then re-enabled once that frame has painted, so only scroll-driven changes fade.
 */
export function useNavTone(bar: RefObject<HTMLElement | null>, initial: NavTone, deps: unknown[] = []) {
  const [state, setState] = useState({ tone: initial, animate: false });

  useLayoutEffect(() => {
    const measure = (): NavTone | null => {
      const el = bar.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const y = r.top + r.height / 2;
      const xs = [r.left + 24, r.left + r.width / 2, r.right - 24];
      const darkHits = xs.filter((x) => {
        // skip the bar, its contents and its wrappers (<header>, container) to reach the page beneath
        const under = document.elementsFromPoint(x, y).find((n) => !el.contains(n) && !n.contains(el));
        return !!under?.closest("[data-nav-dark]");
      }).length;
      return darkHits >= 2 ? "dark" : "light";
    };
    const apply = (animate: boolean) => {
      const tone = measure();
      if (tone) setState((s) => (s.tone === tone && s.animate === animate ? s : { tone, animate }));
    };

    apply(false);
    // two frames: the first paints the instant tone, the second turns transitions back on
    let settle = requestAnimationFrame(() => {
      settle = requestAnimationFrame(() => setState((s) => (s.animate ? s : { ...s, animate: true })));
    });

    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          apply(true);
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      cancelAnimationFrame(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-sample when the caller's deps (the route) change
  }, deps);

  return state;
}
