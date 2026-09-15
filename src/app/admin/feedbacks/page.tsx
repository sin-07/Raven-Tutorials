'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader, Search, Filter, Eye, Send, Trash2, CheckCircle, Clock, AlertCircle, Sparkles, Star, Check } from 'lucide-react';
import toast from 'react-hot-toast';
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
      general: 'bg-[#bfdbfe] text-blue-900',
      course_content: 'bg-[#fef08a] text-yellow-900',
      teaching_method: 'bg-[#dcfce7] text-emerald-900',
      study_materials: 'bg-[#fed7aa] text-amber-900',
      online_classes: 'bg-[#e9d5ff] text-purple-900',
      test_system: 'bg-[#cffafe] text-cyan-900',
      complaint: 'bg-rose-200 text-rose-900'
    };
    return colors[category] || colors.general;
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { icon: React.ComponentType<any>; color: string; label: string } } = {
      new: { icon: AlertCircle, color: 'bg-[#fef08a] text-amber-900', label: 'New' },
      reviewed: { icon: Eye, color: 'bg-[#bfdbfe] text-blue-900', label: 'Reviewed' },
      resolved: { icon: CheckCircle, color: 'bg-[#86efac] text-emerald-900', label: 'Resolved' }
    };
    return badges[status] || badges.new;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-black" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
            <MessageSquare size={14} className="text-black" />
            <span>Community Voice</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
            Feedback Management
          </h1>
          <p className="text-black/80 font-jakarta font-semibold mt-1">
            Review thoughts, queries, suggestions, and send direct responses to students
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-black uppercase text-black/60">Total Feedback</p>
                <p className="text-3xl font-outfit font-black text-black mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 border-2 border-black flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#fef08a] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-black uppercase text-black/70">New / Unread</p>
                <p className="text-3xl font-outfit font-black text-black mt-1">{stats.new}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-[#bfdbfe] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-black uppercase text-black/70">Reviewed</p>
                <p className="text-3xl font-outfit font-black text-black mt-1">{stats.reviewed}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center">
                <Eye className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-[#86efac] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-space font-black uppercase text-black/70">Resolved</p>
                <p className="text-3xl font-outfit font-black text-black mt-1">{stats.resolved}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[5px_5px_0px_#000]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/50" />
              <input
                type="text"
                placeholder="Search feedback by subject, name, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0fdf4] border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shrink-0">
                <Filter className="w-4 h-4 text-black" />
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
          <div className="lg:col-span-5 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden flex flex-col">
            <div className="p-4 md:p-5 bg-[#86efac] border-b-3 border-black">
              <h2 className="text-xl font-outfit font-black text-black">Feedback Submissions</h2>
              <p className="text-xs font-space font-bold uppercase text-black/70">Click any feedback to read & reply</p>
            </div>
            <div className="divide-y-2 divide-black max-h-[620px] overflow-y-auto flex-1">
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
                          ? 'bg-[#86efac]/40 border-l-6 border-l-black' 
                          : 'hover:bg-[#f0fdf4]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex-1">
                          <h3 className="font-outfit font-black text-black text-base line-clamp-1">{feedback.subject}</h3>
                          <div className="flex gap-1.5 flex-wrap mt-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-space font-black uppercase border border-black ${getCategoryColor(feedback.category)}`}>
                              {feedback.category?.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-space font-black uppercase border border-black flex items-center gap-1 ${statusBadge.color}`}>
                              <StatusIcon className="w-2.5 h-2.5" />
                              {statusBadge.label}
                            </span>
                          </div>
                        </div>
                        {feedback.rating && (
                          <div className="flex gap-0.5 bg-white px-2 py-1 rounded-lg border border-black shrink-0 items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < feedback.rating! ? 'fill-amber-400 text-amber-500' : 'text-neutral-300'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-jakarta font-bold text-black/80 line-clamp-1">
                        From: {feedback.studentId?.studentName || feedback.guestName || 'Anonymous Student'}
                      </p>
                      <p className="text-[11px] font-mono font-bold text-black/50 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                        {new Date(feedback.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center bg-[#f0fdf4]">
                  <MessageSquare className="w-12 h-12 text-black/30 mx-auto mb-2" />
                  <p className="font-outfit font-black text-black text-base">No feedback found</p>
                  <p className="text-xs font-jakarta text-black/60">Try clearing filters</p>
                </div>
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t-2 border-black bg-neutral-50 flex items-center justify-between">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-outfit font-black shadow-[2px_2px_0px_#000] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs font-mono font-black text-black">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-outfit font-black shadow-[2px_2px_0px_#000] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Details & Reply Panel */}
          <div className="lg:col-span-7 bg-[#f0fdf4] rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8 flex flex-col justify-between">
            {selectedFeedback ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-black">
                  <div>
                    <h2 className="text-2xl font-outfit font-black text-black">{selectedFeedback.subject}</h2>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-space font-black uppercase border-2 border-black ${getCategoryColor(selectedFeedback.category)}`}>
                        {selectedFeedback.category?.replace(/_/g, ' ')}
                      </span>
                      {(() => {
                        const StatusBadge = getStatusBadge(selectedFeedback.status);
                        const StatusIcon = StatusBadge.icon;
                        return (
                          <span className={`px-3 py-1 rounded-lg text-xs font-space font-black uppercase border-2 border-black flex items-center gap-1.5 ${StatusBadge.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {StatusBadge.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFeedback(selectedFeedback._id)}
                    className="p-2.5 bg-rose-100 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-200 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                    title="Delete feedback"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating Card if present */}
                {selectedFeedback.rating && (
                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000] flex items-center justify-between">
                    <span className="text-xs font-space font-black uppercase text-black">Student Rating:</span>
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < selectedFeedback.rating! ? 'fill-amber-400 text-amber-500' : 'text-neutral-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted By Box */}
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-space font-black uppercase text-black/60 mb-1">Submitted By</p>
                  <p className="font-outfit font-black text-lg text-black">
                    {selectedFeedback.studentId?.studentName || selectedFeedback.guestName || 'Anonymous Student'}
                  </p>
                  <p className="text-xs font-mono font-bold text-black/70 mt-0.5">
                    {selectedFeedback.studentId?.email || selectedFeedback.guestEmail || 'No email provided'}
                  </p>
                  <p className="text-[11px] font-mono font-semibold text-black/50 mt-2">
                    Date: {new Date(selectedFeedback.createdAt).toLocaleDateString()} at {new Date(selectedFeedback.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {/* Feedback Message */}
                <div>
                  <p className="text-xs font-space font-black uppercase text-black mb-2">Message</p>
                  <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[3px_3px_0px_#000]">
                    <p className="font-jakarta font-medium text-black whitespace-pre-wrap leading-relaxed">
                      {selectedFeedback.message}
                    </p>
                  </div>
                </div>

                {/* Admin Response Box */}
                <div className="pt-2">
                  <p className="text-xs font-space font-black uppercase text-black mb-2">Admin Response</p>
                  {selectedFeedback.adminResponse ? (
                    <div className="bg-[#86efac] border-2 border-black rounded-2xl p-5 shadow-[3px_3px_0px_#000]">
                      <p className="font-jakarta font-bold text-black whitespace-pre-wrap mb-2">
                        {selectedFeedback.adminResponse}
                      </p>
                      <p className="text-xs font-mono font-bold text-black/70 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
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
                        className="w-full px-4 py-3 bg-white border-2 border-black rounded-2xl font-jakarta font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[3px_3px_0px_#000] placeholder-neutral-400 text-sm"
                      />
                      <button
                        onClick={handleSubmitResponse}
                        disabled={submitting || !adminResponse.trim()}
                        className="w-full px-6 py-3.5 bg-[#86efac] text-black border-2 border-black rounded-xl font-outfit font-black text-base shadow-[4px_4px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending Response...' : 'Send Official Response'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[450px] text-center p-8 bg-white border-2 border-dashed border-black/30 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-outfit font-black text-xl text-black">No Feedback Selected</h3>
                <p className="text-sm font-jakarta font-medium text-black/60 max-w-sm mt-1">
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
