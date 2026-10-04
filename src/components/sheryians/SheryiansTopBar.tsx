'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SheryiansTopBarProps {
  onOpenCounseling?: () => void;
}

export default function SheryiansTopBar({ onOpenCounseling }: SheryiansTopBarProps) {
  return (
    <div className="relative z-50 bg-[#0d0907] border-b border-[#e8602e]/20 text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-jakarta">
        
        {/* Left / Center notification */}
        <div className="flex items-center gap-2.5 mx-auto lg:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8602e]/20 border border-[#e8602e]/40 text-[#ff7b47] text-[10px] font-space font-extrabold uppercase tracking-wider flex-shrink-0 animate-pulse">
            <Sparkles className="w-3 h-3 text-[#ff7b47]" />
            New Cohort
          </span>
          <p className="text-zinc-300 text-xs font-medium truncate">
            <span className="text-white font-bold">Job-Ready AI Full-Stack Cohort 2026</span> is now live! Learn MERN, Next.js, GenAI & DSA.
          </p>
          <a
            href="#courses"
            className="hidden sm:inline-flex items-center gap-1 text-[#ff7b47] hover:text-white font-bold transition-colors underline decoration-[#e8602e]/60 underline-offset-2 flex-shrink-0 ml-1"
          >
            <span>Explore Curriculum</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Right Action */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
            <span className="text-zinc-300 font-semibold">1,240+ Coders Online</span>
          </span>
          <span className="text-zinc-700">|</span>
          <button
            onClick={onOpenCounseling}
            className="text-zinc-300 hover:text-[#e8602e] transition-colors cursor-pointer font-semibold"
          >
            Request 1:1 Callback
          </button>
        </div>

      </div>
    </div>
  );
}
