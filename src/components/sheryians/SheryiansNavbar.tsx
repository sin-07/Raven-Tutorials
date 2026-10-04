'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  PhoneCall, 
  LogIn, 
  Sparkles, 
  Flame, 
  Users, 
  GraduationCap, 
  Building2,
  X,
  Menu
} from 'lucide-react';
import SheryiansLogo from './SheryiansLogo';

interface SheryiansNavbarProps {
  onOpenCounseling?: () => void;
}

export default function SheryiansNavbar({ onOpenCounseling }: SheryiansNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Courses', href: '#courses', badge: 'Hot' },
    { label: 'Bootcamp', href: '#bootcamps', badge: '100 Days' },
    { label: 'Why Sheryians', href: '#why-sheryians' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Community', href: '#community', badge: '150K+' },
    { label: 'Offline Campus', href: '#campus' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4`}>
        <div className="max-w-7xl mx-auto">
          {/* Floating Dark Glass Capsule */}
          <nav className={`relative flex items-center justify-between h-[66px] px-4 sm:px-6 rounded-full border transition-all duration-300 ${
            scrolled 
              ? 'bg-[#090a0f]/95 border-[#e8602e]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(232,96,46,0.15)] backdrop-blur-2xl' 
              : 'bg-[#0b0c12]/85 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          }`}>
            
            {/* Logo */}
            <SheryiansLogo size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 bg-[#13141d] px-2 py-1.5 rounded-full border border-white/10 font-jakarta">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-[#e8602e]/20 border border-[#e8602e]/40 text-[#ff7b47] text-[9px] font-space font-extrabold uppercase tracking-wider group-hover:bg-[#e8602e] group-hover:text-white transition-colors">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenCounseling}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white text-xs font-bold font-jakarta transition cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#e8602e]" />
                <span>Request Callback</span>
              </button>

              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#161722] hover:bg-[#1f202e] border border-white/10 text-white text-xs font-bold font-outfit uppercase tracking-wider transition hover:border-[#e8602e]/40"
              >
                <LogIn className="w-3.5 h-3.5 text-zinc-400" />
                <span>Sign In</span>
              </Link>

              <a
                href="#courses"
                className="btn-sheryians inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Explore Courses</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-[#161722] hover:bg-[#1f202e] border border-white/15 text-white transition active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e8602e]" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden flex flex-col justify-start pt-24 px-4 pb-8 font-jakarta"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full max-w-md mx-auto bg-[#0d0e15] border border-[#e8602e]/30 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <SheryiansLogo size="sm" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#141520] hover:bg-[#1b1c2b] border border-white/5 hover:border-[#e8602e]/40 text-zinc-200 hover:text-white font-bold text-sm transition"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-[#e8602e]/20 border border-[#e8602e]/40 text-[#ff7b47] text-[10px] font-space font-black uppercase">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCounseling?.();
                }}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#e8602e]" />
                <span>Request Free Callback</span>
              </button>

              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-sheryians w-full py-3.5 rounded-full text-white font-black text-sm flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Flame className="w-4 h-4" />
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#181926] hover:bg-[#202233] border border-white/10 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <LogIn className="w-4 h-4 text-[#e8602e]" />
                <span>Sign In to Student Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
