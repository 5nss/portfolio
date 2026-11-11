"use client";

import { useEffect } from "react";

/**
 * Two page-wide effects, kept out of the server-rendered components:
 *   - a soft spotlight that follows the pointer across the whole page
 *   - elements marked data-reveal fade in as they scroll into view
 * Without JavaScript everything is simply visible.
 */
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    let io: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      // Anything already on screen is revealed before the hidden state switches on, so nothing flickers.
      for (const el of els) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      }
      root.classList.add("reveal-ready");

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            io?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -6% 0px" },
      );
      for (const el of els) {
        if (!el.classList.contains("is-in")) io.observe(el);
      }
    }

    // One style write per frame at most, however fast the pointer moves.
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--sx", `${e.clientX}px`);
        root.style.setProperty("--sy", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
