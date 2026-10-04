'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Star, 
  Send,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface SheryiansHeroProps {
  onOpenCounseling?: () => void;
}

export default function SheryiansHero({ onOpenCounseling }: SheryiansHeroProps) {
  const [activeTab, setActiveTab] = useState<'gsap' | 'api' | 'react'>('gsap');
  const [apiRunning, setApiRunning] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [particleTrigger, setParticleTrigger] = useState(0);

  const handleRunApi = () => {
    setApiRunning(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        status: 200,
        message: 'Cohort admission verified! Welcome to Sheryians.',
        mentor: 'Harsh Sharma',
        techStack: ['React 19', 'Next.js 15', 'Node.js', 'MongoDB', 'Docker'],
        discordVip: true,
      }, null, 2));
      setApiRunning(false);
    }, 600);
  };

  const handleTriggerAnimation = () => {
    setParticleTrigger((prev) => prev + 1);
  };

  return (
    <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden font-jakarta select-none">
      
      {/* Background warm radial aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, #ff5722 35%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171412] border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.25)] hover:border-[#e8602e] transition cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8602e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff733d]" />
            </span>
            <span className="text-xs font-bold text-zinc-300">
              India&apos;s Most Loved Coding Platform • <span className="text-[#ff7b47] font-extrabold">500,000+ Students</span>
            </span>
            <Flame className="w-3.5 h-3.5 text-[#e8602e]" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-outfit">
            We only teach what we are{' '}
            <span className="bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ff4200] bg-clip-text text-transparent underline decoration-[#e8602e]/30 underline-offset-8">
              really really good at.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Upgrading India&apos;s coding mindset. No boring theory. Learn Full-Stack MERN, Awwwards-level creative frontend with GSAP & Three.js, Scalable Microservices, and DSA from engineers who live and breathe production code.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="#courses"
              className="btn-sheryians w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(232,96,46,0.5)] cursor-pointer group"
            >
              <Flame className="w-4 h-4 text-white" />
              <span>Explore Flagship Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <a
              href="#community"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#151622] hover:bg-[#1f2030] border border-white/15 hover:border-[#5865F2]/50 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-lg group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#5865F2] shadow-[0_0_8px_#5865F2] animate-pulse" />
              <span>Join Discord (150K+)</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            <button
              onClick={onOpenCounseling}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold text-sm transition cursor-pointer"
            >
              Request Free 1:1 Callback
            </button>
          </div>
        </div>

        {/* ── Key Metrics Strip ── */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#0f1017]/90 border border-white/10 hover:border-[#e8602e]/40 transition text-center shadow-lg group">
            <div className="text-3xl sm:text-4xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition">
              500K+
            </div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">
              Active Learners Mentored
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1017]/90 border border-white/10 hover:border-[#e8602e]/40 transition text-center shadow-lg group">
            <div className="text-3xl sm:text-4xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition">
              1,200+
            </div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">
              Placed in Top Tech
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1017]/90 border border-white/10 hover:border-[#e8602e]/40 transition text-center shadow-lg group">
            <div className="text-3xl sm:text-4xl font-black text-[#ffaa40] font-outfit flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-[#ffaa40] text-[#ffaa40]" />
            </div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">
              18,000+ Student Reviews
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1017]/90 border border-white/10 hover:border-[#e8602e]/40 transition text-center shadow-lg group">
            <div className="text-3xl sm:text-4xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition">
              ₹24 LPA
            </div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">
              Highest Package Cracked
            </p>
          </div>
        </div>

        {/* ── Interactive Live Code & Project Simulator Window ── */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          
          {/* Floating student badges */}
          <div className="hidden lg:flex items-center gap-2 absolute -top-6 -left-6 z-20 px-3.5 py-2 rounded-full bg-[#11121c] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs font-bold text-zinc-200 animate-bounce [animation-duration:4s]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Rahul Placed @ CRED • ₹18 LPA</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 absolute -bottom-6 -right-6 z-20 px-3.5 py-2 rounded-full bg-[#11121c] border border-[#e8602e]/40 shadow-[0_10px_30px_rgba(232,96,46,0.3)] text-xs font-bold text-zinc-200 animate-bounce [animation-duration:5s]">
            <Sparkles className="w-3.5 h-3.5 text-[#e8602e]" />
            <span>Awwwards Site of the Day Winner</span>
          </div>

          {/* IDE Window Box */}
          <div className="rounded-3xl border border-white/15 bg-[#0a0b10] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(232,96,46,0.15)] overflow-hidden">
            
            {/* Window Header */}
            <div className="px-5 py-3.5 bg-[#0f1118] border-b border-white/10 flex items-center justify-between">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-xs font-mono text-zinc-500 ml-2 hidden sm:inline">
                  sheryians-interactive-playground.ts
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-[#09090e] p-1 rounded-xl border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('gsap')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === 'gsap'
                      ? 'bg-[#e8602e] text-white font-bold shadow-[0_0_10px_rgba(232,96,46,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  creative-gsap.js
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === 'api'
                      ? 'bg-[#e8602e] text-white font-bold shadow-[0_0_10px_rgba(232,96,46,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  backend-api.ts
                </button>
                <button
                  onClick={() => setActiveTab('react')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === 'react'
                      ? 'bg-[#e8602e] text-white font-bold shadow-[0_0_10px_rgba(232,96,46,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  app-router.tsx
                </button>
              </div>
            </div>

            {/* Window Body */}
            <div className="p-6 font-mono text-xs sm:text-sm">
              {activeTab === 'gsap' && (
                <div className="space-y-4">
                  <div className="text-zinc-400 leading-relaxed overflow-x-auto">
                    <p><span className="text-[#ff7b47]">import</span> gsap <span className="text-[#ff7b47]">from</span> <span className="text-emerald-300">&apos;gsap&apos;</span>;</p>
                    <p><span className="text-[#ff7b47]">import</span> ScrollTrigger <span className="text-[#ff7b47]">from</span> <span className="text-emerald-300">&apos;gsap/ScrollTrigger&apos;</span>;</p>
                    <p className="mt-2 text-zinc-500">// Sheryians Signature Awwwards 3D Canvas Scroll Physics</p>
                    <p><span className="text-sky-400">gsap</span>.registerPlugin(ScrollTrigger);</p>
                    <p>
                      <span className="text-sky-400">gsap</span>.<span className="text-amber-300">timeline</span>({`{ scrollTrigger: { trigger: '#hero', scrub: 1 } }`})
                    </p>
                    <p className="pl-4">
                      .<span className="text-amber-300">to</span>(<span className="text-emerald-300">&apos;.sheryians-3d-card&apos;</span>, {`{ rotationY: 360, zIndex: 99, scale: 1.15 }`})
                    </p>
                    <p className="pl-4">
                      .<span className="text-amber-300">fromTo</span>(<span className="text-emerald-300">&apos;.brand-glow&apos;</span>, {`{ opacity: 0 }`}, {`{ opacity: 1, duration: 1.2 }`});
                    </p>
                  </div>

                  {/* Interactive Visual Trigger Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        key={particleTrigger}
                        className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ff6a3d] to-[#e8602e] flex items-center justify-center shadow-[0_0_20px_rgba(232,96,46,0.6)] animate-spin [animation-duration:3s]"
                      >
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold font-jakarta text-sm">
                          Live GSAP 3.0 Physics & Canvas Simulation
                        </div>
                        <div className="text-zinc-400 text-xs font-jakarta">
                          Triggered pulses: <span className="text-[#ff7b47] font-bold">{particleTrigger}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleTriggerAnimation}
                      className="btn-sheryians px-4 py-2 text-xs font-bold font-jakarta uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Animate Particle</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-4">
                  <div className="text-zinc-400 leading-relaxed overflow-x-auto">
                    <p><span className="text-[#ff7b47]">import</span> express <span className="text-[#ff7b47]">from</span> <span className="text-emerald-300">&apos;express&apos;</span>;</p>
                    <p><span className="text-[#ff7b47]">import</span> {`{ verifyStudentPlacement }`} <span className="text-[#ff7b47]">from</span> <span className="text-emerald-300">&apos;@sheryians/core&apos;</span>;</p>
                    <p className="mt-2 text-zinc-500">// High concurrency microservice endpoint</p>
                    <p>router.<span className="text-amber-300">post</span>(<span className="text-emerald-300">&apos;/api/v2/cohort/admission&apos;</span>, <span className="text-[#ff7b47]">async</span> (req, res) =&gt; {`{`}</p>
                    <p className="pl-4">
                      <span className="text-[#ff7b47]">const</span> student = <span className="text-[#ff7b47]">await</span> verifyStudentPlacement(req.body);
                    </p>
                    <p className="pl-4">
                      <span className="text-[#ff7b47]">return</span> res.<span className="text-amber-300">status</span>(200).<span className="text-amber-300">json</span>({`{ success: true, hired: true }`});
                    </p>
                    <p>{`}`});</p>
                  </div>

                  {/* Interactive API Run Button */}
                  <div className="mt-4 p-4 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-[#e8602e]" />
                      <span className="text-zinc-300 text-xs font-jakarta">
                        Click below to test query response from the Sheryians API cluster
                      </span>
                    </div>

                    <button
                      onClick={handleRunApi}
                      disabled={apiRunning}
                      className="btn-sheryians px-4 py-2 text-xs font-bold font-jakarta uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{apiRunning ? 'Sending...' : 'Send API Request'}</span>
                    </button>
                  </div>

                  {apiResponse && (
                    <pre className="p-3 bg-black/60 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs overflow-x-auto">
                      {apiResponse}
                    </pre>
                  )}
                </div>
              )}

              {activeTab === 'react' && (
                <div className="space-y-4">
                  <div className="text-zinc-400 leading-relaxed overflow-x-auto">
                    <p><span className="text-zinc-500">// Next.js 15 Server Component with Streaming SSR</span></p>
                    <p><span className="text-[#ff7b47]">export default async function</span> <span className="text-amber-300">SheryiansDashboard</span>() {`{`}</p>
                    <p className="pl-4">
                      <span className="text-[#ff7b47]">const</span> cohorts = <span className="text-[#ff7b47]">await</span> db.cohorts.<span className="text-amber-300">find</span>({`{ status: 'active' }`});
                    </p>
                    <p className="pl-4">
                      <span className="text-[#ff7b47]">return</span> (
                    </p>
                    <p className="pl-8 text-sky-300">
                      &lt;<span className="text-[#ff7b47]">CohortContainer</span> liveMentorship={'{true}'}&gt;
                    </p>
                    <p className="pl-12 text-zinc-300">
                      &lt;<span className="text-[#ff7b47]">MentorCard</span> lead=<span className="text-emerald-300">&quot;Harsh Sharma&quot;</span> /&gt;
                    </p>
                    <p className="pl-8 text-sky-300">
                      &lt;/<span className="text-[#ff7b47]">CohortContainer</span>&gt;
                    </p>
                    <p className="pl-4">);</p>
                    <p>{`}`}</p>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-[#11131c] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-jakarta text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Production Server Component Hydrated (0ms client delay)</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Ready
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
