'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Filter, Eye, Send, Trash2, CheckCircle, Clock, AlertCircle, Sparkles, Star, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';

interface FeedbackData {
  _id: string;
  subject: string;
  message: string;
  category: string;
  rating?: number;
  status: 'new' | 'reviewed' | 'resolved';
  adminResponse?: string;
  respondedAt?: string;
  createdAt: string;
  studentId?: {
    studentName: string;
    email: string;
  };
  guestName?: string;
  guestEmail?: string;
}

interface Stats {
  total: number;
  new: number;
  reviewed: number;
  resolved: number;
}

const Feedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, reviewed: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, [page, statusFilter, searchTerm]);

  const fetchFeedbacks = async () => {
    try {
      let url = `/api/feedback/admin/all?page=${page}&limit=10`;
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      setFeedbacks(data.data.feedback || []);
      setTotalPages(data.data.pagination?.pages || 1);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/feedback/admin/stats', { credentials: 'include' });
      const data = await res.json();
      setStats(data.data);
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  const handleViewFeedback = async (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setAdminResponse(feedback.adminResponse || '');

    if (feedback.status === 'new') {
      try {
        await fetch(`/api/feedback/admin/${feedback._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: 'reviewed' })
        });
        fetchFeedbacks();
        fetchStats();
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  const handleSubmitResponse = async () => {
    if (!adminResponse.trim()) {
      toast.error('Please enter a response');
      return;
    }

    setSubmitting(true);
    try {
      await fetch(`/api/feedback/admin/${selectedFeedback?._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          adminResponse: adminResponse.trim(),
          status: 'resolved'
        })
      });

      toast.success('Response sent successfully!');
      setSelectedFeedback(null);
      setAdminResponse('');
      fetchFeedbacks();
      fetchStats();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await fetch(`/api/feedback/admin/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      toast.success('Feedback deleted');
      fetchFeedbacks();
      fetchStats();
      if (selectedFeedback?._id === id) {
        setSelectedFeedback(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete feedback');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      course_content: 'bg-[#34d399]/15 text-[#6ee7b7] border-[#34d399]/30',
      teaching_method: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      study_materials: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      online_classes: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      test_system: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      complaint: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
    };
    return colors[category] || colors.general;
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { icon: React.ComponentType<any>; color: string; label: string } } = {
      new: { icon: AlertCircle, color: 'bg-amber-500/15 text-amber-300 border-amber-500/30', label: 'New' },
      reviewed: { icon: Eye, color: 'bg-sky-500/15 text-sky-300 border-sky-500/30', label: 'Reviewed' },
      resolved: { icon: CheckCircle, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', label: 'Resolved' }
    };
    return badges[status] || badges.new;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader size="lg" text="Loading Feedbacks..." subtitle="Syncing feedback reports" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
              <MessageSquare size={14} />
              <span>Community Voice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
              Feedback Management
            </h1>
            <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
              Review thoughts, queries, suggestions, and send direct responses to students
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-bold uppercase text-zinc-400">Total Feedback</p>
                <p className="text-3xl font-outfit font-black text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-amber-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-bold uppercase text-amber-300/80">New / Unread</p>
                <p className="text-3xl font-outfit font-black text-amber-400 mt-1">{stats.new}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-sky-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-bold uppercase text-sky-300/80">Reviewed</p>
                <p className="text-3xl font-outfit font-black text-sky-400 mt-1">{stats.reviewed}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-emerald-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-bold uppercase text-emerald-300/80">Resolved</p>
                <p className="text-3xl font-outfit font-black text-emerald-400 mt-1">{stats.resolved}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search feedback by subject, name, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center shrink-0 text-[#6ee7b7]">
                <Filter className="w-4 h-4" />
              </div>
              <CartoonDropdown
                size="sm"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                className="flex-1"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'new', label: 'New' },
                  { value: 'reviewed', label: 'Reviewed' },
                  { value: 'resolved', label: 'Resolved' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Feedback List & Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List Panel */}
          <div className="lg:col-span-5 bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col text-white">
            <div className="p-4 md:p-5 bg-[#0f1222] border-b border-white/10">
              <h2 className="text-lg font-outfit font-bold text-white">Feedback Submissions</h2>
              <p className="text-xs font-space font-medium uppercase text-zinc-400">Click any feedback to read & reply</p>
            </div>
            <div className="divide-y divide-white/5 max-h-[620px] overflow-y-auto flex-1">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => {
                  const statusBadge = getStatusBadge(feedback.status);
                  const StatusIcon = statusBadge.icon;
                  const isSelected = selectedFeedback?._id === feedback._id;
                  return (
                    <div
                      key={feedback._id}
                      onClick={() => handleViewFeedback(feedback)}
                      className={`p-4 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-white/[0.04] border-l-4 border-l-[#34d399]' 
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex-1">
                          <h3 className="font-outfit font-bold text-white text-base line-clamp-1">{feedback.subject}</h3>
                          <div className="flex gap-1.5 flex-wrap mt-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-space font-bold uppercase border ${getCategoryColor(feedback.category)}`}>
                              {feedback.category?.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-space font-bold uppercase border flex items-center gap-1 ${statusBadge.color}`}>
                              <StatusIcon className="w-2.5 h-2.5" />
                              {statusBadge.label}
                            </span>
                          </div>
                        </div>
                        {feedback.rating && (
                          <div className="flex gap-0.5 bg-white/5 px-2 py-1 rounded-lg border border-white/10 shrink-0 items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < feedback.rating! ? 'fill-amber-400 text-amber-500' : 'text-zinc-600'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-jakarta font-medium text-zinc-300 line-clamp-1">
                        From: {feedback.studentId?.studentName || feedback.guestName || 'Anonymous Student'}
                      </p>
                      <p className="text-[11px] font-mono font-medium text-zinc-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                        {new Date(feedback.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                  <p className="font-outfit font-bold text-white text-base">No feedback found</p>
                  <p className="text-xs font-jakarta text-zinc-400">Try clearing filters</p>
                </div>
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-white/10 bg-[#070914] flex items-center justify-between">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-outfit font-bold text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs font-mono font-bold text-zinc-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-outfit font-bold text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Details & Reply Panel */}
          <div className="lg:col-span-7 bg-[#0c0f1c] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col justify-between text-white">
            {selectedFeedback ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">{selectedFeedback.subject}</h2>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-space font-bold uppercase border ${getCategoryColor(selectedFeedback.category)}`}>
                        {selectedFeedback.category?.replace(/_/g, ' ')}
                      </span>
                      {(() => {
                        const StatusBadge = getStatusBadge(selectedFeedback.status);
                        const StatusIcon = StatusBadge.icon;
                        return (
                          <span className={`px-3 py-1 rounded-lg text-xs font-space font-bold uppercase border flex items-center gap-1.5 ${StatusBadge.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {StatusBadge.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFeedback(selectedFeedback._id)}
                    className="p-2.5 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/25 transition-colors cursor-pointer"
                    title="Delete feedback"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating Card if present */}
                {selectedFeedback.rating && (
                  <div className="bg-[#070914] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs font-space font-bold uppercase text-zinc-400">Student Rating:</span>
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < selectedFeedback.rating! ? 'fill-amber-400 text-amber-500' : 'text-zinc-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted By Box */}
                <div className="bg-[#070914] border border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-space font-bold uppercase text-zinc-400 mb-1">Submitted By</p>
                  <p className="font-outfit font-bold text-lg text-white">
                    {selectedFeedback.studentId?.studentName || selectedFeedback.guestName || 'Anonymous Student'}
                  </p>
                  <p className="text-xs font-mono font-medium text-zinc-300 mt-0.5">
                    {selectedFeedback.studentId?.email || selectedFeedback.guestEmail || 'No email provided'}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-2">
                    Date: {new Date(selectedFeedback.createdAt).toLocaleDateString()} at {new Date(selectedFeedback.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {/* Feedback Message */}
                <div>
                  <p className="text-xs font-space font-bold uppercase text-zinc-400 mb-2">Message</p>
                  <div className="bg-[#070914] border border-white/10 rounded-2xl p-5">
                    <p className="font-jakarta font-medium text-zinc-200 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedFeedback.message}
                    </p>
                  </div>
                </div>

                {/* Admin Response Box */}
                <div className="pt-2">
                  <p className="text-xs font-space font-bold uppercase text-zinc-400 mb-2">Admin Response</p>
                  {selectedFeedback.adminResponse ? (
                    <div className="bg-[#070914] border border-emerald-500/30 rounded-2xl p-5">
                      <p className="font-jakarta font-medium text-emerald-300 whitespace-pre-wrap mb-2 text-sm">
                        {selectedFeedback.adminResponse}
                      </p>
                      <p className="text-xs font-mono font-medium text-emerald-400/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Responded on {new Date(selectedFeedback.respondedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={adminResponse}
                        onChange={(e) => setAdminResponse(e.target.value)}
                        placeholder="Type your official response to the student..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[#070914] border border-white/10 rounded-2xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                      />
                      <button
                        onClick={handleSubmitResponse}
                        disabled={submitting || !adminResponse.trim()}
                        className="w-full px-6 py-3.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white border border-white/10 rounded-xl font-outfit font-bold text-sm shadow-[0_8px_20px_rgba(16,185,129,0.35)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'Sending Response...' : 'Send Official Response'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[450px] text-center p-8 bg-[#070914] border border-white/10 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#6ee7b7]">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="font-outfit font-bold text-xl text-white">No Feedback Selected</h3>
                <p className="text-sm font-jakarta font-medium text-zinc-400 max-w-sm mt-1">
                  Click on any feedback ticket on the left list to review its message, rating, and send a reply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedFeedbacks = () => (
  <AdminProtectedRoute>
    <Feedbacks />
  </AdminProtectedRoute>
);

export default ProtectedFeedbacks;
