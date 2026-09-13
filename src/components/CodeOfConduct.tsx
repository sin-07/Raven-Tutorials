'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CodeOfConductProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const CodeOfConduct: React.FC<CodeOfConductProps> = ({ isOpen, onClose, onAccept }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-green-gradient bg-[#090d16] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-emerald-500/30 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-950/80 via-[#0d1526] to-emerald-950/80 p-7 rounded-t-2xl relative border-b border-emerald-500/20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 px-5 py-1.5 rounded-full mb-3">
              <span className="text-emerald-400 text-xs font-semibold tracking-wider font-space">OFFICIAL ACADEMIC DOCUMENT</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight font-outfit">
              RAVEN CODE OF CONDUCT
            </h2>
            <div className="w-20 h-0.5 bg-emerald-500/40 mx-auto mb-2"></div>
            <p className="text-emerald-300/80 text-sm font-jakarta">
              Core Principles & Ethical Values for RAVEN Members
            </p>
          </div>
        </div>

        {/* Scrollable Content with Preamble */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4 font-jakarta"
          onScroll={handleScroll}
        >
          {/* Preamble inside scrollable area */}
          <div className="card-green-gradient rounded-xl p-5 shadow-sm border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <div className="w-1 h-full bg-emerald-500 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-outfit">
                  <span className="text-xl">📜</span> Preamble
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-justify font-normal">
                  THE FOLLOWING DRAFT CONTAINS CERTAIN CODES OF CONDUCT FOR RAVEN LLC. 
                  IN CASE OF CERTAIN CEREBRAL CONFLICTS, THE SAME MUST BE BROUGHT OUT 
                  INTO THE CORDIAL MEETING DECIDING THE COUNSEL MEMBER ATTENDANCE OF 
                  THE CO-ASSOCIATES OF RAVEN LLC. ONCE DECLARED IN GENERAL, THESE CODES 
                  OF CONDUCT MUST BE KEPT IN MIND BY ALL. HAVING CO-ASSOCIATES OF FUTURE, 
                  THE SAME MUST BE COMMUNICATED FROM THE ONSET. IT WOULD BE THE 
                  SOLE LIABILITY OF THE CO-ASSOCIATES TO UPHOLD THE DIGNITY OF THE 
                  CODES OF CONDUCT FOR THE BETTER GOOD OF THE COMPANY.
                </p>
              </div>
            </div>
          </div>

          {/* Code of Conduct Points */}
          <div className="space-y-3">
            {codeOfConductPoints.map((point, index) => (
              <div 
                key={index}
                className="card-green-gradient flex gap-4 p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 bg-emerald-500 text-black rounded-lg flex items-center justify-center font-bold text-xs font-space">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed font-medium text-xs sm:text-sm pt-0.5">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          {!hasScrolledToBottom && (
            <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#090d16] via-[#090d16] to-transparent py-4 text-center">
              <p className="text-xs text-emerald-400 font-semibold font-space">
                ↓ Please scroll down to read all points ↓
              </p>
            </div>
          )}
        </div>

        {/* Footer with checkbox and buttons */}
        <div className="border-t border-emerald-500/20 p-6 bg-[#070b13] rounded-b-2xl font-jakarta">
          {/* Agreement checkbox */}
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={!hasScrolledToBottom}
                className="mt-1 w-4 h-4 text-emerald-500 border-emerald-500/30 rounded focus:ring-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed bg-black/40"
              />
              <span className={`text-xs sm:text-sm leading-relaxed ${!hasScrolledToBottom ? 'text-gray-500' : 'text-gray-300 group-hover:text-white'}`}>
                I have read and understood the <strong className="text-emerald-400">RAVEN Code of Conduct</strong>. 
                I agree to abide by these principles and uphold the dignity of the institution.
              </span>
            </label>
          </div>

          {/* Warning message */}
          {!hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300">
                ⚠️ <strong>You must scroll to the bottom</strong> and read all the Code of Conduct points before you can proceed.
              </p>
            </div>
          )}

          {!agreedToTerms && hasScrolledToBottom && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300">
                ⚠️ <strong>You must check the agreement box</strong> to proceed with enrollment.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={!agreedToTerms}
              className={`flex-1 py-3 px-6 rounded-xl font-bold font-outfit text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                agreedToTerms
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              I Understand & Accept
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-medium font-outfit text-sm border border-white/10 transition-all duration-200"
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

