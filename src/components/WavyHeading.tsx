'use client';

import React from 'react';

interface WavyHeadingProps {
  children?: React.ReactNode;
  text?: string;
  gradientText?: string;
  gradientClassName?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  continuous?: boolean;
}

export default function WavyHeading({
  children,
  text,
  gradientText,
  gradientClassName,
  className = 'text-4xl sm:text-6xl font-black text-white font-outfit tracking-tight leading-[1.1]',
  as: Component = 'h1',
}: WavyHeadingProps) {
  return (
    <Component className={`relative text-center ${className}`}>
      {text && <span className="text-white drop-shadow-sm">{text} </span>}
      {gradientText && (
        <span 
          className={
            gradientClassName || 
            `inline-block bg-gradient-to-r from-[#ff6b3d] to-[#e8602e] text-white px-3.5 py-0.5 rounded-2xl border border-white/20 shadow-[0_0_25px_rgba(232,96,46,0.5)] - hover: hover:scale-105 transition-all duration-300 cursor-default mx-1.5 align-middle font-black will-change-transform relative group`
          }
        >
          {gradientText}
        </span>
      )}
      {children}
    </Component>
  );
}
