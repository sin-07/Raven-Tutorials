'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Printer,
  Copy,
  Check,
  Zap,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Lock,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
}

interface TestResult {
  id: string;
  studentName: string;
  standard: string;
  targetExam: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  scholarshipTier: string;
  discountPercent: number;
  couponCode: string;
  review: Array<{
    questionId: number;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    subject: string;
  }>;
}

export default function RSATPage() {
  // Stepper: 'register' | 'test' | 'result'
  const [step, setStep] = useState<'register' | 'test' | 'result'>('register');

  // Registration form
  const [formData, setFormData] = useState({
    studentName: '',
    phoneNumber: '',
    email: '',
    standard: '10th',
    targetExam: 'JEE Main & Advanced',
  });

  // Test state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Timer effect
  useEffect(() => {
    if (step !== 'test') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, answers]);

  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const res = await fetch('/api/rsat/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
      }
    } catch {
      toast.error('Failed to load scholarship questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phoneNumber.trim() || !formData.email.trim()) {
      toast.error('Please fill in all details');
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    await fetchQuestions();
    setStep('test');
    setTimeLeft(15 * 60);
  };

  const handleSelectOption = (option: string) => {
    const qId = questions[currentQIndex]?.id;
    if (!qId) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleSubmitTest = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/rsat/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          answers,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        setStep('result');
        toast.success('Scholarship awarded successfully!');
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch {
      toast.error('Server error submitting test');
    } finally {
      setSubmitting(false);
    }
  };

  const copyCouponCode = () => {
    if (!result?.couponCode) return;
    navigator.clipboard.writeText(result.couponCode);
    setCopied(true);
    toast.success('Scholarship coupon copied!');
    setTimeout(() => setCopied(false), 3000);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* ========================================================= */}
        {/* STEP 1: REGISTRATION & TEST RULES */}
        {/* ========================================================= */}
        {step === 'register' && (
          <div className="space-y-8 ">
            {/* Hero Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#e8602e]/30 font-space font-bold text-xs uppercase tracking-wider text-[#ff7b47] shadow-[0_0_15px_rgba(232,96,46,0.2)]">
                <Sparkles className="w-4 h-4 text-[#e8602e]" />
                <span>Raven Scholarship Admission Test (RSAT) 2026-27</span>
              </div>
              <WavyHeading
                text="Win Up To 50% Tuition Fee"
                gradientText="Scholarship"
                as="h1"
                className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight"
              />
              <p className="text-neutral-400 font-medium max-w-2xl mx-auto text-sm sm:text-base font-jakarta">
                Test your conceptual clarity in Physics, Chemistry, Maths, and Logical Reasoning. Receive an instant scholarship voucher for offline & online courses at Raven Tutorials Patna!
              </p>
            </div>

            {/* Test Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center hover:border-[#e8602e]/40 transition-colors">
                <p className="text-xs font-black font-space uppercase text-neutral-400">Questions</p>
                <p className="text-2xl font-black font-mono text-white">20 MCQs</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center hover:border-[#e8602e]/40 transition-colors">
                <p className="text-xs font-black font-space uppercase text-neutral-400">Duration</p>
                <p className="text-2xl font-black font-mono text-white">15 Mins</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0f111a]/80 backdrop-blur-xl border border-[#e8602e]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-400">Fee</p>
                <p className="text-2xl font-black font-mono text-[#ff7b47]">100% FREE</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0f111a]/80 backdrop-blur-xl border border-[#ffaa40]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-400">Max Waiver</p>
                <p className="text-2xl font-black font-mono text-[#ffaa40]">50% OFF</p>
              </div>
            </div>

            {/* Registration Card */}
            <div className="bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="p-3 bg-[#161922] rounded-2xl border border-[#e8602e]/30 text-[#ff7b47] shadow-[0_0_15px_rgba(232,96,46,0.2)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-outfit text-white">Student Entry Details</h2>
                  <p className="text-xs text-neutral-400 font-medium font-jakarta">Fill once to start your instant timed scholarship assessment</p>
                </div>
              </div>

              <form onSubmit={handleStartTest} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black font-space uppercase text-neutral-300 mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Kumar"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#08090d] border border-white/10 rounded-xl text-white placeholder-neutral-500 font-bold font-jakarta focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-neutral-300 mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-[#08090d] border border-white/10 rounded-xl text-white placeholder-neutral-500 font-bold font-jakarta focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#08090d] border border-white/10 rounded-xl text-white placeholder-neutral-500 font-bold font-jakarta focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-neutral-300 mb-1.5">
                    Current Class / Standard *
                  </label>
                  <CartoonDropdown
                    value={formData.standard}
                    onChange={(e: any) => {
                      const val = typeof e === 'string' ? e : e?.target?.value;
                      setFormData({ ...formData, standard: val });
                    }}
                    options={['8th', '9th', '10th', '11th', '12th'].map((std) => ({
                      label: `Class ${std}`,
                      value: std,
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-neutral-300 mb-1.5">
                    Target Exam Focus *
                  </label>
                  <CartoonDropdown
                    value={formData.targetExam}
                    onChange={(e: any) => {
                      const val = typeof e === 'string' ? e : e?.target?.value;
                      setFormData({ ...formData, targetExam: val });
                    }}
                    options={[
                      { label: 'JEE Main & Advanced (Engineering)', value: 'JEE Main & Advanced' },
                      { label: 'NEET UG (Medical)', value: 'NEET Medical' },
                      { label: 'CBSE Board & Olympiad', value: 'CBSE Board & Olympiad' },
                      { label: 'Foundation & NTSE', value: 'Foundation & NTSE' },
                    ]}
                  />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loadingQuestions}
                    className="btn-sheryians w-full py-4 text-base font-outfit uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(232,96,46,0.35)]"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>{loadingQuestions ? 'Loading Test Engine...' : 'Start Scholarship Test Now (15 Mins)'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs font-medium text-neutral-400 mt-3 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#ff7b47] inline" />
                    <span>No negative marking. Free instant online evaluation.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: TIMED 20-QUESTION TEST ENGINE */}
        {/* ========================================================= */}
        {step === 'test' && questions.length > 0 && (
          <div className="space-y-6">
            {/* Top Bar: Timer & Progress */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#161922] rounded-xl border border-[#e8602e]/30 text-[#ff7b47]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black font-space uppercase text-neutral-400">Candidate</p>
                  <p className="font-black text-white font-outfit text-sm">{formData.studentName} (Class {formData.standard})</p>
                </div>
              </div>

              {/* Countdown Clock */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-base ${
                timeLeft < 180 
                  ? 'bg-rose-950/70 border-rose-500/50 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                  : 'bg-[#161922] border-[#e8602e]/40 text-[#ffaa40] shadow-[0_0_15px_rgba(232,96,46,0.2)]'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleSubmitTest}
                disabled={submitting}
                className="btn-sheryians px-4 py-2 text-xs font-outfit uppercase tracking-wider"
              >
                {submitting ? 'Evaluating...' : 'Submit Test & Get Score'}
              </button>
            </div>

            {/* Question Palette (1 - 20) */}
            <div className="bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
              <p className="text-xs font-black font-space uppercase text-neutral-400 mb-2">Question Navigation</p>
              <div className="flex flex-wrap gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-8 h-8 rounded-lg font-mono font-black text-xs border transition-all ${
                        isCurrent
                          ? 'bg-[#e8602e] text-white border-[#ff7b47] shadow-[0_0_15px_rgba(232,96,46,0.6)] -translate-y-0.5'
                          : isAnswered
                          ? 'bg-[#161922] text-[#ff7b47] border-[#e8602e]/40'
                          : 'bg-[#08090d] text-neutral-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question Card */}
            {questions[currentQIndex] && (
              <div className="bg-[#0f111a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="px-3 py-1 bg-[#161922] rounded-lg border border-white/10 text-xs font-black font-space uppercase text-neutral-300">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span className="px-3 py-1 bg-[#161922] rounded-lg border border-[#e8602e]/30 text-xs font-black font-space uppercase text-[#ff7b47]">
                    {questions[currentQIndex].subject}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-outfit text-white mb-6 leading-snug">
                  {questions[currentQIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQIndex].options.map((opt, oIdx) => {
                    const isSelected = answers[questions[currentQIndex].id] === opt;
                    const letter = String.fromCharCode(65 + oIdx);

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1a1412] border-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.25)] translate-x-1'
                            : 'bg-[#08090d] hover:bg-[#12141c] hover:border-white/20 border-white/10 text-neutral-300'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-mono font-black text-xs ${
                          isSelected 
                            ? 'bg-[#e8602e] text-white border-[#ff7b47]' 
                            : 'bg-[#161922] text-neutral-400 border-white/10'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-sm font-jakarta flex-1">{opt}</span>
                        {isSelected && <CheckCircle className="w-5 h-5 text-[#e8602e]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Question Footer Nav */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="px-4 py-2 bg-[#08090d] hover:bg-[#12141c] disabled:opacity-40 text-neutral-300 hover:text-white font-bold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs font-bold font-space text-neutral-400">
                    Answered: <span className="text-white font-black">{Object.keys(answers).length}</span> / {questions.length}
                  </div>

                  {currentQIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="btn-sheryians px-4 py-2 text-xs font-outfit flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      disabled={submitting}
                      className="btn-sheryians px-5 py-2.5 text-xs font-outfit uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(232,96,46,0.4)]"
                    >
                      {submitting ? 'Submitting...' : 'Finish & Submit'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: OFFICIAL SCHOLARSHIP CERTIFICATE & COUPON */}
        {/* ========================================================= */}
        {step === 'result' && result && (
          <div className="space-y-8 ">
            {/* Top Congratulatory Banner */}
            <div className="bg-gradient-to-r from-[#e8602e]/20 via-[#ff733d]/20 to-[#ffaa40]/20 border border-[#e8602e]/40 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-[0_0_35px_rgba(232,96,46,0.2)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#e8602e]/30 text-xs font-black font-space uppercase text-[#ff7b47]">
                <Sparkles className="w-4 h-4 text-[#e8602e]" />
                <span>Scholarship Assessment Result Verified</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">
                Congratulations, {result.studentName}!
              </h2>
              <p className="text-base font-medium text-neutral-300 font-jakarta max-w-xl mx-auto">
                You have qualified for an official tuition fee scholarship at Raven Tutorials Patna!
              </p>
            </div>

            {/* Certificate of Scholarship Card */}
            <div className="relative bg-[#0f111a]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Corner Watermark */}
              <div className="absolute top-4 right-4 text-right">
                <span className="px-3 py-1 bg-[#161922] border border-white/10 rounded-lg text-[11px] font-black font-mono text-[#ff7b47]">
                  CERT-ID: {result.id.slice(-8).toUpperCase()}
                </span>
              </div>

              <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-white/10 pb-8 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.3)] flex items-center justify-center mx-auto text-[#e8602e]">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-black font-space uppercase tracking-widest text-[#ff7b47]">
                  RAVEN TUTORIALS PATNA CAMPUS
                </h3>
                <h4 className="text-2xl sm:text-3xl font-black font-outfit text-white">
                  Official Certificate of Scholarship
                </h4>
                <p className="text-xs sm:text-sm font-medium text-neutral-300 font-jakarta">
                  This certifies that <span className="underline font-black text-white">{result.studentName}</span> of Class <span className="underline font-black text-white">{result.standard}</span> took the Raven Scholarship Admission Test (RSAT) and achieved:
                </p>
              </div>

              {/* Performance Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-[#08090d] rounded-2xl border border-white/10 text-center shadow-lg">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-400">Score</p>
                  <p className="text-2xl font-black font-mono text-white">{result.score} / {result.totalQuestions}</p>
                </div>
                <div className="p-4 bg-[#08090d] rounded-2xl border border-white/10 text-center shadow-lg">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-400">Accuracy</p>
                  <p className="text-2xl font-black font-mono text-white">{result.percentage}%</p>
                </div>
                <div className="p-4 bg-[#14120e] rounded-2xl border border-[#e8602e]/30 text-center shadow-lg">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-400">Fee Waiver</p>
                  <p className="text-2xl font-black font-mono text-[#ff7b47]">{result.discountPercent}% OFF</p>
                </div>
                <div className="p-4 bg-[#14120e] rounded-2xl border border-[#ffaa40]/30 text-center shadow-lg">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-400">Tier</p>
                  <p className="text-sm font-black font-outfit text-[#ffaa40] mt-1 leading-tight">{result.scholarshipTier}</p>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="bg-[#14120e] border border-[#ffaa40]/30 rounded-2xl p-6 text-center space-y-3 shadow-xl">
                <p className="text-xs font-black font-space uppercase tracking-wider text-[#ffaa40]">
                  Your Exclusive Admission Scholarship Voucher
                </p>
                <div className="inline-flex items-center gap-3 bg-[#08090d] px-6 py-3 rounded-xl border border-white/10">
                  <span className="font-mono font-black text-xl sm:text-2xl tracking-widest text-[#ffaa40]">
                    {result.couponCode}
                  </span>
                  <button
                    onClick={copyCouponCode}
                    className="p-2 bg-[#161922] hover:bg-[#202535] rounded-lg border border-white/10 text-neutral-300 hover:text-white transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#e8602e]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs font-medium text-neutral-400 font-jakarta">
                  Apply this voucher code during online admission or bring it to our Patna Campus to claim your {result.discountPercent}% fee waiver!
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Link
                  href={`/admission?coupon=${result.couponCode}`}
                  className="btn-sheryians px-6 py-3.5 text-sm font-outfit uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(232,96,46,0.35)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Scholarship & Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => window.print()}
                  className="px-5 py-3.5 bg-[#08090d] hover:bg-[#12141c] text-white font-bold font-outfit uppercase tracking-wider rounded-xl border border-white/10 transition-colors flex items-center gap-2 text-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* Question Review Section */}
            <div className="bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-black font-outfit text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#e8602e]" />
                Detailed Solutions & Answer Key
              </h3>
              <div className="space-y-4 divide-y divide-white/10">
                {result.review.map((r, idx) => (
                  <div key={r.questionId} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black font-space uppercase text-neutral-400">
                        Q{idx + 1} ({r.subject})
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black font-space uppercase border ${
                        r.isCorrect
                          ? 'bg-[#161922] border-[#e8602e]/40 text-[#ff7b47]'
                          : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                      }`}>
                        {r.isCorrect ? (
                          <>
                            <Check className="w-3 h-3 text-[#ff7b47] stroke-[3]" />
                            <span>Correct</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-300 stroke-[2.5]" />
                            <span>Incorrect</span>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-neutral-300 font-jakarta">
                      Your Answer: <span className={r.isCorrect ? 'text-[#ff7b47] font-black' : 'text-rose-400 line-through'}>{r.selectedAnswer}</span>
                    </p>
                    {!r.isCorrect && (
                      <p className="text-sm font-medium text-neutral-300 font-jakarta mt-0.5">
                        Correct Answer: <span className="font-black text-[#ff7b47]">{r.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <LMSFooter />
    </div>
  );
}
