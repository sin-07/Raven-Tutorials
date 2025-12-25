'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const StudentLogin: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // Store student info in sessionStorage (not the token - it's in httpOnly cookie)
        sessionStorage.setItem('studentInfo', JSON.stringify(data.student));
        
        // Store session start time for automatic timeout tracking
        sessionStorage.setItem('sessionStartTime', Date.now().toString());
        
        console.log('Student info saved, navigating to dashboard...');
        
        toast.success('🎓 Welcome back! Your session will last 1 hour.', {
          style: {
            background: '#10b981',
            color: '#ffffff',
          },
          duration: 3000
        });
        
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden pt-16">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <div
                className={`w-2 h-2 ${
                  i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
                } rounded-full opacity-20`}
              ></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className={`w-full max-w-md mx-auto transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 border border-gray-100">
              {/* Form Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4">
                  <img src="/logo.png" alt="Raven Logo" className="w-16 h-16 object-contain" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  RAVEN Tutorials
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Student Login</h2>
                <p className="text-gray-600 text-sm sm:text-base">Enter your credentials to continue</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all duration-300 text-gray-800"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Date of Birth (DDMMYYYY)"
                      required
                      className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all duration-300 text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Use your date of birth as password (e.g., 01011990)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-5 h-5" />
                      Login to Dashboard
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to RAVEN?</span>
                </div>
              </div>

              {/* Footer Links */}
              <div className="text-center space-y-3">
                <Link
                  href="/admission"
                  className="block text-indigo-600 hover:text-indigo-700 font-medium transition-colors text-sm sm:text-base"
                >
                  Apply for Admission
                </Link>
                
                {/* Admin Login Link */}
                <Link
                  href="/admin/login"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
                
                <p className="text-xs text-gray-500 mt-3">
                  Need help?{' '}
                  <a href="mailto:info@raventutorials.com" className="text-indigo-600 hover:underline">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(20px, -50px) scale(1.1);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            75% {
              transform: translate(50px, 50px) scale(1.05);
            }
          }

          @keyframes float-slow {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }

          .animate-float-slow {
            animation: float-slow linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default StudentLogin;
