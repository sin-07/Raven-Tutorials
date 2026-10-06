'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { 
  Users, FileText, UserPlus, Calendar, TrendingUp, 
  GraduationCap, Clock, Sparkles, ArrowRight, Radio
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
  
  // Auto-logout after inactivity for security
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
          <Loader size="lg" text="Loading Admin Overview..." subtitle="Compiling platform metrics" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-7 max-w-7xl mx-auto">
        
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top subtle orange laser beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/50 to-transparent" />
          
          {/* Ambient background glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#e8602e]" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7a45]/10 border border-[#ff7a45]/30 text-[#ffaa40] text-xs font-bold font-space uppercase mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#ff7a45]" />
                <span>Executive Command Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Academic Dashboard <span className="bg-gradient-to-r from-white via-zinc-200 to-[#ffaa40] bg-clip-text text-transparent">Overview</span>
              </h1>
              <p className="text-zinc-400 font-normal font-jakarta text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                Real-time student admissions, teacher applications, and active assessment stats across Raven Tutorials Patna.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-space font-bold text-xs uppercase tracking-wider text-emerald-400">
                  LIVE SYSTEM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Total Students */}
          <div className="group relative bg-[#0b0e1a]/90 hover:bg-[#111526] rounded-2xl p-6 border border-white/10 hover:border-[#ff7a45]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(232,96,46,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/30 to-transparent group-hover:via-[#ff7a45]/80 transition-all" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Total Enrolled</p>
                <p className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 group-hover:text-[#ffaa40] transition-colors">
                  {stats?.stats?.totalStudents || 0}
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-jakarta font-medium">Verified student profiles</p>
              </div>
              <div className="w-13 h-13 p-3.5 bg-[#e8602e]/15 border border-[#e8602e]/30 rounded-2xl text-[#ff7b47] flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Card 2: Total Tests */}
          <div className="group relative bg-[#0b0e1a]/90 hover:bg-[#111526] rounded-2xl p-6 border border-white/10 hover:border-[#ff7a45]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(232,96,46,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/30 to-transparent group-hover:via-[#ff7a45]/80 transition-all" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Total Tests</p>
                <p className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 group-hover:text-[#ffaa40] transition-colors">
                  {stats?.stats?.totalTests || 0}
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-jakarta font-medium">Active assessments & mock papers</p>
              </div>
              <div className="w-13 h-13 p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                <FileText size={24} />
              </div>
            </div>
          </div>

          {/* Card 3: Recent Admissions */}
          <div className="group relative bg-[#0b0e1a]/90 hover:bg-[#111526] rounded-2xl p-6 border border-white/10 hover:border-[#ff7a45]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(232,96,46,0.15)] transition-all duration-300 sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/30 to-transparent group-hover:via-[#ff7a45]/80 transition-all" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Recent Admissions</p>
                <p className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 group-hover:text-[#ffaa40] transition-colors">
                  {stats?.stats?.recentAdmissions || 0}
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-jakarta font-medium">Enrolled in the last 7 days</p>
              </div>
              <div className="w-13 h-13 p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                <UserPlus size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Applications Panel */}
        <div className="bg-[#0b0e1a]/90 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="px-5 sm:px-6 py-4.5 bg-[#0e1222] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#ff7a45]/15 border border-[#ff7a45]/30 rounded-xl text-[#ff7b47] shadow-sm">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white font-outfit">Teacher Recruitment</h3>
                <p className="text-xs text-zinc-400 font-jakarta">Faculty application review pipeline</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/teacher-applications')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#e8602e] border border-white/10 hover:border-transparent text-zinc-200 hover:text-white text-xs font-bold font-outfit transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-[#070914]/60">
            {/* 4 Mini Status Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#0d1020] rounded-xl p-3.5 border border-white/10">
                <span className="text-[10px] font-black uppercase text-zinc-400 font-space block">Total Applied</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                  {stats?.stats?.totalTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-[#1c1614] rounded-xl p-3.5 border border-amber-500/20">
                <span className="text-[10px] font-black uppercase text-amber-400 font-space block">Pending Review</span>
                <p className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-0.5">
                  {stats?.stats?.pendingTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-[#0e1a18] rounded-xl p-3.5 border border-emerald-500/20">
                <span className="text-[10px] font-black uppercase text-emerald-400 font-space block">Approved</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-300 font-mono mt-0.5">
                  {stats?.stats?.approvedTeacherApplications || 0}
                </p>
              </div>
              <div className="bg-[#1c0f14] rounded-xl p-3.5 border border-rose-500/20">
                <span className="text-[10px] font-black uppercase text-rose-400 font-space block">Rejected</span>
                <p className="text-xl sm:text-2xl font-black text-rose-300 font-mono mt-0.5">
                  {stats?.stats?.rejectedTeacherApplications || 0}
                </p>
              </div>
            </div>

            {/* Applications Table */}
            {stats?.recentTeacherApplications && stats.recentTeacherApplications.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0c16]">
                <table className="w-full text-xs font-jakarta">
                  <thead className="bg-[#0f1222] border-b border-white/10 font-space font-bold uppercase text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Applicant Name</th>
                      <th className="px-4 py-3 text-left">Contact Info</th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell">Subjects</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right hidden md:table-cell">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {stats.recentTeacherApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 font-bold text-white">{app.name}</td>
                        <td className="px-4 py-3.5 text-zinc-400">
                          <div>{app.email}</div>
                          <div className="text-[11px] text-zinc-500 font-mono">{app.phone}</div>
                        </td>
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {app.subjects.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-medium text-zinc-300">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-space font-extrabold uppercase border ${
                            app.status === 'approved'
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                              : app.status === 'rejected'
                              ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right text-zinc-400 hidden md:table-cell font-mono">
                          {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-[#0a0c16] rounded-xl border border-white/10">
                <p className="text-zinc-500 font-medium font-jakarta text-xs">No pending teacher applications.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Assessments Panel */}
        <div className="bg-[#0b0e1a]/90 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="px-5 sm:px-6 py-4.5 bg-[#0e1222] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-400 shadow-sm">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white font-outfit">Upcoming Assessments</h3>
                <p className="text-xs text-zinc-400 font-jakarta">Scheduled student tests and mock exams</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/tests')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#e8602e] border border-white/10 hover:border-transparent text-zinc-200 hover:text-white text-xs font-bold font-outfit transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Manage Tests</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-[#070914]/60">
            {stats?.upcomingTests && stats.upcomingTests.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0c16]">
                <table className="w-full text-xs font-jakarta">
                  <thead className="bg-[#0f1222] border-b border-white/10 font-space font-bold uppercase text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Test Title</th>
                      <th className="px-4 py-3 text-left">Class</th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell">Subject</th>
                      <th className="px-4 py-3 text-left">Scheduled Date</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {stats.upcomingTests.map((t) => (
                      <tr key={t._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 font-bold text-white">{t.title}</td>
                        <td className="px-4 py-3.5 font-bold text-[#ffaa40] font-mono">{t.class}</td>
                        <td className="px-4 py-3.5 text-zinc-300 hidden sm:table-cell">{t.subject}</td>
                        <td className="px-4 py-3.5 text-zinc-400 font-mono">
                          {new Date(t.testDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 text-[10px] font-space font-extrabold uppercase">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-[#0a0c16] rounded-xl border border-white/10">
                <p className="text-zinc-500 font-medium font-jakarta text-xs">No upcoming assessments currently scheduled.</p>
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
