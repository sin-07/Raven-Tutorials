'use client';

import React, { useEffect, useState } from 'react';

export default function SheryiansSplash() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center transition-all duration-500 pointer-events-none select-none ${
        mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      aria-hidden="true"
    >
      {/* Background orange radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px] pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(232, 96, 46, 0.35) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Raven Emblem with Sheryians Orange Glow */}
        <div className="relative w-20 h-20 rounded-2xl bg-[#110e0c] border border-[#e8602e]/40 p-3 shadow-[0_0_35px_rgba(232,96,46,0.4)] flex items-center justify-center animate-bounce">
          <img 
            src="/logo.png" 
            alt="RAVEN Logo" 
            className="w-14 h-14 object-contain drop-shadow-[0_2px_12px_rgba(232,96,46,0.6)]"
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white font-outfit tracking-tight">
            RAVEN <span className="text-[#e8602e]">Tutorials</span>
          </h2>
          <p className="text-xs font-space text-zinc-400 tracking-wider uppercase">
            Learn Smarter, Achieve More • Patna Campus
          </p>
        </div>

        {/* 3 Bouncing Orange Dots */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8602e] animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_#e8602e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8602e] animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_#e8602e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8602e] animate-bounce shadow-[0_0_8px_#e8602e]" />
        </div>
      </div>
    </div>
  );
}
