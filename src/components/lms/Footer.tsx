'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const footerLinks = {
  quick: [
    { name: 'Home', href: '/' },
    { name: 'All Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Admission', href: '/admission' },
    { name: 'Notices', href: '/notices' },
    { name: 'About Us', href: '/about' },
  ],
  programs: [
    { name: 'Foundation (Classes 8-10)', href: '/courses' },
    { name: 'Senior Secondary (11-12)', href: '/courses' },
    { name: 'JEE Main & Advanced', href: '/courses' },
    { name: 'NEET Medical Prep', href: '/courses' },
    { name: 'Comprehensive Test Series', href: '/services' },
  ],
  studentSupport: [
    { name: 'Student Dashboard', href: '/dashboard' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Admission Status', href: '/admission' },
    { name: 'Notice Board', href: '/notices' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function LMSFooter() {
  return (
    <footer className="bg-[#050806] border-t border-white/10 text-zinc-400 relative">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10 bg-[#080d09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-gradient-to-r from-[#0d140f] to-[#121c15] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)] animate-pulse" />
                <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit">Stay Ahead with RAVEN</h3>
              </div>
              <p className="text-zinc-400 text-sm font-jakarta font-medium">Get instant notifications, exam circulars, and test series updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter student / parent email"
                className="w-full sm:w-80 px-5 py-3.5 rounded-full bg-black/60 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm font-jakarta font-medium shadow-inner"
              />
              <button className="btn-lime px-7 py-3.5 text-black font-extrabold rounded-full flex items-center justify-center gap-2 text-sm font-outfit shadow-[0_0_25px_rgba(163,230,53,0.35)] cursor-pointer">
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Address */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="p-2.5 rounded-2xl bg-[#121c15] border border-white/15 shadow-sm group-hover:border-lime-400/50 transition-colors">
                <img 
                  src="/logo.png" 
                  alt="RAVEN Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="flex items-baseline gap-2 font-outfit">
                <span className="text-white font-black text-2xl tracking-tight">RAVEN</span>
                <span className="bg-lime-400/20 text-lime-400 border border-lime-400/30 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Tutorials</span>
              </div>
            </Link>

            <p className="text-zinc-400 leading-relaxed font-jakarta text-sm font-normal">
              Premier academic institution empowering learners to achieve distinction through concept-first pedagogy, expert mentorship, and disciplined problem solving.
            </p>

            <div className="space-y-3 font-jakarta text-xs text-zinc-300 pt-2 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Bajrangpuri, Patna - 800007, Bihar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-lime-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 8618281816</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>raventutorials@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-lime-400 font-space mb-4 bg-lime-400/10 border border-lime-400/20 px-3.5 py-1 rounded-full inline-block">
              Quick Links
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-medium">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-lime-400 font-space mb-4 bg-lime-400/10 border border-lime-400/20 px-3.5 py-1 rounded-full inline-block">
              Academic Programs
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-medium">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Support */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-lime-400 font-space mb-4 bg-lime-400/10 border border-lime-400/20 px-3.5 py-1 rounded-full inline-block">
              Student Portal
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-medium">
              {footerLinks.studentSupport.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-2xl bg-[#0d140f] border border-white/10 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold font-space">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Verified Admissions Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-[#040604]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-xs font-jakarta font-medium">
              © {new Date().getFullYear()} RAVEN Tutorials. All rights reserved. Empowering next-generation learners.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-black hover:bg-lime-400 hover:border-lime-400 hover:scale-110 shadow-sm transition-all cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
