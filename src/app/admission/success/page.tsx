'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Copy, Check, Download, Mail, Lock, User } from 'lucide-react';

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
    setSuccessData(JSON.parse(data));
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
RAVEN TUTORIALS - ADMISSION CONFIRMATION
========================================

Registration ID: ${successData.registrationId}
Student Name: ${successData.studentName}
Email: ${successData.email}
Standard: ${successData.standard}

LOGIN CREDENTIALS
=================
Registration ID: ${successData.registrationId}
Temporary Password: ${successData.tempPassword}

IMPORTANT NOTES:
- Please change your password after first login
- Keep these credentials safe and secure
- Use Registration ID and Password to login to student portal

Login URL: ${window.location.origin}/login

Thank you for joining Raven Tutorials!
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admission Successful! 🎉</h1>
          <p className="text-slate-600 text-lg">
            Welcome to Raven Tutorials family
          </p>
        </div>

        {/* Credentials Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Your Login Credentials</h2>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p className="text-sm text-amber-800 font-medium">
              ⚠️ Important: Please save these credentials securely. You'll need them to login to the student portal.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Registration ID */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-slate-600" />
                <label className="text-sm font-medium text-slate-600">Registration ID</label>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl font-bold text-blue-600 font-mono">{successData.registrationId}</span>
                <button
                  onClick={() => handleCopy(successData.registrationId, 'regId')}
                  className="p-2 hover:bg-slate-200 rounded-lg transition"
                  title="Copy Registration ID"
                >
                  {copied.regId ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Temporary Password */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-slate-600" />
                <label className="text-sm font-medium text-slate-600">Temporary Password</label>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl font-bold text-slate-800 font-mono">{successData.tempPassword}</span>
                <button
                  onClick={() => handleCopy(successData.tempPassword, 'password')}
                  className="p-2 hover:bg-slate-200 rounded-lg transition"
                  title="Copy Password"
                >
                  {copied.password ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-slate-600" />
                <label className="text-sm font-medium text-slate-600">Email</label>
              </div>
              <p className="text-slate-800">{successData.email}</p>
            </div>

            {/* Standard */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <label className="text-sm font-medium text-slate-600">Standard</label>
              </div>
              <p className="text-slate-800">{successData.standard}</p>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadCredentials}
            className="w-full py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 mb-4"
          >
            <Download className="w-5 h-5" />
            Download Credentials
          </button>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📧 A confirmation email with your credentials has been sent to <strong>{successData.email}</strong>
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Next Steps</h2>
          
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="font-medium text-slate-800">Login to Student Portal</p>
                <p className="text-sm text-slate-600">Use your Registration ID and password to access the portal</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="font-medium text-slate-800">Change Your Password</p>
                <p className="text-sm text-slate-600">Update your temporary password to something secure and memorable</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <p className="font-medium text-slate-800">Explore Courses</p>
                <p className="text-sm text-slate-600">Browse available courses and start your learning journey</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <p className="font-medium text-slate-800">Join Live Classes</p>
                <p className="text-sm text-slate-600">Attend live sessions and interact with instructors</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition text-center"
          >
            Login to Portal
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition text-center"
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
