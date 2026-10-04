'use client';

import React from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';
import { SheryiansCourse } from './CourseCatalog';
import toast from 'react-hot-toast';

interface SyllabusModalProps {
  course: SheryiansCourse | null;
  onClose: () => void;
  onOpenCounseling: () => void;
}

export default function SyllabusModal({ course, onClose, onOpenCounseling }: SyllabusModalProps) {
  if (!course) return null;

  const handleDownload = () => {
    toast.success(`Downloaded ${course.title} Syllabus PDF!`);
  };

  const handleEnroll = () => {
    onClose();
    onOpenCounseling();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-jakarta select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] bg-[#0c0d16] border border-[#e8602e]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 flex-shrink-0">
          <div className="space-y-1">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-space font-extrabold uppercase tracking-wider ${course.badgeColor || 'bg-[#e8602e] text-white'}`}>
              {course.tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-outfit">
              {course.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span>{course.duration}</span>
              <span>•</span>
              <span className="text-[#ff7b47] font-semibold">{course.mentor}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Curriculum Body */}
        <div className="overflow-y-auto py-5 space-y-4 pr-1">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-space">
            Comprehensive Curriculum Breakdown
          </div>

          <div className="space-y-3">
            {course.syllabusOverview.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[#121422] border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#ff7b47]">
                    {item.week}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Module {idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-outfit">
                  {item.topic}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="p-4 rounded-2xl bg-[#16131c] border border-[#e8602e]/20 space-y-2 mt-4">
            <div className="text-xs font-bold text-[#ffaa40] font-space uppercase">
              What&apos;s Included in this Track:
            </div>
            {course.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Cohort Fee</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-outfit">
                {course.price === 0 ? 'FREE' : `₹${course.price.toLocaleString('en-IN')}`}
              </span>
              {course.price > 0 && (
                <span className="text-xs text-zinc-500 line-through">
                  ₹{course.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="btn-sheryians-outline px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Syllabus</span>
            </button>

            <button
              onClick={handleEnroll}
              className="btn-sheryians px-6 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto whitespace-nowrap"
            >
              <span>Enroll In Cohort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
