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
        if (!len) {
          const b = el.getBBox();
          len = (b.width + b.height) * 2 || 1000;
        }
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        return { el, len, i };
      });

    if (scrub) {
      // tie each line's draw progress to how far the SVG has travelled through the viewport
      items.forEach(({ el }) => {
        el.style.transition = "none";
      });
      // sequence the lines by cumulative length so the whole illustration draws as ONE
      // continuous stroke (top -> bottom). Without this, Path1's undrawn tail and Path2's
      // drawn head overlap near section-3 and leave a visible gap.
      const totalLen = items.reduce((s, it) => s + it.len, 0) || 1;
      let acc = 0;
      const ranges = items.map((it) => {
        const start = acc / totalLen;
        acc += it.len;
        return { start, end: acc / totalLen };
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
        // front-load: first ~half draws faster, then eases back to normal pace.
        const p = raw < 0.5 ? raw * 1.5 : 0.75 + (raw - 0.5) * 0.5;
        if (p !== last) {
          last = p;
          items.forEach(({ el, len }, i) => {
            const { start, end } = ranges[i];
            const local = Math.min(1, Math.max(0, (p - start) / (end - start || 1)));
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
