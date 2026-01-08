'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader, Search, Filter, Eye, Send, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';

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
      general: 'bg-blue-100 text-blue-800 border-blue-200',
      course_content: 'bg-purple-100 text-purple-800 border-purple-200',
      teaching_method: 'bg-green-100 text-green-800 border-green-200',
      study_materials: 'bg-orange-100 text-orange-800 border-orange-200',
      online_classes: 'bg-pink-100 text-pink-800 border-pink-200',
      test_system: 'bg-blue-100 text-blue-800 border-blue-200',
      complaint: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category] || colors.general;
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { icon: React.ComponentType<any>; color: string; label: string } } = {
      new: { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'New' },
      reviewed: { icon: Eye, color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Reviewed' },
      resolved: { icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200', label: 'Resolved' }
    };
    return badges[status] || badges.new;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            Feedback Management
          </h1>
          <p className="text-gray-600 mt-2">Review and respond to student feedback</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-900 font-medium">New</p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.new}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900 font-medium">Reviewed</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{stats.reviewed}</p>
              </div>
              <Eye className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-900 font-medium">Resolved</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Feedback List</h2>
              <p className="text-sm text-gray-600">Click to view details</p>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => {
                  const statusBadge = getStatusBadge(feedback.status);
                  const StatusIcon = statusBadge.icon;
                  return (
                    <div
                      key={feedback._id}
                      onClick={() => handleViewFeedback(feedback)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                        selectedFeedback?._id === feedback._id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{feedback.subject}</h3>
                          <div className="flex gap-2 flex-wrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(feedback.category)}`}>
                              {feedback.category?.replace(/_/g, ' ').toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusBadge.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusBadge.label}
                            </span>
                          </div>
                        </div>
                        {feedback.rating && (
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < feedback.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {feedback.studentId?.studentName || feedback.guestName || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                        {new Date(feedback.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No feedback found</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {selectedFeedback ? (
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedFeedback.subject}</h2>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFeedback.category)}`}>
                        {selectedFeedback.category?.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      {(() => {
                        const StatusBadge = getStatusBadge(selectedFeedback.status);
                        const StatusIcon = StatusBadge.icon;
                        return (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${StatusBadge.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {StatusBadge.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFeedback(selectedFeedback._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Delete feedback"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating */}
                {selectedFeedback.rating && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Rating:</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-2xl ${i < selectedFeedback.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted By */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Submitted By:</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedFeedback.studentId?.studentName || selectedFeedback.guestName || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedFeedback.studentId?.email || selectedFeedback.guestEmail || 'No email'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(selectedFeedback.createdAt).toLocaleDateString()} at{' '}
                    {new Date(selectedFeedback.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Feedback Message:</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                </div>

                {/* Admin Response Section */}
                <div className="border-t pt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Admin Response:</p>
                  {selectedFeedback.adminResponse ? (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-gray-900 whitespace-pre-wrap mb-2">{selectedFeedback.adminResponse}</p>
                      <p className="text-xs text-blue-600">
                        Responded on {new Date(selectedFeedback.respondedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={adminResponse}
                        onChange={(e) => setAdminResponse(e.target.value)}
                        placeholder="Type your response to the student..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                      />
                      <button
                        onClick={handleSubmitResponse}
                        disabled={submitting || !adminResponse.trim()}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition font-medium flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending...' : 'Send Response'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Select a feedback to view details</p>
                  <p className="text-sm text-gray-400">Click on any feedback from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Feedbacks;
