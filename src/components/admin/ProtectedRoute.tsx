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
        cache: 'no-store',
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        setAdmin(null);

        if (pathname !== '/login') {
          toast.error('Admin session expired or access unauthorized.');
        }

        router.replace('/login');
        return;
      }

      const data = await res.json();

      if (data.success && data.data?.admin) {
        setIsAuthenticated(true);
        setAdmin(data.data.admin);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
        router.replace('/login');
      }
    } catch (error) {
      console.error('[ADMIN AUTH ERROR] Failed to verify admin:', error);
      setIsAuthenticated(false);
      setAdmin(null);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router, pathname]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  // Re-verify on window focus
  useEffect(() => {
    const handleFocus = () => {
      verifyAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [verifyAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-4">
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(232,96,46,0.15)] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-white/15 border-t-[#e8602e] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-bold text-lg font-outfit">Verifying Admin Access...</p>
          <p className="text-zinc-400 text-xs font-medium font-jakarta mt-1">Securing control session</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-4">
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-white/15 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-bold text-lg font-outfit">Redirecting to Login...</p>
          <p className="text-zinc-400 text-xs font-medium font-jakarta mt-1">Authentication required</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;


