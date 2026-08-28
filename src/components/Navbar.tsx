'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, User, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';

const Navbar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout: adminLogout } = useAdmin();

  // Check if student session is active
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/verify', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setIsStudentLoggedIn(data.success === true && !!data.student);
        } else {
          setIsStudentLoggedIn(false);
        }
      } catch {
        setIsStudentLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  const isAdminLoggedIn = !!admin;

  // Scroll detection for subtle backdrop transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/services', label: 'Services' },
    ...(!isStudentLoggedIn ? [{ path: '/admission', label: 'Admission' }] : []),
    { path: '/notices', label: 'Notices' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ], [isStudentLoggedIn]);

  const isActive = (path: string) => pathname === path;

  const handleStudentLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsStudentLoggedIn(false);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch {
      setIsStudentLoggedIn(false);
      router.push('/login');
    }
  };

  const handleAdminLogout = async () => {
    await adminLogout();
    toast.success('Admin logged out');
    router.push('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080c]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'bg-[#07080c]/60 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Clean Minimal Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="RAVEN Logo"
              className="h-7 w-7 object-contain group-hover:opacity-90 transition-opacity"
            />
            <div className="flex items-baseline gap-1">
              <span className="text-white font-bold text-lg tracking-tight font-outfit">
                RAVEN
              </span>
              <span className="text-emerald-400 font-semibold text-xs tracking-wider uppercase font-space">
                Tutorials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 font-jakarta">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : isStudentLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleStudentLogout}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-gray-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#07080c]/95 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/[0.08]">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-2 text-center bg-emerald-500 text-black font-semibold text-xs rounded-lg"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleAdminLogout();
                  }}
                  className="p-2 text-red-400 bg-red-500/10 rounded-lg text-xs font-medium"
                >
                  Logout
                </button>
              </div>
            ) : isStudentLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-2 text-center bg-emerald-500 text-black font-semibold text-xs rounded-lg"
                >
                  Student Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleStudentLogout();
                  }}
                  className="p-2 text-red-400 bg-red-500/10 rounded-lg text-xs font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-2.5 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
