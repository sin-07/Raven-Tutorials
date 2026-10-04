'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, AlertCircle, Trash2, Eye, Sparkles, CheckCircle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import FeedbackForm from '@/components/FeedbackForm';
import { StudentProtectedRoute } from '@/components';
import Loader from '@/components/Loader';

interface Feedback {
  _id: string;
  subject: string;
  message: string;
  category: string;
  rating?: number;
  status: string;
  adminResponse?: string;
  createdAt: string;
}

interface StudentInfo {
  _id: string;
  name: string;
  email: string;
}

function FeedbackPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/verify', {
        credentials: 'include'
      });

      if (!res.ok) {
        router.push('/login');
        return;
      }

      const { student: studentData } = await res.json();
      setStudent(studentData);
      await fetchFeedback();
    } catch (err) {
      console.error('Init error:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbackList(data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load feedback');
    }
  }, []);

  const handleDeleteFeedback = async (feedbackId: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    setDeleting(feedbackId);

    try {
      const res = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Feedback deleted');
        await fetchFeedback();
      } else {
        toast.error('Failed to delete feedback');
      }
    } catch (err) {
      toast.error('Failed to delete feedback');
    } finally {
      setDeleting(null);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      general: 'bg-[#161922] text-[#93c5fd] border-blue-500/30',
      course_content: 'bg-[#14120e] text-[#fde047] border-yellow-500/30',
      teaching_method: 'bg-[#14120e] text-[#ff7b47] border-[#e8602e]/30',
      study_materials: 'bg-[#14120e] text-[#ffaa40] border-[#ffaa40]/30',
      online_classes: 'bg-[#191524] text-[#c084fc] border-purple-500/30',
      test_system: 'bg-[#121c24] text-[#67e8f9] border-cyan-500/30',
      complaint: 'bg-[#201216] text-[#fda4af] border-rose-500/30'
    };
    return colors[category] || 'bg-[#161922] text-[#93c5fd] border-blue-500/30';
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      new: 'bg-[#14120e] text-[#ffaa40] border-[#ffaa40]/30',
      reviewed: 'bg-[#161922] text-[#93c5fd] border-blue-500/30',
      resolved: 'bg-[#14120e] text-[#ff7b47] border-[#e8602e]/30'
    };
    return colors[status] || colors.new;
  };

  if (loading) {
    return (
      <Loader
        fullScreen
        size="lg"
        text="Loading Feedback"
        subtitle="Fetching your ticket history..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white flex flex-col pt-24 pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#e8602e]/20 via-[#ff733d]/20 to-[#ffaa40]/20 border border-[#e8602e]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(232,96,46,0.2)]">
          <div className="inline-flex items-center gap-2 bg-[#161922] px-3 py-1 rounded-full border border-[#e8602e]/30 text-xs font-space font-bold uppercase text-[#ff7b47] mb-2 shadow-sm">
            <MessageSquare size={14} className="text-[#e8602e]" />
            <span>Student Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-black text-white tracking-tight">
            Feedback & Support
          </h1>
          <p className="text-neutral-300 font-jakarta font-medium mt-1">
            Share your thoughts, suggestions, and queries directly with our faculty team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feedback Form (Left Column) */}
          <div className="lg:col-span-5">
            <FeedbackForm
              studentId={student?._id}
              onSubmitSuccess={() => fetchFeedback()}
            />
          </div>

          {/* Feedback List (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f111a]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-5 bg-[#161922] border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-outfit font-black text-white">Your Submissions</h2>
                  <p className="text-xs font-space font-bold uppercase text-neutral-400">
                    Total: {feedbackList.length} feedback ticket{feedbackList.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {feedbackList.length > 0 ? (
                <div className="divide-y divide-white/10 max-h-[650px] overflow-y-auto">
                  {feedbackList.map(feedback => (
                    <div key={feedback._id} className="p-5 hover:bg-[#131622] transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex gap-1.5 mb-2 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-space font-bold uppercase border ${getCategoryColor(feedback.category)}`}>
                              {feedback.category?.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-space font-bold uppercase border ${getStatusColor(feedback.status || 'new')}`}>
                              {(feedback.status || 'new')}
                            </span>
                          </div>
                          <h3 className="text-lg font-outfit font-black text-white">{feedback.subject}</h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedFeedback(selectedFeedback?._id === feedback._id ? null : feedback)}
                            className="p-2 bg-[#161922] border border-white/10 rounded-xl hover:border-[#e8602e]/50 hover:text-[#ff7b47] transition-colors cursor-pointer text-neutral-300"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFeedback(feedback._id)}
                            disabled={deleting === feedback._id}
                            className="p-2 bg-rose-950/50 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-900/50 transition-colors cursor-pointer disabled:opacity-40"
                            title="Delete feedback"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Rating */}
                      {feedback.rating && (
                        <div className="flex gap-1 mb-2 items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < feedback.rating! ? 'text-[#ffaa40] fill-[#ffaa40]' : 'text-neutral-700'}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Date */}
                      <p className="text-xs font-mono font-medium text-neutral-500">
                        {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                        {new Date(feedback.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>

                      {/* Expanded View */}
                      {selectedFeedback?._id === feedback._id && (
                        <div className="mt-3 p-4 bg-[#08090d] border border-white/10 rounded-2xl space-y-3">
                          <div>
                            <h4 className="font-outfit font-bold text-xs uppercase text-neutral-400 mb-1">Your Message:</h4>
                            <p className="text-sm font-jakarta font-medium text-neutral-200 whitespace-pre-wrap break-words">
                              {feedback.message}
                            </p>
                          </div>
                          {feedback.adminResponse && (
                            <div className="pt-3 border-t border-white/10">
                              <h4 className="font-outfit font-bold text-xs uppercase text-[#ff7b47] mb-1 flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Official Admin Response:
                              </h4>
                              <p className="text-sm font-jakarta font-semibold text-white whitespace-pre-wrap break-words">
                                {feedback.adminResponse}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-[#08090d]">
                  <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-2" />
                  <p className="font-outfit font-black text-lg text-white">No feedback submitted yet</p>
                  <p className="text-xs font-jakarta text-neutral-400 mt-1">Submit your first suggestion using the form on the left</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-6 bg-[#14120e] border border-[#ffaa40]/30 rounded-3xl shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#161922] border border-[#e8602e]/30 flex items-center justify-center shrink-0 shadow-sm text-[#ff7b47]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-outfit font-black text-lg text-white mb-1">Every Voice Matters!</h3>
              <ul className="text-xs sm:text-sm font-jakarta font-medium text-neutral-300 space-y-1 list-disc list-inside">
                <li>Your suggestions directly shape class schedules, study materials, and teaching aids</li>
                <li>All submissions are reviewed by the lead academic mentors</li>
                <li>You will receive verified responses for inquiries or feedback tickets</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrap with StudentProtectedRoute for security
export default function ProtectedFeedbackPage() {
  return (
    <StudentProtectedRoute>
      <FeedbackPage />
    </StudentProtectedRoute>
  );
}
