'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, BookOpen, BarChart3, Calendar, FileText,
  User, Mail, Phone, AlertCircle, CheckCircle, Clock, Award,
  Download, GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

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
  title: string;
  subject: string;
  testDate: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
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
  const [token, setToken] = useState<string | null>(null);
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
      const authData = localStorage.getItem('studentAuth');
      if (!authData) {
        router.push('/login');
        return;
      }

      const parsed = JSON.parse(authData);
      setStudent(parsed.student);
      setToken(parsed.token);
      
      // Fetch all data
      await Promise.all([
        fetchAttendance(parsed.token),
        fetchTestResults(parsed.token),
        fetchUpcomingTests(parsed.token),
        fetchStudyMaterials(parsed.token)
      ]);
    } catch (err) {
      console.error('Dashboard init error:', err);
      toast.error('Failed to load dashboard');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async (tok: string) => {
    try {
      const res = await fetch('/api/student/attendance', {
        headers: { 'Authorization': `Bearer ${tok}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setAttendance(data.data || []);
    } catch (err) {
      console.error('Attendance error:', err);
    }
  };

  const fetchTestResults = async (tok: string) => {
    try {
      const res = await fetch('/api/student/tests/results', {
        headers: { 'Authorization': `Bearer ${tok}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setTestResults(data.data || []);
    } catch (err) {
      console.error('Test results error:', err);
    }
  };

  const fetchUpcomingTests = async (tok: string) => {
    try {
      const res = await fetch('/api/student/tests', {
        headers: { 'Authorization': `Bearer ${tok}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      
      const now = new Date();
      const future = (data.data || []).filter((t: UpcomingTest) => new Date(t.testDate) > now);
      setUpcomingTests(future.slice(0, 5));
    } catch (err) {
      console.error('Upcoming tests error:', err);
    }
  };

  const fetchStudyMaterials = async (tok: string) => {
    try {
      const res = await fetch('/api/student/study-materials', {
        headers: { 'Authorization': `Bearer ${tok}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setStudyMaterials(data.data || []);
    } catch (err) {
      console.error('Study materials error:', err);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!token) return;
    setDownloading(true);

    try {
      const res = await fetch('/api/auth/download-receipt', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to download');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Receipt downloaded!');
    } catch (err) {
      toast.error('Failed to download receipt');
    } finally {
      setDownloading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentAuth');
    router.push('/login');
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (!student) return null;

  const overallAttendance = attendance.length > 0
    ? Math.round(attendance.reduce((sum, s) => sum + (s.percentage || 0), 0) / attendance.length)
    : 0;

  const hasLowAttendance = attendance.some(s => s.percentage < 75);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-16">
        {/* Header */}
        <header className="bg-white shadow-sm fixed top-16 left-0 right-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-violet-600" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">{student.studentName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Welcome Section */}
          <div className="bg-violet-600 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome, {student.studentName}!</h2>
            <p className="text-indigo-100">Class {student.standard} | ID: {student.registrationId}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Overall Attendance</p>
                  <p className="text-3xl font-bold text-gray-900">{overallAttendance}%</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tests Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{testResults.length}</p>
                </div>
                <Award className="w-12 h-12 text-purple-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Upcoming Tests</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingTests.length}</p>
                </div>
                <Clock className="w-12 h-12 text-green-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Study Materials</p>
                  <p className="text-3xl font-bold text-gray-900">{studyMaterials.length}</p>
                </div>
                <BookOpen className="w-12 h-12 text-orange-100" />
              </div>
            </div>
          </div>

          {/* Alerts */}
          {hasLowAttendance && (
            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-8 flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">Attendance Warning</p>
                <p className="text-orange-800 text-sm">Your attendance in some subjects is below 75%.</p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="flex flex-wrap border-b">
              {['overview', 'attendance', 'marks', 'tests', 'materials', 'profile'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium transition-colors text-sm sm:text-base ${
                    activeTab === tab
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Quick Actions
                  </h3>
                  <button
                    onClick={handleDownloadReceipt}
                    disabled={downloading}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {downloading ? 'Downloading...' : 'Download Receipt'}
                  </button>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Subject-wise Attendance</h3>
                {attendance.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {attendance.map(subject => (
                      <div key={subject.subject} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                          <span className={`text-lg font-bold ${subject.percentage >= 75 ? 'text-green-600' : 'text-orange-600'}`}>
                            {subject.percentage}%
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Attendance</span>
                            <span className="font-medium">{subject.present}/{subject.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${subject.percentage >= 75 ? 'bg-green-500' : 'bg-orange-500'}`}
                              style={{ width: `${subject.percentage}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {subject.percentage >= 75 ? '✓ Good attendance' : '⚠ Below 75%'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No attendance data available</p>
                )}
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === 'marks' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Test Results</h3>
                {testResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Test</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-900">Marks</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-900">%</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {testResults.map((test, idx) => {
                          const percentage = (test.marksObtained / test.totalMarks * 100).toFixed(1);
                          const passed = test.marksObtained >= test.passingMarks;
                          return (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-gray-900 font-medium">{test.title}</td>
                              <td className="px-4 py-3 text-gray-600">{test.subject}</td>
                              <td className="px-4 py-3 text-center text-gray-900">{test.marksObtained}/{test.totalMarks}</td>
                              <td className="px-4 py-3 text-center text-gray-900">{percentage}%</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {passed ? 'Pass' : 'Fail'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No test results yet</p>
                )}
              </div>
            )}

            {/* Upcoming Tests Tab */}
            {activeTab === 'tests' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Upcoming Tests</h3>
                {upcomingTests.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTests.map((test, idx) => (
                      <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{test.title}</h4>
                            <p className="text-sm text-gray-600">{test.subject}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Upcoming
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-medium">{new Date(test.testDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-medium">{test.duration} mins</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Marks</p>
                            <p className="font-medium">{test.totalMarks}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Pass Marks</p>
                            <p className="font-medium">{test.passingMarks}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming tests</p>
                )}
              </div>
            )}

            {/* Study Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Study Materials</h3>
                {studyMaterials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studyMaterials.map((material, idx) => (
                      <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition">
                        <div className="flex gap-3 mb-3">
                          <FileText className="w-6 h-6 text-orange-600 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{material.title}</h4>
                            <p className="text-xs text-gray-600">{material.subject}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{material.description}</p>
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-center text-xs font-medium"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No study materials available</p>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" /> Personal Info
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium text-gray-900">{student.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Father&apos;s Name</p>
                        <p className="font-medium text-gray-900">{student.fatherName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Mother&apos;s Name</p>
                        <p className="font-medium text-gray-900">{student.motherName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-medium text-gray-900">{student.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Blood Group</p>
                        <p className="font-medium text-gray-900">{student.bloodGroup || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Contact Info
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900 break-all">{student.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{student.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">{student.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="font-medium text-gray-900">{student.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-medium text-gray-900">{student.standard}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
