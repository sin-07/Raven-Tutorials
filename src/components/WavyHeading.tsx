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
  gradientClassName = 'text-gradient-emerald',
  className = 'text-4xl sm:text-6xl font-black text-white font-outfit tracking-tight leading-[1.1]',
  as: Component = 'h1',
}: WavyHeadingProps) {
  return (
    <Component className={`relative text-center ${className}`}>
      {text && <span>{text} </span>}
      {gradientText && <span className={gradientClassName}>{gradientText}</span>}
      {children}
    </Component>
  );
}
