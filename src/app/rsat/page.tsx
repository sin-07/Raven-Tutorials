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
import Navbar from '@/components/Navbar';
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
    <div className="min-h-screen bg-[#f6fcf8] selection:bg-emerald-300 selection:text-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* ========================================================= */}
        {/* STEP 1: REGISTRATION & TEST RULES */}
        {/* ========================================================= */}
        {step === 'register' && (
          <div className="space-y-8 cartoon-pop">
            {/* Hero Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#86efac] border-2 border-black font-space font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-4 h-4 text-black" />
                <span>Raven Scholarship Admission Test (RSAT) 2026-27</span>
              </div>
              <WavyHeading
                text="Win Up To 50% Tuition Fee"
                gradientText="Scholarship"
                as="h1"
                className="text-3xl sm:text-5xl font-black font-outfit text-black tracking-tight"
              />
              <p className="text-neutral-700 font-bold max-w-2xl mx-auto text-sm sm:text-base font-jakarta">
                Test your conceptual clarity in Physics, Chemistry, Maths, and Logical Reasoning. Receive an instant scholarship voucher for offline & online courses at Raven Tutorials Patna!
              </p>
            </div>

            {/* Test Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#dcfce7] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-600">Questions</p>
                <p className="text-2xl font-black font-mono text-black">20 MCQs</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#fed7aa] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-600">Duration</p>
                <p className="text-2xl font-black font-mono text-black">15 Mins</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#bbf7d0] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-600">Fee</p>
                <p className="text-2xl font-black font-mono text-emerald-800">100% FREE</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#fbcfe8] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                <p className="text-xs font-black font-space uppercase text-neutral-600">Max Waiver</p>
                <p className="text-2xl font-black font-mono text-rose-800">50% OFF</p>
              </div>
            </div>

            {/* Registration Card */}
            <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-3 pb-6 border-b-2 border-black/15">
                <div className="p-3 bg-emerald-300 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-outfit text-black">Student Entry Details</h2>
                  <p className="text-xs text-neutral-600 font-bold font-jakarta">Fill once to start your instant timed scholarship assessment</p>
                </div>
              </div>

              <form onSubmit={handleStartTest} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black font-space uppercase text-black mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Kumar"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black font-bold font-jakarta shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black font-bold font-jakarta shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black font-bold font-jakarta shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1.5">
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
                  <label className="block text-xs font-black font-space uppercase text-black mb-1.5">
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
                    className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit uppercase tracking-wider text-base rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-3 transition-all active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>{loadingQuestions ? 'Loading Test Engine...' : 'Start Scholarship Test Now (15 Mins)'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs font-bold text-neutral-500 mt-2 flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-neutral-700 inline" />
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
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#f0fdf4] border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-300 rounded-xl border-2 border-black">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-xs font-black font-space uppercase text-neutral-600">Candidate</p>
                  <p className="font-black text-black font-outfit text-sm">{formData.studentName} (Class {formData.standard})</p>
                </div>
              </div>

              {/* Countdown Clock */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-black text-base ${
                timeLeft < 180 ? 'bg-rose-300 text-rose-950 animate-pulse' : 'bg-amber-200 text-black'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleSubmitTest}
                disabled={submitting}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5"
              >
                {submitting ? 'Evaluating...' : 'Submit Test & Get Score'}
              </button>
            </div>

            {/* Question Palette (1 - 20) */}
            <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
              <p className="text-xs font-black font-space uppercase text-neutral-600 mb-2">Question Navigation</p>
              <div className="flex flex-wrap gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-8 h-8 rounded-lg font-mono font-black text-xs border-2 border-black transition-all ${
                        isCurrent
                          ? 'bg-black text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                          : isAnswered
                          ? 'bg-emerald-300 text-black shadow-[1px_1px_0px_#000]'
                          : 'bg-[#f0fdf4] text-neutral-700 hover:bg-neutral-200'
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
              <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
                <div className="flex items-center justify-between pb-4 border-b-2 border-black/15 mb-6">
                  <span className="px-3 py-1 bg-white rounded-lg border-2 border-black text-xs font-black font-space uppercase shadow-[1px_1px_0px_#000]">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span className="px-3 py-1 bg-emerald-200 rounded-lg border border-black text-xs font-black font-space uppercase">
                    {questions[currentQIndex].subject}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-outfit text-black mb-6 leading-snug">
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
                        className={`w-full text-left p-4 rounded-2xl border-2 border-black transition-all flex items-center gap-4 ${
                          isSelected
                            ? 'bg-[#86efac] font-black text-black shadow-[3px_3px_0px_#000] translate-x-1'
                            : 'bg-white hover:bg-[#dcfce7] font-bold text-neutral-800 shadow-[2px_2px_0px_#000]'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center font-mono font-black text-xs ${
                          isSelected ? 'bg-black text-white' : 'bg-[#f0fdf4] text-black'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-sm font-jakarta flex-1">{opt}</span>
                        {isSelected && <CheckCircle className="w-5 h-5 text-black" />}
                      </button>
                    );
                  })}
                </div>

                {/* Question Footer Nav */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-black/15">
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="px-4 py-2 bg-white hover:bg-neutral-100 disabled:opacity-40 text-black font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs font-bold font-space text-neutral-600">
                    Answered: {Object.keys(answers).length} / {questions.length}
                  </div>

                  {currentQIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="px-4 py-2 bg-emerald-300 hover:bg-emerald-400 text-black font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      disabled={submitting}
                      className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
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
          <div className="space-y-8 cartoon-pop">
            {/* Top Congratulatory Banner */}
            <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-[6px_6px_0px_#000]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-black text-xs font-black font-space uppercase shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <span>Scholarship Assessment Result Verified</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-outfit text-black tracking-tight">
                Congratulations, {result.studentName}!
              </h2>
              <p className="text-base font-bold text-neutral-800 font-jakarta max-w-xl mx-auto">
                You have qualified for an official tuition fee scholarship at Raven Tutorials Patna!
              </p>
            </div>

            {/* Certificate of Scholarship Card */}
            <div className="relative bg-[#f0fdf4] border-4 border-black rounded-3xl p-6 sm:p-12 shadow-[8px_8px_0px_#000] overflow-hidden">
              {/* Corner Watermark */}
              <div className="absolute top-4 right-4 text-right">
                <span className="px-3 py-1 bg-white border-2 border-black rounded-lg text-[11px] font-black font-mono shadow-[1.5px_1.5px_0px_#000]">
                  CERT-ID: {result.id.slice(-8).toUpperCase()}
                </span>
              </div>

              <div className="text-center space-y-4 max-w-2xl mx-auto border-b-2 border-dashed border-black pb-8 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-300 border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xs font-black font-space uppercase tracking-widest text-emerald-900">
                  RAVEN TUTORIALS PATNA CAMPUS
                </h3>
                <h4 className="text-2xl sm:text-3xl font-black font-outfit text-black">
                  Official Certificate of Scholarship
                </h4>
                <p className="text-xs sm:text-sm font-bold text-neutral-700 font-jakarta">
                  This certifies that <span className="underline font-black text-black">{result.studentName}</span> of Class <span className="underline font-black text-black">{result.standard}</span> took the Raven Scholarship Admission Test (RSAT) and achieved:
                </p>
              </div>

              {/* Performance Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-white rounded-2xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-500">Score</p>
                  <p className="text-2xl font-black font-mono text-black">{result.score} / {result.totalQuestions}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-500">Accuracy</p>
                  <p className="text-2xl font-black font-mono text-black">{result.percentage}%</p>
                </div>
                <div className="p-4 bg-[#bbf7d0] rounded-2xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-600">Fee Waiver</p>
                  <p className="text-2xl font-black font-mono text-emerald-900">{result.discountPercent}% OFF</p>
                </div>
                <div className="p-4 bg-[#fed7aa] rounded-2xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                  <p className="text-[11px] font-black font-space uppercase text-neutral-600">Tier</p>
                  <p className="text-sm font-black font-outfit text-black mt-1 leading-tight">{result.scholarshipTier}</p>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="bg-[#fef9c3] border-3 border-black rounded-2xl p-6 text-center space-y-3 shadow-[4px_4px_0px_#000]">
                <p className="text-xs font-black font-space uppercase tracking-wider text-black">
                  Your Exclusive Admission Scholarship Voucher
                </p>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="font-mono font-black text-xl sm:text-2xl tracking-widest text-black">
                    {result.couponCode}
                  </span>
                  <button
                    onClick={copyCouponCode}
                    className="p-2 bg-emerald-300 hover:bg-emerald-400 rounded-lg border border-black transition"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                  </button>
                </div>
                <p className="text-xs font-bold text-neutral-700 font-jakarta">
                  Apply this voucher code during online admission or bring it to our Patna Campus to claim your {result.discountPercent}% fee waiver!
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Link
                  href={`/admission?coupon=${result.couponCode}`}
                  className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit uppercase tracking-wider rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 text-sm active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Scholarship & Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => window.print()}
                  className="px-5 py-3.5 bg-white hover:bg-[#dcfce7] text-black font-black font-outfit uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 text-sm active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* Question Review Section */}
            <div className="bg-white border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
              <h3 className="text-xl font-black font-outfit text-black mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                Detailed Solutions & Answer Key
              </h3>
              <div className="space-y-4 divide-y divide-black/10">
                {result.review.map((r, idx) => (
                  <div key={r.questionId} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black font-space uppercase text-neutral-500">
                        Q{idx + 1} ({r.subject})
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black font-space uppercase border ${
                        r.isCorrect
                          ? 'bg-emerald-200 border-emerald-800 text-emerald-950'
                          : 'bg-rose-200 border-rose-800 text-rose-950'
                      }`}>
                        {r.isCorrect ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-950 stroke-[3]" />
                            <span>Correct</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-950 stroke-[2.5]" />
                            <span>Incorrect</span>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-black font-jakarta">
                      Your Answer: <span className={r.isCorrect ? 'text-emerald-700 font-black' : 'text-rose-700 line-through'}>{r.selectedAnswer}</span>
                    </p>
                    {!r.isCorrect && (
                      <p className="text-sm font-bold text-emerald-800 font-jakarta mt-0.5">
                        Correct Answer: <span className="font-black">{r.correctAnswer}</span>
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
