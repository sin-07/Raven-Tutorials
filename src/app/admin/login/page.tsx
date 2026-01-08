'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';


interface Particle {
  id: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  color?: string;
}

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const { login: adminLogin } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [systemLockout, setSystemLockout] = useState(false);
  const [warningLevel, setWarningLevel] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Create floating orb particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 15 + Math.random() * 10,
      animationDelay: Math.random() * 5,
      size: 80 + Math.random() * 120
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (systemLockout) {
      toast.error('Account Locked - Too many attempts', {
        style: {
          background: '#1e293b',
          color: '#ef4444',
          border: '1px solid #ef4444'
        },
        duration: 5000
      });
      return;
    }
    
    setLoading(true);

    try {
      const adminResult = await adminLogin(formData.email, formData.password);
      
      if (adminResult.success) {
        // Store session start time for automatic timeout tracking
        sessionStorage.setItem('sessionStartTime', Date.now().toString());
        
        toast.success('⚡ ACCESS GRANTED - Session: 1 Hour', {
          style: {
            background: '#000',
            color: '#00ff00',
            border: '2px solid #00ff00',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          },
          icon: '💀'
        });
        
        // Reset attempts on success
        setFailedAttempts(0);
        setWarningLevel(0);
        
        setTimeout(() => router.push('/admin/dashboard'), 500);
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        setWarningLevel(Math.min(3, Math.floor(newAttempts / 2)));
        
        if (newAttempts >= 5) {
          setSystemLockout(true);
          toast.error('🚨 CRITICAL: SYSTEM LOCKED - SECURITY BREACH DETECTED', {
            style: {
              background: '#000',
              color: '#ff0000',
              border: '3px solid #ff0000',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '14px'
            },
            duration: 8000
          });
          
          // Auto unlock after 30 seconds
          setTimeout(() => {
            setSystemLockout(false);
            setFailedAttempts(0);
            setWarningLevel(0);
          }, 30000);
        } else {
          const warningMessages = [
            '⚠️ AUTHENTICATION FAILED - ATTEMPT 1/5',
            '🔴 ACCESS DENIED - ATTEMPT 2/5 - WARNING',
            '💀 INTRUSION DETECTED - ATTEMPT 3/5 - DANGER',
            '🚨 FATAL ERROR - ATTEMPT 4/5 - CRITICAL'
          ];
          
          toast.error(warningMessages[newAttempts - 1] || '⚠️ ACCESS DENIED', {
            style: {
              background: '#000',
              color: '#ff0000',
              border: '2px solid #ff0000',
              fontFamily: 'monospace',
              fontWeight: 'bold'
            },
            duration: 4000
          });
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('💥 SYSTEM FAILURE - FATAL ERROR', {
        style: {
          background: '#000',
          color: '#ff0000',
          border: '2px solid #ff0000',
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center pt-16">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-violet-900/20"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-repeat pointer-events-none opacity-5" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(139, 92, 246, 0.3) 40px, rgba(139, 92, 246, 0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139, 92, 246, 0.3) 40px, rgba(139, 92, 246, 0.3) 41px)'
             }}>
        </div>

        {/* Floating particles with color variation */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
            }}
          ></div>
        ))}

        {/* Soft vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950 opacity-60 pointer-events-none"></div>

        {/* Warning banner based on attempts */}
        {warningLevel > 0 && (
          <div className={`absolute top-16 left-0 right-0 py-3 text-center font-medium text-sm z-50 backdrop-blur-md border-b
            ${warningLevel === 1 ? 'bg-amber-500/20 border-amber-400/30 text-amber-100' : ''}
            ${warningLevel === 2 ? 'bg-orange-500/30 border-orange-400/40 text-orange-100' : ''}
            ${warningLevel === 3 ? 'bg-red-500/40 border-red-400/50 text-red-100' : ''}`}>
            {warningLevel === 1 && '⚠️ Invalid credentials. Please try again.'}
            {warningLevel === 2 && '⚠️ Multiple failed attempts detected.'}
            {warningLevel === 3 && '🔒 Final attempt before temporary lockout.'}
          </div>
        )}

        {systemLockout && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-lg z-40 flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-32 h-32 text-blue-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-wide">Account Locked</h2>
              <p className="text-slate-300 text-lg">Too many failed login attempts</p>
              <p className="text-slate-400 text-sm mt-2">Please wait 30 seconds before trying again</p>
            </div>
          </div>
        )}

        <div className="relative z-10 w-full max-w-md px-6">
          {/* Shield Icon with professional glow */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="relative">
              <Shield className="w-24 h-24 text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
              <div className="absolute inset-0 w-24 h-24 bg-blue-500 blur-3xl opacity-40 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Professional Title */}
          <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up"
              style={{
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}>
            Admin Portal
          </h1>
          
          <p className="text-slate-300 text-center text-sm mb-8 tracking-wide animate-fade-in-up">
            RAVEN Tutorials Management System
          </p>

          {/* Login Card with glass morphism */}
          <div className="relative animate-scale-in">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
            
            <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-blue-500/20"
                 style={{
                   boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.3)'
                 }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-blue-300 text-sm mb-2 tracking-wide font-medium">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@raven.com"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-sm"
                    style={{
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-blue-300 text-sm mb-2 tracking-wide font-medium">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-sm pr-12"
                      style={{
                        boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  <p className="text-xs text-slate-300 text-center flex items-center justify-center gap-2 relative z-10">
                    <Shield className="w-4 h-4" />
                    Secure Connection Established
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || systemLockout}
                  className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide relative overflow-hidden group border border-blue-400/30 shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : systemLockout ? (
                      <>
                        <Shield className="w-5 h-5" />
                        Account Locked
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Sign In
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-20"></div>
                </button>
                
                {/* Failed attempts indicator */}
                {failedAttempts > 0 && !systemLockout && (
                  <div className="text-center">
                    <p className="text-orange-400 text-sm font-medium">
                      {failedAttempts} failed attempt{failedAttempts > 1 ? 's' : ''} ({5 - failedAttempts} remaining)
                    </p>
                  </div>
                )}
              </form>

              {/* Loading Indicator */}
              {loading && (
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Footer */}
          <div className="mt-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Secure Connection</span>
            </div>
            <p className="text-slate-500 text-xs">
              🔒 End-to-end encrypted
            </p>
            <div className="pt-4 border-t border-slate-700/50">
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors flex items-center justify-center gap-2 group"
              >
                <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Student Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
