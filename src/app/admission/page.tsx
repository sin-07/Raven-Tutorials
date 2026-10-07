'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, UserCircle, Sparkles, CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';

export default function AdmissionPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent text-white selection:bg-[#10b981] selection:text-white relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          {/* Header */}
          <div className="text-center space-y-4 mb-14 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#10b981]/30 text-[#34d399] text-xs sm:text-sm font-space font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] mx-auto">
              <Sparkles className="w-4 h-4 text-[#10b981]" />
              <span>Enrollment Portal</span>
            </div>

            <WavyHeading
              text="Begin Your Journey with"
              gradientText="RAVEN"
              className="text-4xl sm:text-6xl font-black text-white font-outfit tracking-tight leading-[1.1] text-center w-full"
            />

            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium text-center">
              Choose your profile track below to register for classroom batches or join our teaching faculty.
            </p>
          </div>

          {/* Admission Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Learner Track */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0f111a]/85 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/50 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#10b981]/30 flex items-center justify-center text-[#34d399] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <div className="inline-block px-3 py-1 bg-[#1a1412] text-[#6ee7b7] border border-[#6ee7b7]/30 rounded-full text-xs font-bold uppercase font-space tracking-wider mb-3">
                  Student Enrollment
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit mb-3">
                  Admission as a Learner
                </h2>

                <p className="text-neutral-400 text-sm font-jakarta font-medium leading-relaxed mb-6">
                  Join offline Patna classroom batches, get personalized mentor support, structured DPPs, and comprehensive test series.
                </p>

                <ul className="space-y-3 mb-8 font-jakarta text-sm text-neutral-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Access to Class 9-12 & JEE/NEET tracks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Daily lectures + Sunday doubt-clearing sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">1:15 small batch student-to-teacher attention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Monthly proctored progress benchmarking</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/admission/learner"
                className="btn-sheryians w-full py-4 text-base font-outfit uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>Register as a Learner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tutor Track */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0f111a]/85 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/50 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#10b981]/30 flex items-center justify-center text-[#34d399] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                  <UserCircle className="w-8 h-8" />
                </div>

                <div className="inline-block px-3 py-1 bg-[#1a1412] text-[#6ee7b7] border border-[#6ee7b7]/30 rounded-full text-xs font-bold uppercase font-space tracking-wider mb-3">
                  Faculty Application
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit mb-3">
                  Join as an Instructor
                </h2>

                <p className="text-neutral-400 text-sm font-jakarta font-medium leading-relaxed mb-6">
                  Teach high-achieving batches, design specialized test series, and mentor the next generation of top performers in Patna.
                </p>

                <ul className="space-y-3 mb-8 font-jakarta text-sm text-neutral-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">State-of-the-art smart classroom setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Collaborative academic curriculum design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Competitive honorarium & performance incentives</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                    <span className="font-semibold">Dedicated teaching assistant support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/admission/tutor"
                className="btn-sheryians w-full py-4 text-base font-outfit uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>Apply as Instructor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Login Redirection Footer */}
          <p className="text-center text-sm text-neutral-400 font-jakarta font-medium">
            Already registered with RAVEN Tutorials?{' '}
            <Link href="/login" className="text-[#34d399] font-black underline hover:text-[#6ee7b7] transition-colors">
              Sign in to Dashboard →
            </Link>
          </p>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}

