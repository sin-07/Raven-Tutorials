'use client';

import React from 'react';
import { 
  BrainCircuit, 
  Layers, 
  MessageSquare, 
  Trophy, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap
} from 'lucide-react';

export default function WhySheryians() {
  const pillars = [
    {
      icon: BrainCircuit,
      tag: '01. Philosophy',
      title: 'Pehle Logic, Phir Code',
      description: 'Most platforms teach you to memorize syntax that AI can write in seconds. We teach deep computational thinking, mental models, and logic building so you can solve any engineering problem from scratch.',
      accent: 'from-[#ff733d] to-[#e8602e]',
    },
    {
      icon: Layers,
      tag: '02. Portfolio',
      title: 'Real Production Clones & SaaS',
      description: 'No boring counter apps or basic calculators. You will build Awwwards-winning 3D web experiences, full-scale SaaS platforms, and distributed microservices that stand out instantly on your resume.',
      accent: 'from-amber-400 to-[#e8602e]',
    },
    {
      icon: MessageSquare,
      tag: '03. Ecosystem',
      title: '24/7 Discord Mentor Lounge',
      description: 'Stuck on a cryptic bug at 1:30 AM? You are never alone. Our dedicated team of Senior Teaching Assistants and 150,000+ active coders answer doubts and do screen-shares in real-time.',
      accent: 'from-sky-400 to-[#5865F2]',
    },
    {
      icon: Trophy,
      tag: '04. Career',
      title: 'Placement Drives & Resume Roast',
      description: 'Get direct access to hiring drives with 350+ partner companies. We run brutal resume roasts, portfolio reviews, and rigorous mock interviews with engineers currently working at FAANG and top startups.',
      accent: 'from-emerald-400 to-teal-600',
    },
  ];

  return (
    <section id="why-sheryians" className="py-20 lg:py-28 bg-[#050608] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e8602e]" />
            The Sheryians Difference
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Why 500,000+ Developers <br />
            <span className="text-[#e8602e]">Trust Sheryians Coding School</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            We don&apos;t follow outdated college syllabi. We teach the modern development stack the way Silicon Valley and high-growth Indian startups build products today.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="sheryians-card p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:border-[#e8602e]/40 transition group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.accent} p-3 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition">
                    {pillar.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#ff7b47] uppercase tracking-wider group-hover:text-white transition">
                  <span>Battle-Tested Standard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout Box */}
        <div className="mt-16 rounded-3xl bg-[#0b0c12] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 text-[11px] font-space font-bold uppercase tracking-wider">
                Traditional Courses vs Sheryians
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit">
                Stop watching tutorial videos you will forget tomorrow.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Most students get trapped in &ldquo;Tutorial Hell&rdquo;—watching hours of videos without being able to write a single line of original code. At Sheryians, every concept is immediately reinforced with live coding tasks and peer reviews.
              </p>
            </div>

            <div className="space-y-3 font-jakarta text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-start gap-3">
                <span className="text-rose-400 font-bold">❌ Other Institutes:</span>
                <span className="text-zinc-400">Rote memorization, outdated jQuery/PHP slides, zero feedback on assignments, abandoned doubt forums.</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 flex items-start gap-3">
                <span className="text-emerald-400 font-bold">✓ Sheryians School:</span>
                <span className="text-zinc-200">Modern Next.js 15, Three.js & GenAI, daily mentor code reviews, 24/7 active Discord voice rooms, live hiring drives.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
