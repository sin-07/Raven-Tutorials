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
    <footer className="bg-[#f0fdf4] border-t-4 border-black text-neutral-900 relative">
      {/* Newsletter Bar */}
      <div className="border-b-3 border-black bg-[#f6fcf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-[#dcfce7] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black animate-pulse" />
                <h3 className="text-2xl sm:text-3xl font-black text-black font-outfit">Stay Ahead with RAVEN</h3>
              </div>
              <p className="text-neutral-700 text-sm font-jakarta font-medium">Get instant notifications, exam circulars, and test series updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter student / parent email"
                className="w-full sm:w-80 px-4 py-3.5 rounded-xl bg-white border-2 border-black text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-jakarta font-semibold shadow-[2px_2px_0px_#000]"
              />
              <button className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm font-outfit">
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
              <div className="p-2.5 rounded-xl bg-emerald-300 border-2 border-black shadow-[3px_3px_0px_#000] group-hover:-translate-y-0.5 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="RAVEN Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="flex items-baseline gap-1.5 font-outfit">
                <span className="text-black font-black text-2xl tracking-tight">RAVEN</span>
                <span className="bg-emerald-200 border border-black text-black text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-[1px_1px_0px_#000]">Tutorials</span>
              </div>
            </Link>

            <p className="text-neutral-700 leading-relaxed font-jakarta text-sm font-medium">
              Premier academic institution empowering learners to achieve distinction through concept-first pedagogy, expert mentorship, and disciplined problem solving.
            </p>

            <div className="space-y-3 font-jakarta text-xs text-neutral-800 pt-2 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-200 border border-black flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000]">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <span>Bajrangpuri, Patna - 800007, Bihar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#86efac] border border-black flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000]">
                  <Phone className="w-4 h-4 text-black" />
                </div>
                <span>+91 8618281816</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#bbf7d0] border border-black flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#000]">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <span>raventutorials@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-black font-space mb-4 bg-[#bbf7d0] px-3 py-1 rounded-lg border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
              Quick Links
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-bold">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-neutral-600 hover:text-black hover:translate-x-1 transition-transform inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-black font-space mb-4 bg-[#bbf7d0] px-3 py-1 rounded-lg border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
              Academic Programs
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-bold">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-neutral-600 hover:text-black hover:translate-x-1 transition-transform inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Support */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-black font-space mb-4 bg-[#bbf7d0] px-3 py-1 rounded-lg border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
              Student Portal
            </div>
            <ul className="space-y-2.5 font-jakarta text-sm font-bold">
              {footerLinks.studentSupport.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-neutral-600 hover:text-black hover:translate-x-1 transition-transform inline-block"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3.5 rounded-xl bg-[#dcfce7] border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-2 text-black text-xs font-black font-space">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Verified Admissions Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t-2 border-black bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-xs font-jakarta font-semibold">
              © {new Date().getFullYear()} RAVEN Tutorials. All rights reserved. Empowering next-generation learners.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 hover:bg-[#dcfce7] transition-all"
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
