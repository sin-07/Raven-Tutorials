'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogIn,
  User,
  LogOut,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Megaphone,
  Sparkles,
  Info,
  Phone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { gsap } from '@/lib/gsap';

const Navbar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  // Freeze background when mobile menu is open
  useBodyScrollLock(isMenuOpen);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout: adminLogout } = useAdmin();

  // GSAP & DOM refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Click outside listener for More dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Primary links in the desktop pill dock
  const primaryLinks = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/rsat', label: "RSAT '26" },
    ...(!isStudentLoggedIn ? [{ path: '/admission', label: 'Admission' }] : []),
    { path: '/articles', label: 'Articles' },
  ], [isStudentLoggedIn]);

  // Secondary items cleanly organized in the "More ▾" dropdown
  const moreLinks = useMemo(() => [
    {
      path: '/notices',
      label: 'Notices',
      subtext: 'Circulars & updates',
      icon: Megaphone,
      badge: 'Live',
    },
    {
      path: '/services',
      label: 'Services',
      subtext: 'Student mentorship & labs',
      icon: Sparkles,
    },
    {
      path: '/about',
      label: 'About Us',
      subtext: 'Patna campus & faculty',
      icon: Info,
    },
    {
      path: '/contact',
      label: 'Contact',
      subtext: 'Enquiries & location',
      icon: Phone,
    },
  ], []);

  // Complete list for mobile drawer
  const allMobileLinks = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/rsat', label: "RSAT '26" },
    ...(!isStudentLoggedIn ? [{ path: '/admission', label: 'Admission' }] : []),
    { path: '/articles', label: 'Articles' },
    { path: '/notices', label: 'Notices' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ], [isStudentLoggedIn]);

  const isActive = (path: string) => pathname === path;
  const isMoreActive = useMemo(() => {
    return moreLinks.some((item) => pathname === item.path);
  }, [pathname, moreLinks]);

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

  // Entrance animation for Navbar
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
    }
    return () => {
      if (drawerRef.current) gsap.killTweensOf(drawerRef.current);
      if (navRef.current) gsap.killTweensOf(navRef.current);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      if (drawerRef.current) {
        gsap.killTweensOf(drawerRef.current);
        gsap.to(drawerRef.current, {
          opacity: 0,
          scale: 0.94,
          y: -8,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
            setIsMenuOpen(false);
            setIsDrawerMounted(false);
          },
        });
      } else {
        setIsMenuOpen(false);
        setIsDrawerMounted(false);
      }
    } else {
      setIsDrawerMounted(true);
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    if (!isMenuOpen) return;
    if (drawerRef.current) {
      gsap.killTweensOf(drawerRef.current);
      gsap.to(drawerRef.current, {
        opacity: 0,
        scale: 0.94,
        y: -8,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setIsMenuOpen(false);
          setIsDrawerMounted(false);
        },
      });
    } else {
      setIsMenuOpen(false);
      setIsDrawerMounted(false);
    }
  }, [isMenuOpen]);

  // Animate drawer when opened with smooth stagger
  useEffect(() => {
    if (isMenuOpen && isDrawerMounted && drawerRef.current) {
      gsap.killTweensOf(drawerRef.current);
      gsap.fromTo(
        drawerRef.current,
        {
          opacity: 0,
          scale: 0.93,
          y: -12,
          transformOrigin: 'top center',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.28,
          ease: 'back.out(1.8)',
        }
      );
      const items = drawerRef.current.querySelectorAll('.mobile-nav-link');
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.2, stagger: 0.025, ease: 'power2.out', delay: 0.06 }
        );
      }
    }
  }, [isMenuOpen, isDrawerMounted]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Sheryians Luxury Floating Dark Capsule */}
          <div className="relative flex items-center justify-between h-[64px] px-4 sm:px-6 rounded-full border border-white/10 bg-[#090a10]/95 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(232,96,46,0.1)]">

            {/* Brand Logo & Identifier */}
            <Link ref={logoRef} href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative p-2 rounded-xl bg-[#121420] border border-white/15 shadow-inner group-hover:-translate-y-0.5 transition-transform flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="RAVEN Logo"
                  className="h-6 w-6 object-contain"
                />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#e8602e] shadow-[0_0_8px_#e8602e]" />
              </div>
              
              <div className="flex flex-col flex-shrink-0">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-white font-black text-xl tracking-tight font-outfit whitespace-nowrap">
                    RAVEN
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#e8602e]/20 border border-[#e8602e]/40 text-[10px] font-space font-extrabold uppercase tracking-widest text-[#ff7b47] whitespace-nowrap">
                    Tutorials
                  </span>
                </div>
                <span className="text-[10px] font-space font-bold text-zinc-400 tracking-wider uppercase mt-0.5 hidden sm:block whitespace-nowrap">
                  Patna Campus
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links Dock */}
            <div ref={linksRef} className="hidden lg:flex items-center space-x-1 bg-[#10121a] p-1 rounded-full border border-white/10 font-jakarta flex-shrink-0">
              {primaryLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                      active
                        ? 'text-white bg-[#e8602e] shadow-[0_0_15px_rgba(232,96,46,0.5)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div ref={moreDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isMoreActive || moreOpen
                      ? 'text-white bg-[#e8602e] shadow-[0_0_15px_rgba(232,96,46,0.5)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  {isMoreActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Popover Card */}
                {moreOpen && (
                  <div className="absolute top-[calc(100%+12px)] right-0 w-64 p-2 rounded-2xl bg-[#0c0d16] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-150 font-jakarta">
                    <div className="space-y-1">
                      {moreLinks.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setMoreOpen(false)}
                            className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 ${
                              active
                                ? 'bg-[#e8602e] border-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]'
                                : 'bg-[#121420] hover:bg-[#181a28] border-white/5 hover:border-[#e8602e]/30 text-zinc-300 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`p-1.5 rounded-lg border ${
                                  active
                                    ? 'bg-black text-[#ff7b47] border-black'
                                    : 'bg-[#191c2c] border-white/10 text-[#ff7b47] group-hover:bg-[#202438]'
                                } transition-colors`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold leading-tight whitespace-nowrap">
                                  {item.label}
                                </span>
                                <span className="text-[10px] text-zinc-400 font-medium leading-none mt-0.5 whitespace-nowrap">
                                  {item.subtext}
                                </span>
                              </div>
                            </div>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 rounded-md bg-[#e8602e] text-white text-[9px] font-extrabold uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTA Button (Right) */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              {isAdminLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-[#161824] hover:bg-[#1f2233] text-[#ff7b47] border border-[#e8602e]/30 hover:border-[#e8602e]/60 font-black text-xs font-outfit uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(232,96,46,0.2)] transition-all whitespace-nowrap flex-shrink-0"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 rounded-full text-xs font-bold transition whitespace-nowrap flex-shrink-0"
                    title="Logout Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : isStudentLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-[#161824] hover:bg-[#1f2233] text-[#ff7b47] border border-[#e8602e]/30 hover:border-[#e8602e]/60 font-black text-xs font-outfit uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(232,96,46,0.2)] transition-all whitespace-nowrap flex-shrink-0"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Student Portal</span>
                  </Link>
                  <button
                    onClick={handleStudentLogout}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 rounded-full text-xs font-bold transition whitespace-nowrap flex-shrink-0"
                    title="Logout Student"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn-sheryians group relative flex items-center gap-2 px-5 py-2.5 bg-[#e8602e] hover:bg-[#ff733d] text-white font-black text-xs font-outfit uppercase tracking-wider rounded-full transition-all whitespace-nowrap flex-shrink-0 shadow-[0_0_20px_rgba(232,96,46,0.35)] cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-full bg-[#121420] hover:bg-[#1a1d2e] border border-white/15 text-white transition active:scale-95 flex-shrink-0"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Drawer Dropdown (GSAP Animated) */}
          {(isMenuOpen || isDrawerMounted) && (
            <div
              ref={drawerRef}
              style={{
                opacity: 0,
                transform: 'scale(0.93) translateY(-12px)',
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
              }}
              className="lg:hidden mt-3 p-5 rounded-3xl bg-[#0c0d16]/95 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-3"
            >
              <div className="space-y-1.5 font-jakarta">
                {allMobileLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={closeMenu}
                      className={`mobile-nav-link flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                        active
                          ? 'text-white bg-[#e8602e] border-[#e8602e] shadow-[0_0_15px_rgba(232,96,46,0.4)]'
                          : 'text-zinc-200 bg-[#141624] hover:bg-[#1a1d2e] border-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10">
                {isAdminLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/admin/dashboard"
                      onClick={closeMenu}
                      className="block w-full py-3 bg-[#e8602e] text-white text-center font-black text-sm rounded-xl font-outfit uppercase tracking-wider shadow-[0_0_20px_rgba(232,96,46,0.4)] transition"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        closeMenu();
                        handleAdminLogout();
                      }}
                      className="block w-full py-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-center font-bold text-sm rounded-xl transition"
                    >
                      Logout Admin
                    </button>
                  </div>
                ) : isStudentLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="block w-full py-3 bg-[#e8602e] text-white text-center font-black text-sm rounded-xl font-outfit uppercase tracking-wider shadow-[0_0_20px_rgba(232,96,46,0.4)] transition"
                    >
                      Student Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        closeMenu();
                        handleStudentLogout();
                      }}
                      className="block w-full py-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-center font-bold text-sm rounded-xl transition"
                    >
                      Logout Student
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="btn-sheryians flex items-center justify-center gap-2 w-full py-3.5 bg-[#e8602e] hover:bg-[#ff733d] text-white text-center font-black text-sm rounded-full font-outfit uppercase tracking-wider transition shadow-[0_0_20px_rgba(232,96,46,0.35)]"
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
