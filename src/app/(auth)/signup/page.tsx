'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, UserCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4 py-16 sm:py-20">
      <div className="max-w-4xl w-full space-y-8">
        {/* Cartoon Header */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-3 shadow-[2px_2px_0px_#000]">
            <GraduationCap size={14} className="text-black" />
            <span>Join Raven Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-black text-black tracking-tight mb-2">
            Choose Your Admission Track
          </h1>
          <p className="text-black/80 font-jakarta font-semibold text-sm sm:text-base max-w-xl mx-auto">
            Select how you would like to join the Raven Tutorials academic ecosystem
          </p>
        </div>

        {/* Admission Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Learner Admission Card */}
          <div className="bg-white rounded-3xl p-8 border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#000]">
                <GraduationCap className="w-9 h-9 text-black" />
              </div>
              
              <h2 className="text-2xl font-outfit font-black text-black mb-2 text-center">
                Student / Learner
              </h2>
              <p className="text-sm font-jakarta font-medium text-black/70 mb-6 text-center">
                Enroll for comprehensive board coaching, JEE/NEET test series, and live classroom sessions.
              </p>
              
              <ul className="space-y-3 mb-8 text-sm font-jakarta font-bold text-black/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Interactive Live Classes & Doubt Solving</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Chapter-wise PDF Notes & Materials</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Periodic Mock Tests & Performance Ranks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Personalized Academic Mentorship</span>
                </li>
              </ul>
            </div>
            
            <Link
              href="/admission"
              className="w-full py-3.5 bg-[#86efac] hover:bg-[#4ade80] text-black font-outfit font-black text-base rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Apply as a Student</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Tutor Admission Card */}
          <div className="bg-white rounded-3xl p-8 border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#000]">
                <UserCircle className="w-9 h-9 text-black" />
              </div>
              
              <h2 className="text-2xl font-outfit font-black text-black mb-2 text-center">
                Faculty / Educator
              </h2>
              <p className="text-sm font-jakarta font-medium text-black/70 mb-6 text-center">
                Join our teaching faculty to mentor ambitious students and deliver high-impact lectures.
              </p>
              
              <ul className="space-y-3 mb-8 text-sm font-jakarta font-bold text-black/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Deliver Live Interactive Lectures</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Create Assessments & Review Progress</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Upload Study Material Resources</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Competitive Educator Honorarium</span>
                </li>
              </ul>
            </div>
            
            <Link
              href="/admission?role=tutor"
              className="w-full py-3.5 bg-[#fef08a] hover:bg-[#fde047] text-black font-outfit font-black text-base rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Apply as a Teacher</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
        {/* Login Link */}
        <p className="text-center font-jakarta font-semibold text-sm text-black/70">
          Already registered?{' '}
          <Link href="/login" className="text-black font-outfit font-black underline hover:text-emerald-700">
            Sign In to Your Account
          </Link>
        </p>
      </div>
    </div>
  );
}
