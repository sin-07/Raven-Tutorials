'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  Loader2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import WavyHeading from '@/components/WavyHeading';
import { LMSFooter } from '@/components/lms';

interface ApplicationStatus {
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}

export default function StatusCheckPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [application, setApplication] = useState<ApplicationStatus | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setApplication(null);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/teacher-admission?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.success) {
        setApplication(data.application);
      } else {
        setError(data.message || 'Unable to find application for this email');
      }
    } catch {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-300 border-2 border-black font-black font-space text-black shadow-[2px_2px_0px_#000]">
            <CheckCircle className="w-5 h-5 text-black" />
            <span>APPROVED</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-300 border-2 border-black font-black font-space text-black shadow-[2px_2px_0px_#000]">
            <XCircle className="w-5 h-5 text-black" />
            <span>NOT PROCEEDING</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-300 border-2 border-black font-black font-space text-black shadow-[2px_2px_0px_#000]">
            <Clock className="w-5 h-5 text-black" />
            <span>UNDER REVIEW</span>
          </div>
        );
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Congratulations! Your faculty application has been accepted. Our academic director will contact you directly with batch schedule details.';
      case 'rejected':
        return 'Thank you for your application. We are unable to proceed with an offer for the current batch cycle. You may reapply for the next term.';
      default:
        return 'Your credentials and teaching profile are currently being benchmarked by the faculty board. We will notify you by email shortly.';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 selection:bg-emerald-300 selection:text-black">
        <div className="max-w-lg mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mb-4">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Recruitment Tracker</span>
            </div>

            <WavyHeading
              text="Application"
              gradientText="Status"
              className="text-3xl sm:text-4xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full mb-2"
            />

            <p className="text-sm text-neutral-700 font-jakarta font-medium text-center">
              Enter your registered email to check review status.
            </p>
          </div>

          {/* Search Card */}
          <form
            onSubmit={handleCheck}
            className="bg-[#f0fdf4] rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] mb-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium shadow-[2px_2px_0px_#000] focus:ring-2 focus:ring-emerald-400 placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-100 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <p className="text-rose-900 text-xs font-jakarta font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-cartoon w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Checking Records...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 text-black" />
                  <span>Check Application Status</span>
                </>
              )}
            </button>
          </form>

          {/* Status Result Card */}
          {application && (
            <div className="bg-[#f0fdf4] rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] text-center space-y-4 mb-6">
              <div>
                {getStatusBadge(application.status)}
              </div>

              <h2 className="text-xl font-black text-black font-outfit">
                Hello, {application.name}!
              </h2>

              <p className="text-sm font-jakarta text-neutral-800 font-medium leading-relaxed">
                {getStatusMessage(application.status)}
              </p>

              <div className="pt-3 border-t-2 border-black/10 text-xs text-neutral-600 font-jakarta">
                Application Submitted: {new Date(application.submittedAt).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Return Links */}
          <div className="text-center">
            <Link
              href="/admission/tutor"
              className="inline-flex items-center gap-2 text-sm font-black font-outfit text-black underline hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4 text-black" />
              <span>Back to Instructor Application Form</span>
            </Link>
          </div>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}
