'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { LMSFooter } from '@/components/lms';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
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
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-transparent relative overflow-hidden pt-28 pb-16 selection:bg-emerald-500 selection:text-black">
        {/* Floating geometric particles */}
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
                <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-20" />
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
            <div className="relative bg-[#f0fdf4] border-3 border-black rounded-3xl p-7 sm:p-9 shadow-[8px_8px_0px_#000] text-black">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-300 border-2 border-black shadow-[3px_3px_0px_#000]">
                    <img
                      src="/logo.png"
                      alt="Raven Tutorials Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-2 font-outfit mb-2">
                  <span className="text-black font-black text-3xl tracking-tight">RAVEN</span>
                  <span className="text-emerald-800 font-black text-xl uppercase tracking-wider">Tutorials</span>
                </div>

                <p className="text-neutral-700 text-sm font-jakarta font-medium">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              {/* Single Unified Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-black font-space"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-black transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 text-black placeholder-neutral-400 text-sm font-jakarta font-medium"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-black font-space"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-black transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 text-black placeholder-neutral-400 text-sm font-jakarta font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors focus:outline-none"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed font-jakarta">
                    Students: Use your account password or Date of Birth (DDMMYYYY).
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cartoon w-full mt-2 py-3.5 px-6 bg-emerald-400 hover:bg-emerald-300 text-black font-black rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-outfit"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t-2 border-black text-center space-y-3">
                <p className="text-xs text-neutral-700 font-jakarta">
                  New student to RAVEN?{' '}
                  <Link
                    href="/admission"
                    className="text-black font-black hover:underline transition-colors"
                  >
                    Apply for Admission
                  </Link>
                </p>

                <p className="text-xs text-neutral-600 font-jakarta">
                  Need assistance?{' '}
                  <a
                    href="mailto:raventutorials@gmail.com"
                    className="text-black font-bold hover:underline transition-colors"
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


