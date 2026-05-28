"use client";

import { useEffect, useRef } from "react";
import { SVGS } from "@/data/svgs";

interface AnimatedSvgProps {
  /** key into the extracted SVGS map */
  name: keyof typeof SVGS | string;
  className?: string;
  /** seconds for the draw stroke */
  duration?: number;
  /** stagger between consecutive lines, seconds */
  stagger?: number;
  /** when true, stroke draw is scrubbed to scroll position instead of one-shot on view */
  scrub?: boolean;
}

const STROKED = "path,line,polyline,circle,rect,ellipse";

/**
 * Renders a raw extracted SVG and animates every stroked element with a
 * line-draw (stroke-dashoffset) effect once it scrolls into view.
 */
export function AnimatedSvg({ name, className, duration = 2.4, stagger = 0.12, scrub = false }: AnimatedSvgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const markup = SVGS[name as string];

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    const items = Array.from(svg.querySelectorAll<SVGGeometryElement>(STROKED))
      .filter((el) => {
        const stroke = el.getAttribute("stroke") || getComputedStyle(el).stroke;
        return stroke && stroke !== "none" && stroke !== "rgba(0, 0, 0, 0)";
      })
      .map((el, i) => {
        let len = 0;
        try {
          len = typeof el.getTotalLength === "function" ? el.getTotalLength() : 0;
        } catch {
          len = 0;
        }
        let y0 = 0;
        let y1 = 0;
        try {
          const b = el.getBBox();
          if (!len) len = (b.width + b.height) * 2 || 1000;
          y0 = b.y;
          y1 = b.y + b.height;
        } catch {
          if (!len) len = 1000;
        }
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        return { el, len, y0, y1, i };
      });

    if (scrub) {
      // tie each line's draw progress to how far the SVG has travelled through the viewport
      items.forEach(({ el }) => {
        el.style.transition = "none";
      });
      // Map each element's draw window to its VERTICAL position in the illustration,
      // not to draw order or arc length. This makes the line track scroll by construction:
      // a path draws while the scroll crosses the band of the page where it physically
      // sits. The two giant winding strokes each span ~half the height, so they draw
      // slowly across half the scroll; the small markers draw quickly as you reach them.
      // Earlier length/order sequencing drew middle markers, then the top line, then the
      // bottom line — out of vertical order, which looked broken.
      const ys = items.flatMap((it) => [it.y0, it.y1]);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const spanY = maxY - minY || 1;
      const norm = (y: number) => (y - minY) / spanY;
      // floor each window so flat (zero-height) markers still draw fully instead of
      // stalling — they snap on quickly once the scroll reaches their band.
      const ranges = items.map((it) => {
        const start = norm(it.y0);
        return { start, end: Math.max(norm(it.y1), start + 0.02) };
      });
      // Anchor progress to the SECTION the line lives in, not the giant svg itself.
      // Using the svg's own rect saturates the math at load (the svg is taller than the
      // viewport, so it's always "in view") which drew the whole line instantly.
      const section = (svg.closest(".wrapper") as HTMLElement) ?? svg;
      // Continuous rAF loop: always recompute from the live rect so it tracks scroll
      // even under Lenis (which advances scroll inside its own rAF, not via scroll events).
      let raf = 0;
      let last = -1;
      const update = () => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // distance the section travels while crossing the viewport, from its top
        // hitting the top of the screen to its bottom leaving the bottom.
        const scrollable = rect.height - vh;
        const raw = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        const LONG_LINE_LEN = 5000;
        // base progress tracks scroll 1:1 (with a slight 1.1 curve). The short straight
        // strokes use this so they stay locked to the scroll position.
        const pTrack = Math.pow(raw, 1.1);
        // the complex winding strokes race ahead so they reach full draw while still
        // on screen, giving them time to animate in view instead of finishing off-screen.
        const SCRUB_SPEED = 1.25;
        const pFast = Math.min(1, pTrack * SCRUB_SPEED);
        if (pTrack !== last) {
          last = pTrack;
          items.forEach(({ el, len, y0 }, i) => {
            const { start, end } = ranges[i];
            const isComplex = len > LONG_LINE_LEN;
            const p = isComplex ? pFast : pTrack;
            let local = Math.min(1, Math.max(0, (p - start) / (end - start || 1)));
            // Long sweeping strokes pack a lot of (mostly horizontal) arc length into a
            // small vertical band, so their pen-tip races across the screen right after it
            // starts. Ease-in their local progress: the opening sweep crawls, then it
            // catches up by the end. LONG_EASE dials how slow the opening is.
            // The lower complex stroke (y0 >= 0, the Shanghai -> "every step" sweep)
            // races too far ahead there, so give it a steeper ease to lag closer to scroll.
            if (isComplex) {
              const LONG_EASE = y0 >= 0 ? 2.8 : 1.8;
              local = Math.pow(local, LONG_EASE);
            }
            el.style.strokeDashoffset = `${len * (1 - local)}`;
          });
        }
        raf = requestAnimationFrame(update);
      };
      raf = requestAnimationFrame(update);
      return () => cancelAnimationFrame(raf);
    }

    items.forEach(({ el, i }) => {
      el.style.transition = `stroke-dashoffset ${duration}s ease`;
      el.style.transitionDelay = `${(i % 40) * stagger}s`;
    });
    const draw = () => items.forEach(({ el }) => (el.style.strokeDashoffset = "0"));

    if (typeof IntersectionObserver === "undefined") {
      draw();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            draw();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [duration, stagger, scrub, markup]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}
