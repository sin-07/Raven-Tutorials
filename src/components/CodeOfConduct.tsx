'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { animateFromLeft, animateFromRight, animateFromUp, animateFromDown, scaleIn } from '@/lib/gsap';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface CodeOfConductProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const CodeOfConduct: React.FC<CodeOfConductProps> = ({ isOpen, onClose, onAccept }) => {
  useBodyScrollLock(isOpen);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const preambleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // GSAP Left, Right, Up, Down entrance on open
  useEffect(() => {
    if (!isOpen) return;

    if (modalRef.current) scaleIn(modalRef.current, 0, 0.35);
    if (headerRef.current) animateFromUp(headerRef.current, 0.1, 35, 0.5);
    if (preambleRef.current) animateFromLeft(preambleRef.current, 0.15, 40, 0.55);

    if (pointsRef.current) {
      const items = Array.from(pointsRef.current.children);
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        if (isLeft) {
          animateFromLeft(item, 0.2 + index * 0.04, 30, 0.5);
        } else {
          animateFromRight(item, 0.2 + index * 0.04, 30, 0.5);
        }
      });
    }

    if (footerRef.current) animateFromDown(footerRef.current, 0.25, 30, 0.5);
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    // Check if scrolled to bottom (within 10px tolerance)
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
      toast.success('You can now accept the Code of Conduct', {
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#fff',
        }
      });
    }
  };

  const handleAccept = () => {
    if (!agreedToTerms) {
      return;
    }
    onAccept();
    onClose();
  };

  if (!isOpen) return null;

  const codeOfConductPoints = [
    "IT IS EITHER BY YOU OR FOR YOU.",
    "THERE IS NO GAIN WITHOUT PAIN.",
    "NO CELEBRATIONS ON ANY SPECIAL OCCASIONS.",
    "A MYTHO-TECHNICAL INSTITUTION STRESSING ON NOT BELIEVING ANY BELIEFS UNLESS IT'S METHODOLOGICALLY RATIONALISED.",
    "IT IS ALWAYS GOOD TO HAVE EXPERT'S ADVICE. SO, ASK YOURSELF.",
    "IF CRITICISED, STAY GROUNDED AND PROVE THE CRITIC WRONG, NO MATTER HOW LONG IT TAKES, OR HOW TOUGH IT SEEMS.",
    "THERE HAS TO BE A MID WAY, IF EXTREMES PERTURB YOU. FIND IT, IF YOU WISH.",
    "TALKING IS BETTER TO BE LEFT FOR THE POLITICS. BE A COMMON MAN, AND WORK WITH BOTH WAYS.",
    "NO MATTER WHAT WAS DONE BY YOU IN PAST. WHAT MATTERS IS THAT YOU STILL HAVE TIME AND, LIFE TOO.",
    "IF FACING ANYTHING, IT IS OBVIOUS TO GET OFF TRACKS BY SOMETIMES. TAKE NOTE OF THAT AND USE BRAIN TO SENSE REALITY.",
    "BEND IF EVERYTHING GETS TIGHTER.",
    "BE MINDFUL ABOUT THE WORDS, DEEDS AND ACTS OF HUMAN EMOTIONS.",
    "STABLE CHAOS AND CHAOTIC STABILITY BUILD THE UNIVERSE."
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overscroll-contain">
      <div ref={modalRef} className="bg-[#0c0e17] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-white/10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] overflow-hidden overscroll-contain">
        {/* Header */}
        <div ref={headerRef} className="bg-gradient-to-r from-[#121422] to-[#181c2e] p-6 sm:p-7 relative border-b border-white/10 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 border border-white/15 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="inline-block bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold tracking-wider font-space uppercase">OFFICIAL ACADEMIC CODE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight font-outfit">
              RAVEN CODE OF CONDUCT
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-jakarta font-medium">
              Core Principles & Ethical Values for RAVEN Members
            </p>
          </div>
        </div>

        {/* Scrollable Content with Preamble */}
        <div 
          className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 font-jakarta bg-[#0c0e17]"
          onScroll={handleScroll}
        >
          {/* Preamble inside scrollable area */}
          <div ref={preambleRef} className="bg-[#121422] rounded-2xl p-5 border border-white/10 text-zinc-300">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-full bg-[#10b981] rounded-full flex-shrink-0 self-stretch"></div>
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-outfit">
                  <FileText className="w-5 h-5 text-[#10b981]" />
                  <span>Preamble</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify font-medium">
                  THE FOLLOWING DRAFT CONTAINS CERTAIN CODES OF CONDUCT FOR RAVEN LLC. 
                  IN CASE OF CERTAIN CEREBRAL CONFLICTS, THE SAME MUST BE BROUGHT OUT 
                  INTO THE CORDIAL MEETING DECIDING THE COUNSEL MEMBER ATTENDANCE OF 
                  THE CO-ASSOCIATES OF RAVEN LLC. ONCE DECLARED IN GENERAL, THESE CODES 
                  OF CONDUCT MUST BE KEPT IN MIND BY ALL.
                </p>
              </div>
            </div>
          </div>

          {/* Code of Conduct Points */}
          <div ref={pointsRef} className="space-y-3">
            {codeOfConductPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-[#121422] flex gap-3.5 p-4 rounded-xl border border-white/10 hover:border-[#10b981]/40 transition"
              >
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 bg-[#10b981]/15 text-[#34d399] rounded-lg flex items-center justify-center font-bold text-xs font-space border border-[#10b981]/30">
                    {index + 1}
                  </div>
                </div>
                <p className="text-zinc-200 leading-relaxed font-medium text-xs sm:text-sm pt-0.5">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          {!hasScrolledToBottom && (
            <div className="sticky bottom-0 left-0 right-0 bg-[#121422]/95 backdrop-blur-md border border-[#10b981]/30 rounded-xl py-2 px-4 text-center">
              <p className="text-xs text-[#34d399] font-semibold font-space">
                ↓ Please scroll down to read all points to enable acceptance ↓
              </p>
            </div>
          )}
        </div>

        {/* Footer with checkbox and buttons */}
        <div ref={footerRef} className="border-t border-white/10 p-5 sm:p-6 bg-[#090b12] rounded-b-3xl font-jakarta text-white">
          {/* Agreement checkbox */}
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={!hasScrolledToBottom}
                className="mt-1 w-4 h-4 text-[#10b981] border-white/20 rounded focus:ring-[#10b981] disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <span className={`text-xs sm:text-sm font-medium leading-relaxed ${!hasScrolledToBottom ? 'text-zinc-500' : 'text-zinc-300'}`}>
                I have read and understood the <strong className="text-white underline">RAVEN Code of Conduct</strong>. 
                I agree to abide by these principles and uphold the dignity of the institution.
              </span>
            </label>
          </div>

          {/* Warning message */}
          {!hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2 text-amber-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium">
                <strong>You must scroll to the bottom</strong> and read all points before accepting.
              </p>
            </div>
          )}

          {!agreedToTerms && hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl flex items-start gap-2 text-[#34d399]">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium">
                <strong>Check the box above</strong> to proceed with enrollment.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={!agreedToTerms}
              className={`flex-1 py-3 px-6 rounded-xl font-bold font-outfit text-sm transition-all flex items-center justify-center gap-2 ${
                agreedToTerms
                  ? 'btn-sheryians text-white cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'bg-white/5 text-zinc-600 border border-white/10 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Understand & Accept</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#121422] hover:bg-white/10 text-white rounded-xl font-medium font-outfit text-sm border border-white/15 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;

