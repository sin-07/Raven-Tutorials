'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, UserCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 py-20 sm:py-24 selection:bg-[#e8602e] selection:text-white">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(232, 96, 46, 0.4) 0%, rgba(255, 170, 64, 0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="bg-[#090b12]/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(232,96,46,0.12)] text-center relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="inline-flex items-center gap-2 bg-[#121522] border border-[#e8602e]/40 px-4 py-1.5 rounded-full text-xs font-space font-bold uppercase tracking-wider text-[#ffaa40] mb-4 shadow-[0_0_15px_rgba(232,96,46,0.25)]">
            <GraduationCap size={15} className="text-[#e8602e]" />
            <span>Join Raven Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-black text-white tracking-tight mb-3">
            Choose Your Admission Track
          </h1>
          <p className="text-zinc-400 font-jakarta font-medium text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Select how you would like to join the Raven Tutorials academic ecosystem
          </p>
        </div>

        {/* Admission Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Learner Admission Card */}
          <div className="bg-[#090b12]/90 rounded-3xl p-8 border border-white/10 hover:border-[#e8602e]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(232,96,46,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(232,96,46,0.2)] transition-all duration-300 flex flex-col justify-between backdrop-blur-2xl group">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#121522] border border-[#e8602e]/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(232,96,46,0.3)] group-hover:scale-105 transition-transform">
                <GraduationCap className="w-8 h-8 text-[#ff7a45]" />
              </div>
              
              <h2 className="text-2xl font-outfit font-black text-white mb-2 text-center tracking-tight">
                Student / Learner
              </h2>
              <p className="text-sm font-jakarta font-medium text-zinc-400 mb-6 text-center leading-relaxed">
                Enroll for comprehensive board coaching, JEE/NEET test series, and live classroom sessions.
              </p>
              
              <ul className="space-y-3 mb-8 text-sm font-jakarta font-medium text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#e8602e] shrink-0" />
                  <span>Interactive Live Classes & Doubt Solving</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#e8602e] shrink-0" />
                  <span>Chapter-wise PDF Notes & Materials</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#e8602e] shrink-0" />
                  <span>Periodic Mock Tests & Performance Ranks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#e8602e] shrink-0" />
                  <span>Personalized Academic Mentorship</span>
                </li>
              </ul>
            </div>
            
            <Link
              href="/admission"
              className="btn-sheryians w-full py-4 text-white font-outfit font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(232,96,46,0.4)] text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply as a Student</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Tutor Admission Card */}
          <div className="bg-[#090b12]/90 rounded-3xl p-8 border border-white/10 hover:border-[#ffaa40]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,170,64,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(255,170,64,0.2)] transition-all duration-300 flex flex-col justify-between backdrop-blur-2xl group">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#121522] border border-[#ffaa40]/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(255,170,64,0.3)] group-hover:scale-105 transition-transform">
                <UserCircle className="w-8 h-8 text-[#ffaa40]" />
              </div>
              
              <h2 className="text-2xl font-outfit font-black text-white mb-2 text-center tracking-tight">
                Faculty / Educator
              </h2>
              <p className="text-sm font-jakarta font-medium text-zinc-400 mb-6 text-center leading-relaxed">
                Join our teaching faculty to mentor ambitious students and deliver high-impact lectures.
              </p>
              
              <ul className="space-y-3 mb-8 text-sm font-jakarta font-medium text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#ffaa40] shrink-0" />
                  <span>Deliver Live Interactive Lectures</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#ffaa40] shrink-0" />
                  <span>Create Assessments & Review Progress</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#ffaa40] shrink-0" />
                  <span>Upload Study Material Resources</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#ffaa40] shrink-0" />
                  <span>Competitive Educator Honorarium</span>
                </li>
              </ul>
            </div>
            
            <Link
              href="/admission?role=tutor"
              className="w-full py-4 bg-[#121522] hover:bg-[#181c2e] text-[#ffaa40] hover:text-white border border-[#ffaa40]/40 hover:border-[#ffaa40] font-outfit font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,170,64,0.2)] active:scale-[0.99] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply as a Teacher</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
        {/* Login Link */}
        <p className="text-center font-jakarta font-medium text-sm text-zinc-400">
          Already registered?{' '}
          <Link href="/login" className="text-[#ff7a45] hover:text-[#ffaa40] font-bold underline transition-colors ml-1">
            Sign In to Your Account
          </Link>
        </p>
      </div>
    </div>
  );
}
