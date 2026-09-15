'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen, BarChart3, Calendar, FileText,
  User, Mail, Phone, AlertCircle, CheckCircle, Clock, Award,
  Download, Printer, Sparkles, LogOut, ArrowRight, ShieldCheck,
  CreditCard, Trophy, Zap, Crown, X, Check, Medal, Target, Flame, Shield, AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentProtectedRoute } from '@/components';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

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
  photo?: string;
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

interface LeaderboardBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress: number;
}

type BadgeItem = LeaderboardBadge;

const renderBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'crown':
      return <Crown className="w-6 h-6 text-amber-500" />;
    case 'zap':
      return <Zap className="w-6 h-6 text-yellow-500" />;
    case 'target':
      return <Target className="w-6 h-6 text-rose-500" />;
    case 'flame':
      return <Flame className="w-6 h-6 text-orange-500" />;
    case 'book':
      return <BookOpen className="w-6 h-6 text-blue-500" />;
    case 'shield':
      return <Shield className="w-6 h-6 text-emerald-600" />;
    default:
      return <Award className="w-6 h-6 text-emerald-600" />;
  }
};

interface LeaderboardUser {
  studentId: string;
  studentName: string;
  standard: string;
  photo?: string;
  registrationId: string;
  testsAttempted: number;
  avgScore: number;
  points: number;
  rank: number;
}

interface FeeItem {
  _id: string;
  month: string;
  tuitionFee: number;
  examFee: number;
  labFee: number;
  totalAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  receiptNumber?: string;
  paymentMode?: string;
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

  // Leaderboard states
  const [podium, setPodium] = useState<(LeaderboardUser | null)[]>([]);
  const [rankings, setRankings] = useState<LeaderboardUser[]>([]);
  const [myBadges, setMyBadges] = useState<BadgeItem[]>([]);
  const [myRankStats, setMyRankStats] = useState<any>(null);
  const [leaderboardStd, setLeaderboardStd] = useState('All');

