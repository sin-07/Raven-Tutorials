'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MapPin, LogIn, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';
import { gsap, magneticHover } from '@/lib/gsap';

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

  // Check if user is logged in (student) by verifying cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          // authenticated: false means no token (200); success: true + student means valid session
          setIsStudentLoggedIn(data.success === true && !!data.student);
        } else {
          setIsStudentLoggedIn(false);
        }
      } catch {
        // Silent fail - user is simply not logged in
        setIsStudentLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  // Check if admin is logged in
  const isAdminLoggedIn = !!admin;

  // ── GSAP: Scroll hide/show + magnetic hover ─────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nav = navRef.current;
    const logo = logoRef.current;
    if (!nav) return;

    // UI: magnetic hover on logo
    const cleanupMagnetic = magneticHover(logo, logo, 0.25);

    // Scroll: hide navbar when scrolling down, reveal when up
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 60) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
      } else if (currentY > lastScrollY + 5) {
        gsap.to(nav, { y: '-110%', duration: 0.4, ease: 'power2.inOut', overwrite: true });
      } else if (currentY < lastScrollY - 5) {
        gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
      }
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cleanupMagnetic) cleanupMagnetic();
    };
  }, []);

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
      setIsStudentLoggedIn(false);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
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
        .navbar-fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background-color: rgba(10, 10, 10, 0.85);
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(0, 229, 168, 0.15);
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
        
        /* Custom Hamburger Menu */
        .hamburger {
          width: 26px;
          height: 22px;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hamburger-line {
          width: 100%;
          height: 2.5px;
          background-color: #d1d5db;
          border-radius: 3px;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-origin: center;
          box-shadow: 0 0 0 rgba(0, 229, 168, 0);
        }
        .hamburger:hover .hamburger-line {
          background-color: #00E5A8;
          box-shadow: 0 0 8px rgba(0, 229, 168, 0.3);
        }
        /* Top line - Rotate with bounce and glow */
        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(9.75px) rotate(225deg) scale(1.15);
          background: linear-gradient(90deg, #00E5A8, #00B386);
          box-shadow: 0 0 12px rgba(0, 229, 168, 0.6), 0 0 20px rgba(0, 229, 168, 0.3);
        }
        /* Middle line - Spin out with scale */
        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: rotate(360deg) scale(0.1);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        /* Bottom line - Counter rotate with bounce and glow */
        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-9.75px) rotate(-225deg) scale(1.15);
          background: linear-gradient(90deg, #00B386, #00E5A8);
          box-shadow: 0 0 12px rgba(0, 229, 168, 0.6), 0 0 20px rgba(0, 229, 168, 0.3);
        }
      `}</style>
      <nav ref={navRef} className="navbar-fixed w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="RAVEN Logo" 
              className="h-9 w-9 brightness-0 invert group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-baseline gap-1.5 font-outfit">
              <span className="text-white font-extrabold text-2xl tracking-tight">RAVEN</span>
              <span className="text-[#00E5A8] font-bold text-lg tracking-wide uppercase">Tutorials</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center space-x-1 font-jakarta">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-lg transition flex items-center ${
                  isActive(link.path)
                    ? 'text-[#00E5A8] bg-[#00E5A8]/10 font-semibold'
                    : 'text-gray-300 hover:text-[#00E5A8] hover:bg-white/5'
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
                  className="flex items-center gap-2 px-4 py-2 bg-[#00E5A8] text-black rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition font-semibold ml-2"
                >
                  <User className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : isStudentLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-[#00E5A8] text-black rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition font-semibold ml-2"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleStudentLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-[#00E5A8] text-black rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition font-semibold ml-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button - Custom Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden bg-[#080808] border-t border-[#00E5A8]/20 ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-close'}`}>
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition mobile-menu-item ${
                    isActive(link.path)
                      ? 'text-[#00E5A8] bg-[#00E5A8]/10 font-semibold'
                      : 'text-gray-300 hover:text-[#00E5A8] hover:bg-white/5'
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
                    className="block px-4 py-3 bg-[#00E5A8] text-black rounded-full text-center font-semibold mobile-menu-item"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleAdminLogout();
                    }}
                    className="w-full px-4 py-3 bg-red-500/10 text-red-400 rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Logout
                  </button>
                </>
              ) : isStudentLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-[#00E5A8] text-black rounded-full text-center font-semibold mobile-menu-item"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleStudentLogout();
                    }}
                    className="w-full px-4 py-3 bg-red-500/10 text-red-400 rounded-lg text-center font-semibold mobile-menu-item"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 bg-[#00E5A8] text-black rounded-full text-center font-semibold mobile-menu-item"
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

