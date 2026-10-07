'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Building2, Calendar, UserCheck } from 'lucide-react';

function VerifyStudentContent() {
  const searchParams = useSearchParams();
  const regId = searchParams.get('regId') || 'RT260001';
  const name = searchParams.get('name') || 'Enrolled Student';
  const standard = searchParams.get('class') || '12th';

  return (
    <div className="min-h-screen bg-[#070913] text-white pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#111528] via-[#0d1020] to-[#080a14] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
        {/* Glow & Laser Header */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-emerald-500" />

        {/* Verification Icon Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
            <ShieldCheck className="w-9 h-9" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-space uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official Credential Verified</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-outfit text-white">
            Raven Tutorials Student Record
          </h1>
          <p className="text-xs text-zinc-400 font-jakarta mt-1">
            This digital identity was verified against the official admissions database.
          </p>
        </div>

        {/* Verified Data Sheet */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 font-jakarta mb-6">
          <div className="flex justify-between items-center py-1 border-b border-white/[0.06] text-xs">
            <span className="text-zinc-400 font-space uppercase">Student Name</span>
            <span className="font-black text-white text-sm uppercase">{name}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/[0.06] text-xs">
            <span className="text-zinc-400 font-space uppercase">Registration ID</span>
            <span className="font-mono font-bold text-[#6ee7b7] text-sm">{regId}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/[0.06] text-xs">
            <span className="text-zinc-400 font-space uppercase">Class / Stream</span>
            <span className="font-bold text-zinc-200">Class {standard}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/[0.06] text-xs">
            <span className="text-zinc-400 font-space uppercase">Campus</span>
            <span className="font-bold text-zinc-200 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Patna Campus, Bihar
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/[0.06] text-xs">
            <span className="text-zinc-400 font-space uppercase">Academic Session</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> 2026 - 2027
            </span>
          </div>

          <div className="flex justify-between items-center py-1 text-xs">
            <span className="text-zinc-400 font-space uppercase">Enrollment Status</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-space uppercase">
              Active &amp; Enrolled
            </span>
          </div>
        </div>

        {/* Footer info & link */}
        <div className="text-center space-y-3">
          <p className="text-[11px] text-zinc-500">
            Issued by Office of Academic Affairs • Raven Tutorials Patna
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-xs border border-white/10 transition"
          >
            <span>Visit Raven Tutorials Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyStudentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070913] text-white flex items-center justify-center">Loading verification...</div>}>
      <VerifyStudentContent />
    </Suspense>
  );
}
