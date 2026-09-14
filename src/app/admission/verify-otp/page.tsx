'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, Mail, Sparkles, ArrowLeft } from 'lucide-react';
import { LMSFooter } from '@/components/lms';

export default function VerifyOTPPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [tempAdmission, setTempAdmission] = useState<any>(null);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    const data = sessionStorage.getItem('tempAdmission');
    if (!data) {
      router.push('/admission/learner');
      return;
    }
    setTempAdmission(JSON.parse(data));
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admission/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempAdmissionId: tempAdmission.tempAdmissionId,
          otp: otpValue,
          email: tempAdmission.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      setSuccess('OTP verified successfully! Redirecting to payment...');
      sessionStorage.setItem('paymentOrder', JSON.stringify(data.data));
      
      setTimeout(() => {
        router.push('/admission/payment');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admission/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempAdmissionId: tempAdmission.tempAdmissionId,
          email: tempAdmission.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setSuccess('OTP resent successfully! Please check your email inbox.');
      setOtp(['', '', '', '', '', '']);
      setCountdown(120);
      
      setTimeout(() => setSuccess(''), 3000);

    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  if (!tempAdmission) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] text-center max-w-sm w-full cartoon-pop">
          <div className="w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-black font-black text-xl font-outfit">Loading Verification...</p>
          <p className="text-neutral-600 text-sm font-medium font-jakarta mt-1">Validating admission session</p>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <>
      <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 pt-32 pb-20 selection:bg-emerald-300 selection:text-black">
        <div className="relative z-10 max-w-md w-full">
          {/* Cartoon Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-300 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Step 2 of 3</span>
            </div>
            <h1 className="text-3xl font-black text-black font-outfit mb-2">Verify Admission OTP</h1>
            <p className="text-neutral-700 text-sm font-jakarta font-medium">
              We&apos;ve sent a 6-digit code to{' '}
              <span className="font-bold text-black">{tempAdmission.email}</span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-rose-100 border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-rose-900 text-sm font-jakarta font-bold">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-100 border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
              <p className="text-emerald-950 text-sm font-jakarta font-bold">{success}</p>
            </div>
          )}

          {/* Cartoon Card */}
          <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 border-3 border-black">
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-black font-outfit bg-white border-2 border-black text-black rounded-xl shadow-[3px_3px_0px_#000] focus:ring-2 focus:ring-emerald-400 focus:border-black outline-none transition"
                />
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="text-center mb-6">
              {countdown > 0 ? (
                <p className="text-neutral-700 text-sm font-jakarta font-medium">
                  Time remaining:{' '}
                  <span className="font-black text-black font-space">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </p>
              ) : (
                <p className="text-rose-600 font-bold text-sm font-jakarta">OTP expired! Please request a new one.</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={loading || countdown === 0}
              className="btn-cartoon w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                'Verify & Proceed to Fee Payment'
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center pt-2">
              <p className="text-neutral-600 text-xs font-jakarta mb-2 font-medium">Didn&apos;t receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={resending || countdown > 0}
                className="text-black font-black text-xs sm:text-sm underline hover:text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5 font-outfit"
              >
                {resending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                    <span>Resending...</span>
                  </>
                ) : (
                  'Resend OTP to Email'
                )}
              </button>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="mt-6 p-4 rounded-2xl bg-[#dcfce7] border-2 border-black shadow-[3px_3px_0px_#000] text-center space-y-1">
            <p className="text-xs text-neutral-700 font-jakarta font-medium">
              Student: <span className="font-bold text-black">{tempAdmission.studentName}</span> • Standard: <span className="font-bold text-black">{tempAdmission.standard}</span>
            </p>
            <p className="text-xs text-neutral-700 font-jakarta font-medium">
              Batch Admission Fee: <span className="font-black text-black">₹{tempAdmission.amount}</span>
            </p>
          </div>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}
