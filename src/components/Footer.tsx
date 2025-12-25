'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Clock, Award, Shield, Heart } from 'lucide-react';

const Footer: React.FC = React.memo(() => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: Phone, text: '+91 8618281816' },
    { icon: Mail, text: 'raventutorials@gmail.com' },
    { icon: MapPin, text: 'Bajrangpuri, Patna - 800007' }
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/admission', label: 'Admission' },
    { path: '/notices', label: 'Notices' },
    { path: '/about', label: 'About Us' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' }
  ];

  const features = [
    { icon: Clock, text: 'Flexible Timings' },
    { icon: Award, text: 'Expert Teachers' },
    { icon: Shield, text: 'Safe Environment' },
    { icon: Heart, text: 'Personal Attention' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="RAVEN Logo" 
                className="h-10 w-10 bg-white rounded-full p-1"
              />
              <span className="text-2xl font-bold">RAVEN Tutorials</span>
            </div>
            <p className="text-blue-200 text-sm">
              Empowering students with quality education and personalized attention for academic excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3 text-blue-200">
                  <info.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Why Choose Us</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-blue-200">
                  <div className="p-1.5 bg-blue-800 rounded-lg">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
            <p>© {currentYear} RAVEN Tutorials. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
