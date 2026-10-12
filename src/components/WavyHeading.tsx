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
            'text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7]'
          }
        >
          {gradientText}
        </span>
      )}
      {children}
    </Component>
  );
}
