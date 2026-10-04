'use client';

import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2, Flame, User, Mail, Phone, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

interface CounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CounselingModal({ isOpen, onClose }: CounselingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Job-Ready AI Full-Stack Cohort');
  const [background, setBackground] = useState('College Student');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Please enter your name and phone number');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Counseling request submitted! Our mentor will call you shortly.');
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-jakarta select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0e0f17] border border-[#e8602e]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(232,96,46,0.2)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8602e]/20 border border-[#e8602e]/40 text-[#ff7b47] text-[10px] font-space font-black uppercase tracking-wider mb-1">
                <Flame className="w-3 h-3 text-[#e8602e]" />
                1-on-1 Guidance
              </div>
              <h3 className="text-2xl font-black text-white font-outfit">
                Book a Free Career Counseling Call
              </h3>
              <p className="text-xs text-zinc-400">
                Speak directly with a senior developer mentor. We will analyze your background and suggest the right coding roadmap.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-space">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e8602e] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-space">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e8602e] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-space">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@gmail.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e8602e] transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-space">
                  Program of Interest
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white text-sm focus:outline-none focus:border-[#e8602e] transition"
                >
                  <option value="Job-Ready AI Full-Stack Cohort">Job-Ready AI Full-Stack Cohort (6 Months)</option>
                  <option value="Front-End DOMination with GSAP">Front-End DOMination with GSAP & Three.js</option>
                  <option value="Backend Domination">Backend Domination: Node.js & Microservices</option>
                  <option value="100-Day Coding Bootcamp">100-Day Intensive Bootcamp (Online/Offline)</option>
                  <option value="Java + DSA Masterclass">Java + Data Structures & Algorithms</option>
                  <option value="Bhopal Offline Campus">Sheryians Bhopal Offline Campus Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 font-space">
                  Current Background
                </label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white text-sm focus:outline-none focus:border-[#e8602e] transition"
                >
                  <option value="College Student (CS/IT)">College Student (CS / IT)</option>
                  <option value="College Student (Non-CS)">College Student (Non-CS Branch)</option>
                  <option value="Working Professional (Tech)">Working Professional (Tech / QA / Support)</option>
                  <option value="Working Professional (Non-Tech)">Working Professional (Non-Tech / Career Switch)</option>
                  <option value="Recent Graduate">Recent Graduate (Looking for Placement)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-sheryians w-full py-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Request Free Counseling'}</span>
              </button>
            </form>

          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white font-outfit">
              Request Received!
            </h3>

            <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Thanks <span className="text-[#ff7b47] font-bold">{name}</span>. A Sheryians developer counselor will call you at <span className="text-white font-bold">{phone}</span> within 2 hours to answer your questions and guide your roadmap.
            </p>

            <button
              onClick={handleReset}
              className="btn-sheryians px-6 py-2.5 text-xs font-black uppercase tracking-wider mt-4 cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
