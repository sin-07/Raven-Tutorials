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
  className = 'text-4xl sm:text-6xl font-black text-neutral-950 font-outfit tracking-tight leading-[1.1]',
  as: Component = 'h1',
}: WavyHeadingProps) {
  return (
    <Component className={`relative text-center ${className}`}>
      {text && <span className="text-neutral-950">{text} </span>}
      {gradientText && (
        <span 
          className={
            gradientClassName || 
            'inline-block bg-[#86efac] text-black px-3 py-0.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1 mx-1.5 align-middle font-black'
          }
        >
          {gradientText}
        </span>
      )}
      {children}
    </Component>
  );
}
