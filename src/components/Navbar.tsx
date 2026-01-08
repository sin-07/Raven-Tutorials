'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MapPin, LogIn, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';

const Navbar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout: adminLogout } = useAdmin();

  // Check if user is logged in (student) by checking sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const studentInfo = sessionStorage.getItem('studentInfo');
      setIsStudentLoggedIn(!!studentInfo);
    }
  }, [pathname]);

  // Check if admin is logged in
  const isAdminLoggedIn = !!admin;

  const navLinks = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    // Hide admission link if student is logged in
    ...(!isStudentLoggedIn ? [{ path: '/admission', label: 'Admission' }] : []),
    { path: '/notices', label: 'Notices' },
    { path: '/about', label: 'About Us' }
  ], [isStudentLoggedIn]);

  const isActive = (path: string) => pathname === path;

  const handleStudentLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('studentInfo');
      }
      setIsStudentLoggedIn(false);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('studentInfo');
      }
      setIsStudentLoggedIn(false);
      router.push('/login');
    }
  };

  const handleAdminLogout = async () => {
    await adminLogout();
    toast.success('Admin logged out successfully');
    router.push('/login');
  };

  return (
    <>
      <style>{`
        .navbar-sticky {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        @keyframes slideDownMenu {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }
        }
        @keyframes slideUpMenu {
          from {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
        }
        @keyframes menuItemSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-menu-open {
          animation: slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .mobile-menu-close {
          animation: slideUpMenu 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .mobile-menu-item {
          animation: menuItemSlideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar-sticky {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          background-color: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
        }
      `}</style>
      <nav className="navbar-sticky bg-white shadow-md w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <img 
              src="/logo.png" 
              alt="RAVEN Logo" 
              className="h-10 w-10"
            />
            RAVEN Tutorials
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-lg transition flex items-center ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {isActive(link.path) && (
                  <MapPin className="w-4 h-4 inline-block mr-1 -mt-1" />
                )}
                {link.label}
              </Link>
            ))}
            
            {/* Desktop Login/Dashboard Button */}
            {isAdminLoggedIn ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold ml-2"
                >
                  <User className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : isStudentLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ml-2"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleStudentLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ml-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden bg-white border-t border-gray-200 ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-close'}`}>
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition mobile-menu-item ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Login/Dashboard */}
              {isAdminLoggedIn ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-purple-600 text-white rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleAdminLogout();
                    }}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Logout
                  </button>
                </>
              ) : isStudentLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleStudentLogout();
                    }}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-semibold mobile-menu-item"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
