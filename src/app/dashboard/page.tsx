'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen, BarChart3, Calendar, FileText,
  User, Mail, Phone, AlertCircle, CheckCircle, Clock, Award,
  Download, Printer, Sparkles, LogOut, ArrowRight, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentProtectedRoute } from '@/components';

interface StudentData {
  _id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  bloodGroup?: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  standard: string;
  registrationId: string;
}

interface AttendanceData {
  subject: string;
  present: number;
  total: number;
  percentage: number;
}

interface TestResult {
  title: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  passingMarks: number;
}

interface UpcomingTest {
  _id: string;
  testId: string;
  title: string;
  subject: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  hasAttempted: boolean;
}

interface StudyMaterial {
  _id: string;
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [downloading, setDownloading] = useState(false);

  // Data states
  const [attendance, setAttendance] = useState<AttendanceData[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      // Verify authentication via httpOnly cookie
      const verifyRes = await fetch('/api/auth/verify', {
        credentials: 'include'
      });

      if (!verifyRes.ok) {
        router.push('/login');
        return;
      }

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        router.push('/login');
        return;
      }

      setStudent(verifyData.student);
      
      // Fetch all data
      await Promise.all([
        fetchAttendance(),
        fetchTestResults(),
        fetchUpcomingTests(),
        fetchStudyMaterials()
      ]);
    } catch (err) {
      console.error('Dashboard init error:', err);
      toast.error('Failed to load dashboard');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await fetch('/api/student/attendance', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAttendance(data.data || []);
    } catch (err) {
      console.error('Attendance error:', err);
    }
  };

  const fetchTestResults = async () => {
    try {
      const res = await fetch('/api/student/tests/results', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTestResults(data.data || []);
    } catch (err) {
      console.error('Test results error:', err);
    }
  };

  const fetchUpcomingTests = async () => {
    try {
      const res = await fetch('/api/student/tests', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUpcomingTests(data.data || []);
    } catch (err) {
      console.error('Upcoming tests error:', err);
    }
  };

  const fetchStudyMaterials = async () => {
    try {
      const res = await fetch('/api/student/study-materials', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStudyMaterials(data.data || []);
    } catch (err) {
      console.error('Study materials error:', err);
    }
  };

  const handleDownloadReceipt = () => {
    if (!student) return;
    setDownloading(true);

    try {
      const content = `
════════════════════════════════════════════════════════
        RAVEN TUTORIALS - STUDENT ENROLLMENT RECEIPT
════════════════════════════════════════════════════════

✓ Official Student Record

STUDENT DETAILS
───────────────
Student Name     : ${student.studentName}
Registration ID  : ${student.registrationId}
Enrolled Standard: ${student.standard}
Email (User ID)  : ${student.email}
Contact Phone    : ${student.phoneNumber}
City / Address   : ${student.city}, ${student.address}

PORTAL ACCESS
─────────────
Portal Login URL : ${window.location.origin}/login
Status           : ACTIVE & VERIFIED ✓

════════════════════════════════════════════════════════
        Raven Tutorials - Academic Excellence
════════════════════════════════════════════════════════
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Raven_Tutorials_Receipt_${student.registrationId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Receipt downloaded successfully!');
    } catch (err) {
      toast.error('Failed to generate receipt');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] text-center max-w-sm w-full cartoon-pop">
          <div className="animate-spin w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full mx-auto mb-4"></div>
          <p className="text-black font-black text-xl font-outfit">Loading Student Portal...</p>
          <p className="text-neutral-600 text-sm font-medium mt-1">Preparing your dashboard</p>
        </div>
      </div>
    );
  }

  if (!student) return null;

  const overallAttendance = attendance.length > 0
    ? Math.round(attendance.reduce((sum, s) => sum + (s.percentage || 0), 0) / attendance.length)
    : 0;

  const hasLowAttendance = attendance.some(s => s.percentage < 75);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pt-24 pb-16 selection:bg-emerald-300 selection:text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Cartoon Welcome Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 sm:p-8 text-black mb-8 shadow-[8px_8px_0px_#000] relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-xs font-bold font-space uppercase mb-3 shadow-[1.5px_1.5px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                <span>Student Academic Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight">
                Welcome, {student.studentName}! 👋
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-sm sm:text-base mt-1">
                Class {student.standard} • Registration ID: <span className="font-mono font-black">{student.registrationId}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#dcfce7] border-2 border-black font-black text-xs font-space shadow-[2px_2px_0px_#000]">
                ENROLLED 2026-27
              </span>
              <button
                onClick={handleDownloadReceipt}
                disabled={downloading}
                className="btn-cartoon px-4 py-2 bg-white hover:bg-[#dcfce7] text-black font-bold font-outfit text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center gap-1.5 transition active:translate-x-0.5 active:translate-y-0.5"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>{downloading ? 'Downloading...' : 'Receipt'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 cartoon-stagger">
          {/* Card 1: Attendance */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Overall Attendance</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{overallAttendance}%</p>
              </div>
              <div className="p-3 bg-[#86efac] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Calendar className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="mt-3 w-full bg-white rounded-full h-3 border border-black overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${overallAttendance}%` }}
              />
            </div>
          </div>

          {/* Card 2: Tests Completed */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Tests Evaluated</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{testResults.length}</p>
              </div>
              <div className="p-3 bg-amber-200 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Award className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-3">Completed mock tests</p>
          </div>

          {/* Card 3: Upcoming Tests */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Available Tests</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{upcomingTests.length}</p>
              </div>
              <div className="p-3 bg-sky-200 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Clock className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-3">Scheduled assessments</p>
          </div>

          {/* Card 4: Study Materials */}
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Study Notes</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{studyMaterials.length}</p>
              </div>
              <div className="p-3 bg-[#bbf7d0] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-3">Class study resources</p>
          </div>
        </div>

        {/* Low Attendance Warning */}
        {hasLowAttendance && (
          <div className="bg-[#fef2f2] border-3 border-black rounded-2xl p-5 mb-8 flex items-center gap-4 shadow-[4px_4px_0px_#000] cartoon-pop">
            <div className="p-2.5 bg-rose-200 rounded-xl border-2 border-black flex-shrink-0 shadow-[1.5px_1.5px_0px_#000]">
              <AlertCircle className="w-6 h-6 text-rose-800" />
            </div>
            <div>
              <p className="font-black text-black text-base font-outfit">Attendance Advisory</p>
              <p className="text-xs sm:text-sm text-neutral-700 font-semibold font-jakarta mt-0.5">
                Your attendance in some subjects is currently below 75%. Please ensure regular attendance to maintain test eligibility.
              </p>
            </div>
          </div>
        )}

        {/* Cartoon Tab Navigation */}
        <div className="bg-[#f0fdf4] rounded-2xl p-1.5 border-3 border-black shadow-[4px_4px_0px_#000] mb-8 overflow-x-auto flex gap-2">
          {['overview', 'attendance', 'marks', 'tests', 'materials', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn-cartoon flex-shrink-0 px-4 sm:px-6 py-2.5 rounded-xl font-black font-outfit text-xs sm:text-sm transition-all ${
                activeTab === tab
                  ? 'bg-emerald-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-neutral-700 hover:text-black hover:bg-[#dcfce7] border border-transparent font-bold'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 border-3 border-black">
          
          {/* 1. Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[3px_3px_0px_#000]">
                <h3 className="font-black text-black mb-3 flex items-center gap-2 text-lg font-outfit">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Quick Academic Shortcuts
                </h3>
                <p className="text-sm text-neutral-700 font-medium font-jakarta mb-5">
                  Welcome to your student control center. Access your official admission fee invoice, test schedule, and syllabus notes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadReceipt}
                    disabled={downloading}
                    className="btn-cartoon px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4 text-black" />
                    <span>Download Admission Receipt (.txt)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('tests')}
                    className="btn-cartoon px-5 py-3 bg-white hover:bg-[#dcfce7] text-black font-black font-outfit rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center gap-2 text-sm"
                  >
                    <Clock className="w-4 h-4 text-black" />
                    <span>View Scheduled Tests ({upcomingTests.length})</span>
                  </button>
                </div>
              </div>

              {/* Student Details Mini Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-neutral-500 font-space block">Registered Class</span>
                  <span className="text-base font-black text-black font-outfit">{student.standard}</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-neutral-500 font-space block">Roll / Reg Number</span>
                  <span className="text-base font-mono font-black text-black">{student.registrationId}</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-neutral-500 font-space block">Admission Status</span>
                  <span className="text-base font-black text-emerald-800 flex items-center gap-1 font-outfit">
                    <ShieldCheck className="w-4 h-4" /> Active & Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Attendance Tab */}
          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-xl font-black text-black font-outfit mb-4">Subject-wise Attendance</h3>
              {attendance.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {attendance.map(subject => (
                    <div key={subject.subject} className="p-5 border-2 border-black rounded-2xl bg-white shadow-[3px_3px_0px_#000]">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-black text-black font-outfit text-base">{subject.subject}</h4>
                        <span className={`px-2.5 py-1 rounded-lg border border-black font-mono font-black text-sm ${
                          subject.percentage >= 75 ? 'bg-[#dcfce7] text-emerald-950' : 'bg-rose-100 text-rose-950'
                        }`}>
                          {subject.percentage}%
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold font-jakarta mb-1.5 text-neutral-600">
                          <span>Classes Attended</span>
                          <span className="font-mono text-black">{subject.present} / {subject.total}</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-3 border border-black overflow-hidden">
                          <div
                            className={`h-full ${subject.percentage >= 75 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                            style={{ width: `${subject.percentage}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-bold mt-2 text-neutral-600">
                        {subject.percentage >= 75 ? '✓ On track (Above 75%)' : '⚠ Action required (Below 75%)'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border-2 border-black">
                  <p className="text-neutral-500 font-bold font-jakarta">No subject attendance recorded yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Marks Tab */}
          {activeTab === 'marks' && (
            <div>
              <h3 className="text-xl font-black text-black font-outfit mb-4">Completed Test Results</h3>
              {testResults.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] bg-white">
                  <table className="w-full text-xs sm:text-sm font-jakarta">
                    <thead className="bg-[#dcfce7] border-b-2 border-black font-space font-black uppercase text-black">
                      <tr>
                        <th className="px-4 py-3 text-left">Test Name</th>
                        <th className="px-4 py-3 text-left">Subject</th>
                        <th className="px-4 py-3 text-center">Score</th>
                        <th className="px-4 py-3 text-center">Percentage</th>
                        <th className="px-4 py-3 text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {testResults.map((test, idx) => {
                        const percentage = ((test.marksObtained / test.totalMarks) * 100).toFixed(1);
                        const passed = test.marksObtained >= test.passingMarks;
                        return (
                          <tr key={idx} className="hover:bg-[#f0fdf4] transition-colors">
                            <td className="px-4 py-3.5 font-bold text-black">{test.title}</td>
                            <td className="px-4 py-3.5 text-neutral-700">{test.subject}</td>
                            <td className="px-4 py-3.5 text-center font-mono font-black text-black">
                              {test.marksObtained} / {test.totalMarks}
                            </td>
                            <td className="px-4 py-3.5 text-center font-mono font-bold">{percentage}%</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className={`px-2.5 py-0.5 rounded-lg border border-black text-xs font-black uppercase ${
                                passed ? 'bg-[#86efac] text-black' : 'bg-rose-200 text-black'
                              }`}>
                                {passed ? 'PASS ✓' : 'FAIL'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border-2 border-black">
                  <p className="text-neutral-500 font-bold font-jakarta">No test evaluations found yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Upcoming Tests Tab */}
          {activeTab === 'tests' && (
            <div>
              <h3 className="text-xl font-black text-black font-outfit mb-4">Available Mock Tests</h3>
              {upcomingTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {upcomingTests.map((test, idx) => (
                    <div key={idx} className="p-5 border-2 border-black rounded-2xl bg-white shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-black font-outfit text-base">{test.title}</h4>
                          <span className="px-2.5 py-0.5 bg-[#dcfce7] border border-black rounded-md text-[10px] font-black uppercase font-space">
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-xs font-bold text-neutral-600 mb-4">{test.subject}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs font-jakarta mb-4 bg-[#f0fdf4] p-3 rounded-xl border border-black">
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Duration:</span>
                            <span className="font-bold text-black">{test.duration} Minutes</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Total Marks:</span>
                            <span className="font-bold text-black">{test.totalMarks}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/test/${test._id}`)}
                        className="btn-cartoon w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5"
                      >
                        <span>Start Online Test</span>
                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border-2 border-black">
                  <p className="text-neutral-500 font-bold font-jakarta">No active assessments scheduled right now.</p>
                </div>
              )}
            </div>
          )}

          {/* 5. Study Materials Tab */}
          {activeTab === 'materials' && (
            <div>
              <h3 className="text-xl font-black text-black font-outfit mb-4">Class Study Materials & PDFs</h3>
              {studyMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {studyMaterials.map((material, idx) => (
                    <div key={idx} className="p-5 border-2 border-black rounded-2xl bg-white shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                      <div>
                        <div className="flex gap-3 mb-3">
                          <div className="p-2.5 bg-[#86efac] border border-black rounded-xl h-fit">
                            <FileText className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h4 className="font-black text-black font-outfit text-sm">{material.title}</h4>
                            <p className="text-[11px] font-bold text-neutral-600">{material.subject}</p>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-2 font-medium mb-4">{material.description}</p>
                      </div>

                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cartoon w-full py-2 bg-[#dcfce7] hover:bg-[#bbf7d0] text-black font-black font-outfit text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] text-center flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-black" />
                        <span>Download Material</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border-2 border-black">
                  <p className="text-neutral-500 font-bold font-jakarta">No study files uploaded for this standard yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 6. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[3px_3px_0px_#000]">
              <div className="border-b-2 border-black/15 pb-4 mb-6 flex items-center gap-3">
                <div className="p-3 bg-[#86efac] border-2 border-black rounded-2xl shadow-[2px_2px_0px_#000]">
                  <User className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black font-outfit">Student Profile Records</h3>
                  <p className="text-xs text-neutral-600 font-bold font-jakarta">Personal and guardian information on record</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-jakarta">
                <div className="space-y-4">
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Student Full Name</span>
                    <span className="font-bold text-black text-base">{student.studentName}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Father&apos;s / Guardian Name</span>
                    <span className="font-bold text-black">{student.fatherName}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Mother&apos;s Name</span>
                    <span className="font-bold text-black">{student.motherName}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Gender & Blood Group</span>
                    <span className="font-bold text-black">{student.gender} • {student.bloodGroup || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Registered Email</span>
                    <span className="font-bold text-black break-all">{student.email}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Contact Phone Number</span>
                    <span className="font-bold text-black">{student.phoneNumber}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Residential Address</span>
                    <span className="font-bold text-black">{student.address}, {student.city}</span>
                  </div>
                  <div className="p-3.5 bg-[#f0fdf4] rounded-xl border border-black">
                    <span className="text-[10px] font-black uppercase text-neutral-500 block">Registered Class & Reg ID</span>
                    <span className="font-bold text-black">{student.standard} • <span className="font-mono">{student.registrationId}</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// Wrap with StudentProtectedRoute for security
const ProtectedDashboard = () => (
  <StudentProtectedRoute>
    <Dashboard />
  </StudentProtectedRoute>
);

export default ProtectedDashboard;
