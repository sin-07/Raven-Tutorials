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
import Loader from '@/components/Loader';
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
      <Loader
        fullScreen
        size="lg"
        text="Loading Student Portal..."
        subtitle="Preparing your academic dashboard"
      />
    );
  }

  if (!student) return null;

  const overallAttendance = attendance.length > 0
    ? Math.round(attendance.reduce((sum, s) => sum + (s.percentage || 0), 0) / attendance.length)
    : 0;

  const hasLowAttendance = attendance.some(s => s.percentage < 75);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pt-24 pb-16 selection:bg-[#e8602e] selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Luxury Cyber Command Header */}
        <div className="relative bg-[#090b12]/90 border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(232,96,46,0.12)] overflow-hidden backdrop-blur-2xl transition-all duration-300">
          {/* Top highlight line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Ambient subtle aura */}
          <div 
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{ background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Student Profile Picture Card */}
              <div className="relative flex-shrink-0 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-[#121522] border-2 border-[#e8602e]/40 shadow-[0_0_25px_rgba(232,96,46,0.3)] overflow-hidden flex items-center justify-center relative transition-transform duration-200 group-hover:scale-105">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.studentName}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#121522] flex flex-col items-center justify-center font-black font-outfit text-3xl sm:text-4xl text-[#ffaa40]">
                      <span>{student.studentName.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {/* Verified Active Badge */}
                <div
                  className="absolute -bottom-1 -right-1 p-1.5 bg-[#e8602e] border-2 border-[#090b12] rounded-xl shadow-[0_0_12px_rgba(232,96,46,0.6)]"
                  title="Verified Enrolled Student"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Student Identification & Salutation */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121522] border border-[#e8602e]/40 text-[#ffaa40] text-[10px] sm:text-[11px] font-bold font-space uppercase tracking-wider shadow-[0_0_12px_rgba(232,96,46,0.25)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#e8602e]" />
                    <span>Student Academic Portal</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold font-space uppercase text-zinc-300">
                    Active Session 2026-27
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight text-white flex items-center gap-2 flex-wrap">
                  <span>Welcome, {student.studentName}!</span>
                  <span className="text-[#e8602e]">✨</span>
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs font-jakarta pt-0.5">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-zinc-200 font-space font-bold uppercase text-[11px]">
                    Class {student.standard}
                  </span>
                  <span className="font-mono bg-[#121522] text-[#ffaa40] px-3 py-1 rounded-lg border border-[#e8602e]/30 text-xs font-bold shadow-sm">
                    Reg ID: {student.registrationId}
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold font-space uppercase text-zinc-400 hidden sm:inline">
                    Patna Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
              <button
                onClick={handleDownloadReceipt}
                className="px-4 py-3 bg-[#121522] hover:bg-[#1a1f33] text-zinc-200 hover:text-white rounded-xl border border-white/10 hover:border-white/20 font-black font-outfit text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#ffaa40]" />
                <span>Admission Receipt</span>
              </button>

              <button
                onClick={handlePrintIDCard}
                className="btn-sheryians px-5 py-3 text-white rounded-xl font-black font-outfit text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(232,96,46,0.35)] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Student Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Attendance */}
          <div
            onClick={() => setActiveTab('attendance')}
            className="bg-[#090b12]/90 hover:border-[#e8602e]/40 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(232,96,46,0.12)] transition-all cursor-pointer backdrop-blur-xl group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Overall Attendance</p>
                <p className="text-3xl font-black text-white font-mono mt-1">{overallAttendance}%</p>
              </div>
              <div className="p-3 bg-[#e8602e]/10 border border-[#e8602e]/30 rounded-xl shadow-[0_0_15px_rgba(232,96,46,0.2)]">
                <Calendar className="w-6 h-6 text-[#ff7a45]" />
              </div>
            </div>
            <div className="mt-4 w-full bg-white/10 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-500 ${
                  overallAttendance >= 75 ? 'bg-gradient-to-r from-emerald-500 to-[#10b981]' : 'bg-gradient-to-r from-rose-500 to-rose-600'
                }`}
                style={{ width: `${overallAttendance}%` }}
              />
            </div>
            <p className="text-[11px] font-bold text-zinc-400 mt-2 flex items-center justify-between font-jakarta">
              <span>Req: 75%</span>
              <span className={overallAttendance >= 75 ? 'text-emerald-400 font-bold inline-flex items-center gap-1' : 'text-rose-400 font-black inline-flex items-center gap-1'}>
                {overallAttendance >= 75 ? (
                  <>Regular <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /></>
                ) : (
                  <>Below 75% <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /></>
                )}
              </span>
            </p>
          </div>

          {/* Card 2: Tests Completed */}
          <div
            onClick={() => setActiveTab('marks')}
            className="bg-[#090b12]/90 hover:border-amber-500/40 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.12)] transition-all cursor-pointer backdrop-blur-xl group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Tests Evaluated</p>
                <p className="text-3xl font-black text-white font-mono mt-1">{testResults.length}</p>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span className="text-[11px] text-zinc-400">Completed tests</span>
              <span className="text-[#ffaa40] font-space font-bold uppercase text-[10px] group-hover:translate-x-0.5 transition-transform">
                Marks →
              </span>
            </div>
          </div>

          {/* Card 3: Upcoming Tests */}
          <div
            onClick={() => setActiveTab('tests')}
            className="bg-[#090b12]/90 hover:border-cyan-500/40 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.12)] transition-all cursor-pointer backdrop-blur-xl group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Available Tests</p>
                <p className="text-3xl font-black text-white font-mono mt-1">{upcomingTests.length}</p>
              </div>
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span className="text-[11px] text-zinc-400">Active mock tests</span>
              <span className="text-cyan-400 font-space font-bold uppercase text-[10px] group-hover:translate-x-0.5 transition-transform">
                Take Test →
              </span>
            </div>
          </div>

          {/* Card 4: Study Materials */}
          <div
            onClick={() => setActiveTab('materials')}
            className="bg-[#090b12]/90 hover:border-emerald-500/40 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.12)] transition-all cursor-pointer backdrop-blur-xl group hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase font-space tracking-wider">Study Notes</p>
                <p className="text-3xl font-black text-white font-mono mt-1">{studyMaterials.length}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <BookOpen className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span className="text-[11px] text-zinc-400">Class notes & DPPs</span>
              <span className="text-emerald-400 font-space font-bold uppercase text-[10px] group-hover:translate-x-0.5 transition-transform">
                Notes →
              </span>
            </div>
          </div>
        </div>

        {/* Low Attendance Warning */}
        {hasLowAttendance && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 mb-8 flex items-center gap-4 shadow-[0_10px_30px_rgba(244,63,94,0.15)] backdrop-blur-xl">
            <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/30 flex-shrink-0 shadow-sm text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-white text-base font-outfit">Attendance Advisory</p>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium font-jakarta mt-0.5 leading-relaxed">
                Your attendance in some subjects is currently below 75%. Please ensure regular attendance to maintain test eligibility.
              </p>
            </div>
          </div>
        )}

        {/* Cyber Tab Navigation */}
        <div className="bg-[#090b12]/90 rounded-2xl p-1.5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] mb-8 overflow-x-auto flex gap-2 backdrop-blur-xl">
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
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-xl font-black font-outfit text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent font-bold'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#090b12]/90 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(232,96,46,0.08)] p-6 sm:p-8 border border-white/10 backdrop-blur-2xl text-white">
          
          {/* 1. Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-[#0e111a] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <h3 className="font-black text-white mb-2 flex items-center gap-2 text-lg font-outfit">
                  <CheckCircle className="w-5 h-5 text-[#e8602e]" />
                  Quick Academic Shortcuts
                </h3>
                <p className="text-sm text-zinc-400 font-medium font-jakarta mb-5 leading-relaxed">
                  Welcome to your student control center. Access your official admission fee invoice, test schedule, and syllabus notes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadReceipt}
                    disabled={downloading}
                    className="btn-sheryians px-5 py-3 text-white font-black font-outfit uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(232,96,46,0.35)] flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Admission Receipt (.txt)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('tests')}
                    className="px-5 py-3 bg-[#121522] hover:bg-[#1a1f33] text-zinc-200 hover:text-white font-black font-outfit uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/20 flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-[#ffaa40]" />
                    <span>View Scheduled Tests ({upcomingTests.length})</span>
                  </button>
                </div>
              </div>

              {/* Student Details Mini Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0e111a] rounded-2xl border border-white/10 shadow-md">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-space block mb-1">Registered Class</span>
                  <span className="text-base font-black text-white font-outfit">{student.standard}</span>
                </div>
                <div className="p-4 bg-[#0e111a] rounded-2xl border border-white/10 shadow-md">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-space block mb-1">Roll / Reg Number</span>
                  <span className="text-base font-mono font-bold text-[#ffaa40]">{student.registrationId}</span>
                </div>
                <div className="p-4 bg-[#0e111a] rounded-2xl border border-white/10 shadow-md">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-space block mb-1">Admission Status</span>
                  <span className="text-base font-black text-emerald-400 flex items-center gap-1.5 font-outfit">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active & Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Attendance Tab */}
          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-xl font-black text-white font-outfit mb-5">Subject-wise Attendance</h3>
              {attendance.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {attendance.map(subject => (
                    <div key={subject.subject} className="p-5 border border-white/10 hover:border-white/20 rounded-2xl bg-[#0e111a] shadow-xl transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-black text-white font-outfit text-base">{subject.subject}</h4>
                        <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-sm ${
                          subject.percentage >= 75 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                        }`}>
                          {subject.percentage}%
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold font-jakarta mb-1.5 text-zinc-400">
                          <span>Classes Attended</span>
                          <span className="font-mono text-white">{subject.present} / {subject.total}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div
                            className={`h-full ${subject.percentage >= 75 ? 'bg-gradient-to-r from-emerald-500 to-[#10b981]' : 'bg-gradient-to-r from-rose-500 to-rose-600'}`}
                            style={{ width: `${subject.percentage}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-bold mt-2 text-zinc-400 flex items-center gap-1.5">
                        {subject.percentage >= 75 ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                            <span className="text-emerald-400">On track (Above 75%)</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-rose-400">Action required (Below 75%)</span>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#0e111a] rounded-2xl border border-white/10">
                  <p className="text-zinc-400 font-bold font-jakarta">No subject attendance recorded yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Marks Tab */}
          {activeTab === 'marks' && (
            <div>
              <h3 className="text-xl font-black text-white font-outfit mb-5">Completed Test Results</h3>
              {testResults.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-xl bg-[#0e111a]">
                  <table className="w-full text-xs sm:text-sm font-jakarta">
                    <thead className="bg-[#121522] border-b border-white/10 font-space font-bold uppercase text-zinc-400">
                      <tr>
                        <th className="px-4 py-3 text-left">Test Name</th>
                        <th className="px-4 py-3 text-left">Subject</th>
                        <th className="px-4 py-3 text-center">Score</th>
                        <th className="px-4 py-3 text-center">Percentage</th>
                        <th className="px-4 py-3 text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {testResults.map((test, idx) => {
                        const percentage = ((test.marksObtained / test.totalMarks) * 100).toFixed(1);
                        const passed = test.marksObtained >= test.passingMarks;
                        return (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3.5 font-bold text-white">{test.title}</td>
                            <td className="px-4 py-3.5 text-zinc-300">{test.subject}</td>
                            <td className="px-4 py-3.5 text-center font-mono font-bold text-white">
                              {test.marksObtained} / {test.totalMarks}
                            </td>
                            <td className="px-4 py-3.5 text-center font-mono font-bold text-zinc-200">{percentage}%</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-xs font-bold uppercase ${
                                passed ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                              }`}>
                                {passed ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                                    <span>PASS</span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3 h-3 text-rose-400 stroke-[3]" />
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
                <div className="text-center py-12 bg-[#0e111a] rounded-2xl border border-white/10">
                  <p className="text-zinc-400 font-bold font-jakarta">No test evaluations found yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Upcoming Tests Tab */}
          {activeTab === 'tests' && (
            <div>
              <h3 className="text-xl font-black text-white font-outfit mb-5">Available Mock Tests</h3>
              {upcomingTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {upcomingTests.map((test, idx) => (
                    <div key={idx} className="p-5 border border-white/10 hover:border-[#e8602e]/40 rounded-2xl bg-[#0e111a] shadow-xl flex flex-col justify-between transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-white font-outfit text-base">{test.title}</h4>
                          <span className="px-2.5 py-0.5 bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ffaa40] rounded-md text-[10px] font-bold uppercase font-space">
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 mb-4">{test.subject}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs font-jakarta mb-4 bg-[#06080e] p-3 rounded-xl border border-white/10">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Duration:</span>
                            <span className="font-bold text-white">{test.duration} Minutes</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Total Marks:</span>
                            <span className="font-bold text-white">{test.totalMarks}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/test/${test._id}`)}
                        className="btn-sheryians w-full py-3 text-white font-black font-outfit text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(232,96,46,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Start Online Test</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#0e111a] rounded-2xl border border-white/10">
                  <p className="text-zinc-400 font-bold font-jakarta">No active assessments scheduled right now.</p>
                </div>
              )}
            </div>
          )}

          {/* 5. Study Materials Tab */}
          {activeTab === 'materials' && (
            <div>
              <h3 className="text-xl font-black text-white font-outfit mb-5">Class Study Materials & PDFs</h3>
              {studyMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {studyMaterials.map((material, idx) => (
                    <div key={idx} className="p-5 border border-white/10 hover:border-white/20 rounded-2xl bg-[#0e111a] shadow-xl flex flex-col justify-between transition-all">
                      <div>
                        <div className="flex gap-3 mb-3">
                          <div className="p-2.5 bg-[#e8602e]/10 border border-[#e8602e]/30 rounded-xl h-fit text-[#ff7a45]">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-white font-outfit text-sm">{material.title}</h4>
                            <p className="text-[11px] font-bold text-zinc-400">{material.subject}</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 font-medium mb-4">{material.description}</p>
                      </div>

                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-[#121522] hover:bg-[#1a1f33] text-zinc-200 hover:text-white font-black font-outfit text-xs uppercase tracking-wider rounded-xl border border-white/10 hover:border-[#e8602e]/40 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5 text-[#ffaa40]" />
                        <span>Download Material</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#0e111a] rounded-2xl border border-white/10">
                  <p className="text-zinc-400 font-bold font-jakarta">No study files uploaded for this standard yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 6. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-[#0e111a] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="border-b border-white/10 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#121522] border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.25)] overflow-hidden flex items-center justify-center flex-shrink-0">
                    {student.photo ? (
                      <img src={student.photo} alt={student.studentName} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="font-black font-outfit text-2xl text-[#ffaa40]">
                        {student.studentName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white font-outfit">{student.studentName}</h3>
                    <p className="text-xs text-zinc-400 font-medium font-jakarta mt-0.5">
                      Registration ID: <span className="font-mono font-bold text-[#ffaa40]">{student.registrationId}</span> • Class {student.standard}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold font-space uppercase text-zinc-300 self-start sm:self-center shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Record</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-jakarta">
                <div className="space-y-4">
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Student Full Name</span>
                    <span className="font-bold text-white text-base">{student.studentName}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Father&apos;s / Guardian Name</span>
                    <span className="font-bold text-white">{student.fatherName}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Mother&apos;s Name</span>
                    <span className="font-bold text-white">{student.motherName}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Gender & Blood Group</span>
                    <span className="font-bold text-white">{student.gender} • {student.bloodGroup || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Registered Email</span>
                    <span className="font-bold text-white break-all">{student.email}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Contact Phone Number</span>
                    <span className="font-bold text-white">{student.phoneNumber}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Residential Address</span>
                    <span className="font-bold text-white">{student.address}, {student.city}</span>
                  </div>
                  <div className="p-4 bg-[#06080e] rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Registered Class & Reg ID</span>
                    <span className="font-bold text-white">{student.standard} • <span className="font-mono text-[#ffaa40]">{student.registrationId}</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Leaderboard & Badges Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-8">
              {/* Header & Standard Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#0e111a] border border-white/10 rounded-2xl p-5 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8602e]/15 border border-[#e8602e]/40 text-[#ffaa40] text-xs font-bold font-space uppercase mb-1 shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-[#e8602e]" />
                    <span>Hall of Fame & Achievements</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-outfit text-white">
                    Institute Academic Leaderboard
                  </h3>
                </div>

                <div className="flex items-center gap-2 min-w-[170px]">
                  <span className="text-xs font-bold font-space uppercase text-zinc-400 whitespace-nowrap">Class:</span>
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
                <div className="bg-gradient-to-r from-[#121522] via-[#1a1529] to-[#121522] border border-[#e8602e]/40 rounded-2xl p-5 shadow-[0_0_25px_rgba(232,96,46,0.15)] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090b12] border border-[#e8602e]/40 shadow-[0_0_12px_rgba(232,96,46,0.3)] flex items-center justify-center font-outfit font-black text-xl text-[#ffaa40]">
                      #{myRankStats.rank}
                    </div>
                    <div>
                      <p className="text-xs font-bold font-space uppercase text-[#ffaa40]">Your Standing</p>
                      <p className="text-lg font-black font-outfit text-white">
                        Rank #{myRankStats.rank} • Top {100 - myRankStats.percentile}% of students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono font-bold">
                    <div className="px-3 py-1.5 bg-[#090b12] rounded-xl border border-white/10 text-zinc-200 shadow-sm">
                      Points: <span className="text-[#ffaa40] font-black">{myRankStats.points} pts</span>
                    </div>
                    <div className="px-3 py-1.5 bg-[#090b12] rounded-xl border border-white/10 text-zinc-200 shadow-sm">
                      Avg: <span className="text-emerald-400 font-black">{myRankStats.avgScore}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Badges Showcase Grid */}
              <div>
                <h4 className="text-base font-black font-outfit text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ffaa40]" />
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
                      className={`rounded-2xl p-5 border transition-all ${
                        badge.unlocked
                          ? 'bg-[#121522] border-[#ffaa40]/50 shadow-[0_0_20px_rgba(255,170,64,0.15)]'
                          : 'bg-[#0e111a] border-white/10 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="p-2.5 bg-[#090b12] rounded-xl border border-white/10 shadow-sm flex items-center justify-center">
                          {renderBadgeIcon(badge.icon)}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-space uppercase border ${
                          badge.unlocked
                            ? 'bg-[#ffaa40]/15 border-[#ffaa40]/40 text-[#ffaa40]'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}>
                          {badge.unlocked ? (
                            <>
                              Unlocked <Check className="w-3 h-3 text-[#ffaa40] stroke-[3]" />
                            </>
                          ) : (
                            'In Progress'
                          )}
                        </span>
                      </div>

                      <h5 className="font-black font-outfit text-white text-sm mt-3">{badge.title}</h5>
                      <p className="text-xs text-zinc-400 font-medium font-jakarta mt-1 leading-relaxed">{badge.description}</p>

                      {!badge.unlocked && (
                        <div className="mt-3">
                          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#e8602e] to-[#ffaa40]"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-zinc-400 font-bold font-mono mt-1 block text-right">
                            {badge.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D-Style Cyber Podium */}
              {podium.some(p => p !== null) && (
                <div className="bg-[#0e111a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h4 className="text-center text-xs font-bold font-space uppercase tracking-widest text-zinc-400 mb-6">
                    Top 3 Rankers of the Term
                  </h4>

                  <div className="flex items-end justify-center gap-3 sm:gap-6 pt-4 max-w-lg mx-auto">
                    {/* Rank 2 - Left */}
                    {podium[1] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-500/20 border border-slate-400/40 text-slate-200 shadow-md flex items-center justify-center mb-2">
                          <Medal className="w-5 h-5" />
                        </div>
                        <p className="font-black text-white text-xs font-outfit text-center truncate max-w-[90px]">{podium[1].studentName}</p>
                        <p className="text-[10px] font-bold text-zinc-400 font-mono">{podium[1].points} pts</p>
                        <div className="w-full h-28 bg-gradient-to-t from-slate-700/30 to-slate-600/20 border-t-2 border-slate-300 rounded-t-2xl shadow-md flex items-center justify-center font-black font-outfit text-2xl text-slate-200 mt-2">
                          2nd
                        </div>
                      </div>
                    )}

                    {/* Rank 1 - Center */}
                    {podium[0] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center mb-2">
                          <Crown className="w-6 h-6 text-amber-300" />
                        </div>
                        <p className="font-black text-white text-sm font-outfit text-center truncate max-w-[100px]">{podium[0].studentName}</p>
                        <p className="text-xs font-black text-[#ffaa40] font-mono">{podium[0].points} pts</p>
                        <div className="w-full h-36 bg-gradient-to-t from-amber-600/30 to-amber-500/20 border-t-2 border-amber-400 rounded-t-2xl shadow-lg flex items-center justify-center font-black font-outfit text-3xl text-amber-300 mt-2">
                          1st
                        </div>
                      </div>
                    )}

                    {/* Rank 3 - Right */}
                    {podium[2] && (
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-amber-700/20 border border-amber-600/40 text-amber-400 shadow-md flex items-center justify-center mb-2">
                          <Award className="w-5 h-5" />
                        </div>
                        <p className="font-black text-white text-xs font-outfit text-center truncate max-w-[90px]">{podium[2].studentName}</p>
                        <p className="text-[10px] font-bold text-zinc-400 font-mono">{podium[2].points} pts</p>
                        <div className="w-full h-20 bg-gradient-to-t from-amber-800/30 to-amber-700/20 border-t-2 border-amber-600 rounded-t-2xl shadow-md flex items-center justify-center font-black font-outfit text-xl text-amber-400 mt-2">
                          3rd
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Full Standings Table */}
              <div className="bg-[#0e111a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-[#121522] border-b border-white/10 flex items-center justify-between">
                  <h4 className="font-black font-outfit text-white text-sm">Full Batch Standings</h4>
                  <span className="text-xs font-bold font-mono text-zinc-400">{rankings.length} Students Evaluated</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 font-space font-bold uppercase text-zinc-400">
                        <th className="p-3.5">Rank</th>
                        <th className="p-3.5">Student Name</th>
                        <th className="p-3.5">Class</th>
                        <th className="p-3.5">Tests</th>
                        <th className="p-3.5">Avg Accuracy</th>
                        <th className="p-3.5 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-jakarta">
                      {rankings.map((r) => {
                        const isMe = r.studentId === student._id;
                        return (
                          <tr key={r.studentId} className={`hover:bg-white/5 transition-colors ${isMe ? 'bg-[#e8602e]/10 font-bold border-l-2 border-[#e8602e]' : ''}`}>
                            <td className="p-3.5 font-mono font-bold">
                              <div className="flex items-center gap-1.5">
                                {r.rank === 1 ? (
                                  <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                ) : r.rank === 2 ? (
                                  <Medal className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                ) : r.rank === 3 ? (
                                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                ) : null}
                                <span className={isMe ? 'text-[#ffaa40]' : 'text-zinc-300'}>#{r.rank}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className={`font-outfit ${isMe ? 'text-[#ffaa40] font-black' : 'text-white'}`}>{r.studentName}</span>
                              {isMe && <span className="ml-2 px-1.5 py-0.5 bg-[#e8602e] text-white text-[9px] rounded font-space font-bold">YOU</span>}
                            </td>
                            <td className="p-3.5 text-zinc-400">{r.standard}</td>
                            <td className="p-3.5 font-mono text-zinc-300">{r.testsAttempted}</td>
                            <td className="p-3.5 font-mono text-emerald-400 font-bold">{r.avgScore}%</td>
                            <td className="p-3.5 font-mono text-right font-black text-[#ffaa40]">{r.points}</td>
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
                <div className="bg-[#0e111a] rounded-2xl p-5 border border-white/10 shadow-lg">
                  <p className="text-xs font-bold font-space uppercase text-zinc-400">Pending Dues</p>
                  <p className="text-3xl font-black font-mono text-[#ffaa40] mt-1">₹{feeSummary.totalPendingAmount}</p>
                  <p className="text-xs font-medium text-zinc-400 mt-2">{feeSummary.pendingCount} unpaid invoice(s)</p>
                </div>

                <div className="bg-[#0e111a] rounded-2xl p-5 border border-white/10 shadow-lg">
                  <p className="text-xs font-bold font-space uppercase text-zinc-400">Total Fees Paid</p>
                  <p className="text-3xl font-black font-mono text-emerald-400 mt-1">₹{feeSummary.totalPaidAmount}</p>
                  <p className="text-xs font-medium text-emerald-400/80 mt-2">All verified by Accounts Office</p>
                </div>

                <div className="bg-[#121522] rounded-2xl p-5 border border-[#e8602e]/30 shadow-[0_0_20px_rgba(232,96,46,0.1)]">
                  <p className="text-xs font-bold font-space uppercase text-zinc-400">Fee Status</p>
                  <p className="text-2xl font-black font-outfit text-white mt-1">
                    {feeSummary.hasOverdue ? 'Overdue Due Date' : feeSummary.pendingCount > 0 ? 'Pending Payment' : 'All Clear'}
                  </p>
                  <p className="text-xs font-medium text-zinc-400 mt-2">Class {student.standard} Session 2026-27</p>
                </div>
              </div>

              {/* Pending Dues Section */}
              <div>
                <h4 className="text-base font-black font-outfit text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#ffaa40]" />
                  Active Invoices & Pending Dues
                </h4>

                {fees.filter(f => f.status === 'pending' || f.status === 'overdue').length === 0 ? (
                  <div className="p-8 bg-[#0e111a] rounded-2xl border border-white/10 text-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="font-black text-white text-base font-outfit">No Pending Dues!</p>
                    <p className="text-xs text-zinc-400 font-medium font-jakarta mt-1">
                      You have cleared all academic tuition fees up to this month.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fees.filter(f => f.status === 'pending' || f.status === 'overdue').map((fee) => (
                      <div
                        key={fee._id}
                        className="bg-[#0e111a] border border-white/10 hover:border-white/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2.5 py-0.5 bg-[#121522] border border-[#e8602e]/30 text-[#ffaa40] rounded-lg text-xs font-bold font-space uppercase">
                              {fee.month}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-space uppercase border ${
                              fee.status === 'overdue' ? 'bg-rose-500/15 border-rose-500/40 text-rose-400' : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                            }`}>
                              {fee.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                            </span>
                          </div>

                          <p className="text-2xl font-black font-mono text-white mt-2">₹{fee.totalAmount}</p>
                          <div className="text-xs text-zinc-400 font-medium space-y-0.5 mt-2">
                            <p>Tuition Fee: ₹{fee.tuitionFee}</p>
                            {fee.labFee > 0 && <p>Computer / Lab: ₹{fee.labFee}</p>}
                            {fee.examFee > 0 && <p>Exam Fee: ₹{fee.examFee}</p>}
                            <p className="font-mono text-zinc-500 mt-1">Due Date: {new Date(fee.dueDate).toLocaleDateString('en-GB')}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/10">
                          <button
                            onClick={() => handlePayFee(fee._id)}
                            disabled={payingFeeId === fee._id}
                            className="btn-sheryians w-full py-3 text-white font-black font-outfit uppercase tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(232,96,46,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                <h4 className="text-base font-black font-outfit text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-[#ffaa40]" />
                  Official Fee Receipts History
                </h4>

                <div className="bg-[#0e111a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#121522] border-b border-white/10 font-space font-bold uppercase text-zinc-400">
                          <th className="p-3.5">Receipt No</th>
                          <th className="p-3.5">Billing Month</th>
                          <th className="p-3.5">Amount Paid</th>
                          <th className="p-3.5">Payment Date</th>
                          <th className="p-3.5">Payment Mode</th>
                          <th className="p-3.5 text-right">Receipt Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-jakarta">
                        {fees.filter(f => f.status === 'paid').length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-zinc-400 font-medium">
                              No payment receipts recorded yet.
                            </td>
                          </tr>
                        ) : (
                          fees.filter(f => f.status === 'paid').map((fee) => (
                            <tr key={fee._id} className="hover:bg-white/5 transition-colors">
                              <td className="p-3.5 font-mono font-bold text-white">{fee.receiptNumber}</td>
                              <td className="p-3.5 font-bold text-zinc-200">{fee.month}</td>
                              <td className="p-3.5 font-mono font-black text-emerald-400">₹{fee.totalAmount}</td>
                              <td className="p-3.5 font-mono text-zinc-400">
                                {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString('en-GB') : '—'}
                              </td>
                              <td className="p-3.5 font-bold text-zinc-300">{fee.paymentMode || 'Online'}</td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => setReceiptModalFee(fee)}
                                  className="px-3 py-1.5 bg-[#121522] hover:bg-[#1a1f33] text-zinc-200 hover:text-white border border-white/10 hover:border-[#e8602e]/40 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                                >
                                  <Printer className="w-3.5 h-3.5 text-[#ffaa40]" />
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

          {/* OFFICIAL CYBER FEE RECEIPT POPUP */}
          {receiptModalFee && (
            <div className="fixed inset-0 z-50 bg-[#030407]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#090b12] border border-white/15 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(232,96,46,0.15)] relative text-white">
                <button
                  onClick={() => setReceiptModalFee(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl border border-white/10 bg-[#121522] hover:bg-rose-500/20 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-white/10">
                    <span className="text-xl font-black font-outfit text-white tracking-tight">RAVEN TUTORIALS</span>
                    <p className="text-[10px] font-bold font-space uppercase text-[#ffaa40] tracking-wider mt-0.5">Patna Campus • Official Receipt</p>
                    <p className="text-xs font-mono text-zinc-400 mt-1">Receipt #{receiptModalFee.receiptNumber}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-jakarta">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Student Name</p>
                      <p className="font-bold text-white">{student.studentName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Registration ID</p>
                      <p className="font-mono font-bold text-[#ffaa40]">{student.registrationId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Class & Month</p>
                      <p className="font-bold text-white">{student.standard} • {receiptModalFee.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Date Paid</p>
                      <p className="font-mono text-white">
                        {receiptModalFee.paidDate ? new Date(receiptModalFee.paidDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0e111a] text-xs">
                    <div className="p-2.5 bg-[#121522] border-b border-white/10 font-bold font-space uppercase text-zinc-400 flex justify-between">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="p-2.5 flex justify-between border-b border-white/5 text-zinc-300">
                      <span>Tuition Fee ({receiptModalFee.month})</span>
                      <span className="font-mono font-bold text-white">₹{receiptModalFee.tuitionFee}</span>
                    </div>
                    {receiptModalFee.labFee > 0 && (
                      <div className="p-2.5 flex justify-between border-b border-white/5 text-zinc-300">
                        <span>Lab & Resource Fee</span>
                        <span className="font-mono font-bold text-white">₹{receiptModalFee.labFee}</span>
                      </div>
                    )}
                    {receiptModalFee.examFee > 0 && (
                      <div className="p-2.5 flex justify-between border-b border-white/5 text-zinc-300">
                        <span>Mock Test & Assessment Fee</span>
                        <span className="font-mono font-bold text-white">₹{receiptModalFee.examFee}</span>
                      </div>
                    )}
                    <div className="p-3 bg-[#121522] font-black flex justify-between border-t border-white/10 text-sm">
                      <span className="text-white">TOTAL PAID</span>
                      <span className="font-mono text-emerald-400 text-base">₹{receiptModalFee.totalAmount}</span>
                    </div>
                  </div>

                  {/* Stamp */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="border border-emerald-500/40 rounded-lg px-2.5 py-1 text-center bg-emerald-500/10 rotate-[-4deg]">
                      <p className="text-[9px] font-bold uppercase text-emerald-400">PAID & VERIFIED</p>
                      <p className="text-[8px] font-mono text-emerald-300">RAVEN ACCOUNTS</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold font-outfit text-white">Raven Tutorials Patna</p>
                      <p className="text-[8px] text-zinc-500 font-jakarta">Computer Generated Receipt</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => window.print()}
                      className="btn-sheryians px-6 py-2.5 text-white font-black font-outfit text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(232,96,46,0.35)] flex items-center gap-2 cursor-pointer"
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
