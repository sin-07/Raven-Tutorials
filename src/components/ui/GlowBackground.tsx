'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, floatLoop, drawSVGPath } from '@/lib/gsap';

export const GlowBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const circle3Ref = useRef<SVGCircleElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // SVG: Floating decorative circles
    if (circle1Ref.current) floatLoop(circle1Ref.current, 20, 4);
    if (circle2Ref.current) floatLoop(circle2Ref.current, -14, 5.5);
    if (circle3Ref.current) floatLoop(circle3Ref.current, 10, 3.5);

    // SVG: Draw decorative paths on mount
    if (path1Ref.current) drawSVGPath(path1Ref.current, 0.2);
    if (path2Ref.current) drawSVGPath(path2Ref.current, 0.6);

    // SVG: Pulsing scale on circles
    [circle1Ref, circle2Ref, circle3Ref].forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          scale: 1.15,
          opacity: 0.6,
          duration: 2 + i * 0.7,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          transformOrigin: 'center center',
        });
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(0,229,168,0.2)_0%,_rgba(0,229,168,0.1)_30%,_transparent_70%)]" />

      {/* Animated SVG decorations */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="circleGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5A8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00E5A8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="circleGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5A8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00E5A8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Floating circle orbs */}
        <circle
          ref={circle1Ref}
          cx="10%"
          cy="20%"
          r="180"
          fill="url(#circleGrad1)"
        />
        <circle
          ref={circle2Ref}
          cx="90%"
          cy="60%"
          r="220"
          fill="url(#circleGrad2)"
        />
        <circle
          ref={circle3Ref}
          cx="50%"
          cy="85%"
          r="140"
          fill="url(#circleGrad1)"
        />

        {/* Decorative animated paths */}
        <path
          ref={path1Ref}
          d="M 0 300 Q 200 100, 400 300 T 800 300 T 1200 300"
          fill="none"
          stroke="#00E5A8"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />
        <path
          ref={path2Ref}
          d="M 0 500 Q 300 200, 600 500 T 1200 500"
          fill="none"
          stroke="#00E5A8"
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GlowBackground;

