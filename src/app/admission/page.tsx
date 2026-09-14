'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, UserCircle, Sparkles, CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';

export default function AdmissionPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-emerald-300 selection:text-black relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          {/* Header */}
          <div className="text-center space-y-4 mb-14 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mx-auto">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Enrollment Portal</span>
            </div>

            <WavyHeading
              text="Begin Your Journey with"
              gradientText="RAVEN"
              className="text-4xl sm:text-6xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full"
            />

            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium text-center">
              Choose your profile track below to register for classroom batches or join our teaching faculty.
            </p>
          </div>

          {/* Admission Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Learner Track */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center text-black mb-6 shadow-[3px_3px_0px_#000] group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-8 h-8 text-black" />
                </div>

                <div className="inline-block px-3 py-1 bg-white text-black border-2 border-black rounded-full text-xs font-bold uppercase font-space tracking-wider mb-3 shadow-[2px_2px_0px_#000]">
                  Student Enrollment
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-black font-outfit mb-3">
                  Admission as a Learner
                </h2>

                <p className="text-neutral-800 text-sm font-jakarta font-medium leading-relaxed mb-6">
                  Join offline Patna classroom batches, get personalized mentor support, structured DPPs, and comprehensive test series.
                </p>

                <ul className="space-y-3 mb-8 font-jakarta text-sm text-neutral-800">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Access to Class 9-12 & JEE/NEET tracks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Daily lectures + Sunday doubt-clearing sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">1:15 small batch student-to-teacher attention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Monthly proctored progress benchmarking</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/admission/learner"
                className="btn-cartoon w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-center font-outfit text-base shadow-[4px_4px_0px_#000] border-2 border-black transition-all flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1"
              >
                <span>Register as a Learner</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>

            {/* Tutor Track */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#dcfce7] border-3 border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center text-black mb-6 shadow-[3px_3px_0px_#000] group-hover:scale-105 transition-transform">
                  <UserCircle className="w-8 h-8 text-black" />
                </div>

                <div className="inline-block px-3 py-1 bg-white text-black border-2 border-black rounded-full text-xs font-bold uppercase font-space tracking-wider mb-3 shadow-[2px_2px_0px_#000]">
                  Faculty Application
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-black font-outfit mb-3">
                  Join as an Instructor
                </h2>

                <p className="text-neutral-800 text-sm font-jakarta font-medium leading-relaxed mb-6">
                  Teach high-achieving batches, design specialized test series, and mentor the next generation of top performers in Patna.
                </p>

                <ul className="space-y-3 mb-8 font-jakarta text-sm text-neutral-800">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">State-of-the-art smart classroom setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Collaborative academic curriculum design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Competitive honorarium & performance incentives</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="font-semibold">Dedicated teaching assistant support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/admission/tutor"
                className="btn-cartoon w-full py-4 bg-[#4ade80] hover:bg-[#86efac] text-black font-black rounded-2xl text-center font-outfit text-base shadow-[4px_4px_0px_#000] border-2 border-black transition-all flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1"
              >
                <span>Apply as Instructor</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>

          {/* Login Redirection Footer */}
          <p className="text-center text-sm text-neutral-700 font-jakarta font-medium">
            Already registered with RAVEN Tutorials?{' '}
            <Link href="/login" className="text-black font-black underline hover:text-neutral-800">
              Sign in to Dashboard →
            </Link>
          </p>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}

