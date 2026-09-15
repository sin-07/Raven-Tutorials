'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, AlertCircle, Trash2, Eye, Sparkles, CheckCircle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import FeedbackForm from '@/components/FeedbackForm';
import { StudentProtectedRoute } from '@/components';

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
      general: 'bg-[#bfdbfe] text-blue-950',
      course_content: 'bg-[#fef08a] text-yellow-950',
      teaching_method: 'bg-[#dcfce7] text-emerald-950',
      study_materials: 'bg-[#fed7aa] text-amber-950',
      online_classes: 'bg-[#e9d5ff] text-purple-950',
      test_system: 'bg-[#cffafe] text-cyan-950',
      complaint: 'bg-rose-200 text-rose-950'
    };
    return colors[category] || 'bg-[#bfdbfe] text-blue-950';
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      new: 'bg-[#fef08a] text-amber-950',
      reviewed: 'bg-[#bfdbfe] text-blue-950',
      resolved: 'bg-[#86efac] text-emerald-950'
    };
    return colors[status] || colors.new;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-black border-t-[#86efac] rounded-full animate-spin mx-auto mb-4" />
          <h3 className="font-outfit font-black text-xl text-black">Loading Feedback</h3>
          <p className="font-jakarta font-medium text-black/60 text-sm mt-1">Fetching your ticket history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fcf8] flex flex-col pt-20 pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
            <MessageSquare size={14} className="text-black" />
            <span>Student Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-black text-black tracking-tight">
            Feedback & Support
          </h1>
          <p className="text-black/80 font-jakarta font-semibold mt-1">
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
            <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
              <div className="p-5 bg-[#86efac] border-b-3 border-black flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-outfit font-black text-black">Your Submissions</h2>
                  <p className="text-xs font-space font-bold uppercase text-black/70">
                    Total: {feedbackList.length} feedback ticket{feedbackList.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {feedbackList.length > 0 ? (
                <div className="divide-y-2 divide-black max-h-[650px] overflow-y-auto">
                  {feedbackList.map(feedback => (
                    <div key={feedback._id} className="p-5 hover:bg-[#f0fdf4] transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex gap-1.5 mb-2 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-space font-black uppercase border border-black ${getCategoryColor(feedback.category)}`}>
                              {feedback.category?.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-space font-black uppercase border border-black ${getStatusColor(feedback.status || 'new')}`}>
                              {(feedback.status || 'new')}
                            </span>
                          </div>
                          <h3 className="text-lg font-outfit font-black text-black">{feedback.subject}</h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedFeedback(selectedFeedback?._id === feedback._id ? null : feedback)}
                            className="p-2 bg-[#fef08a] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-[#fde047] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                            title="View details"
                          >
                            <Eye className="w-4 h-4 text-black" />
                          </button>
                          <button
                            onClick={() => handleDeleteFeedback(feedback._id)}
                            disabled={deleting === feedback._id}
                            className="p-2 bg-rose-100 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-200 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-40"
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
                              className={`w-4 h-4 ${i < feedback.rating! ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Date */}
                      <p className="text-xs font-mono font-bold text-black/50">
                        {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                        {new Date(feedback.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>

                      {/* Expanded View */}
                      {selectedFeedback?._id === feedback._id && (
                        <div className="mt-3 p-4 bg-[#f0fdf4] border-2 border-black rounded-2xl space-y-3">
                          <div>
                            <h4 className="font-outfit font-black text-xs uppercase text-black/60 mb-1">Your Message:</h4>
                            <p className="text-sm font-jakarta font-medium text-black whitespace-pre-wrap break-words">
                              {feedback.message}
                            </p>
                          </div>
                          {feedback.adminResponse && (
                            <div className="pt-3 border-t-2 border-black">
                              <h4 className="font-outfit font-black text-xs uppercase text-emerald-900 mb-1 flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Official Admin Response:
                              </h4>
                              <p className="text-sm font-jakarta font-bold text-black whitespace-pre-wrap break-words">
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
                <div className="p-12 text-center bg-[#f0fdf4]">
                  <MessageSquare className="w-12 h-12 text-black/30 mx-auto mb-2" />
                  <p className="font-outfit font-black text-lg text-black">No feedback submitted yet</p>
                  <p className="text-xs font-jakarta text-black/60 mt-1">Submit your first suggestion using the form on the left</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-6 bg-[#fef08a] border-3 border-black rounded-3xl shadow-[4px_4px_0px_#000]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-outfit font-black text-lg text-black mb-1">Every Voice Matters!</h3>
              <ul className="text-xs sm:text-sm font-jakarta font-bold text-black/80 space-y-1 list-disc list-inside">
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
