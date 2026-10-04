'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

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
      <Loader 
        fullScreen 
        size="lg" 
        text="Verifying Student Access" 
        subtitle="Authenticating academic session..." 
      />
    );
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return (
      <Loader 
        fullScreen 
        size="lg" 
        text="Redirecting to Login" 
        subtitle="Please sign in to continue..." 
      />
    );
  }

  return <>{children}</>;
};

export default StudentProtectedRoute;
