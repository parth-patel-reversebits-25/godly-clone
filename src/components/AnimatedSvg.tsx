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
}

const STROKED = "path,line,polyline,circle,rect,ellipse";

/**
 * Renders a raw extracted SVG and animates every stroked element with a
 * line-draw (stroke-dashoffset) effect once it scrolls into view.
 */
export function AnimatedSvg({ name, className, duration = 2.4, stagger = 0.12 }: AnimatedSvgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const markup = SVGS[name as string];

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    const els = Array.from(svg.querySelectorAll<SVGGeometryElement>(STROKED)).filter((el) => {
      const stroke = el.getAttribute("stroke") || getComputedStyle(el).stroke;
      return stroke && stroke !== "none" && stroke !== "rgba(0, 0, 0, 0)";
    });

    els.forEach((el, i) => {
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
      el.style.transition = `stroke-dashoffset ${duration}s ease`;
      el.style.transitionDelay = `${(i % 40) * stagger}s`;
    });

    const draw = () => els.forEach((el) => (el.style.strokeDashoffset = "0"));

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
  }, [duration, stagger, markup]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}
