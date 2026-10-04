'use client';

import React from 'react';
import Link from 'next/link';

interface SheryiansLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function SheryiansLogo({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}: SheryiansLogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const titleSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3 group select-none ${className}`}
      aria-label="Sheryians Coding School Home"
    >
      {/* Signature Sheryians S-Brackets Emblem */}
      <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-[#1c120c] to-[#0c0a09] border border-[#e8602e]/30 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(232,96,46,0.25)] group-hover:border-[#e8602e] group-hover:shadow-[0_0_25px_rgba(232,96,46,0.45)] group-hover:scale-105 transition-all duration-300`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(232,96,46,0.5)]"
        >
          {/* Outer glow background */}
          <circle cx="20" cy="20" r="18" fill="url(#sheryians-grad-bg)" opacity="0.15" />
          
          {/* Stylized code brackets & 'S' icon */}
          <path 
            d="M12 14L8 20L12 26" 
            stroke="url(#sheryians-grad-orange)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M28 14L32 20L28 26" 
            stroke="url(#sheryians-grad-orange)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M23 13C23 13 17 14 17 18C17 22 23 21 23 24.5C23 27 18 27.5 17 26.5" 
            stroke="#ffffff" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          <defs>
            <linearGradient id="sheryians-grad-orange" x1="8" y1="14" x2="32" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b47" />
              <stop offset="0.5" stopColor="#e8602e" />
              <stop offset="1" stopColor="#ff4500" />
            </linearGradient>
            <radialGradient id="sheryians-grad-bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(18)">
              <stop stopColor="#e8602e" />
              <stop offset="1" stopColor="#e8602e" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Small live active orange indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#e8602e] shadow-[0_0_8px_#e8602e] animate-pulse" />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-white ${titleSize} tracking-tight font-outfit group-hover:text-white transition-colors`}>
            Sheryians
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8602e] shadow-[0_0_6px_#e8602e]" />
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-space font-bold uppercase tracking-[0.2em] text-[#e8602e] mt-1 group-hover:text-[#ff7b47] transition-colors">
            Coding School
          </span>
        )}
      </div>
    </Link>
  );
}
