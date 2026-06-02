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

      // Calibrated scroll range to start after trigger1 completes near the rocket
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
        {/* Defs containing the line-art filter to transparentize the PNG background and force lines to solid black */}
        <defs>
          <filter id="airplane-lineart" x="0%" y="0%" width="100%" height="100%">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.299 -0.587 -0.114 0 1"
            />
          </filter>
        </defs>

        {/* Winding tail line ending exactly at the airplane's bottom-left nose tip (968, 302) */}
        <path
          ref={pathRef}
          d="M420 10 C 470 40, 490 95, 470 145 C 450 195, 480 240, 540 250 C 620 258, 660 252, 690 254 C 712 257, 728 272, 718 282 C 706 290, 696 278, 706 268 C 720 256, 760 260, 800 256 C 880 252, 940 285, 968 302"
        />

        {/* Sketched paper airplane aligned perfectly. 
            Scaling transform centered around connection anchor point (968, 302) for absolute precision. */}
        <g
          transform={`translate(968, 302) scale(${airplaneScale}) translate(-968, -302)`}
          opacity={airplaneOpacity}
          style={{ transition: "opacity 0.05s ease-out, transform 0.05s ease-out" }}
        >
          <image
            href="/airplane.png"
            x="956"
            y="185"
            width="180"
            height="131"
            filter="url(#airplane-lineart)"
          />
        </g>
      </svg>
    </div>
  );
}
