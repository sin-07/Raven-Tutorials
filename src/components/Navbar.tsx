'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, User, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';

const Navbar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout: adminLogout } = useAdmin();

  // GSAP refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

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
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4"
      >
        <div className="max-w-6xl mx-auto">
          {/* Cartoon Capsule Navbar Container */}
          <div className="relative flex items-center justify-between h-[66px] px-4 sm:px-6 rounded-full border-2 sm:border-[2.5px] border-black bg-[#f0fdf4]/95 backdrop-blur-xl shadow-[4px_4px_0px_#000000]">

            {/* Brand Logo & Identifier */}
            <Link ref={logoRef} href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative p-2 rounded-xl bg-emerald-300 border-2 border-black shadow-[2px_2px_0px_#000] group-hover:-translate-y-0.5 transition-transform">
                <img
                  src="/logo.png"
                  alt="RAVEN Logo"
                  className="h-6 w-6 object-contain"
                />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-black font-black text-xl tracking-tight font-outfit">
                    RAVEN
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-200 border border-black text-[10px] font-space font-extrabold uppercase tracking-widest text-black shadow-[1px_1px_0px_#000]">
                    Tutorials
                  </span>
                </div>
                <span className="text-[10px] font-space font-bold text-neutral-600 tracking-wider uppercase mt-0.5 hidden sm:block">
                  Patna Campus
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links Dock */}
            <div ref={linksRef} className="hidden md:flex items-center space-x-1 bg-[#dcfce7] p-1 rounded-full border-2 border-black font-jakarta shadow-[2px_2px_0px_#000]">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-150 flex items-center gap-1.5 ${
                      active
                        ? 'text-black bg-[#4ade80] border-2 border-black shadow-[2px_2px_0px_#000]'
                        : 'text-neutral-700 hover:text-black hover:bg-[#f0fdf4]'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Action CTA Button (Right) */}
            <div className="hidden sm:flex items-center gap-3">
              {isAdminLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-300 hover:bg-emerald-400 text-black font-black text-xs font-outfit uppercase tracking-wider rounded-full border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-200 hover:bg-rose-300 border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000] transition"
                    title="Logout Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : isStudentLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-300 hover:bg-emerald-400 text-black font-black text-xs font-outfit uppercase tracking-wider rounded-full border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Student Portal</span>
                  </Link>
                  <button
                    onClick={handleStudentLogout}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-200 hover:bg-rose-300 border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000] transition"
                    title="Logout Student"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group relative flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs font-outfit uppercase tracking-wider rounded-full border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#f0fdf4] hover:bg-[#dcfce7] border-2 border-black text-black shadow-[3px_3px_0px_#000] transition"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-black rounded-full transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black rounded-full transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black rounded-full transition-transform duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Drawer Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 p-5 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[6px_6px_0px_#000000] space-y-3">
              <div className="space-y-1.5 font-jakarta">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border-2 border-black transition ${
                        active
                          ? 'text-black bg-[#4ade80] shadow-[3px_3px_0px_#000]'
                          : 'text-neutral-800 bg-white hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <span className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t-2 border-black">
                {isAdminLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full py-3 bg-emerald-300 text-black text-center font-black text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] font-outfit uppercase tracking-wider"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleAdminLogout();
                      }}
                      className="block w-full py-2.5 bg-rose-200 border-2 border-black text-black text-center font-bold text-sm rounded-xl shadow-[2px_2px_0px_#000]"
                    >
                      Logout Admin
                    </button>
                  </div>
                ) : isStudentLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full py-3 bg-emerald-300 text-black text-center font-black text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] font-outfit uppercase tracking-wider"
                    >
                      Student Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleStudentLogout();
                      }}
                      className="block w-full py-2.5 bg-rose-200 border-2 border-black text-black text-center font-bold text-sm rounded-xl shadow-[2px_2px_0px_#000]"
                    >
                      Logout Student
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black text-center font-black text-sm rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] font-outfit uppercase tracking-wider"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Portal Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
