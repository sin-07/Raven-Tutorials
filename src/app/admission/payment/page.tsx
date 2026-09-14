'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import { Loader2, AlertCircle, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { LMSFooter } from '@/components/lms';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AdmissionPaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('paymentOrder');
    if (!data) {
      router.push('/admission/learner');
      return;
    }
    setPaymentData(JSON.parse(data));
  }, [router]);

  const handlePayment = async () => {
    if (!paymentData) return;

    setLoading(true);
    setError('');

    try {
      const options = {
        key: paymentData.razorpayKeyId,
        amount: paymentData.amount * 100,
        currency: paymentData.currency,
        name: 'Raven Tutorials',
        description: 'Admission Fee Payment',
        order_id: paymentData.orderId,
        prefill: {
          name: paymentData.studentName,
          email: paymentData.email,
        },
        notes: {
          tempAdmissionId: paymentData.tempAdmissionId,
          standard: paymentData.standard
        },
        theme: {
          color: '#10b981'
        },
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/admission/payment-verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                tempAdmissionId: paymentData.tempAdmissionId
              })
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.message || 'Payment verification failed');
            }

            sessionStorage.removeItem('paymentOrder');
            sessionStorage.removeItem('tempAdmission');
            sessionStorage.setItem('admissionSuccess', JSON.stringify(verifyData.data));
            router.push('/admission/success');

          } catch (err: any) {
            setError(err.message || 'Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            sessionStorage.removeItem('paymentOrder');
            sessionStorage.removeItem('tempAdmission');
            alert('Payment cancelled. You will be redirected to start a new admission.');
            router.push('/admission/learner');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setLoading(false);
        sessionStorage.removeItem('paymentOrder');
        sessionStorage.removeItem('tempAdmission');
        alert(response.error.description || 'Payment failed. You will be redirected to start a new admission.');
        router.push('/admission/learner');
      });

      rzp.open();

    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 pt-32 pb-20 selection:bg-emerald-300 selection:text-black">
        <div className="relative z-10 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-300 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
              <CreditCard className="w-8 h-8 text-black" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Step 3 of 3 • Final Step</span>
            </div>
            <h1 className="text-3xl font-black text-black font-outfit mb-2">Admission Fee Payment</h1>
            <p className="text-neutral-700 text-sm font-jakarta font-medium">
              Complete fee payment to secure student batch enrollment.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-rose-100 border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-rose-900 text-sm font-jakarta font-bold">{error}</p>
            </div>
          )}

          {/* Payment Details Card */}
          <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 mb-6 border-3 border-black">
            <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-[3px_3px_0px_#000] space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b-2 border-black/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-space">Student</span>
                <span className="font-bold text-black font-outfit">{paymentData.studentName}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b-2 border-black/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-space">Email</span>
                <span className="font-medium text-black text-xs sm:text-sm font-jakarta">{paymentData.email}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b-2 border-black/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-space">Standard</span>
                <span className="font-bold text-black font-outfit">{paymentData.standard}</span>
              </div>
              
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-base font-black text-black font-outfit">Total Payable</span>
                <span className="text-3xl font-black text-emerald-700 font-outfit">₹{paymentData.amount}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2.5 p-3.5 bg-[#dcfce7] border-2 border-black rounded-2xl mb-6 shadow-[2px_2px_0px_#000]">
              <ShieldCheck className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-xs text-black font-jakarta font-semibold">
                Secured by Razorpay • 100% Encrypted & Safe Gateway
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn-cartoon w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base sm:text-lg rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Connecting to Gateway...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 text-black" />
                  <span>Pay ₹{paymentData.amount} Now</span>
                </>
              )}
            </button>

            {/* Payment Methods */}
            <div className="mt-6 text-center">
              <p className="text-xs text-neutral-600 font-space uppercase font-bold mb-1">Accepted Payment Modes</p>
              <div className="flex justify-center flex-wrap gap-2 text-xs font-bold text-neutral-800 font-jakarta">
                <span>UPI / GPay / PhonePe</span>
                <span>•</span>
                <span>Debit & Credit Cards</span>
                <span>•</span>
                <span>Net Banking</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-neutral-600 font-jakarta">
            <p>By completing payment, you agree to our</p>
            <p className="mt-0.5">
              <Link href="/terms" className="text-black font-bold underline">Terms & Conditions</Link>
              {' and '}
              <Link href="/privacy" className="text-black font-bold underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}
