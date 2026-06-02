"use client";

import { useEffect, useRef, useState } from "react";

export function DistributionTail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    let len = 0;
    try {
      len = path.getTotalLength();
    } catch {
      len = 1000;
    }

    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    // Target the parent section (.section-7) to track its viewport position
    const section = svg.closest(".section-7") || svg;

    let rafId = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // To make the animation a seamless visual continuation of the previous winding line:
      // - Start drawing the tail line when the rocket (at the top of section-7) is fully in view (around 40% down the screen).
      // - Finish drawing the tail line when the section is scrolled up and the paper airplane is in full view (around 20% off-screen at the top).
      const startY = vh * 0.40;
      const endY = -vh * 0.20;

      const total = startY - endY;
      const current = startY - rect.top;
      const p = Math.min(1, Math.max(0, current / total));

      // Slight easing curve for high-fidelity continuation feel
      const easedP = Math.pow(p, 1.2);

      path.style.strokeDashoffset = `${len * (1 - easedP)}`;
      setProgress(easedP);

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Fades in and scales up during the last 30% of the line drawing
  const airplaneOpacity = progress < 0.7 ? 0 : (progress - 0.7) / 0.3;
  const airplaneScale = progress < 0.7 ? 0.4 : 0.4 + ((progress - 0.7) / 0.3) * 0.8; // scale from 0.4 to 1.2

  return (
    <div className="section-tail" aria-hidden>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 360"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Winding tail line */}
        <path
          ref={pathRef}
          d="M420 10 C 470 40, 490 95, 470 145 C 450 195, 480 240, 540 250 C 620 258, 660 252, 690 254 C 712 257, 728 272, 718 282 C 706 290, 696 278, 706 268 C 720 256, 760 260, 800 256 C 880 252, 980 280, 1060 296"
        />

        {/* Paper airplane rendered as clean, native SVG paths */}
        <g
          transform={`translate(1060, 296) scale(${airplaneScale}) rotate(0) translate(-5, -95)`}
          opacity={airplaneOpacity}
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ transition: "opacity 0.05s ease-out, transform 0.05s ease-out" }}
        >
          <path d="M5 95 L128 18 L108 32 L125 22 L122 70 Z" />
          <path d="M5 95 L108 32" />
          <path d="M5 95 L122 70" />
          <path d="M5 95 L88 60" />
          <path d="M50 82 L108 32" />
        </g>
      </svg>
    </div>
  );
}
