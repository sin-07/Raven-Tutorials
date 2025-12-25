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
} from 'lucide-react';
import Loader from '@/components/Loader';

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
  title: string;
  description?: string;
  subject: string;
  class: string;
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

export default function TakeTestPage() {
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
      const res = await fetch(`/api/student/tests/${testId}`);
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
      // Try to enter fullscreen, but don't block if it fails
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {
          // Fullscreen failed, but continue anyway
          console.log('Fullscreen not available, continuing without it');
        });
      }
      setIsFullscreen(true);
      setTestStarted(true);
    } catch (error) {
      // If fullscreen fails, still allow test to start
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
      // Format answers for submission
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
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Test submitted successfully!');

        // Exit fullscreen
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

    // For auto-submit, call confirmSubmit directly
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

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Test not found
          </h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8">
          {/* RAVEN Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg px-6 py-3 font-bold text-3xl shadow-lg">
              <img
                src="/logo.png"
                alt="RAVEN"
                className="w-10 h-10 object-contain"
              />
              RAVEN TUTORIALS
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {test.title}
          </h1>
          <p className="text-gray-600 mb-6">{test.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-xl font-bold text-blue-600">
                {test.duration} minutes
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Marks</p>
              <p className="text-xl font-bold text-green-600">
                {test.totalMarks}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-xl font-bold text-purple-600">
                {test.questions.length}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Passing Marks</p>
              <p className="text-xl font-bold text-orange-600">
                {test.passingMarks}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle
                className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Anti-Cheating Rules:
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Fullscreen mode is recommended</li>
                  <li>• Do not switch tabs or minimize the window</li>
                  <li>• Right-click is disabled</li>
                  <li>• Copy/paste is disabled</li>
                  <li>• Developer tools are blocked</li>
                  <li>
                    • All violations will be recorded and may result in
                    auto-submission
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={enterFullscreen}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300"
          >
            Start Test
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Note: Fullscreen mode is recommended but not required to start the
            test
          </p>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div ref={testContainerRef} className="min-h-screen bg-gray-50 pt-16">
      {/* Warning Banner */}
      {showWarning && (
        <div className="fixed top-16 left-0 right-0 bg-red-600 text-white py-3 px-4 z-50 animate-pulse">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <AlertCircle className="mr-2" size={20} />
            <span className="font-semibold">
              Warning: Suspicious activity detected! ({violations.length}{' '}
              violations recorded)
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-white shadow-md ${showWarning ? 'mt-12' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg px-4 py-2 font-bold text-xl">
                <img
                  src="/logo.png"
                  alt="RAVEN"
                  className="w-8 h-8 object-contain"
                />
                RAVEN
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {test.title}
                </h1>
                <p className="text-sm text-gray-600">{test.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock
                  className={
                    timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'
                  }
                  size={20}
                />
                <span
                  className={`text-lg font-mono font-bold ${
                    timeRemaining < 300 ? 'text-red-600' : 'text-gray-800'
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Question</p>
                <p className="text-lg font-bold text-gray-800">
                  {currentQuestion + 1} / {test.questions.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-3">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {test.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      currentQuestion === index
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : answers[index] !== undefined
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-700 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-400 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (Object.keys(answers).length / test.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Object.keys(answers).length} / {test.questions.length}{' '}
                  answered
                </p>
              </div>
            </div>
          </div>

          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Question {currentQuestion + 1}
                </h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                </span>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {question.questionText}
              </p>

              {question.questionType === 'MCQ' && (
                <div className="space-y-3">
                  {question.options?.map(
                    (option, index) =>
                      option && (
                        <label
                          key={index}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            answers[currentQuestion] === option
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value={option}
                            checked={answers[currentQuestion] === option}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion,
                                e.target.value
                              )
                            }
                            className="w-5 h-5 text-blue-600"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      )
                  )}
                </div>
              )}

              {question.questionType === 'True/False' && (
                <div className="space-y-3">
                  {['True', 'False'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQuestion] === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={(e) =>
                          handleAnswerChange(currentQuestion, e.target.value)
                        }
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.questionType === 'Short Answer' && (
                <textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion, e.target.value)
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Type your answer here..."
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                ← Previous
              </button>

              <div className="flex gap-3">
                {currentQuestion === test.questions.length - 1 ? (
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={submitting}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
            <div className="text-center">
              {/* RAVEN Logo */}
              <div className="mx-auto flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg px-4 py-2 font-bold text-2xl">
                  <img
                    src="/logo.png"
                    alt="RAVEN"
                    className="w-8 h-8 object-contain"
                  />
                  RAVEN
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Submit Test?
              </h3>

              <div className="mb-6 space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">
                    Questions Answered
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {Object.keys(answers).length} / {test.questions.length}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Answered</p>
                    <p className="text-xl font-bold text-green-600">
                      {Object.keys(answers).length}
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Unanswered</p>
                    <p className="text-xl font-bold text-red-600">
                      {test.questions.length - Object.keys(answers).length}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {Object.keys(answers).length < test.questions.length ? (
                  <span className="text-yellow-700 font-medium">
                    ⚠️ You have unanswered questions. Are you sure you want to
                    submit?
                  </span>
                ) : (
                  <span className="text-green-700 font-medium">
                    ✓ All questions answered. Ready to submit?
                  </span>
                )}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Yes, Submit'}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Once submitted, you cannot modify your answers
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
