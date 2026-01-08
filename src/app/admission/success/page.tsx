'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Copy, Check, Download, Mail, Lock, User, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export default function AdmissionSuccessPage() {
  const router = useRouter();
  const [successData, setSuccessData] = useState<any>(null);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Get success data from session storage
    const data = sessionStorage.getItem('admissionSuccess');
    if (!data) {
      router.push('/admission/learner');
      return;
    }
    const parsedData = JSON.parse(data);
    // Handle both 'password' and 'tempPassword' field names
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

  const handleDownloadCredentials = () => {
    if (!successData) return;

    const content = `
════════════════════════════════════════════════════════
        RAVEN TUTORIALS - ADMISSION CONFIRMATION
════════════════════════════════════════════════════════

✓ Registration Successful!

STUDENT INFORMATION
───────────────────
Registration ID  : ${successData.registrationId}
Student Name     : ${successData.studentName}
Email            : ${successData.email}
Standard         : ${successData.standard}

LOGIN CREDENTIALS
─────────────────
Email (User ID)  : ${successData.email}
Password         : ${successData.password}

IMPORTANT NOTES
───────────────
• Use your Email and Password to login to student portal
• Your password is your Date of Birth (DDMMYYYY format)
• Keep these credentials safe and secure
• Do not share your password with anyone

Login URL: ${window.location.origin}/login

════════════════════════════════════════════════════════
        Welcome to Raven Tutorials Family! 🎓
════════════════════════════════════════════════════════
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Raven_Tutorials_Credentials_${successData.registrationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 pt-24">
      <div className="max-w-xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              Admission Successful!
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </h1>
            <p className="text-slate-600 text-lg">
              Welcome to the Raven Tutorials family, <span className="font-semibold text-blue-600">{successData.studentName}</span>!
            </p>
          </div>
        </div>

        {/* Credentials Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Login Credentials</h2>
                <p className="text-blue-100 text-sm">Save these details securely</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Warning */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-medium flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>Please save these credentials securely. You'll need them to login to the student portal.</span>
              </p>
            </div>

            <div className="space-y-4">
              {/* Registration ID */}
              <div className="group p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Registration ID</label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-bold text-blue-600 font-mono tracking-wider">{successData.registrationId}</span>
                  <button
                    onClick={() => handleCopy(successData.registrationId, 'regId')}
                    className="p-2 bg-white hover:bg-blue-50 rounded-lg transition shadow-sm border border-slate-200"
                    title="Copy Registration ID"
                  >
                    {copied.regId ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="group p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-400 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Password (Your DOB)</label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-bold text-green-700 font-mono tracking-widest">{successData.password || 'Check Email'}</span>
                  <button
                    onClick={() => handleCopy(successData.password, 'password')}
                    className="p-2 bg-white hover:bg-green-50 rounded-lg transition shadow-sm border border-green-200"
                    title="Copy Password"
                  >
                    {copied.password ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-green-600 mt-2">Format: DDMMYYYY (e.g., 18122001 for 18 Dec 2001)</p>
              </div>

              {/* Email */}
              <div className="group p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Login Email</label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-800 font-medium">{successData.email}</span>
                  <button
                    onClick={() => handleCopy(successData.email, 'email')}
                    className="p-2 bg-white hover:bg-slate-50 rounded-lg transition shadow-sm border border-slate-200"
                    title="Copy Email"
                  >
                    {copied.email ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Standard */}
              <div className="group p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Class / Standard</label>
                </div>
                <span className="text-slate-800 font-medium">{successData.standard}</span>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadCredentials}
              className="w-full mt-6 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-500/20"
            >
              <Download className="w-5 h-5" />
              Download Credentials
            </button>

            {/* Email Confirmation */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Credentials sent to <strong>{successData.email}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-center shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            Login to Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/"
            className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-center"
          >
            Go to Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}