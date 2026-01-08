'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu,
  Bell,
  Search,
  BookOpen,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Play,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';
import { Sidebar } from '@/components/lms';
import { dummyCourses, studentProgress, upcomingClasses, recentActivity } from '@/constants/lmsData';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: '6', color: 'bg-blue-500' },
    { icon: Clock, label: 'Hours Learned', value: '48', color: 'bg-green-500' },
    { icon: Award, label: 'Certificates', value: '3', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Completion Rate', value: '65%', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="student" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 lg:hidden"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">Welcome back, Rahul!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent border-none outline-none text-sm w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  R
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Continue Learning</h2>
                  <Link href="/dashboard/courses" className="text-sm text-blue-600 hover:text-blue-700">
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {studentProgress.map((course, index) => (
                    <motion.div
                      key={course.courseId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={dummyCourses.find(c => c.id === course.courseId)?.thumbnail || ''}
                          alt={course.courseName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 truncate">{course.courseName}</h3>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-600">{course.progress}%</span>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Recommended for You</h2>
                  <Link href="/courses" className="text-sm text-blue-600 hover:text-blue-700">
                    Browse all
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {dummyCourses.slice(3, 5).map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/courses/${course.id}`}>
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                              <Play className="w-6 h-6 text-blue-600 ml-1" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{course.instructor.name}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Upcoming Classes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Upcoming Classes</h2>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {upcomingClasses.map((cls, index) => (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 text-sm">{cls.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">{cls.instructor}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          cls.date === 'Today' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {cls.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{cls.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  View Full Schedule
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.detail}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
