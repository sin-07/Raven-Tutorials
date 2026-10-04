'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function SheryiansSplash() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#020306]/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none select-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <Loader 
        size="xl" 
        text="Raven Tutorials" 
        subtitle="Concept-First Pedagogy • Patna Campus" 
      />
    </div>
  );
}
