'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { Users, Search, Trash2, Sparkles, Filter } from 'lucide-react';
import { Loader } from '@/components';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';

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
    if (!window.confirm('Are you sure you want to delete this student?')) return;

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
          <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full cartoon-pop">
            <div className="animate-spin w-10 h-10 border-4 border-black border-t-emerald-500 rounded-full mx-auto mb-3"></div>
            <p className="text-black font-black font-outfit text-lg">Loading Student Directory...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 text-black relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
                <Users className="w-3.5 h-3.5 text-emerald-800" />
                <span>Student Records</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight">
                Students Directory
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-xs sm:text-sm mt-1">
                Manage verified admissions, view registration profiles, and filter by standard
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-2xl bg-white border-2 border-black font-mono font-black text-sm shadow-[2px_2px_0px_#000]">
                {students.length} Total Enrolled
              </span>
            </div>
          </div>
        </div>

        {/* Cartoon Filters */}
        <div className="bg-[#f0fdf4] rounded-3xl p-5 sm:p-6 border-3 border-black shadow-[6px_6px_0px_#000]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase font-space text-black mb-1.5">
                Search Students
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchStudents()}
                  placeholder="Search by name, email, or registration ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black rounded-xl text-black placeholder-neutral-400 font-medium font-jakarta focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase font-space text-black mb-1.5">
                Filter by Class
              </label>
              <CartoonDropdown
                value={filterClass}
                onChange={(val) => setFilterClass(val)}
                placeholder="All Classes"
                options={[
                  { value: '', label: 'All Classes' },
                  ...STANDARDS.map((std) => ({
                    value: std,
                    label: STANDARD_LABELS[std] || std,
                  }))
                ]}
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchStudents}
                className="btn-cartoon w-full py-2.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm flex items-center justify-center gap-2"
              >
                <Filter size={16} />
                <span>Apply Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cartoon Students Table */}
        <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-black">
              <thead className="bg-[#86efac] border-b-2 border-black font-space font-black uppercase text-black text-xs">
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
              <tbody className="divide-y divide-neutral-200 font-jakarta text-sm">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-[#f0fdf4] transition-colors">
                    <td className="px-4 py-3">
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt={student.studentName}
                          className="h-10 w-10 rounded-xl object-cover border-2 border-black shadow-[1px_1px_0px_#000]"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1px_1px_0px_#000]">
                          {student.studentName?.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold text-black">
                      {student.studentName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] border border-black font-mono font-bold text-xs text-black shadow-[1px_1px_0px_#000]">
                        {student.registrationId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-black font-space font-bold text-xs text-black">
                        Class {student.standard}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden md:table-cell text-xs font-medium">
                      {student.email}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 font-mono hidden md:table-cell text-xs">
                      {student.phoneNumber}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="btn-cartoon px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg border border-black text-xs font-black font-outfit shadow-[1.5px_1.5px_0px_#000] inline-flex items-center gap-1"
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
            <div className="text-center py-12 bg-white">
              <Users className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
              <p className="text-black font-black text-lg font-outfit">No students found</p>
              <p className="text-neutral-500 text-xs font-jakarta mt-0.5">Try adjusting your search query or class filter</p>
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

