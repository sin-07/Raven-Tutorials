'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

interface AdminData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setAdmin] = useState<AdminData | null>(null);

  const verifyAuth = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    }
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        setAdmin(null);
        router.replace('/login');
        return;
      }

      const data = await res.json();
      const adminData = data.admin || data.data?.admin;

      if (data.success && adminData) {
        setIsAuthenticated(true);
        setAdmin(adminData);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
        router.replace('/login');
      }
    } catch (error) {
      console.error('[AUTH ERROR] Failed to verify admin:', error);
      setIsAuthenticated(false);
      setAdmin(null);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    verifyAuth(true);
  }, [verifyAuth]);

  // Silently re-verify on window focus
  useEffect(() => {
    const handleFocus = () => {
      verifyAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [verifyAuth]);

  if (loading) {
    return (
      <Loader 
        fullScreen 
        size="lg" 
        text="Verifying Admin Access" 
        subtitle="Securing control console session..." 
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Loader 
        fullScreen 
        size="lg" 
        text="Redirecting to Login" 
        subtitle="Admin authentication required..." 
      />
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
