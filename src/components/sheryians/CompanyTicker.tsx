'use client';

import React from 'react';

const companies = [
  { name: 'CRED', role: 'Frontend & Creative Dev', ctc: '₹18 LPA' },
  { name: 'Razorpay', role: 'Full Stack Engineer', ctc: '₹22 LPA' },
  { name: 'Swiggy', role: 'Software Development Engineer', ctc: '₹16 LPA' },
  { name: 'Zomato', role: 'Backend / Node.js Dev', ctc: '₹15 LPA' },
  { name: 'BrowserStack', role: 'Platform Engineer', ctc: '₹24 LPA' },
  { name: 'Paytm', role: 'Full Stack Developer', ctc: '₹14 LPA' },
  { name: 'Amazon', role: 'SDE-1', ctc: '₹28 LPA' },
  { name: 'PhonePe', role: 'Backend Microservices Dev', ctc: '₹20 LPA' },
  { name: 'Flipkart', role: 'Frontend Architect', ctc: '₹19 LPA' },
  { name: 'Urban Company', role: 'Full Stack Engineer', ctc: '₹17 LPA' },
];

export default function CompanyTicker() {
  return (
    <section className="py-12 border-y border-white/10 bg-[#07080c] overflow-hidden select-none font-jakarta relative">
      
      {/* Top subtitle */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-7">
        <p className="text-xs sm:text-sm font-space font-bold uppercase tracking-[0.25em] text-zinc-400">
          Our Alumni Build Software At Leading Tech Giants & High-Growth Startups
        </p>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Left & Right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#07080c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#07080c] to-transparent z-10 pointer-events-none" />

        {/* Ticker Row */}
        <div className="flex gap-4 sm:gap-6 whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-[#e8602e]/50 hover:bg-[#151722] transition-all group shadow-sm flex-shrink-0 cursor-default"
            >
              <div className="w-8 h-8 rounded-xl bg-[#1c1d28] border border-white/10 flex items-center justify-center font-black text-white font-outfit text-sm group-hover:text-[#ff7b47] transition">
                {company.name[0]}
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-sm font-outfit">
                    {company.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] text-[10px] font-space font-black">
                    {company.ctc}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {company.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
