'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function RavenSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 650);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 950);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#050507] flex flex-col items-center justify-center transition-all duration-300 pointer-events-none select-none ${
        fading ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
      }`}
      aria-hidden="true"
    >
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <Loader 
          size="xl" 
          text="Raven Tutorials" 
          subtitle="Concept-First Pedagogy • Patna Campus" 
        />
      </div>
    </div>
  );
}
