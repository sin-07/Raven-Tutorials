'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current || typeof window === 'undefined') return;

    const chars = headingRef.current.querySelectorAll('.wavy-char');
    if (!chars.length) return;

    // High-performance one-time wave entrance animation with automatic GPU memory cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 28,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.02,
          ease: 'power3.out',
          clearProps: 'transform,willChange',
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, [text, gradientText]);

  // Split word into characters wrapped in inline-block spans
  const renderChars = (str: string, extraClass = '') => {
    return str.split(' ').map((word, wordIndex, wordsArr) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className={`wavy-char inline-block ${extraClass}`}
          >
            {char}
          </span>
        ))}
        {wordIndex < wordsArr.length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <Component ref={headingRef} className={`relative text-center ${className}`}>
      {text && renderChars(text)}
      {gradientText && (
        <>
          {text && <span>&nbsp;</span>}
          <span className={gradientClassName}>
            {renderChars(gradientText, gradientClassName)}
          </span>
        </>
      )}
      {children}
    </Component>
  );
}
