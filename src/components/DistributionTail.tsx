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

    const section = svg.closest(".section-7") || svg;

    let rafId = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const startY = vh * 0.4;
      const endY = -vh * 0.2;

      const total = startY - endY;
      const current = startY - rect.top;
      const p = Math.min(1, Math.max(0, current / total));
      const easedP = Math.pow(p, 1.2);

      path.style.strokeDashoffset = `${len * (1 - easedP)}`;
      setProgress(easedP);

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // The airplane PNG (244×178) is rendered at SVG x=910, y=170 width=200 height=146.
  // Nose tip in PNG is at roughly (14px, 138px) → pct (5.7%, 77.5%)
  // SVG nose tip = (910 + 200*0.057, 170 + 146*0.775) = (921.4, 283.2)
  // We round to (921, 283) as the line endpoint and scale anchor.
  const NOSE_X = 1400;
  const NOSE_Y = 445;

  const airplaneOpacity = progress < 0.7 ? 0 : (progress - 0.7) / 0.3;
  const airplaneScale =
    progress < 0.7 ? 0.5 : 0.5 + ((progress - 0.7) / 0.3) * 0.6;

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
        <defs>
          <filter
            id="airplane-lineart"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.299 -0.587 -0.114 0 1"
            />
          </filter>
        </defs>

        {/* Winding tail line — endpoint lands exactly on airplane nose tip (921, 283) */}
        <path
          ref={pathRef}
          d="M420 10 C 470 40, 490 95, 470 145 C 450 195, 480 240, 540 250 C 620 258, 660 252, 690 254 C 712 257, 728 272, 718 282 C 706 290, 696 278, 706 268 C 720 256, 760 260, 800 256 C 860 252, 900 272, 921 283"
        />

        {/* Airplane image — x=910, y=170, width=200, height=146 so nose tip (5.7%,77.5%) = (921,283) */}
        <g
          transform={`translate(${NOSE_X}, ${NOSE_Y}) scale(${airplaneScale}) translate(${-NOSE_X}, ${-NOSE_Y})`}
          opacity={airplaneOpacity}
          style={{ transition: "opacity 0.04s linear" }}
        >
          <image
            href="/airplane.png"
            x="910"
            y="170"
            width="200"
            height="146"
            filter="url(#airplane-lineart)"
          />
        </g>
      </svg>
    </div>
  );
}
