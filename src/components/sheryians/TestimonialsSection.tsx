'use client';

import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Briefcase,
  Linkedin,
  ArrowRight
} from 'lucide-react';

export default function TestimonialsSection() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');

  const testimonials = [
    {
      name: 'Aman Verma',
      previousRole: 'Tier-3 College (Mechanical)',
      currentRole: 'Frontend & Creative Engineer',
      company: 'CRED',
      package: '₹18 LPA',
      category: 'frontend',
      avatarBg: 'from-[#ff6a3d] to-[#e8602e]',
      initials: 'AV',
      quote: "Before Sheryians, I had no clue what the DOM even was. Harsh Bhaiya taught me GSAP and Web Animations so deeply that during the CRED technical round, the interviewer said my portfolio was in the top 1% of applicants they've ever seen.",
    },
    {
      name: 'Priya Sharma',
      previousRole: 'B.Sc Computer Science Graduate',
      currentRole: 'Full Stack Software Engineer',
      company: 'Razorpay',
      package: '₹22 LPA',
      category: 'fullstack',
      avatarBg: 'from-[#e8602e] to-amber-500',
      initials: 'PS',
      quote: 'The 6-month AI Full-Stack cohort changed my life. We built real microservices with Kafka, Redis, and Next.js. When Razorpay asked system design questions for juniors, everything we had practiced in our Discord mock sessions came up!',
    },
    {
      name: 'Rohan Gupta',
      previousRole: 'Sales Executive (Career Switch)',
      currentRole: 'Backend Engineer (Node/Express)',
      company: 'Swiggy',
      package: '₹16 LPA',
      category: 'backend',
      avatarBg: 'from-amber-500 to-rose-600',
      initials: 'RG',
      quote: 'I switched careers at age 26 with zero coding background. Harsh Bhaiya’s blunt, honest feedback on my assignments kept me disciplined. The 24/7 Discord mentor support solved my doubts within minutes every single night.',
    },
    {
      name: 'Devansh Khandelwal',
      previousRole: 'Self-Taught Coder',
      currentRole: 'Platform Infrastructure Engineer',
      company: 'BrowserStack',
      package: '₹24 LPA',
      category: 'backend',
      avatarBg: 'from-sky-500 to-blue-700',
      initials: 'DK',
      quote: 'Dhananjay Sir’s deep dive into Node.js internals, event loop memory leaks, and distributed locks was pure gold. BrowserStack’s hiring team was blown away by my capstone project.',
    },
    {
      name: 'Sneha Patel',
      previousRole: 'B.Tech IT Student',
      currentRole: 'Frontend UI/UX Developer',
      company: 'Zomato',
      package: '₹15 LPA',
      category: 'frontend',
      avatarBg: 'from-purple-500 to-indigo-600',
      initials: 'SP',
      quote: 'The Sheryians design aesthetic is unmatched. Every single project we built had buttery smooth 60fps animations, dark themes, and production-grade state management. I got 3 job offers before college ended!',
    },
    {
      name: 'Kunal Joshi',
      previousRole: 'Civil Engineering Diploma',
      currentRole: 'Software Development Engineer',
      company: 'Paytm',
      package: '₹14 LPA',
      category: 'fullstack',
      avatarBg: 'from-emerald-500 to-teal-700',
      initials: 'KJ',
      quote: 'Sheryians doesn’t treat you like a customer; they treat you like a brother. The mock interviews and resume roasting saved me from getting filtered out by ATS scanners. Forever grateful to the team.',
    },
  ];

  const filtered = filter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.category === filter);

  return (
    <section className="py-20 lg:py-28 bg-[#050608] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-[#e8602e]" />
            Placement Hall of Fame
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Real Students. Real Offers. <br />
            <span className="text-[#e8602e]">Unstoppable Developers.</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            See how students from non-CS backgrounds, tier-3 colleges, and career switches transformed into high-paid software engineers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {[
            { id: 'all', label: 'All Success Stories' },
            { id: 'frontend', label: 'Frontend & Creative' },
            { id: 'backend', label: 'Backend & Systems' },
            { id: 'fullstack', label: 'Full Stack MERN' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.45)]'
                  : 'bg-[#10121a] text-zinc-400 hover:text-white hover:bg-[#181a26] border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="sheryians-card p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[#e8602e]/50 transition group relative"
            >
              <div className="space-y-4">
                
                {/* Company & Package Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white font-extrabold font-outfit text-sm">
                      {item.company}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      {item.package}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#ffaa40]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

              </div>

              {/* Student Info Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.avatarBg} flex items-center justify-center text-white font-black text-xs font-outfit shadow-sm`}>
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-outfit">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {item.previousRole} → <span className="text-[#ff7b47] font-semibold">{item.currentRole}</span>
                    </div>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition">
                  <Quote className="w-3 h-3" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Trophy(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
