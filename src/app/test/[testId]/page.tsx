'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';
import Loader from '@/components/Loader';
import { StudentProtectedRoute } from '@/components';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface Question {
  _id?: string;
  questionText: string;
  questionType: 'MCQ' | 'True/False' | 'Short Answer';
  options?: string[];
  correctAnswer: string;
  marks: number;
}

interface Test {
  _id: string;
  testId: string;
  title: string;
  description?: string;
  subject: string;
  standard: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
}

interface Violation {
  violationType: string;
  timestamp: string;
  question: number;
}

function TakeTestPage() {
  const { testId } = useParams();
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Freeze background when submit modal is open
  useBodyScrollLock(showSubmitModal);

  const testContainerRef = useRef<HTMLDivElement>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch test details
  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  // Timer
  useEffect(() => {
    if (!testStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeRemaining]);

  // Anti-cheating: Detect tab switching
  useEffect(() => {
    if (!testStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('Tab switched or window minimized');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted]);

  // Anti-cheating: Detect right-click
  useEffect(() => {
    if (!testStarted) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      recordViolation('Right-click detected');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [testStarted]);

  // Anti-cheating: Detect copy/paste
  useEffect(() => {
    if (!testStarted) return;

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      recordViolation('Copy attempt detected');
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      recordViolation('Paste attempt detected');
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, [testStarted]);

  // Anti-cheating: Detect keyboard shortcuts
  useEffect(() => {
    if (!testStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J (DevTools)
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U (View Source)
      ) {
        e.preventDefault();
        recordViolation('Developer tools access attempt');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [testStarted]);

  // Anti-cheating: Monitor fullscreen exit
  useEffect(() => {
    if (!testStarted) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);

      if (!isCurrentlyFullscreen && testStarted) {
        recordViolation('Exited fullscreen mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [testStarted]);

  const fetchTestDetails = async () => {
    try {
      const res = await fetch(`/api/student/tests/${testId}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setTest(data.data);
        setTimeRemaining(data.data.duration * 60); // Convert minutes to seconds
      } else {
        toast.error(data.message);
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Error loading test');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const recordViolation = (type: string) => {
    const violation: Violation = {
      violationType: type,
      timestamp: new Date().toISOString(),
      question: currentQuestion + 1,
    };

    setViolations((prev) => [...prev, violation]);

    // Show warning
    setShowWarning(true);

    // Clear existing timeout
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Auto-hide warning after 3 seconds
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(false);
    }, 3000);

    // Auto-submit if too many violations
    if (violations.length >= 4) {
      toast.error('Too many violations detected. Test will be auto-submitted.');
      setTimeout(() => handleAutoSubmit(), 2000);
    }
  };

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {
          console.log('Fullscreen not available, continuing without it');
        });
      }
      setIsFullscreen(true);
      setTestStarted(true);
    } catch (error) {
      console.log('Fullscreen not supported, starting test anyway');
      setIsFullscreen(false);
      setTestStarted(true);
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleAutoSubmit = async () => {
    await handleSubmit(true);
  };

  const confirmSubmit = async () => {
    if (!test) return;
    
    setShowSubmitModal(false);
    setSubmitting(true);

    try {
      const formattedAnswers = test.questions.map((question, index) => ({
        questionId: question._id || index.toString(),
        answer: answers[index] || null,
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        marks: question.marks,
      }));

      const submissionData = {
        testId: test._id,
        answers: formattedAnswers,
        violations,
        timeSpent: test.duration * 60 - timeRemaining,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(`/api/student/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Test submitted successfully! 🎉');

        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }

        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Error submitting test');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Error submitting test');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    if (!isAutoSubmit) {
      setShowSubmitModal(true);
      return;
    }
    await confirmSubmit();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (loading) {
    return <Loader />;
  }

  // Not Found State
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6fcf8] p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#000] text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-2xl bg-rose-200 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
            <XCircle className="w-8 h-8 text-rose-900" />
          </div>
          <h2 className="text-2xl font-outfit font-black text-black mb-2">
            Assessment Not Found
          </h2>
          <p className="text-sm font-jakarta font-medium text-black/70 mb-6">
            This test could not be located or may have been concluded.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-[#86efac] hover:bg-[#4ade80] text-black border-2 border-black px-6 py-3 rounded-xl font-outfit font-black text-base shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            ← Back to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Pre-test Instructions Screen
  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6fcf8] px-4 py-12 sm:py-16">
        <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] w-full max-w-4xl p-6 sm:p-10 md:p-12 border-3 border-black">
          {/* RAVEN Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 bg-[#86efac] text-black border-2 border-black rounded-2xl px-6 py-2.5 font-outfit font-black text-xl shadow-[3px_3px_0px_#000]">
              <img
                src="/logo.png"
                alt="RAVEN"
                className="w-7 h-7 object-contain"
              />
              <span>RAVEN TUTORIALS</span>
            </div>
          </div>

          {/* Test Title & Meta */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-black text-black tracking-tight mb-3">
              {test.title}
            </h1>
            <div className="inline-flex items-center gap-2 bg-[#fef08a] border-2 border-black px-4 py-1.5 rounded-full text-xs font-space font-black uppercase text-black shadow-[2px_2px_0px_#000]">
              <Sparkles size={14} className="text-black" />
              <span>{test.subject} • Class {test.standard}</span>
            </div>
            {test.description && (
              <p className="text-sm sm:text-base font-jakarta font-medium text-black/75 mt-3 max-w-2xl mx-auto">
                {test.description}
              </p>
            )}
          </div>

          {/* Test Info Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border-3 border-black text-center shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <p className="text-[11px] font-space font-black uppercase text-black/60 tracking-wider">Duration</p>
              <p className="text-2xl font-outfit font-black text-black mt-0.5">
                {test.duration} <span className="text-xs font-space font-bold uppercase">min</span>
              </p>
            </div>

            <div className="bg-[#dcfce7] p-5 rounded-2xl border-3 border-black text-center shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
                <Award className="w-5 h-5 text-black" />
              </div>
              <p className="text-[11px] font-space font-black uppercase text-black/60 tracking-wider">Total Marks</p>
              <p className="text-2xl font-outfit font-black text-black mt-0.5">
                {test.totalMarks}
              </p>
            </div>

            <div className="bg-[#bfdbfe] p-5 rounded-2xl border-3 border-black text-center shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
                <HelpCircle className="w-5 h-5 text-black" />
              </div>
              <p className="text-[11px] font-space font-black uppercase text-black/60 tracking-wider">Questions</p>
              <p className="text-2xl font-outfit font-black text-black mt-0.5">
                {test.questions.length}
              </p>
            </div>

            <div className="bg-[#fef08a] p-5 rounded-2xl border-3 border-black text-center shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
              <p className="text-[11px] font-space font-black uppercase text-black/60 tracking-wider">Pass Mark</p>
              <p className="text-2xl font-outfit font-black text-black mt-0.5">
                {test.passingMarks}
              </p>
            </div>
          </div>

          {/* Anti-Cheating Rules Notice Card */}
          <div className="bg-[#fef08a] border-3 border-black rounded-2xl p-5 sm:p-6 mb-8 shadow-[4px_4px_0px_#000]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                <ShieldAlert className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1">
                <h3 className="font-outfit font-black text-lg text-black mb-2">
                  Academic Honesty & Security Guidelines:
                </h3>
                <ul className="text-xs sm:text-sm font-jakarta font-bold text-black/80 space-y-1.5 list-disc list-inside">
                  <li>Fullscreen mode is recommended for an uninterrupted exam session</li>
                  <li>Do not switch browser tabs or minimize the window during the test</li>
                  <li>Right-click context menu and clipboard copy/paste are disabled</li>
                  <li>Developer tools and inspection keys are blocked</li>
                  <li>Repeated security violations will trigger immediate automatic submission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start Test Tactile Button */}
          <button
            onClick={enterFullscreen}
            className="w-full bg-[#86efac] hover:bg-[#4ade80] text-black border-3 border-black py-4 sm:py-5 rounded-2xl font-outfit font-black text-xl shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Start Test Now</span>
            <ArrowRight className="w-6 h-6 text-black" />
          </button>

          <p className="text-xs font-jakarta font-semibold text-black/60 text-center mt-4">
            ⚡ Fullscreen is recommended but optional. Once you begin, the timer starts automatically.
          </p>

          {/* Back to Dashboard */}
          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-black font-outfit font-black text-sm hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span>Back to Student Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Examination Screen
  const question = test.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div ref={testContainerRef} className="min-h-screen bg-[#f6fcf8] text-black flex flex-col">
      {/* Security Warning Banner */}
      {showWarning && (
        <div className="bg-rose-500 text-white py-3 px-4 z-50 border-b-3 border-black shadow-[0px_4px_0px_#000] animate-bounce sticky top-0">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <AlertCircle size={22} className="shrink-0" />
            <span className="font-outfit font-black text-sm sm:text-base tracking-wide">
              WARNING: Suspicious activity logged! ({violations.length} violations recorded)
            </span>
          </div>
        </div>
      )}

      {/* Examination Top Header */}
      <header className="bg-white border-b-3 border-black px-4 sm:px-6 py-3.5 shadow-[0px_4px_0px_#000] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#86efac] text-black border-2 border-black rounded-xl px-3 py-1 font-outfit font-black text-base shadow-[2px_2px_0px_#000]">
              <img
                src="/logo.png"
                alt="RAVEN"
                className="w-5 h-5 object-contain"
              />
              <span>RAVEN</span>
            </div>
            <div>
              <h1 className="text-lg font-outfit font-black text-black leading-none">
                {test.title}
              </h1>
              <p className="text-xs font-space font-bold uppercase text-black/60 mt-1">
                {test.subject} • Class {test.standard}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Countdown Timer */}
            <div className={`flex items-center gap-2 border-2 border-black px-4 py-1.5 rounded-xl shadow-[2px_2px_0px_#000] transition-colors ${
              timeRemaining < 300 
                ? 'bg-rose-200 text-rose-950 animate-pulse' 
                : 'bg-[#fef08a] text-black'
            }`}>
              <Clock className="w-4 h-4 text-black" />
              <span className="font-mono font-black text-base tracking-wider">
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Question Counter */}
            <div className="bg-white border-2 border-black px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_#000]">
              <span className="text-xs font-space font-bold uppercase text-black/60 block leading-none">Question</span>
              <span className="font-mono font-black text-sm text-black">
                {currentQuestion + 1} / {test.questions.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Question Navigator & Progress */}
          <aside className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[6px_6px_0px_#000] sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
                <h3 className="font-outfit font-black text-lg text-black">Question Palette</h3>
                <span className="text-xs font-mono font-bold bg-[#dcfce7] border border-black px-2 py-0.5 rounded-md">
                  {Object.keys(answers).length}/{test.questions.length} Done
                </span>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 mb-5 max-h-56 overflow-y-auto p-1">
                {test.questions.map((_, index) => {
                  const isCurrent = currentQuestion === index;
                  const isAnsweredQ = answers[index] !== undefined;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`w-10 h-10 rounded-xl font-mono font-black text-sm border-2 border-black transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#fef08a] text-black shadow-[3px_3px_0px_#000] scale-105 ring-2 ring-black'
                          : isAnsweredQ
                          ? 'bg-[#86efac] text-black shadow-[2px_2px_0px_#000]'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Palette Legend */}
              <div className="space-y-2 text-xs font-jakarta font-bold pt-3 border-t-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#fef08a] border-2 border-black rounded-md"></div>
                  <span className="text-black/80">Active Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#86efac] border-2 border-black rounded-md"></div>
                  <span className="text-black/80">Answered ({Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-neutral-100 border-2 border-black rounded-md"></div>
                  <span className="text-black/80">Unanswered ({test.questions.length - Object.keys(answers).length})</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5 pt-4 border-t-2 border-black">
                <div className="flex justify-between items-center text-xs font-mono font-bold mb-1.5">
                  <span className="font-space uppercase text-black/70">Completion</span>
                  <span className="text-black">{Math.round((Object.keys(answers).length / test.questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-neutral-100 border-2 border-black rounded-full h-3.5 p-0.5 overflow-hidden">
                  <div
                    className="bg-[#86efac] h-full rounded-full transition-all duration-300 border-r border-black"
                    style={{
                      width: `${(Object.keys(answers).length / test.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Early Submit button shortcut */}
              <div className="mt-5 pt-3">
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#fef08a] hover:bg-[#fde047] text-black border-2 border-black rounded-xl font-outfit font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  Review & Finish Test
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Question Content & Options */}
          <section className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-3 border-black shadow-[6px_6px_0px_#000]">
              {/* Question Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center font-outfit font-black text-base shadow-[1px_1px_0px_#000]">
                    Q{currentQuestion + 1}
                  </span>
                  <span className="text-sm font-space font-bold uppercase text-black/60">
                    Type: <strong className="text-black">{question.questionType}</strong>
                  </span>
                </div>
                <span className="bg-[#dcfce7] text-black border-2 border-black px-3.5 py-1 rounded-full text-xs font-space font-black uppercase shadow-[1px_1px_0px_#000]">
                  {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl sm:text-2xl font-outfit font-black text-black leading-snug mb-8">
                {question.questionText}
              </h2>

              {/* MCQ Options */}
              {question.questionType === 'MCQ' && (
                <div className="space-y-3.5">
                  {question.options?.map((option, index) => {
                    if (!option) return null;
                    const isSelected = answers[currentQuestion] === option;
                    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

                    return (
                      <label
                        key={index}
                        onClick={() => handleAnswerChange(currentQuestion, option)}
                        className={`flex items-center p-4 sm:p-5 border-3 border-black rounded-2xl cursor-pointer transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                          isSelected
                            ? 'bg-[#86efac] ring-2 ring-black transform -translate-y-0.5'
                            : 'bg-[#f0fdf4] hover:bg-[#dcfce7]'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          checked={isSelected}
                          onChange={() => {}}
                          className="sr-only"
                        />
                        <span className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center font-outfit font-black text-sm shrink-0 shadow-[1px_1px_0px_#000] ${
                          isSelected ? 'bg-[#fef08a] text-black' : 'bg-white text-black'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="ml-3.5 font-jakarta font-bold text-base text-black flex-1">
                          {option}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-black shrink-0 ml-2" />
                        )}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* True/False Options */}
              {question.questionType === 'True/False' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['True', 'False'].map((option) => {
                    const isSelected = answers[currentQuestion] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswerChange(currentQuestion, option)}
                        className={`p-6 border-3 border-black rounded-2xl font-outfit font-black text-xl shadow-[4px_4px_0px_#000] cursor-pointer transition-all flex items-center justify-center gap-3 active:translate-x-0.5 active:translate-y-0.5 ${
                          isSelected
                            ? option === 'True'
                              ? 'bg-[#86efac] text-black ring-2 ring-black transform -translate-y-0.5'
                              : 'bg-rose-200 text-rose-950 ring-2 ring-black transform -translate-y-0.5'
                            : 'bg-[#f0fdf4] hover:bg-[#dcfce7] text-black'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <CheckCircle className="w-5 h-5" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Short Answer Textarea */}
              {question.questionType === 'Short Answer' && (
                <div>
                  <textarea
                    value={answers[currentQuestion] || ''}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion, e.target.value)
                    }
                    className="w-full p-4 sm:p-5 bg-[#f0fdf4] border-3 border-black rounded-2xl focus:outline-none focus:ring-3 focus:ring-[#86efac] font-jakarta font-bold text-black placeholder-neutral-400 text-base shadow-[3px_3px_0px_#000]"
                    rows={5}
                    placeholder="Type your precise explanation or formula here..."
                  />
                  <p className="text-xs font-jakarta font-semibold text-black/60 mt-2">
                    Tip: Be concise and check key terms and figures before navigating.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 sm:p-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_#000]">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black border-2 border-black rounded-xl font-outfit font-black shadow-[3px_3px_0px_#000] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {currentQuestion === test.questions.length - 1 ? (
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#fef08a] hover:bg-[#fde047] text-black border-3 border-black rounded-2xl font-outfit font-black text-base shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Finish & Submit Test 🚀</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-8 py-3 bg-[#86efac] hover:bg-[#4ade80] text-black border-2 border-black rounded-xl font-outfit font-black text-base shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-[10000] p-4 overscroll-contain">
          <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] max-w-md w-full p-6 sm:p-8 border-3 border-black text-center overscroll-contain">
            {/* RAVEN Badge */}
            <div className="inline-flex items-center gap-2 bg-[#86efac] text-black border-2 border-black rounded-xl px-4 py-1.5 font-outfit font-black text-sm mb-4 shadow-[2px_2px_0px_#000]">
              <img
                src="/logo.png"
                alt="RAVEN"
                className="w-5 h-5 object-contain"
              />
              <span>SUBMISSION REVIEW</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
              <AlertCircle className="w-8 h-8 text-black" />
            </div>

            <h3 className="text-2xl font-outfit font-black text-black mb-2">
              Ready to Submit Test?
            </h3>
            <p className="text-xs font-jakarta font-medium text-black/70 mb-5">
              Please verify your answers. Once submitted, your scores will be evaluated.
            </p>

            {/* Answered Stat Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                <p className="text-xs font-space font-black uppercase text-black/60 mb-0.5">
                  Answer Progress
                </p>
                <p className="text-3xl font-outfit font-black text-black">
                  {Object.keys(answers).length} / {test.questions.length}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#dcfce7] border-2 border-black rounded-xl p-3 shadow-[1px_1px_0px_#000]">
                  <p className="text-[10px] font-space font-black uppercase text-black/60">Answered</p>
                  <p className="text-xl font-outfit font-black text-emerald-950">
                    {Object.keys(answers).length}
                  </p>
                </div>
                <div className="bg-rose-100 border-2 border-black rounded-xl p-3 shadow-[1px_1px_0px_#000]">
                  <p className="text-[10px] font-space font-black uppercase text-black/60">Unanswered</p>
                  <p className="text-xl font-outfit font-black text-rose-950">
                    {test.questions.length - Object.keys(answers).length}
                  </p>
                </div>
              </div>
            </div>

            {Object.keys(answers).length < test.questions.length ? (
              <div className="bg-[#fef08a] border-2 border-black rounded-xl p-3 mb-6 text-xs font-jakarta font-bold text-black shadow-[2px_2px_0px_#000]">
                ⚠️ You have {test.questions.length - Object.keys(answers).length} unanswered question(s). You can still submit or go back to complete them.
              </div>
            ) : (
              <div className="bg-[#dcfce7] border-2 border-black rounded-xl p-3 mb-6 text-xs font-jakarta font-bold text-emerald-950 shadow-[2px_2px_0px_#000]">
                ✓ Great job! All questions have been answered.
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                disabled={submitting}
                className="flex-1 bg-white hover:bg-neutral-100 text-black border-2 border-black py-3 rounded-xl font-outfit font-black text-sm shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={confirmSubmit}
                disabled={submitting}
                className="flex-1 bg-[#86efac] hover:bg-[#4ade80] text-black border-2 border-black py-3 rounded-xl font-outfit font-black text-sm shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit Test 🚀'}
              </button>
            </div>

            <p className="text-[11px] font-mono text-black/50 mt-4">
              Answers are encrypted & finalized upon submission.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap with StudentProtectedRoute for security
export default function ProtectedTestPage() {
  return (
    <StudentProtectedRoute>
      <TakeTestPage />
    </StudentProtectedRoute>
  );
}
