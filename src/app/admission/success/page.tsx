'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Home, 
  Printer, 
  FileText, 
  ShieldCheck,
  Calendar,
  CreditCard
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';

export default function AdmissionSuccessPage() {
  const router = useRouter();
  const [successData, setSuccessData] = useState<any>(null);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const data = sessionStorage.getItem('admissionSuccess');
    if (!data) {
      // In development or testing on localhost, show demo bill so it can be previewed immediately
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        setSuccessData({
          studentName: 'Aniket Singh',
          fatherName: 'Rajesh Singh',
          registrationId: 'RT-2026-8942',
          email: 'aniket.singh07vs@gmail.com',
          phoneNumber: '+91 98765 43210',
          password: 'Password@1812',
          standard: 'Class XII (Science - PCM)',
          amount: 1000,
          paymentId: 'pay_P8k3M9xZ2vL4q',
          orderId: 'order_P8k3M9xZ2vL4q',
          admissionDate: new Date().toISOString()
        });
        return;
      }
      router.push('/admission/learner');
      return;
    }
    const parsedData = JSON.parse(data);
    if (!parsedData.password && parsedData.tempPassword) {
      parsedData.password = parsedData.tempPassword;
    }
    setSuccessData(parsedData);
  }, [router]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => {
      setCopied({ ...copied, [field]: false });
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCredentials = () => {
    if (!successData) return;

    const content = `
════════════════════════════════════════════════════════
        RAVEN TUTORIALS - ADMISSION CONFIRMATION
════════════════════════════════════════════════════════

✓ Registration & Admission Successful!

RECEIPT & INVOICE DETAILS
─────────────────────────
Receipt No       : REC-2026-${successData.registrationId?.replace(/^RT-/, '') || '8942'}
Date             : ${new Date(successData.admissionDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
Amount Paid      : ₹${successData.amount || 1000} (Inclusive of all taxes)
Payment Mode     : Online (Razorpay)
Payment ID       : ${successData.paymentId || 'pay_online_verified'}
Status           : PAID & VERIFIED

STUDENT INFORMATION
───────────────────
Registration ID  : ${successData.registrationId}
Student Name     : ${successData.studentName}
Father's Name    : ${successData.fatherName || 'On Record'}
Email            : ${successData.email}
Phone            : ${successData.phoneNumber || 'Verified'}
Enrolled Class   : ${successData.standard}

LOGIN CREDENTIALS
─────────────────
Portal URL       : ${window.location.origin}/login
User ID (Email)  : ${successData.email}
Password         : ${successData.password}

IMPORTANT NOTES
───────────────
• Use your Email and Password to login to the student portal.
• Your password is your Date of Birth (DDMMYYYY format).
• Keep these credentials safe and do not share with anyone.

════════════════════════════════════════════════════════
        Welcome to Raven Tutorials Family!
════════════════════════════════════════════════════════
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Raven_Tutorials_Receipt_${successData.registrationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!successData) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-black border-t-emerald-500 rounded-full"></div>
      </div>
    );
  }

  const receiptNumber = `REC-2026-${successData.registrationId?.replace(/^RT-/, '') || '8942'}`;
  const formattedDate = new Date(successData.admissionDate || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const feeAmount = successData.amount || 1000;

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          .printable-bill {
            box-shadow: none !important;
            border: 2px solid #000000 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 24px !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 pt-32 pb-20 selection:bg-emerald-300 selection:text-black">
        <div className="relative z-10 max-w-xl w-full">
          
          {/* Header */}
          <div className="text-center mb-8 no-print">
            <div className="w-20 h-20 bg-emerald-300 rounded-3xl border-3 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000] rotate-2">
              <CheckCircle className="w-12 h-12 text-black" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] border border-black text-black text-xs font-bold font-space uppercase mb-3 shadow-[1.5px_1.5px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Enrollment Complete</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-black font-outfit mb-2">
              Admission Successful!
            </h1>
            <p className="text-neutral-700 text-sm sm:text-base font-jakarta font-medium">
              Welcome to RAVEN Tutorials, <span className="font-bold text-black">{successData.studentName}</span>!
            </p>
          </div>

          {/* ======================================================== */}
          {/* 🧾 CARTOON OFFICIAL ADMISSION BILL / RECEIPT CARD */}
          {/* ======================================================== */}
          <div className="printable-bill bg-white rounded-3xl shadow-[8px_8px_0px_#000] border-3 border-black p-6 sm:p-8 mb-6 relative overflow-hidden">
            
            {/* Top Comic Receipt Header */}
            <div className="bg-[#86efac] border-2 border-black rounded-2xl p-4 sm:p-5 mb-5 shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="inline-block bg-black text-white text-[10px] font-black uppercase font-space px-2.5 py-0.5 rounded-full mb-1 tracking-wider">
                  OFFICIAL ADMISSION RECEIPT
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-black font-outfit leading-tight">
                  RAVEN TUTORIALS
                </h2>
                <p className="text-xs text-neutral-800 font-jakarta font-bold">
                  Premier Academic Coaching & Digital LMS
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end flex-shrink-0">
                <span className="text-[11px] font-mono font-black px-2.5 py-1 bg-white border border-black rounded-lg shadow-[1px_1px_0px_#000]">
                  {receiptNumber}
                </span>
                <span className="text-[11px] font-space font-bold text-neutral-700 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-black" />
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Student & Enrollment Info Grid */}
            <div className="bg-[#f0fdf4] rounded-2xl border-2 border-black p-4 sm:p-5 shadow-[2px_2px_0px_#000] mb-5">
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-900 font-space mb-2 pb-1 border-b border-black/20 flex items-center justify-between">
                <span>STUDENT ENROLLMENT DETAILS</span>
                <span className="text-emerald-700 font-bold">SESSION 2026-27</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-jakarta">
                <div>
                  <span className="text-neutral-500 font-semibold block text-[10px]">Student Name</span>
                  <span className="font-black text-black text-sm">{successData.studentName}</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-semibold block text-[10px]">Registration ID / Roll No</span>
                  <span className="font-mono font-black text-black text-sm">{successData.registrationId}</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-semibold block text-[10px]">Enrolled Class</span>
                  <span className="font-bold text-black">{successData.standard || 'Standard Enrolled'}</span>
                </div>
                {successData.fatherName && (
                  <div>
                    <span className="text-neutral-500 font-semibold block text-[10px]">Guardian / Father Name</span>
                    <span className="font-bold text-black">{successData.fatherName}</span>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <span className="text-neutral-500 font-semibold block text-[10px]">Contact Email</span>
                  <span className="font-bold text-black break-all">{successData.email}</span>
                </div>
              </div>
            </div>

            {/* Comic Coupon Dashed Divider with Cutout Circles */}
            <div className="relative my-6">
              <div className="border-b-2 border-dashed border-black"></div>
              <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#f6fcf8] border-r-2 border-black"></div>
              <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#f6fcf8] border-l-2 border-black"></div>
            </div>

            {/* Itemized Fee Breakdown Table */}
            <div className="rounded-xl border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000] mb-5 font-jakarta text-xs">
              <div className="grid grid-cols-3 bg-[#dcfce7] p-2.5 font-space font-black uppercase text-black border-b-2 border-black">
                <span className="col-span-2">Fee Particulars</span>
                <span className="text-right">Amount</span>
              </div>

              <div className="divide-y divide-neutral-200 bg-white">
                <div className="grid grid-cols-3 p-3">
                  <div className="col-span-2">
                    <span className="font-bold text-black block">Annual Admission & Course Enrollment</span>
                    <span className="text-[11px] text-neutral-500">Includes classroom coaching & curriculum material</span>
                  </div>
                  <div className="text-right font-black text-black text-sm my-auto">
                    ₹{feeAmount}
                  </div>
                </div>

                <div className="grid grid-cols-3 p-2.5 bg-neutral-50">
                  <div className="col-span-2">
                    <span className="font-medium text-neutral-700">Digital LMS & Mock Test Portal Access</span>
                  </div>
                  <div className="text-right font-bold text-emerald-700">
                    ₹0.00 (Included)
                  </div>
                </div>

                <div className="grid grid-cols-3 p-2.5 bg-neutral-50">
                  <div className="col-span-2">
                    <span className="font-medium text-neutral-700">CGST (9%) + SGST (9%)</span>
                  </div>
                  <div className="text-right font-bold text-emerald-700">
                    Inclusive
                  </div>
                </div>

                <div className="grid grid-cols-3 p-3.5 bg-[#f0fdf4] border-t-2 border-black font-black text-sm">
                  <span className="col-span-2 text-black font-outfit uppercase">Total Amount Paid</span>
                  <span className="text-right text-emerald-950 font-outfit text-base">₹{feeAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Verification & Official Stamp */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#f0fdf4] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-xs space-y-1 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <CreditCard className="w-3.5 h-3.5 text-black" />
                  <span className="font-bold text-black">Payment Gateway:</span>
                  <span>Razorpay Online</span>
                </div>
                {successData.paymentId && (
                  <div className="text-[11px] font-mono text-neutral-600 truncate max-w-xs">
                    <strong className="text-black font-sans">Txn ID:</strong> {successData.paymentId}
                  </div>
                )}
                <div className="text-[11px] text-neutral-600">
                  <strong className="text-black">Status:</strong> Payment Authorized & Settled
                </div>
              </div>

              {/* Official Stamp Badge */}
              <div className="flex-shrink-0 text-center">
                <div className="px-4 py-2 bg-[#86efac] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] -rotate-2">
                  <div className="text-[9px] font-black uppercase tracking-wider text-black font-space">
                    RAVEN TUTORIALS
                  </div>
                  <div className="text-xs font-black text-black font-outfit flex items-center gap-1 justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-900" />
                    PAID & VERIFIED
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Actions (Print / Download) */}
            <div className="mt-5 pt-4 border-t-2 border-black/10 flex flex-col sm:flex-row gap-2.5 no-print">
              <button
                onClick={handlePrint}
                className="btn-cartoon flex-1 py-3 bg-[#4ade80] hover:bg-[#22c55e] text-black font-black font-outfit rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>Print / Save Official Bill (PDF)</span>
              </button>

              <button
                onClick={handleDownloadCredentials}
                className="btn-cartoon py-3 px-4 bg-white hover:bg-[#dcfce7] text-black font-black font-outfit rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Download (.txt)</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 🔑 CARTOON CREDENTIALS CARD */}
          {/* ======================================================== */}
          <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 mb-6 border-3 border-black no-print">
            <div className="bg-[#86efac] border-2 border-black rounded-2xl p-4 mb-6 shadow-[3px_3px_0px_#000] flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl border border-black flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000]">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-black text-black font-outfit">Student Login Credentials</h2>
                <p className="text-xs text-neutral-800 font-jakarta font-semibold">Save or download these details securely</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-[3px_3px_0px_#000] space-y-4 mb-5">
              {/* Registration ID */}
              <div className="p-3.5 bg-[#f0fdf4] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-emerald-800" />
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-700 font-space">
                    Registration ID / Roll No
                  </label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-black text-black font-mono tracking-wider">
                    {successData.registrationId}
                  </span>
                  <button
                    onClick={() => handleCopy(successData.registrationId, 'regId')}
                    className="btn-cartoon p-2 bg-white hover:bg-[#dcfce7] rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5"
                    title="Copy Registration ID"
                  >
                    {copied.regId ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4 text-black" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="p-3.5 bg-[#f0fdf4] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-emerald-800" />
                  <label className="text-[10px] font-black uppercase tracking-wider text-neutral-700 font-space">
                    Account Password (DOB: DDMMYYYY)
                  </label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-black text-black font-mono tracking-widest">
                    {successData.password || 'Check Confirmation Email'}
                  </span>
                  <button
                    onClick={() => handleCopy(successData.password, 'password')}
                    className="btn-cartoon p-2 bg-white hover:bg-[#dcfce7] rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5"
                    title="Copy Password"
                  >
                    {copied.password ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirmation Note */}
            <div className="p-3.5 bg-[#ecfdf5] border-2 border-black rounded-xl text-center">
              <p className="text-xs text-black font-jakarta font-semibold flex items-center justify-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Confirmation copy & cartoon fee bill sent to <strong>{successData.email}</strong></span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 no-print">
            <Link
              href="/login"
              className="btn-cartoon flex-1 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Login to Student Portal</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              href="/"
              className="btn-cartoon sm:w-1/3 py-4 bg-white hover:bg-[#dcfce7] text-black font-black font-outfit text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all text-center flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-black" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="no-print">
        <LMSFooter />
      </div>
    </>
  );
}
