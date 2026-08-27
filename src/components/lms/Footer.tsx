'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight
} from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  courses: [
    { name: 'Physics', href: '/courses?category=physics' },
    { name: 'Mathematics', href: '/courses?category=mathematics' },
    { name: 'Chemistry', href: '/courses?category=chemistry' },
    { name: 'Biology', href: '/courses?category=biology' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
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
    <footer className="bg-[#080808] border-t border-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/5 bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white font-outfit">Stay Updated</h3>
              <p className="text-gray-400 text-sm sm:text-base font-jakarta">Subscribe to our newsletter for latest courses, exam tips, and announcements.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:flex-1 md:w-80 px-4 py-3 rounded-full bg-[#111622] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5A8] focus:border-transparent text-sm font-jakarta"
              />
              <button className="w-full sm:w-auto px-7 py-3 bg-[#00E5A8] text-black rounded-full font-bold hover:bg-emerald-400 hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm font-outfit shadow-lg shadow-[#00E5A8]/20">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <img 
                src="/logo.png" 
                alt="RAVEN Logo" 
                className="h-10 w-10 bg-[#11111c] rounded-full p-1.5 border border-[#00E5A8]/30 brightness-0 invert group-hover:scale-105 transition-transform"
              />
              <div className="flex items-baseline gap-1.5 font-outfit">
                <span className="text-white font-black text-2xl tracking-tight">RAVEN</span>
                <span className="text-[#00E5A8] font-bold text-base uppercase tracking-wider">Tutorials</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed font-jakarta text-sm sm:text-base">
              Empowering students to achieve academic excellence through quality education, 
              expert guidance, and interactive learning solutions.
            </p>
            <div className="space-y-3 font-jakarta text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#00E5A8] flex-shrink-0" />
                <span>Bajrangpuri, Patna - 800007, Bihar</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-[#00E5A8] flex-shrink-0" />
                <span>+91 8618281816</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-[#00E5A8] flex-shrink-0" />
                <span>raventutorials@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white font-outfit uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 font-jakarta text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#00E5A8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white font-outfit uppercase tracking-wider">Courses</h4>
            <ul className="space-y-3 font-jakarta text-sm">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#00E5A8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white font-outfit uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 font-jakarta text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#00E5A8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Raven Tutorials. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#111111] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00E5A8]/10 hover:border-[#00E5A8]/30 hover:text-[#00E5A8] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

