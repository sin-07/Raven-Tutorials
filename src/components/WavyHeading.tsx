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
  continuous = true,
}: WavyHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current || typeof window === 'undefined') return;

    const chars = headingRef.current.querySelectorAll('.wavy-char');
    if (!chars.length) return;

    // 1. Entrance Wave Animation (staggered rise with elastic ease)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 35,
          scale: 0.85,
          rotateZ: -4,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: 'back.out(2)',
          onComplete: () => {
            if (continuous) {
              // 2. Smooth Continuous Sine Wave (gentle organic floating ripple)
              gsap.to(chars, {
                y: -6,
                duration: 1.6,
                ease: 'sine.inOut',
                stagger: {
                  each: 0.06,
                  repeat: -1,
                  yoyo: true,
                },
              });
            }
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, [continuous, text, gradientText]);

  // Split word into characters wrapped in inline-block spans
  const renderChars = (str: string, extraClass = '') => {
    return str.split(' ').map((word, wordIndex, wordsArr) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className={`wavy-char inline-block will-change-transform ${extraClass}`}
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
