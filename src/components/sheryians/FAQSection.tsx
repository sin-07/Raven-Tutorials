'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'I am from a non-CS background or a complete beginner. Can I join?',
      a: 'Absolutely yes. Over 45% of our successful alumni came from mechanical, civil, commerce, or non-technical backgrounds. We begin every single track with "Pehle Logic Build Karo"—breaking down computational thinking and JavaScript from absolute zero. All you need is discipline, curiosity, and a willingness to code 2-3 hours daily.',
    },
    {
      q: 'What makes Sheryians different from generic YouTube tutorials and Udemy courses?',
      a: 'On YouTube or Udemy, you watch recorded videos in passive mode and get trapped in Tutorial Hell. At Sheryians, you build real production clones (Awwwards sites, scalable SaaS microservices), attend live debugging lounges, get ruthless code reviews, and have senior mentors on Discord 24/7 unblocking your bugs within 5 minutes.',
    },
    {
      q: 'Are the cohort sessions live or recorded? What if I miss a class?',
      a: 'All flagship cohorts feature live interactive classes with Harsh Sharma, Sarthak Sharma, and mentors. Every session is recorded in crisp 1080p and uploaded to your Sheryians student dashboard within 2 hours, alongside assignments, code repositories, and notes. You retain lifetime access.',
    },
    {
      q: 'How does placement assistance and interview preparation work?',
      a: 'During the final phase of the cohort, you undergo 1-on-1 resume optimization, GitHub portfolio polishing, and brutal mock technical interviews. Our dedicated placement cell then forwards your profile directly to our hiring network of 350+ partner tech companies and startups.',
    },
    {
      q: 'What laptop specifications do I need for the course?',
      a: 'Any standard laptop (Windows, Mac, or Linux) with at least 8GB RAM and an Intel i3/i5 (or AMD Ryzen equivalent / Apple M-series) is more than sufficient. We guide you through installing VS Code, Node.js, Git, and Docker step-by-step.',
    },
    {
      q: 'Can I pay the cohort fee in monthly installments (No-Cost EMI)?',
      a: 'Yes, we provide flexible No-Cost EMI and split payment options through major debit cards, credit cards, UPI, and education finance partners. Speak to our counselors to set up a personalized installment schedule.',
    },
    {
      q: 'What is the difference between the Online Cohort and Bhopal Offline Campus?',
      a: 'The curriculum, mentors, assignments, and placement support are 100% identical. The Bhopal campus offers dedicated physical workstations, in-person desk mentorship, and an offline peer coding environment for students who prefer a physical classroom setting.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#050608] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#e8602e]" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Got Questions? <span className="text-[#e8602e]">We Got Answers.</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about the cohorts, mentors, methodology, and placement drives.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0b0d14] border border-white/10 hover:border-[#e8602e]/40 transition overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-extrabold text-sm sm:text-base text-white font-outfit">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-[#ff7b47] transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-[#e8602e]/20' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal border-t border-white/5 mt-1 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
