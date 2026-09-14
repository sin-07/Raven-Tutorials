'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { animateFromLeft, animateFromRight, animateFromUp, animateFromDown, scaleIn } from '@/lib/gsap';

interface CodeOfConductProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const CodeOfConduct: React.FC<CodeOfConductProps> = ({ isOpen, onClose, onAccept }) => {
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
      toast.success('✓ You can now accept the Code of Conduct', {
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-[#f0fdf4] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border-3 border-black text-black shadow-[8px_8px_0px_#000000] overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="bg-[#86efac] p-6 sm:p-7 relative border-b-3 border-black text-black">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white text-black hover:bg-rose-300 rounded-full p-2 border-2 border-black shadow-[2px_2px_0px_#000] transition-all duration-150"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="inline-block bg-black text-[#86efac] border-2 border-black px-4 py-1 rounded-full mb-2 shadow-[2px_2px_0px_#000]">
              <span className="text-xs font-black tracking-wider font-space">OFFICIAL ACADEMIC CODE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-1 tracking-tight font-outfit">
              RAVEN CODE OF CONDUCT
            </h2>
            <p className="text-neutral-800 text-xs sm:text-sm font-jakarta font-bold">
              Core Principles & Ethical Values for RAVEN Members
            </p>
          </div>
        </div>

        {/* Scrollable Content with Preamble */}
        <div 
          className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 font-jakarta bg-[#f0fdf4]"
          onScroll={handleScroll}
        >
          {/* Preamble inside scrollable area */}
          <div ref={preambleRef} className="bg-[#dcfce7] rounded-2xl p-5 border-2 border-black shadow-[3px_3px_0px_#000] text-black">
            <div className="flex items-start gap-3">
              <div className="w-2 h-full bg-black rounded-full flex-shrink-0 self-stretch"></div>
              <div>
                <h3 className="text-base font-black text-black mb-2 flex items-center gap-2 font-outfit">
                  <span>📜</span> Preamble
                </h3>
                <p className="text-xs sm:text-sm text-neutral-900 leading-relaxed text-justify font-bold">
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
            {codeOfConductPoints.map((point, index) => {
              const greenishPastels = [
                'bg-[#f0fdf4]',
                'bg-[#dcfce7]',
                'bg-[#bbf7d0]',
                'bg-[#ecfdf5]',
                'bg-[#e6f9ee]',
              ];
              const cardColor = greenishPastels[index % greenishPastels.length];

              return (
                <div 
                  key={index}
                  className={`${cardColor} flex gap-3.5 p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] transition-transform duration-150 hover:-translate-x-0.5`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center font-black text-xs font-space border border-black shadow-[1px_1px_0px_#000]">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-neutral-950 leading-relaxed font-bold text-xs sm:text-sm pt-0.5">
                    {point}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Scroll indicator */}
          {!hasScrolledToBottom && (
            <div className="sticky bottom-0 left-0 right-0 bg-[#bbf7d0] border-2 border-black rounded-xl py-2 px-4 text-center shadow-[2px_2px_0px_#000]">
              <p className="text-xs text-black font-black font-space">
                ↓ Please scroll down to read all points to enable acceptance ↓
              </p>
            </div>
          )}
        </div>

        {/* Footer with checkbox and buttons */}
        <div ref={footerRef} className="border-t-3 border-black p-5 sm:p-6 bg-[#f0fdf4] rounded-b-3xl font-jakarta text-black">
          {/* Agreement checkbox */}
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={!hasScrolledToBottom}
                className="mt-1 w-4 h-4 text-black border-2 border-black rounded focus:ring-black disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <span className={`text-xs sm:text-sm font-bold leading-relaxed ${!hasScrolledToBottom ? 'text-neutral-400' : 'text-neutral-900'}`}>
                I have read and understood the <strong className="text-black underline">RAVEN Code of Conduct</strong>. 
                I agree to abide by these principles and uphold the dignity of the institution.
              </span>
            </label>
          </div>

          {/* Warning message */}
          {!hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-[#dcfce7] border-2 border-black rounded-xl flex items-start gap-2 shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
              <p className="text-xs text-black font-bold">
                ⚠️ <strong>You must scroll to the bottom</strong> and read all points before accepting.
              </p>
            </div>
          )}

          {!agreedToTerms && hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-emerald-200 border-2 border-black rounded-xl flex items-start gap-2 shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
              <p className="text-xs text-black font-bold">
                ⚠️ <strong>Check the box above</strong> to proceed with enrollment.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={!agreedToTerms}
              className={`flex-1 py-3 px-6 rounded-xl font-black font-outfit text-sm transition-all duration-150 flex items-center justify-center gap-2 border-2 border-black ${
                agreedToTerms
                  ? 'bg-[#4ade80] hover:bg-[#86efac] text-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Understand & Accept</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white hover:bg-[#dcfce7] text-black rounded-xl font-bold font-outfit text-sm border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
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

