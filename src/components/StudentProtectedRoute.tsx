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

  const verifyAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });

      if (!res.ok) {
        // Clear any stale data
        setIsAuthenticated(false);
        setStudent(null);
        
        // Don't show toast for initial page load
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
    verifyAuth();
  }, [verifyAuth]);

  // Re-verify on window focus (detect if session expired in another tab)
  useEffect(() => {
    const handleFocus = () => {
      verifyAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [verifyAuth]);

  // Loading state with dark theme
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-[#00E5A8] rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default StudentProtectedRoute;
