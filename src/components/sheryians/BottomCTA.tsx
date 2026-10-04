'use client';

import React from 'react';
import { Flame, ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';

interface BottomCTAProps {
  onOpenCounseling: () => void;
}

export default function BottomCTA({ onOpenCounseling }: BottomCTAProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#040507] relative font-jakarta select-none">
      
      {/* Background warm fiery glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[170px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, #ff5216 40%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl border border-[#e8602e]/40 bg-gradient-to-b from-[#14121a] via-[#0d0d14] to-[#08080c] p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(232,96,46,0.2)] relative overflow-hidden">
          
          {/* Subtle glow circle */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e8602e]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8602e]/20 border border-[#e8602e]/40 text-[#ff7b47] text-xs font-space font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#e8602e]" />
            Your Coding Revolution Starts Now
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-outfit tracking-tight max-w-3xl mx-auto leading-tight">
            Stop Overthinking. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ff4200]">
              Start Building Real Software.
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join 500,000+ ambitious developers mastering modern Full-Stack engineering, Creative animations, and High-Scale System Design. Let&apos;s build your dream career together.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#courses"
              className="btn-sheryians w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(232,96,46,0.6)] cursor-pointer group"
            >
              <Flame className="w-4 h-4 text-white" />
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <button
              onClick={onOpenCounseling}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#e8602e]" />
              <span>Book Free 1:1 Career Counseling</span>
            </button>
          </div>

          {/* Guarantee / Trust Badges */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>350+ Tech Hiring Partners</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>24/7 Dedicated Discord Lounge</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Project-Based Pedagogy</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
