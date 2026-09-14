'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  X,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  BookOpen,
  UserCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

/**
 * Admin Teacher Applications Page
 * --------------------------------
 * Manage teacher applications: view, approve, reject with cartoonish interface
 */

interface TeacherApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  subjects: string[];
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export default function TeacherApplicationsPage() {
  const [applications, setApplications] = useState<TeacherApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);

  // Freeze background when detail modal is open
  useBodyScrollLock(!!selectedApplication);

  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const statusParam = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/api/admin/teacher-applications${statusParam}`);
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusUpdate = async (applicationId: string, status: 'approved' | 'rejected') => {
    setUpdating(true);
    try {
      const response = await fetch('/api/admin/teacher-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          status,
          adminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Application ${status} successfully`);
        setSelectedApplication(null);
        setAdminNotes('');
        fetchApplications();
      } else {
        toast.error(data.message || 'Failed to update application');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    } finally {
      setUpdating(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-black uppercase bg-[#86efac] text-emerald-950 border-2 border-black shadow-[1px_1px_0px_#000]">
            <CheckCircle size={12} /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-black uppercase bg-rose-200 text-rose-900 border-2 border-black shadow-[1px_1px_0px_#000]">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-space font-black uppercase bg-[#fef08a] text-amber-950 border-2 border-black shadow-[1px_1px_0px_#000]">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
            <UserCheck size={14} className="text-black" />
            <span>Faculty Recruitment</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
            Teacher Applications 🎓
          </h1>
          <p className="text-black/80 font-jakarta font-semibold mt-1">
            Review applicant qualifications, teaching credentials, and approve new educators
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-space font-black uppercase text-black/60">Total Applicants</p>
            <p className="text-3xl font-outfit font-black text-black mt-1">{applications.length}</p>
          </div>
          <div className="bg-[#fef08a] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-space font-black uppercase text-black/70">Pending Review</p>
            <p className="text-3xl font-outfit font-black text-black mt-1">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-[#86efac] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-space font-black uppercase text-black/70">Approved</p>
            <p className="text-3xl font-outfit font-black text-black mt-1">
              {applications.filter(a => a.status === 'approved').length}
            </p>
          </div>
          <div className="bg-rose-200 rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-space font-black uppercase text-black/70">Rejected</p>
            <p className="text-3xl font-outfit font-black text-black mt-1">
              {applications.filter(a => a.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[5px_5px_0px_#000]">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50" size={18} />
              <input
                type="text"
                placeholder="Search by teacher name, email or contact number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0fdf4] border-2 border-black rounded-xl text-black font-jakarta font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shrink-0">
                <Filter size={18} className="text-black" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="px-4 py-2.5 bg-[#f0fdf4] border-2 border-black rounded-xl text-black font-jakarta font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
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
          <div className="flex justify-center items-center h-64 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-[#86efac]"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-8">
            <UserCheck className="w-12 h-12 text-black/30 mx-auto mb-3" />
            <p className="font-outfit font-black text-xl text-black">No applications found</p>
            <p className="text-sm font-jakarta font-medium text-black/60 mt-1">Try switching filters or search terms.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#86efac] border-b-3 border-black">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Teacher Name</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Contact Details</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Qualification</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Subjects</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Status</th>
                    <th className="px-5 py-4 text-left text-xs font-space font-black uppercase text-black">Applied Date</th>
                    <th className="px-5 py-4 text-center text-xs font-space font-black uppercase text-black">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {filteredApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-[#f0fdf4] transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-outfit font-black text-black text-base">{app.name}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono font-bold text-black text-xs">{app.email}</p>
                        <p className="font-mono font-medium text-black/60 text-xs mt-0.5">{app.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-jakarta font-bold text-black text-sm">{app.qualification}</p>
                        <p className="font-mono font-medium text-black/60 text-xs mt-0.5">{app.experience}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {app.subjects.slice(0, 3).map((subject, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#dcfce7] text-black font-space font-bold text-[10px] rounded border border-black uppercase">
                              {subject}
                            </span>
                          ))}
                          {app.subjects.length > 3 && (
                            <span className="text-black/60 font-mono font-bold text-xs self-center">+{app.subjects.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-black/70 text-xs">
                        {new Date(app.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setAdminNotes(app.adminNotes || '');
                          }}
                          className="p-2.5 bg-[#fef08a] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-[#fde047] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overscroll-contain">
            <div className="bg-[#f0fdf4] rounded-3xl border-3 border-black shadow-[8px_8px_0px_#000] w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 bg-[#86efac] p-5 border-b-3 border-black flex justify-between items-center">
                <h2 className="text-xl font-outfit font-black text-black">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Status Badge */}
                <div className="flex justify-center">
                  {getStatusBadge(selectedApplication.status)}
                </div>

                {/* Name */}
                <div className="flex items-center gap-3 bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                  <div className="w-12 h-12 bg-[#86efac] border-2 border-black rounded-2xl flex items-center justify-center shadow-[1px_1px_0px_#000]">
                    <span className="text-xl font-outfit font-black text-black">
                      {selectedApplication.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-black font-outfit font-black text-xl">{selectedApplication.name}</p>
                    <p className="text-black/60 font-space font-bold text-xs uppercase">Teacher Candidate</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-white border-2 border-black rounded-xl p-3 shadow-[1px_1px_0px_#000]">
                    <Mail size={16} className="text-black shrink-0" />
                    <span className="text-black font-mono font-bold text-xs truncate">{selectedApplication.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border-2 border-black rounded-xl p-3 shadow-[1px_1px_0px_#000]">
                    <Phone size={16} className="text-black shrink-0" />
                    <span className="text-black font-mono font-bold text-xs">{selectedApplication.phone}</span>
                  </div>
                </div>

                {/* Qualification */}
                <div className="bg-white border-2 border-black rounded-xl p-3.5 shadow-[1px_1px_0px_#000] flex items-start gap-3">
                  <GraduationCap size={18} className="text-black mt-0.5 shrink-0" />
                  <div>
                    <p className="text-black font-jakarta font-bold text-sm">{selectedApplication.qualification}</p>
                    <p className="text-black/60 text-xs font-space font-bold uppercase">Qualification</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-white border-2 border-black rounded-xl p-3.5 shadow-[1px_1px_0px_#000] flex items-start gap-3">
                  <Briefcase size={18} className="text-black mt-0.5 shrink-0" />
                  <div>
                    <p className="text-black font-jakarta font-bold text-sm">{selectedApplication.experience}</p>
                    <p className="text-black/60 text-xs font-space font-bold uppercase">Experience</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="bg-white border-2 border-black rounded-xl p-3.5 shadow-[1px_1px_0px_#000]">
                  <div className="flex items-start gap-2">
                    <BookOpen size={18} className="text-black mt-0.5 shrink-0" />
                    <div>
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {selectedApplication.subjects.map((subject, i) => (
                          <span key={i} className="px-2.5 py-1 bg-[#dcfce7] text-black text-xs font-space font-black uppercase rounded-lg border border-black">
                            {subject}
                          </span>
                        ))}
                      </div>
                      <p className="text-black/60 text-xs font-space font-bold uppercase mt-2">Subjects Eligible To Teach</p>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                {selectedApplication.status === 'pending' && (
                  <div>
                    <label className="block text-black text-xs font-space font-black uppercase mb-1.5">
                      Admin Evaluation Notes (Optional)
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400"
                      placeholder="Add any internal assessment or interview remarks..."
                    />
                  </div>
                )}

                {/* Show existing notes if already reviewed */}
                {selectedApplication.adminNotes && selectedApplication.status !== 'pending' && (
                  <div className="p-3.5 bg-[#86efac] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <p className="text-black/70 text-xs font-space font-black uppercase mb-1">Admin Notes:</p>
                    <p className="text-black font-jakarta font-bold text-sm">{selectedApplication.adminNotes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'approved')}
                      disabled={updating}
                      className="flex-1 py-3 bg-[#86efac] hover:bg-[#4ade80] text-black font-outfit font-black text-base rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
                    >
                      <CheckCircle size={18} />
                      Approve Educator
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'rejected')}
                      disabled={updating}
                      className="flex-1 py-3 bg-rose-200 hover:bg-rose-300 text-rose-950 font-outfit font-black text-base rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
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
