'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { LMSFooter } from '@/components/lms';
import { ButtonLoader } from '@/components/Loader';
import { AnimatedEyeToggle } from '@/components';
import { animateShake } from '@/lib/gsap';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Login successful! Redirecting...', {
          style: {
            background: '#10b981',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
          },
          duration: 2000,
        });

        const targetUrl =
          data.redirectTo ||
          (data.role === 'admin' ? '/admin/dashboard' : '/dashboard');

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 400);
      } else {
        if (cardRef.current) animateShake(cardRef.current);
        toast.error(data.message || 'Invalid email or password', {
          style: {
            background: '#dc2626',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
          },
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (cardRef.current) animateShake(cardRef.current);
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-transparent relative overflow-hidden pt-28 pb-16 selection:bg-[#10b981] selection:text-white">
        {/* Ambient background glows */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129, 0.45) 0%, rgba(52, 211, 153, 0.15) 50%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Floating subtle orange particles */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-slow"
                style={{
                  left: `${(i * 5.8) % 100}%`,
                  top: `${(i * 7.3) % 100}%`,
                  animationDelay: `${(i * 0.3) % 5}s`,
                  animationDuration: `${16 + (i % 8)}s`,
                }}
              >
                <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full opacity-25 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md mx-auto transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Card Container */}
            <div 
              ref={cardRef} 
              className="relative bg-[#090b14]/90 backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-3xl p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.12)] text-white transition-all duration-300"
            >
              {/* Top subtle highlight rim */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3.5 rounded-2xl bg-[#121522] border border-[#10b981]/40 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Raven Tutorials Logo"
                      width={48}
                      height={48}
                      priority
                      className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    />
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-2 font-outfit mb-2">
                  <span className="text-white font-black text-3xl tracking-tight">RAVEN</span>
                  <span className="text-[#10b981] font-black text-xl uppercase tracking-wider drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                    Tutorials
                  </span>
                </div>

                <p className="text-zinc-400 text-sm font-jakarta font-medium">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              {/* Single Unified Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-space"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#10b981] transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#0e111a] border border-white/10 hover:border-white/20 focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/30 rounded-xl text-white placeholder-zinc-500 text-sm font-jakarta font-medium shadow-inner outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-300 font-space"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#10b981] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-3.5 bg-[#0e111a] border border-white/10 hover:border-white/20 focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/30 rounded-xl text-white placeholder-zinc-500 text-sm font-jakarta font-medium shadow-inner outline-none transition-all"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <AnimatedEyeToggle
                        isVisible={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                        size={24}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-jakarta">
                    Students: Use your account password or Date of Birth (DDMMYYYY).
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-sheryians w-full mt-2 py-4 px-6 text-white font-black font-outfit uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <>
                      <ButtonLoader size={18} />
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
                <p className="text-xs text-zinc-400 font-jakarta">
                  New student to RAVEN?{' '}
                  <Link
                    href="/admission"
                    className="text-[#34d399] hover:text-[#6ee7b7] font-bold hover:underline transition-colors ml-1"
                  >
                    Apply for Admission
                  </Link>
                </p>

                <p className="text-xs text-zinc-500 font-jakarta">
                  Need assistance?{' '}
                  <a
                    href="mailto:raventutorials@gmail.com"
                    className="text-zinc-300 hover:text-white font-medium hover:underline transition-colors"
                  >
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Animation CSS */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }
          .animate-float-slow {
            animation: float-slow linear infinite;
          }
        `}</style>
      </div>
      <LMSFooter />
    </>
  );
};

export default LoginPage;


