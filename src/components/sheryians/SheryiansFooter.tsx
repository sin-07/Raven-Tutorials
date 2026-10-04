'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Github, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  Heart
} from 'lucide-react';
import SheryiansLogo from './SheryiansLogo';

export default function SheryiansFooter() {
  return (
    <footer className="bg-[#030406] border-t border-white/10 text-zinc-400 select-none font-jakarta relative">
      
      {/* Newsletter Bar */}
      <div className="border-b border-white/10 bg-[#07080d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-gradient-to-r from-[#10121c] via-[#14121a] to-[#10121c] border border-white/10 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8602e] shadow-[0_0_10px_#e8602e] animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-black text-white font-outfit">
                  Stay Ahead in Tech with Sheryians
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Get free weekly project tutorials, code reviews, and hiring drive circulars straight to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-80 px-5 py-3.5 rounded-full bg-black/60 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-[#e8602e] text-xs sm:text-sm"
              />
              <button className="btn-sheryians px-7 py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand & Address (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-5">
            <SheryiansLogo size="md" />

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India&apos;s most loved coding education platform. We build real software, clone award-winning websites, and transform passionate learners into job-ready software engineers.
            </p>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e8602e] flex-shrink-0 mt-0.5" />
                <span>2nd Floor, Zone-II, MP Nagar, Bhopal, Madhya Pradesh 462011, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e8602e] flex-shrink-0" />
                <span>hello@sheryians.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e8602e] flex-shrink-0" />
                <span>+91 98765 43210 / +91 755 492 8810</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://youtube.com/@sheryians"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-red-400 transition"
                aria-label="Sheryians on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-indigo-400 transition"
                aria-label="Sheryians on Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/sheryians_coding_school"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-pink-400 transition"
                aria-label="Sheryians on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/sheryians-coding-school"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-600/20 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-sky-400 transition"
                aria-label="Sheryians on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/sheryians"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition"
                aria-label="Sheryians on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm font-outfit uppercase tracking-wider">
              Flagship Cohorts
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#courses" className="hover:text-white transition">AI Full-Stack Cohort (6M)</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">Front-End DOMination (GSAP)</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">Backend Domination & Microservices</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">100-Day Full-Time Bootcamp</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">Java + DSA Masterclass</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition">Free Logic Starter Pack</a>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm font-outfit uppercase tracking-wider">
              The Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#campus" className="hover:text-white transition">Bhopal Classroom (Offline)</a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">Discord VIP Community</a>
              </li>
              <li>
                <a href="#why-sheryians" className="hover:text-white transition">The Sheryians Method</a>
              </li>
              <li>
                <a href="#mentors" className="hover:text-white transition">Meet The Mentors</a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition">Student Portal Login</a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm font-outfit uppercase tracking-wider">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-white transition cursor-pointer">Terms & Conditions</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Refund & Cancellation Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Hire From Sheryians</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Contact Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Sheryians Coding School. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Upgrading India&apos;s Coding Mindset with</span>
            <Heart className="w-3.5 h-3.5 fill-[#e8602e] text-[#e8602e]" />
            <span>in Bhopal, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