  // Fee states
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [feeSummary, setFeeSummary] = useState({ totalPendingAmount: 0, totalPaidAmount: 0, pendingCount: 0, hasOverdue: false });
  const [payingFeeId, setPayingFeeId] = useState<string | null>(null);
  const [receiptModalFee, setReceiptModalFee] = useState<FeeItem | null>(null);

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
        fetchStudyMaterials(),
        fetchLeaderboard('All'),
        fetchFees()
      ]);
    } catch (err) {
      console.error('Dashboard init error:', err);
      toast.error('Failed to load dashboard');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async (std = 'All') => {
    try {
      const url = std !== 'All' ? `/api/leaderboard?standard=${std}` : '/api/leaderboard';
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setPodium(data.podium || []);
        setRankings(data.rankings || []);
        if (data.currentStudentStats) {
          setMyRankStats(data.currentStudentStats);
          setMyBadges(data.currentStudentStats.badges || []);
        }
      }
    } catch (err) {
      console.error('Leaderboard fetch error:', err);
    }
  };

  const fetchFees = async () => {
    try {
      const res = await fetch('/api/student/fees', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setFees(data.fees || []);
        setFeeSummary(data.summary || { totalPendingAmount: 0, totalPaidAmount: 0, pendingCount: 0, hasOverdue: false });
      }
    } catch (err) {
      console.error('Fees fetch error:', err);
    }
  };

  const handlePayFee = async (feeId: string) => {
    try {
      setPayingFeeId(feeId);
      const res = await fetch(`/api/fees/${feeId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          paymentMode: 'Online',
          transactionId: `ONLINE_UPI_${Date.now().toString().slice(-6)}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Fee paid successfully! Official receipt generated.');
        fetchFees();
        setReceiptModalFee(data.fee);
      } else {
        toast.error(data.message || 'Payment failed');
      }
    } catch {
      toast.error('Payment processing error');
    } finally {
      setPayingFeeId(null);
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

[VERIFIED] Official Student Record

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
Status           : ACTIVE & VERIFIED

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

  const handlePrintIDCard = () => {
    window.print();
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
        
        {/* Cartoon Welcome Banner with Student Profile Photo */}
        <div className="bg-[#86efac] border-3 sm:border-4 border-black rounded-3xl p-6 sm:p-8 text-black mb-8 shadow-[8px_8px_0px_#000] relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Student Profile Picture Card */}
              <div className="relative flex-shrink-0 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-white border-3 border-black shadow-[4px_4px_0px_#000] overflow-hidden flex items-center justify-center relative transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0px_#000]">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.studentName}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#dcfce7] flex flex-col items-center justify-center font-black font-outfit text-3xl sm:text-4xl text-emerald-950">
                      <span>{student.studentName.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {/* Verified Active Badge */}
                <div
                  className="absolute -bottom-1 -right-1 p-1 sm:p-1.5 bg-emerald-400 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]"
                  title="Verified Enrolled Student"
                >
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
                </div>
              </div>

              {/* Student Identification & Salutation */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-[11px] font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Student Academic Portal</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#dcfce7] border border-black text-[10px] font-black font-space uppercase text-emerald-950">
                    Active Session 2026-27
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight text-black flex items-center gap-2 flex-wrap">
                  <span>Welcome, {student.studentName}!</span>
                  <Sparkles className="w-6 h-6 text-amber-500 inline-block" />
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-jakarta text-neutral-800 pt-0.5">
                  <span className="px-2.5 py-1 bg-white border border-black rounded-lg shadow-[1px_1px_0px_#000] font-space font-black uppercase text-[11px]">
                    Class {student.standard}
                  </span>
                  <span className="font-mono bg-black text-emerald-300 px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_#000] text-xs font-bold">
                    Reg ID: {student.registrationId}
                  </span>
                  <span className="px-2 py-1 bg-emerald-200 border border-black rounded-lg text-[11px] font-bold font-space uppercase text-emerald-900 hidden sm:inline">
                    Patna Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
              <button
                onClick={handleDownloadReceipt}
                className="btn-cartoon px-4 py-2.5 bg-white hover:bg-neutral-100 text-black rounded-xl border-2 border-black font-black font-outfit text-xs sm:text-sm flex items-center gap-2 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Admission Receipt</span>
              </button>

              <button
                onClick={handlePrintIDCard}
                className="btn-cartoon px-4 py-2.5 bg-[#fef08a] hover:bg-[#fde047] text-black rounded-xl border-2 border-black font-black font-outfit text-xs sm:text-sm flex items-center gap-2 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Student Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 cartoon-stagger">
          {/* Card 1: Attendance */}
          <div
            onClick={() => setActiveTab('attendance')}
            className="card-cartoon bg-[#f0fdf4] hover:bg-[#dcfce7] cursor-pointer rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Overall Attendance</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{overallAttendance}%</p>
              </div>
              <div className="p-3 bg-[#86efac] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Calendar className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="mt-4 w-full bg-white rounded-full h-3 border-2 border-black overflow-hidden shadow-[1px_1px_0px_#000]">
              <div
                className={`h-full transition-all duration-500 ${
                  overallAttendance >= 75 ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
                style={{ width: `${overallAttendance}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-neutral-600 mt-2 flex items-center justify-between font-jakarta">
              <span>Req: 75%</span>
              <span className={overallAttendance >= 75 ? 'text-emerald-800 font-bold inline-flex items-center gap-1' : 'text-rose-700 font-black inline-flex items-center gap-1'}>
                {overallAttendance >= 75 ? (
                  <>Regular <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" /></>
                ) : (
                  <>Below 75% <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /></>
                )}
              </span>
            </p>
          </div>

          {/* Card 2: Tests Completed */}
          <div
            onClick={() => setActiveTab('marks')}
            className="card-cartoon bg-[#f0fdf4] hover:bg-[#fef9c3] cursor-pointer rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Tests Evaluated</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{testResults.length}</p>
              </div>
              <div className="p-3 bg-[#fef08a] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Award className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-neutral-700">
              <span className="text-[11px] text-neutral-600">Completed tests</span>
              <span className="text-amber-900 font-space font-black uppercase text-[10px]">
                Marks →
              </span>
            </div>
          </div>

          {/* Card 3: Upcoming Tests */}
          <div
            onClick={() => setActiveTab('tests')}
            className="card-cartoon bg-[#f0fdf4] hover:bg-[#e0f2fe] cursor-pointer rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Available Tests</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{upcomingTests.length}</p>
              </div>
              <div className="p-3 bg-[#bae6fd] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Clock className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-neutral-700">
              <span className="text-[11px] text-neutral-600">Active mock tests</span>
              <span className="text-sky-900 font-space font-black uppercase text-[10px]">
                Take Test →
              </span>
            </div>
          </div>

          {/* Card 4: Study Materials */}
          <div
            onClick={() => setActiveTab('materials')}
            className="card-cartoon bg-[#f0fdf4] hover:bg-[#dcfce7] cursor-pointer rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-xs font-black uppercase font-space tracking-wider">Study Notes</p>
                <p className="text-3xl font-black text-black font-mono mt-1">{studyMaterials.length}</p>
              </div>
              <div className="p-3 bg-[#bbf7d0] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-neutral-700">
              <span className="text-[11px] text-neutral-600">Class notes & DPPs</span>
              <span className="text-emerald-900 font-space font-black uppercase text-[10px]">
                Notes →
              </span>
            </div>
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
          {[
            { id: 'overview', label: 'OVERVIEW', icon: null },
            { id: 'leaderboard', label: 'LEADERBOARD & BADGES', icon: Trophy },
            { id: 'fees', label: 'FEES & DUES', icon: CreditCard },
            { id: 'attendance', label: 'ATTENDANCE', icon: null },
            { id: 'marks', label: 'MARKS', icon: null },
            { id: 'tests', label: 'TESTS', icon: null },
            { id: 'materials', label: 'NOTES', icon: null },
            { id: 'profile', label: 'PROFILE', icon: null },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-cartoon flex-shrink-0 px-4 sm:px-6 py-2.5 rounded-xl font-black font-outfit text-xs sm:text-sm transition-all inline-flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-emerald-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-neutral-700 hover:text-black hover:bg-[#dcfce7] border border-transparent font-bold'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-black" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
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
                      <p className="text-xs font-bold mt-2 text-neutral-600 flex items-center gap-1.5">
                        {subject.percentage >= 75 ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                            <span>On track (Above 75%)</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Action required (Below 75%)</span>
                          </>
                        )}
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
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-black text-xs font-black uppercase ${
                                passed ? 'bg-[#86efac] text-black' : 'bg-rose-200 text-black'
                              }`}>
                                {passed ? (
                                  <>
                                    <Check className="w-3 h-3 text-black stroke-[3]" />
                                    <span>PASS</span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3 h-3 text-black stroke-[3]" />
                                    <span>FAIL</span>
                                  </>
                                )}
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
              <div className="border-b-2 border-black/15 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#dcfce7] border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden flex items-center justify-center flex-shrink-0">
                    {student.photo ? (
                      <img src={student.photo} alt={student.studentName} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="font-black font-outfit text-2xl text-emerald-950">
                        {student.studentName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black font-outfit">{student.studentName}</h3>
                    <p className="text-xs text-neutral-600 font-bold font-jakarta mt-0.5">
                      Registration ID: <span className="font-mono font-bold text-black">{student.registrationId}</span> • Class {student.standard}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200 border border-black text-xs font-black font-space uppercase text-emerald-950 self-start sm:self-center shadow-[1px_1px_0px_#000]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Official Record</span>
                </span>
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

          {/* 7. Leaderboard & Badges Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-8">
              {/* Header & Standard Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-2 border-black rounded-2xl p-5 shadow-[3px_3px_0px_#000]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef08a] border border-black text-xs font-black font-space uppercase mb-1 shadow-[1px_1px_0px_#000]">
                    <Trophy className="w-3.5 h-3.5 text-black" />
                    <span>Hall of Fame & Achievements</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-outfit text-black">
                    Institute Academic Leaderboard
                  </h3>
                </div>

                <div className="flex items-center gap-2 min-w-[170px]">
                  <span className="text-xs font-black font-space uppercase text-neutral-500 whitespace-nowrap">Class:</span>
                  <CartoonDropdown
                    size="sm"
                    value={leaderboardStd}
                    onChange={(e: any) => {
                      const val = typeof e === 'string' ? e : e?.target?.value;
                      setLeaderboardStd(val);
                      fetchLeaderboard(val);
                    }}
                    options={[
                      { label: 'All Batches', value: 'All' },
                      ...['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((std) => ({
                        label: `Class ${std}`,
                        value: std,
                      })),
                    ]}
                  />
                </div>
              </div>

              {/* Student's Personal Ranking Bar (if ranked) */}
              {myRankStats && (
                <div className="bg-[#86efac] border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-outfit font-black text-xl text-black">
                      #{myRankStats.rank}
                    </div>
                    <div>
                      <p className="text-xs font-black font-space uppercase text-emerald-950">Your Standing</p>
                      <p className="text-lg font-black font-outfit text-black">
                        Rank #{myRankStats.rank} • Top {100 - myRankStats.percentile}% of students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono font-black">
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                      Points: {myRankStats.points} pts
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                      Avg: {myRankStats.avgScore}%
                    </div>
                  </div>
                </div>
              )}

              {/* Badges Showcase Grid */}
              <div>
                <h4 className="text-base font-black font-outfit text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  Earned Achievement Badges ({myBadges.filter(b => b.unlocked).length} / {myBadges.length || 6})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(myBadges.length > 0 ? myBadges : [
                    { id: 'top-raven', title: 'Top Raven', icon: 'crown', description: 'Ranked in the prestigious Top 3 of the institute', unlocked: false, progress: 20 },
                    { id: 'speed-demon', title: 'Speed Demon', icon: 'zap', description: 'Scored ≥80% in half the test duration', unlocked: false, progress: 40 },
                    { id: 'bullseye', title: 'Bullseye 100%', icon: 'target', description: 'Scored perfect 100% marks in an official test', unlocked: false, progress: 60 },
                    { id: 'streak-master', title: 'Streak Master', icon: 'flame', description: 'Conquered 3 consecutive mock tests', unlocked: false, progress: 33 },
                    { id: 'scholar', title: 'Raven Scholar', icon: 'book', description: 'Attempted 5 or more scheduled assessments', unlocked: false, progress: 50 },
                    { id: 'consistent', title: 'Honor Roll', icon: 'shield', description: 'Maintained an overall average score above 75%', unlocked: false, progress: 70 },
                  ]).map((badge) => (
                    <div
                      key={badge.id}
                      className={`card-cartoon rounded-2xl p-4 border-2 border-black shadow-[3px_3px_0px_#000] transition-all ${
                        badge.unlocked
                          ? 'bg-[#dcfce7] border-black'
                          : 'bg-white opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="p-2.5 bg-[#f0fdf4] rounded-xl border border-black shadow-[1px_1px_0px_#000] flex items-center justify-center">
                          {renderBadgeIcon(badge.icon)}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black font-space uppercase border ${
                          badge.unlocked
                            ? 'bg-emerald-300 border-emerald-800 text-emerald-950'
                            : 'bg-neutral-100 border-neutral-400 text-neutral-600'
                        }`}>
                          {badge.unlocked ? (
                            <>
                              Unlocked <Check className="w-3 h-3 text-emerald-800 stroke-[3]" />
                            </>
                          ) : (
                            'In Progress'
                          )}
                        </span>
                      </div>

                      <h5 className="font-black font-outfit text-black text-sm mt-3">{badge.title}</h5>
                      <p className="text-xs text-neutral-600 font-medium font-jakarta mt-1">{badge.description}</p>

                      {!badge.unlocked && (
                        <div className="mt-3">
                          <div className="w-full bg-neutral-200 rounded-full h-2 border border-black/40 overflow-hidden">
                            <div
                              className="h-full bg-emerald-400"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-neutral-500 font-bold font-mono mt-0.5 block text-right">
                            {badge.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D-Style Cartoon Podium */}
              {podium.some(p => p !== null) && (
                <div className="bg-white border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
                  <h4 className="text-center text-xs font-black font-space uppercase tracking-widest text-neutral-500 mb-6">
                    Top 3 Rankers of the Term
                  </h4>

                  <div className="flex items-end justify-center gap-3 sm:gap-6 pt-4 max-w-lg mx-auto">
                    {/* Rank 2 - Left */}
                    {podium[1] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center mb-2">
                          <Medal className="w-5 h-5 text-slate-700" />
                        </div>
                        <p className="font-black text-black text-xs font-outfit text-center truncate max-w-[90px]">{podium[1].studentName}</p>
                        <p className="text-[10px] font-bold text-neutral-500 font-mono">{podium[1].points} pts</p>
                        <div className="w-full h-28 bg-[#e2e8f0] border-2 border-black rounded-t-2xl shadow-[3px_0px_0px_#000] flex items-center justify-center font-black font-outfit text-2xl text-slate-700 mt-2">
                          2nd
                        </div>
                      </div>
                    )}

                    {/* Rank 1 - Center */}
                    {podium[0] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-300 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center mb-2">
                          <Crown className="w-6 h-6 text-amber-900" />
                        </div>
                        <p className="font-black text-black text-sm font-outfit text-center truncate max-w-[100px]">{podium[0].studentName}</p>
                        <p className="text-xs font-black text-amber-900 font-mono">{podium[0].points} pts</p>
                        <div className="w-full h-36 bg-[#fde047] border-2 border-black rounded-t-2xl shadow-[4px_0px_0px_#000] flex items-center justify-center font-black font-outfit text-3xl text-amber-950 mt-2">
                          1st
                        </div>
                      </div>
                    )}

                    {/* Rank 3 - Right */}
                    {podium[2] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center mb-2">
                          <Award className="w-5 h-5 text-amber-800" />
                        </div>
                        <p className="font-black text-black text-xs font-outfit text-center truncate max-w-[90px]">{podium[2].studentName}</p>
                        <p className="text-[10px] font-bold text-neutral-500 font-mono">{podium[2].points} pts</p>
                        <div className="w-full h-20 bg-[#fed7aa] border-2 border-black rounded-t-2xl shadow-[3px_0px_0px_#000] flex items-center justify-center font-black font-outfit text-xl text-amber-900 mt-2">
                          3rd
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Full Standings Table */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_#000]">
                <div className="p-4 bg-[#dcfce7] border-b-2 border-black flex items-center justify-between">
                  <h4 className="font-black font-outfit text-black text-sm">Full Batch Standings</h4>
                  <span className="text-xs font-bold font-mono text-neutral-600">{rankings.length} Students Evaluated</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/20 font-space font-black uppercase text-neutral-600">
                        <th className="p-3">Rank</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Class</th>
                        <th className="p-3">Tests</th>
                        <th className="p-3">Avg Accuracy</th>
                        <th className="p-3 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10 font-jakarta">
                      {rankings.map((r) => {
                        const isMe = r.studentId === student._id;
                        return (
                          <tr key={r.studentId} className={`hover:bg-neutral-50 ${isMe ? 'bg-[#dcfce7] font-black' : ''}`}>
                            <td className="p-3 font-mono font-bold">
                              <div className="flex items-center gap-1.5">
                                {r.rank === 1 ? (
                                  <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                ) : r.rank === 2 ? (
                                  <Medal className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                ) : r.rank === 3 ? (
                                  <Award className="w-4 h-4 text-amber-700 flex-shrink-0" />
                                ) : null}
                                <span>#{r.rank}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-outfit font-bold text-black">{r.studentName}</span>
                              {isMe && <span className="ml-2 px-1.5 py-0.5 bg-black text-white text-[9px] rounded font-space">YOU</span>}
                            </td>
                            <td className="p-3 font-medium">{r.standard}</td>
                            <td className="p-3 font-mono">{r.testsAttempted}</td>
                            <td className="p-3 font-mono">{r.avgScore}%</td>
                            <td className="p-3 font-mono text-right font-black text-black">{r.points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 8. Monthly Fees & Receipts Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-8">
              {/* Top Banner / Dues Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card-cartoon bg-white rounded-2xl p-5 border-2 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black font-space uppercase text-neutral-500">Pending Dues</p>
                  <p className="text-3xl font-black font-mono text-amber-900 mt-1">₹{feeSummary.totalPendingAmount}</p>
                  <p className="text-xs font-bold text-neutral-600 mt-2">{feeSummary.pendingCount} unpaid invoice(s)</p>
                </div>

                <div className="card-cartoon bg-white rounded-2xl p-5 border-2 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black font-space uppercase text-neutral-500">Total Fees Paid</p>
                  <p className="text-3xl font-black font-mono text-emerald-900 mt-1">₹{feeSummary.totalPaidAmount}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-2">All verified by Accounts Office</p>
                </div>

                <div className="card-cartoon bg-[#dcfce7] rounded-2xl p-5 border-2 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black font-space uppercase text-neutral-600">Fee Status</p>
                  <p className="text-2xl font-black font-outfit text-black mt-1">
                    {feeSummary.hasOverdue ? 'Overdue Due Date' : feeSummary.pendingCount > 0 ? 'Pending Payment' : 'All Clear'}
                  </p>
                  <p className="text-xs font-bold text-neutral-700 mt-2">Class {student.standard} Session 2026-27</p>
                </div>
              </div>

              {/* Pending Dues Section */}
              <div>
                <h4 className="text-base font-black font-outfit text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-700" />
                  Active Invoices & Pending Dues
                </h4>

                {fees.filter(f => f.status === 'pending' || f.status === 'overdue').length === 0 ? (
                  <div className="p-6 bg-white rounded-2xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="font-black text-black text-base font-outfit">No Pending Dues!</p>
                    <p className="text-xs text-neutral-600 font-bold font-jakarta mt-1">
                      You have cleared all academic tuition fees up to this month.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fees.filter(f => f.status === 'pending' || f.status === 'overdue').map((fee) => (
                      <div
                        key={fee._id}
                        className="bg-white border-2 border-black rounded-2xl p-5 shadow-[3px_3px_0px_#000] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2.5 py-0.5 bg-[#fef9c3] border border-black rounded-lg text-xs font-black font-space uppercase">
                              {fee.month}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black font-space uppercase border ${
                              fee.status === 'overdue' ? 'bg-rose-200 border-rose-800 text-rose-950' : 'bg-amber-100 border-amber-800 text-amber-950'
                            }`}>
                              {fee.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                            </span>
                          </div>

                          <p className="text-2xl font-black font-mono text-black mt-2">₹{fee.totalAmount}</p>
                          <div className="text-xs text-neutral-600 font-medium space-y-0.5 mt-2">
                            <p>Tuition Fee: ₹{fee.tuitionFee}</p>
                            {fee.labFee > 0 && <p>Computer / Lab: ₹{fee.labFee}</p>}
                            {fee.examFee > 0 && <p>Exam Fee: ₹{fee.examFee}</p>}
                            <p className="font-mono text-neutral-500 mt-1">Due Date: {new Date(fee.dueDate).toLocaleDateString('en-GB')}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-black/10">
                          <button
                            onClick={() => handlePayFee(fee._id)}
                            disabled={payingFeeId === fee._id}
                            className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>{payingFeeId === fee._id ? 'Processing UPI Payment...' : 'Pay Online Now (Instant Receipt)'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Paid Receipts History */}
              <div>
                <h4 className="text-base font-black font-outfit text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-emerald-800" />
                  Official Fee Receipts History
                </h4>

                <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_#000]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#dcfce7] border-b-2 border-black font-space font-black uppercase text-black">
                          <th className="p-3.5">Receipt No</th>
                          <th className="p-3.5">Billing Month</th>
                          <th className="p-3.5">Amount Paid</th>
                          <th className="p-3.5">Payment Date</th>
                          <th className="p-3.5">Payment Mode</th>
                          <th className="p-3.5 text-right">Receipt Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10 font-jakarta">
                        {fees.filter(f => f.status === 'paid').length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-6 text-center text-neutral-500 font-bold">
                              No payment receipts recorded yet.
                            </td>
                          </tr>
                        ) : (
                          fees.filter(f => f.status === 'paid').map((fee) => (
                            <tr key={fee._id} className="hover:bg-[#f0fdf4]">
                              <td className="p-3.5 font-mono font-bold text-black">{fee.receiptNumber}</td>
                              <td className="p-3.5 font-bold text-neutral-800">{fee.month}</td>
                              <td className="p-3.5 font-mono font-black text-emerald-900">₹{fee.totalAmount}</td>
                              <td className="p-3.5 font-mono text-neutral-600">
                                {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString('en-GB') : '—'}
                              </td>
                              <td className="p-3.5 font-bold text-emerald-800">{fee.paymentMode || 'Online'}</td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => setReceiptModalFee(fee)}
                                  className="btn-cartoon px-3 py-1.5 bg-[#86efac] hover:bg-emerald-300 border border-black text-black font-black text-xs rounded-xl shadow-[1.5px_1.5px_0px_#000] inline-flex items-center gap-1.5"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                  <span>Print / Download</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OFFICIAL CARTOON FEE RECEIPT POPUP */}
          {receiptModalFee && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#f0fdf4] border-4 border-black rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-[10px_10px_0px_#000] cartoon-pop relative">
                <button
                  onClick={() => setReceiptModalFee(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl border-2 border-black bg-white hover:bg-rose-200 transition"
                >
                  <X className="w-5 h-5 text-black" />
                </button>

                <div className="space-y-6 text-black">
                  {/* Header */}
                  <div className="text-center pb-4 border-b-2 border-dashed border-black">
                    <span className="text-xl font-black font-outfit text-black">RAVEN TUTORIALS</span>
                    <p className="text-[10px] font-black font-space uppercase text-emerald-900 tracking-wider">Patna Campus • Official Receipt</p>
                    <p className="text-xs font-mono font-bold text-neutral-600 mt-1">Receipt #{receiptModalFee.receiptNumber}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-jakarta">
                    <div>
                      <p className="text-[10px] font-black uppercase text-neutral-500">Student Name</p>
                      <p className="font-black text-black">{student.studentName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-neutral-500">Registration ID</p>
                      <p className="font-mono font-bold text-black">{student.registrationId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-neutral-500">Class & Month</p>
                      <p className="font-bold text-black">{student.standard} • {receiptModalFee.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-neutral-500">Date Paid</p>
                      <p className="font-mono text-black">
                        {receiptModalFee.paidDate ? new Date(receiptModalFee.paidDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white text-xs">
                    <div className="p-2.5 bg-[#dcfce7] border-b border-black font-black font-space uppercase flex justify-between">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="p-2.5 flex justify-between border-b border-neutral-200">
                      <span>Tuition Fee ({receiptModalFee.month})</span>
                      <span className="font-mono font-bold">₹{receiptModalFee.tuitionFee}</span>
                    </div>
                    {receiptModalFee.labFee > 0 && (
                      <div className="p-2.5 flex justify-between border-b border-neutral-200">
                        <span>Lab & Resource Fee</span>
                        <span className="font-mono font-bold">₹{receiptModalFee.labFee}</span>
                      </div>
                    )}
                    {receiptModalFee.examFee > 0 && (
                      <div className="p-2.5 flex justify-between border-b border-neutral-200">
                        <span>Mock Test & Assessment Fee</span>
                        <span className="font-mono font-bold">₹{receiptModalFee.examFee}</span>
                      </div>
                    )}
                    <div className="p-3 bg-[#f0fdf4] font-black flex justify-between border-t-2 border-black text-sm">
                      <span>TOTAL PAID</span>
                      <span className="font-mono text-emerald-950">₹{receiptModalFee.totalAmount}</span>
                    </div>
                  </div>

                  {/* Stamp */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="border-2 border-emerald-600 rounded-lg px-2.5 py-1 text-center bg-emerald-50 rotate-[-4deg]">
                      <p className="text-[9px] font-black uppercase text-emerald-800">PAID & VERIFIED</p>
                      <p className="text-[8px] font-mono text-emerald-700">RAVEN ACCOUNTS</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black font-outfit text-black">Raven Tutorials Patna</p>
                      <p className="text-[8px] text-neutral-500 font-jakarta">Computer Generated Receipt</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Receipt</span>
                    </button>
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
