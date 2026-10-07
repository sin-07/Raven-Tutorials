'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Radio,
  Video,
  Clock,
  Calendar,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Zap,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Loader from '@/components/Loader';

interface LiveClassItem {
  _id: string;
  classId: string;
  title: string;
  description?: string;
  subject: string;
  class: string;
  teacherName?: string;
  scheduledDate?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  status: 'Scheduled' | 'Live' | 'Completed' | string;
}

export default function PublicLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStandard, setSelectedStandard] = useState('All');

  const fetchLiveClasses = async (std = 'All') => {
    try {
      setLoading(true);
      const url = std !== 'All' ? `/api/student/live-classes?class=${encodeURIComponent(std)}` : '/api/student/live-classes';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setClasses(data.data || []);
      }
    } catch (e) {
      console.error('Error fetching classes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveClasses(selectedStandard);
  }, [selectedStandard]);

  const liveNowClasses = classes.filter((c) => c.status === 'Live' || c.status === 'live');
  const upcomingClasses = classes.filter((c) => c.status === 'Scheduled' || c.status === 'scheduled');

  return (
    <div className="min-h-screen bg-[#06080f] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ── HERO BANNER ── */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/60 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25 bg-[#10b981]" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34d399]/15 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-4 shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#34d399]" />
              <span>Real-Time Virtual Learning Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight leading-tight">
              Interactive <span className="bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7] bg-clip-text text-transparent">Live Classrooms</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base font-jakarta text-zinc-300 font-medium leading-relaxed">
              Attend high-definition virtual lessons taken by senior faculty from Patna Campus. Enjoy digital whiteboard demonstrations, crystal-clear 2-way audio, and instant doubt clarification.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Go to Student Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 font-bold font-outfit text-xs sm:text-sm transition-all"
              >
                Faculty / Teacher Login
              </Link>
            </div>
          </div>
        </div>

        {/* ── STANDARD FILTER BAR ── */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-[#0b0e1a]/90 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-space uppercase text-zinc-400">Filter Standard:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', '9th', '10th', '11th', '12th'].map((std) => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer border ${
                  selectedStandard === std
                    ? 'bg-gradient-to-r from-[#10b981] to-[#34d399] text-white border-transparent shadow-[0_4px_12px_rgba(16,185,129,0.35)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {std === 'All' ? 'All Classes' : `Class ${std}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── SECTION 1: BROADCASTS HAPPENING RIGHT NOW ── */}
        {liveNowClasses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-black font-outfit text-white tracking-tight">
                Live Broadcast In Progress (Join Now)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveNowClasses.map((liveClass) => (
                <div
                  key={liveClass._id}
                  className="p-6 rounded-3xl border-2 border-rose-500/50 bg-[#0e0a14] shadow-[0_0_35px_rgba(244,63,94,0.25)] flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-space uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span>LIVE NOW</span>
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs font-bold font-space uppercase text-[#6ee7b7] bg-[#34d399]/10 border border-[#34d399]/30">
                        {liveClass.subject}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black font-outfit text-white leading-tight mb-2">
                      {liveClass.title}
                    </h3>

                    {liveClass.description && (
                      <p className="text-xs sm:text-sm text-zinc-400 font-jakarta line-clamp-2 mb-4 leading-relaxed">
                        {liveClass.description}
                      </p>
                    )}

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-jakarta space-y-1.5 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Faculty Host:</span>
                        <span className="font-bold text-[#6ee7b7]">{liveClass.teacherName || 'Raven Senior Faculty'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Standard:</span>
                        <span className="font-bold text-white">Class {liveClass.class}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Scheduled Window:</span>
                        <span className="font-mono text-zinc-300">{liveClass.startTime} - {liveClass.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/live-class/${liveClass.classId}`}
                    target="_blank"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer active:scale-95 text-center"
                  >
                    <Video className="w-4 h-4" />
                    <span>Enter Live Classroom</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 2: SCHEDULED LECTURES TIMELINE ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#34d399]" />
              <h2 className="text-xl sm:text-2xl font-black font-outfit text-white tracking-tight">
                Scheduled Lecture Timetable
              </h2>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              {upcomingClasses.length} upcoming sessions
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader size="lg" text="Fetching Classroom Schedule" />
            </div>
          ) : upcomingClasses.length === 0 ? (
            <div className="text-center py-16 bg-[#0b0e1a]/90 rounded-3xl border border-white/10 space-y-3">
              <Radio className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold font-outfit text-white">No Live Classes Currently Scheduled</h3>
              <p className="text-xs text-zinc-400 font-jakarta max-w-md mx-auto">
                No active lectures found for this filter. Check back soon or visit the student dashboard for updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingClasses.map((item) => (
                <div
                  key={item._id}
                  className="p-6 rounded-3xl border border-white/10 hover:border-[#34d399]/40 bg-[#0b0e1a]/90 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-space uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        SCHEDULED
                      </span>
                      <span className="text-xs font-bold text-[#6ee7b7] font-space uppercase">
                        {item.subject}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-outfit text-white group-hover:text-[#6ee7b7] transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h4>

                    {item.description && (
                      <p className="text-xs text-zinc-400 font-jakarta line-clamp-2 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="p-3.5 rounded-2xl bg-[#070914] border border-white/10 text-xs space-y-1.5 mb-5 font-jakarta">
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-500">Faculty:</span>
                        <span className="font-semibold">{item.teacherName || 'Faculty Host'}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-500">Class:</span>
                        <span className="font-mono">Class {item.class}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-500">Date:</span>
                        <span className="font-mono">
                          {item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Scheduled'}
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-500">Timing:</span>
                        <span className="font-mono">{item.startTime} - {item.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/live-class/${item.classId}`}
                    target="_blank"
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white font-bold font-outfit text-xs flex items-center justify-center gap-2 transition text-center"
                  >
                    <span>Open Classroom Link</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#34d399]" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SECTION 3: CLASSROOM FEATURES GRID ── */}
        <div className="pt-6 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-black font-outfit text-white">
              Why Learn Online with Raven Tutorials?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-jakarta mt-1">
              Engineered with low-latency streaming to deliver an offline-grade classroom experience right onto your screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#0b0e1a]/90 border border-white/10 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#6ee7b7] mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-bold font-outfit text-white text-base mb-1">HD Video & Audio</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Adaptive bitrate streaming with clear voice fidelity and zero background noise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b0e1a]/90 border border-white/10 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold font-outfit text-white text-base mb-1">Interactive Whiteboard</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Live mathematical derivations, physics circuit sketches, and step-by-step problem walkthroughs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b0e1a]/90 border border-white/10 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold font-outfit text-white text-base mb-1">Attendance Integration</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Students who attend live lectures have their attendance automatically logged in their academic registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b0e1a]/90 border border-white/10 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold font-outfit text-white text-base mb-1">Doubt Clearance</h4>
              <p className="text-xs text-zinc-400 font-jakarta leading-relaxed">
                Raise hand feature and interactive chat enable instant query resolution with faculty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
