'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { Users, Search, Trash2, Sparkles, Filter } from 'lucide-react';
import { Loader } from '@/components';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';

interface StudentData {
  _id: string;
  studentName: string;
  registrationId: string;
  standard: string;
  email: string;
  phoneNumber: string;
  photo?: string;
}

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [filterClass]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/students?paymentStatus=completed`;
      
      if (searchTerm.trim()) url += `&search=${searchTerm.trim()}`;
      if (filterClass) url += `&class=${filterClass}`;

      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      
      if (data.success) {
        setStudents(data.data || []);
      } else {
        toast.error(data.message || 'Failed to load students');
        setStudents([]);
      }
    } catch (error: any) {
      console.error('Error loading students:', error);
      toast.error(error.message || 'Error loading students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student record?')) return;

    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Student deleted successfully');
        fetchStudents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader size="lg" text="Loading Student Directory..." subtitle="Fetching verified student records" />
        </div>
      </AdminLayout>
    );
  }

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
                <Users className="w-3.5 h-3.5 text-[#ff7a45]" />
                <span>Student Records</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Students <span className="bg-gradient-to-r from-white via-zinc-200 to-[#ffaa40] bg-clip-text text-transparent">Directory</span>
              </h1>
              <p className="text-zinc-400 font-jakarta text-xs sm:text-sm mt-1 max-w-xl">
                Manage verified admissions, view registration profiles, and filter by enrolled class standard.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-mono font-bold text-xs text-zinc-300 shadow-inner">
                {students.length} Verified Enrolled
              </span>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 sm:p-6 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1.5">
                Search Students
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
                  placeholder="Search by name, email, or registration ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium font-jakarta focus:outline-none focus:border-[#ff7a45] text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1.5">
                Filter by Class
              </label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-medium font-jakarta text-sm focus:outline-none focus:border-[#ff7a45] transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#070914] text-white">All Classes</option>
                {STANDARDS.map((std) => (
                  <option key={std} value={std} className="bg-[#070914] text-white">
                    {STANDARD_LABELS[std] || `Class ${std}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchStudents}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(232,96,46,0.35)] text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Filter size={16} />
                <span>Apply Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/[0.06]">
              <thead className="bg-[#0f1222] border-b border-white/10 font-space font-bold uppercase text-zinc-400 text-xs">
                <tr>
                  <th className="px-4 py-3.5 text-left">Photo</th>
                  <th className="px-4 py-3.5 text-left">Student Name</th>
                  <th className="px-4 py-3.5 text-left">Registration ID</th>
                  <th className="px-4 py-3.5 text-left">Standard</th>
                  <th className="px-4 py-3.5 text-left hidden md:table-cell">Email</th>
                  <th className="px-4 py-3.5 text-left hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] font-jakarta text-sm">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt={student.studentName}
                          className="h-10 w-10 rounded-xl object-cover border border-white/10 shadow-sm"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-[#e8602e]/15 border border-[#e8602e]/30 flex items-center justify-center text-[#ffaa40] font-bold text-sm shadow-sm">
                          {student.studentName?.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold text-white">
                      {student.studentName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#ff7a45]/10 border border-[#ff7a45]/25 font-mono font-bold text-xs text-[#ffaa40]">
                        {student.registrationId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-space font-medium text-xs text-zinc-300">
                        Class {student.standard}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 hidden md:table-cell text-xs font-medium">
                      {student.email}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-mono hidden md:table-cell text-xs">
                      {student.phoneNumber}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg border border-rose-500/20 text-xs font-outfit font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {students.length === 0 && (
            <div className="text-center py-16 bg-[#070914]/60">
              <Users className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
              <p className="text-white font-bold text-base font-outfit">No students found</p>
              <p className="text-zinc-500 text-xs font-jakarta mt-0.5">Try adjusting your search query or class filter</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedAdminStudents = () => (
  <AdminProtectedRoute>
    <AdminStudents />
  </AdminProtectedRoute>
);

export default ProtectedAdminStudents;
