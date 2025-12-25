'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/Layout';
import toast from 'react-hot-toast';
import { Users, FileText, UserPlus, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
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

interface StatsData {
  stats: {
    totalStudents: number;
    totalTests: number;
    recentAdmissions: number;
  };
  upcomingTests: TestData[];
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
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 px-0 sm:px-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg p-4 sm:p-5 md:p-8 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Dashboard Overview</h2>
          <p className="text-xs sm:text-sm text-blue-100">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

        {/* Stats Cards with animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-4 md:p-5 lg:p-6 border-l-4 border-blue-500 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-wide">Total Students</p>
                <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.stats?.totalStudents || 0}</p>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">Enrolled students</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg flex-shrink-0">
                <Users className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-4 md:p-5 lg:p-6 border-l-4 border-purple-500 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-wide">Total Tests</p>
                <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.stats?.totalTests || 0}</p>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">Created assessments</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg flex-shrink-0">
                <FileText className="text-purple-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-4 md:p-5 lg:p-6 border-l-4 border-green-500 sm:col-span-2 lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-wide">Recent Admissions</p>
                <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.stats?.recentAdmissions || 0}</p>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">Last 7 days</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg flex-shrink-0">
                <UserPlus className="text-green-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Tests with animation */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-100 overflow-hidden animate-slide-up">
          <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-100 p-1.5 sm:p-2 md:p-2.5 rounded-lg flex-shrink-0">
                <Calendar className="text-blue-600" size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">Upcoming Tests</h3>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 hidden sm:block">Scheduled assessments</p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            {stats?.upcomingTests && stats.upcomingTests.length > 0 ? (
              <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle px-3 sm:px-4 md:px-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 hidden sm:table-header-group">
                      <tr>
                        <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Test Title</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Class</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">Subject</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {stats.upcomingTests.map((test) => (
                        <tr key={test._id} className="hover:bg-gray-50 block sm:table-row border-b sm:border-0 pb-3 sm:pb-0 mb-3 sm:mb-0 space-y-1 sm:space-y-0">
                          <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm font-semibold text-gray-900 block sm:table-cell">
                            <span className="sm:hidden text-gray-500 font-normal text-xs">Test: </span>
                            {test.title}
                          </td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm text-gray-600 block sm:table-cell">
                            <span className="sm:hidden text-gray-500 font-normal text-xs">Class: </span>
                            {test.class}
                          </td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm text-gray-600 block sm:table-cell md:hidden lg:table-cell">
                            <span className="sm:hidden text-gray-500 font-normal text-xs">Subject: </span>
                            {test.subject}
                          </td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm text-gray-600 block sm:table-cell">
                            <span className="sm:hidden text-gray-500 font-normal text-xs">Date: </span>
                            {new Date(test.testDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 block sm:table-cell lg:hidden xl:table-cell">
                            <span className="sm:hidden text-gray-500 font-normal text-xs mr-1">Status: </span>
                            <span className="inline-block px-2 sm:px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              {test.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-10 md:py-12">
                <Calendar size={36} className="mx-auto text-gray-300 mb-2 sm:mb-3" />
                <p className="text-sm sm:text-base text-gray-500 font-medium">No upcoming tests scheduled</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Create a new test to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
