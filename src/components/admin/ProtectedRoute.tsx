'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

interface AdminData {
  id: string;
  email: string;
  name: string;
  role: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<AdminData | null>(null);

  const verifyAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });

      if (!res.ok) {
        // Clear any stale data
        setIsAuthenticated(false);
        setAdmin(null);
        
        // Don't show toast for login page
        if (pathname !== '/admin/login') {
          toast.error('Admin session expired. Please login again.');
        }
        
        router.replace('/admin/login');
        return;
      }

      const data = await res.json();
      
      if (data.success && data.data?.admin) {
        setIsAuthenticated(true);
        setAdmin(data.data.admin);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
        router.replace('/admin/login');
      }
    } catch (error) {
      console.error('[ADMIN AUTH ERROR] Failed to verify admin:', error);
      setIsAuthenticated(false);
      setAdmin(null);
      router.replace('/admin/login');
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
          <p className="text-gray-400 mt-4 text-lg">Verifying admin access...</p>
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
          <p className="text-gray-400 mt-4 text-lg">Redirecting to admin login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;

