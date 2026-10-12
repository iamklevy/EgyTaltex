"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";

/**
 * Open/close state for the header's frosted dropdowns. A mouse opens it on hover;
 * touch and keyboard toggle it from a button. Tapping outside, Escape, or tabbing
 * away closes it. Spread `rootProps` on the wrapper that holds trigger and panel.
 */
export function useHoverMenu<T extends HTMLElement = HTMLDivElement>() {
  const [open, setOpen] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rootProps = {
    ref,
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setOpen(true),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setOpen(false),
    onBlur: (e: FocusEvent) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false),
  };

  return { open, setOpen, toggle: () => setOpen((o) => !o), rootProps };
}

/** Classes for the dropdown's positioning wrapper; pt-3 bridges the gap so the pointer can travel into it. */
export const dropdownWrap = (open: boolean) =>
  [
    "absolute top-full pt-3 transition duration-200",
    open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
  ].join(" ");
