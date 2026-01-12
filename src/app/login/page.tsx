'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Shield, User } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
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
      if (loginType === 'student') {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Welcome back!', {
            style: {
              background: '#10b981',
              color: '#ffffff',
            },
            duration: 2000
          });
          
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 500);
        } else {
          toast.error(data.message || 'Invalid credentials. Please try again.');
        }
      } else {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username: formData.username, password: formData.password })
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Welcome Admin!', {
            style: {
              background: '#10b981',
              color: '#ffffff',
            },
            duration: 2000
          });
          
          setTimeout(() => {
            window.location.href = '/admin/dashboard';
          }, 500);
        } else {
          toast.error(data.message || 'Invalid credentials. Please try again.');
        }
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
      <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden pt-16">
        {/* Green Radial Glow Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(0,229,168,0.2)_0%,_rgba(0,229,168,0.1)_30%,_transparent_70%)]"></div>
        </div>

        {/* Floating geometric shapes - only render on client to avoid hydration mismatch */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-slow"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  animationDelay: `${(i * 0.25) % 5}s`,
                  animationDuration: `${15 + (i % 10)}s`
                }}
              >
                <div
                  className="w-2 h-2 bg-[#00E5A8] rounded-full opacity-20"
                ></div>
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className={`w-full max-w-md mx-auto transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              {/* Form Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4">
                  <img src="/logo.png" alt="Raven Logo" className="w-16 h-16 object-contain brightness-0 invert" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#00E5A8] mb-4 font-cinzel">
                  RAVEN Tutorials
                </h1>

                {/* Toggle Buttons */}
                <div className="flex bg-[#0b0b0b] rounded-full p-1 border border-gray-800">
                  <button
                    type="button"
                    onClick={() => setLoginType('student')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                      loginType === 'student'
                        ? 'bg-[#00E5A8] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('admin')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                      loginType === 'admin'
                        ? 'bg-[#00E5A8] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {loginType === 'student' ? (
                  /* Student Email Input */
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 font-cinzel">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00E5A8] transition-colors" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="student@example.com"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-[#0b0b0b] border-2 border-gray-800 rounded-xl focus:outline-none focus:border-[#00E5A8] focus:bg-[#0b0b0b] transition-all duration-300 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                ) : (
                  /* Admin Username Input */
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-300 font-cinzel">
                      Username
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00E5A8] transition-colors" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="admin"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-[#0b0b0b] border-2 border-gray-800 rounded-xl focus:outline-none focus:border-[#00E5A8] focus:bg-[#0b0b0b] transition-all duration-300 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                )}

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00E5A8] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={loginType === 'student' ? 'Date of Birth (DDMMYYYY)' : 'Enter password'}
                      required
                      className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-[#0b0b0b] border-2 border-gray-800 rounded-xl focus:outline-none focus:border-[#00E5A8] focus:bg-[#0b0b0b] transition-all duration-300 text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00E5A8] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {loginType === 'student' && (
                    <p className="text-xs text-gray-500 mt-2">
                      Hint: Use your date of birth as password (e.g., 01011990)
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-[#00E5A8] hover:bg-[#00E5A8]/90 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00E5A8]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      {loginType === 'student' ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : (
                        <Shield className="w-5 h-5" />
                      )}
                      {loginType === 'student' ? 'Login to Dashboard' : 'Login as Admin'}
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links - Only for students */}
              {loginType === 'student' && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#111111] text-gray-500">New to RAVEN?</span>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <Link
                      href="/admission"
                      className="block text-[#00E5A8] hover:text-[#00E5A8]/80 font-medium transition-colors text-sm sm:text-base"
                    >
                      Apply for Admission
                    </Link>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      Need help?{' '}
                      <a href="mailto:info@raventutorials.com" className="text-[#00E5A8] hover:underline">
                        Contact Support
                      </a>
                    </p>
                  </div>
                </>
              )}
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

export default LoginPage;

