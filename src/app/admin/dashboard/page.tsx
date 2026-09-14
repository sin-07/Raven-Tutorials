'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { 
  Users, FileText, UserPlus, Calendar, TrendingUp, 
  CheckCircle, GraduationCap, Clock, XCircle, Sparkles, ArrowRight 
} from 'lucide-react';
import { Loader } from '@/components';
import useSessionTimeout from '@/hooks/useSessionTimeout';

interface TestData {
  _id: string;
  title: string;
  class: string;
  subject: string;
  testDate: string;
  status: string;
}

interface TeacherAppData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface StatsData {
  stats: {
    totalStudents: number;
    totalTests: number;
    recentAdmissions: number;
    totalTeacherApplications: number;
    pendingTeacherApplications: number;
    approvedTeacherApplications: number;
    rejectedTeacherApplications: number;
  };
  upcomingTests: TestData[];
  recentTeacherApplications: TeacherAppData[];
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  
  // Initialize session timeout for admin (auto-logout after 1 hour)
  useSessionTimeout('admin');
  
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard-stats', {
        credentials: 'include'
      });
      
      const data = await res.json();

      if (data.success) {
        setStats(data.data);
      } else {
        toast.error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Dashboard stats error:', error);
      toast.error('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
            <div className="animate-spin w-10 h-10 border-4 border-black border-t-emerald-500 rounded-full mx-auto mb-3"></div>
            <p className="text-black font-black font-outfit text-lg">Loading Admin Overview...</p>
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
                <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                <span>Executive Command Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight">
                Academic Dashboard Overview
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-xs sm:text-sm mt-1">
                Real-time student admissions, teacher applications, and assessment stats.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-black font-mono font-black text-xs shadow-[2px_2px_0px_#000]">
                LIVE SYSTEM
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 cartoon-stagger">
          {/* Card 1: Total Students */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Total Enrolled</p>
                <p className="text-3xl sm:text-4xl font-black text-black font-mono mt-1">
                  {stats?.stats?.totalStudents || 0}
                </p>
                <p className="text-xs font-bold text-neutral-600 mt-1">Verified students</p>
              </div>
              <div className="p-3.5 bg-emerald-400 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Users className="text-black" size={24} />
              </div>
            </div>
          </div>

          {/* Card 2: Total Tests */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Total Tests</p>
                <p className="text-3xl sm:text-4xl font-black text-black font-mono mt-1">
                  {stats?.stats?.totalTests || 0}
                </p>
                <p className="text-xs font-bold text-neutral-600 mt-1">Active assessments</p>
              </div>
              <div className="p-3.5 bg-amber-200 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <FileText className="text-black" size={24} />
              </div>
            </div>
          </div>

          {/* Card 3: Recent Admissions */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000] sm:col-span-2 lg:col-span-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Recent Admissions</p>
                <p className="text-3xl sm:text-4xl font-black text-black font-mono mt-1">
                  {stats?.stats?.recentAdmissions || 0}
                </p>
                <p className="text-xs font-bold text-neutral-600 mt-1">Enrolled in last 7 days</p>
              </div>
              <div className="p-3.5 bg-sky-200 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <UserPlus className="text-black" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Applications Panel */}
        <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="px-5 sm:px-6 py-4 bg-[#86efac] border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                <GraduationCap className="text-black" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-black font-outfit">Teacher Recruitment</h3>
                <p className="text-xs text-neutral-800 font-bold font-jakarta">Faculty application pipeline</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/teacher-applications')}
              className="btn-cartoon text-xs font-black font-outfit bg-white hover:bg-[#dcfce7] text-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} className="text-black" />
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-[#f0fdf4]">
            {/* 4 Mini Status Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-neutral-500 font-space block">Total Applied</span>
                <p className="text-xl sm:text-2xl font-black text-black font-mono mt-0.5">
                  {stats?.stats?.totalTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-amber-800 font-space block">Pending Review</span>
                <p className="text-xl sm:text-2xl font-black text-amber-950 font-mono mt-0.5">
                  {stats?.stats?.pendingTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-[#dcfce7] rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-emerald-800 font-space block">Approved</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-950 font-mono mt-0.5">
                  {stats?.stats?.approvedTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-rose-50 rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-rose-800 font-space block">Rejected</span>
                <p className="text-xl sm:text-2xl font-black text-rose-950 font-mono mt-0.5">
                  {stats?.stats?.rejectedTeacherApplications || 0}
                </p>
              </div>
            </div>

            {/* Applications Table */}
            {stats?.recentTeacherApplications && stats.recentTeacherApplications.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] bg-white">
                <table className="w-full text-xs font-jakarta">
                  <thead className="bg-[#dcfce7] border-b-2 border-black font-space font-black uppercase text-black">
                    <tr>
                      <th className="px-3.5 py-2.5 text-left">Applicant Name</th>
                      <th className="px-3.5 py-2.5 text-left">Contact Info</th>
                      <th className="px-3.5 py-2.5 text-left hidden sm:table-cell">Subjects</th>
                      <th className="px-3.5 py-2.5 text-center">Status</th>
                      <th className="px-3.5 py-2.5 text-right hidden md:table-cell">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {stats.recentTeacherApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-[#f0fdf4]">
                        <td className="px-3.5 py-3 font-bold text-black">{app.name}</td>
                        <td className="px-3.5 py-3 text-neutral-600">
                          <div>{app.email}</div>
                          <div className="text-[11px] text-neutral-500 font-mono">{app.phone}</div>
                        </td>
                        <td className="px-3.5 py-3 hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {app.subjects.map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-[#dcfce7] border border-black rounded text-[10px] font-bold">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-md border border-black text-[10px] font-black uppercase ${
                            app.status === 'approved'
                              ? 'bg-[#86efac] text-black'
                              : app.status === 'rejected'
                              ? 'bg-rose-200 text-black'
                              : 'bg-amber-200 text-black'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-right text-neutral-600 hidden md:table-cell font-mono">
                          {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border border-black">
                <p className="text-neutral-500 font-bold font-jakarta text-xs">No pending teacher applications.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Assessments Panel */}
        <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="px-5 sm:px-6 py-4 bg-[#86efac] border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                <Calendar className="text-black" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-black font-outfit">Upcoming Assessments</h3>
                <p className="text-xs text-neutral-800 font-bold font-jakarta">Scheduled student tests</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/tests')}
              className="btn-cartoon text-xs font-black font-outfit bg-white hover:bg-[#dcfce7] text-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1"
            >
              <span>Manage Tests</span>
              <ArrowRight size={14} className="text-black" />
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-[#f0fdf4]">
            {stats?.upcomingTests && stats.upcomingTests.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] bg-white">
                <table className="w-full text-xs font-jakarta">
                  <thead className="bg-[#dcfce7] border-b-2 border-black font-space font-black uppercase text-black">
                    <tr>
                      <th className="px-3.5 py-2.5 text-left">Test Title</th>
                      <th className="px-3.5 py-2.5 text-left">Class</th>
                      <th className="px-3.5 py-2.5 text-left hidden sm:table-cell">Subject</th>
                      <th className="px-3.5 py-2.5 text-left">Scheduled Date</th>
                      <th className="px-3.5 py-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {stats.upcomingTests.map((t) => (
                      <tr key={t._id} className="hover:bg-[#f0fdf4]">
                        <td className="px-3.5 py-3 font-bold text-black">{t.title}</td>
                        <td className="px-3.5 py-3 font-black text-emerald-900">{t.class}</td>
                        <td className="px-3.5 py-3 text-neutral-600 hidden sm:table-cell">{t.subject}</td>
                        <td className="px-3.5 py-3 text-neutral-600 font-mono">
                          {new Date(t.testDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-3.5 py-3 text-center">
                          <span className="px-2.5 py-0.5 rounded-md border border-black text-[10px] font-black uppercase bg-emerald-300 text-black">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border border-black">
                <p className="text-neutral-500 font-bold font-jakarta text-xs">No upcoming assessments currently scheduled.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedAdminDashboard = () => (
  <AdminProtectedRoute>
    <AdminDashboard />
  </AdminProtectedRoute>
);

export default ProtectedAdminDashboard;
