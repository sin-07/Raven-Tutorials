'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface StudentProtectedRouteProps {
  children: React.ReactNode;
}

interface StudentData {
  _id: string;
  studentName: string;
  email: string;
  registrationId: string;
  standard: string;
}

const StudentProtectedRoute: React.FC<StudentProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [student, setStudent] = useState<StudentData | null>(null);

  const verifyAuth = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    }
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        setStudent(null);
        
        if (pathname !== '/login') {
          toast.error('Session expired. Please login again.');
        }
        
        router.replace('/login');
        return;
      }

      const data = await res.json();
      
      if (data.success && data.student) {
        setIsAuthenticated(true);
        setStudent(data.student);
      } else {
        setIsAuthenticated(false);
        setStudent(null);
        router.replace('/login');
      }
    } catch (error) {
      console.error('[AUTH ERROR] Failed to verify student:', error);
      setIsAuthenticated(false);
      setStudent(null);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router, pathname]);

  useEffect(() => {
    verifyAuth(true);
  }, [verifyAuth]);

  // Re-verify silently on window focus (no blocking loader)
  useEffect(() => {
    const handleFocus = () => {
      verifyAuth(false);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [verifyAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-black border-t-[#86efac] rounded-full animate-spin mx-auto mb-4" />
          <h3 className="font-outfit font-black text-xl text-black">Verifying Student Access</h3>
          <p className="font-jakarta font-medium text-black/60 text-sm mt-1">Please hold on a moment...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-black border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
          <h3 className="font-outfit font-black text-xl text-black">Redirecting to Login</h3>
          <p className="font-jakarta font-medium text-black/60 text-sm mt-1">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default StudentProtectedRoute;
