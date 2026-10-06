'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/Layout';
import toast from 'react-hot-toast';
import { 
  UserCheck, Search, Filter, CheckCircle, XCircle, 
  Mail, Phone, GraduationCap, Briefcase, BookOpen, 
  Clock, Eye, X, Sparkles 
} from 'lucide-react';
import { Loader } from '@/components';

interface TeacherApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  subjects: string[];
  resumeUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TeacherApplicationsPage() {
  const [applications, setApplications] = useState<TeacherApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/teacher-application');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      } else {
        toast.error('Failed to load teacher applications');
      }
    } catch (error) {
      console.error('Error fetching teacher applications:', error);
      toast.error('Network error loading applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/teacher-application/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Application marked as ${newStatus}`);
        setApplications(prev =>
          prev.map(app => (app._id === id ? { ...app, status: newStatus, adminNotes } : app))
        );
        setSelectedApplication(null);
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Network error');
    } finally {
      setUpdating(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-extrabold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle size={12} />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-extrabold uppercase bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle size={12} />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-extrabold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock size={12} />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#e8602e]" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7a45]/10 border border-[#ff7a45]/30 text-[#ffaa40] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                <UserCheck size={14} className="text-[#ff7a45]" />
                <span>Faculty Recruitment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Teacher <span className="bg-gradient-to-r from-white via-zinc-200 to-[#ffaa40] bg-clip-text text-transparent">Applications</span>
              </h1>
              <p className="text-zinc-400 font-jakarta text-xs sm:text-sm mt-1 max-w-xl">
                Review applicant qualifications, teaching credentials, and approve new educators for Raven Tutorials.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-space font-bold uppercase text-zinc-400">Total Applicants</p>
            <p className="text-3xl font-outfit font-black text-white mt-1">{applications.length}</p>
          </div>
          <div className="bg-[#1c1614] rounded-2xl p-5 border border-amber-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-space font-bold uppercase text-amber-400">Pending Review</p>
            <p className="text-3xl font-outfit font-black text-amber-300 mt-1">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-[#0e1a18] rounded-2xl p-5 border border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-space font-bold uppercase text-emerald-400">Approved</p>
            <p className="text-3xl font-outfit font-black text-emerald-300 mt-1">
              {applications.filter(a => a.status === 'approved').length}
            </p>
          </div>
          <div className="bg-[#1c0f14] rounded-2xl p-5 border border-rose-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-space font-bold uppercase text-rose-400">Rejected</p>
            <p className="text-3xl font-outfit font-black text-rose-300 mt-1">
              {applications.filter(a => a.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search by teacher name, email or contact number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta font-medium text-sm focus:outline-none focus:border-[#ff7a45] placeholder-zinc-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-zinc-400">
                <Filter size={18} />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-medium font-jakarta text-sm focus:outline-none focus:border-[#ff7a45] cursor-pointer"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table Card */}
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <Loader size="lg" text="Loading Applications..." subtitle="Retrieving faculty candidate submissions" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16 bg-[#070914]/60 rounded-2xl border border-white/10 p-8">
            <UserCheck className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="font-outfit font-black text-xl text-white">No applications found</p>
            <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1">Try switching filters or search terms.</p>
          </div>
        ) : (
          <div className="bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0f1222] border-b border-white/10">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Teacher Name</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Contact Details</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Qualification</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Subjects</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Status</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-bold uppercase text-zinc-400">Applied Date</th>
                    <th className="px-5 py-4 text-center text-xs font-space font-bold uppercase text-zinc-400">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-outfit font-bold text-white text-base">{app.name}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono text-zinc-300 text-xs">{app.email}</p>
                        <p className="font-mono text-zinc-500 text-xs mt-0.5">{app.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-jakarta font-medium text-zinc-200 text-sm">{app.qualification}</p>
                        <p className="font-mono text-zinc-500 text-xs mt-0.5">{app.experience}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {app.subjects.slice(0, 3).map((subject, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 text-zinc-300 font-space font-medium text-[10px] rounded border border-white/10 uppercase">
                              {subject}
                            </span>
                          ))}
                          {app.subjects.length > 3 && (
                            <span className="text-zinc-500 font-mono text-xs self-center">+{app.subjects.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-5 py-4 font-mono text-zinc-400 text-xs">
                        {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setAdminNotes(app.adminNotes || '');
                          }}
                          className="p-2.5 bg-white/5 hover:bg-[#e8602e] text-zinc-300 hover:text-white border border-white/10 hover:border-transparent rounded-xl transition-all cursor-pointer"
                          title="View Application Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 overscroll-contain">
            <div className="bg-[#0c0f1c] rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain my-auto text-white">
              <div className="sticky top-0 bg-[#0e1224] p-5 border-b border-white/10 flex justify-between items-center z-10">
                <h2 className="text-xl font-outfit font-black text-white">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-center">
                  {getStatusBadge(selectedApplication.status)}
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="w-12 h-12 bg-[#ff7a45]/15 border border-[#ff7a45]/30 rounded-2xl flex items-center justify-center text-[#ffaa40] font-black text-xl">
                    {selectedApplication.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-outfit font-bold text-xl">{selectedApplication.name}</p>
                    <p className="text-zinc-400 font-space text-xs uppercase">Teacher Candidate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                    <Mail size={16} className="text-[#ff7a45] shrink-0" />
                    <span className="text-zinc-200 font-mono text-xs truncate">{selectedApplication.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                    <Phone size={16} className="text-[#ff7a45] shrink-0" />
                    <span className="text-zinc-200 font-mono text-xs">{selectedApplication.phone}</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                  <GraduationCap size={18} className="text-[#ff7a45] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-jakarta font-medium text-sm">{selectedApplication.qualification}</p>
                    <p className="text-zinc-500 text-xs font-space uppercase">Qualification</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                  <Briefcase size={18} className="text-[#ff7a45] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-jakarta font-medium text-sm">{selectedApplication.experience}</p>
                    <p className="text-zinc-500 text-xs font-space uppercase">Experience</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="flex items-start gap-2">
                    <BookOpen size={18} className="text-[#ff7a45] mt-0.5 shrink-0" />
                    <div>
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {selectedApplication.subjects.map((subject, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white/10 text-white text-xs font-space font-medium uppercase rounded-lg border border-white/10">
                            {subject}
                          </span>
                        ))}
                      </div>
                      <p className="text-zinc-500 text-xs font-space uppercase mt-2">Subjects Eligible To Teach</p>
                    </div>
                  </div>
                </div>

                {selectedApplication.status === 'pending' && (
                  <div>
                    <label className="block text-zinc-300 text-xs font-space font-bold uppercase mb-1.5">
                      Admin Evaluation Notes (Optional)
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45] placeholder-zinc-500"
                      placeholder="Add any internal assessment or interview remarks..."
                    />
                  </div>
                )}

                {selectedApplication.adminNotes && selectedApplication.status !== 'pending' && (
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-zinc-400 text-xs font-space uppercase mb-1">Admin Notes:</p>
                    <p className="text-zinc-200 font-jakarta text-sm">{selectedApplication.adminNotes}</p>
                  </div>
                )}

                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'approved')}
                      disabled={updating}
                      className="flex-1 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-outfit font-bold text-sm rounded-xl border border-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle size={18} />
                      Approve Educator
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'rejected')}
                      disabled={updating}
                      className="flex-1 py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-outfit font-bold text-sm rounded-xl border border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
