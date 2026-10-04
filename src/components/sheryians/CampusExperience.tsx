'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Monitor, 
  Wifi, 
  Coffee, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface CampusExperienceProps {
  onOpenCounseling?: () => void;
}

export default function CampusExperience({ onOpenCounseling }: CampusExperienceProps) {
  const campusPerks = [
    {
      icon: Monitor,
      title: 'Dedicated Workstations',
      description: 'High-speed hardware stations configured with full dev environments and dual monitors.',
    },
    {
      icon: Users,
      title: 'In-Person Face-to-Face Mentorship',
      description: 'Harsh Sharma and senior mentors are right by your desk to debug your code and review architecture.',
    },
    {
      icon: Wifi,
      title: 'Supercharged Peer Environment',
      description: 'Surround yourself with 200+ disciplined coders grinding together 8-10 hours a day.',
    },
    {
      icon: Calendar,
      title: 'Offline Hackathons & Demo Days',
      description: 'Pitch your capstone projects to visiting startup CTOs and tech founders on campus demo days.',
    },
  ];

  return (
    <section id="campus" className="py-20 lg:py-28 bg-[#07080d] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Box */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1018] via-[#121422] to-[#0a0b12] p-8 sm:p-12 lg:p-16 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden relative">
          
          {/* Subtle location watermark */}
          <div className="absolute -right-8 -bottom-8 text-white/[0.03] font-black text-9xl font-outfit select-none pointer-events-none">
            BHOPAL
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c130f] border border-[#e8602e]/40 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#e8602e]" />
                Sheryians Offline Campus • MP Nagar, Bhopal
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight leading-tight">
                Want the Raw In-Person Experience? <br />
                <span className="text-[#e8602e]">Join Our Bhopal Classroom.</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Experience the raw intensity of an offline bootcamp. Code side-by-side with passionate peers, get instant 1-on-1 desk mentoring, and immerse yourself in an atmosphere where everyone is obsessed with software craftsmanship.
              </p>

              {/* Campus Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {campusPerks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-[#141724]/70 border border-white/5 space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-[#e8602e]/20 border border-[#e8602e]/30 flex items-center justify-center text-[#ff7b47]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-outfit">
                        {perk.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {perk.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onOpenCounseling}
                  className="btn-sheryians w-full sm:w-auto px-7 py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Book Campus Visit & Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Limited to 45 seats per offline batch</span>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Campus Card & Address */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0b12] border border-white/10 space-y-5 shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-[#ff7b47] uppercase tracking-wider">
                    Campus Location
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Open Mon - Sat
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-black text-white font-outfit">
                    Sheryians Coding School HQ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    2nd Floor, Above Bank of Baroda, Zone-II, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011, India
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#11131c] border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Batch Timings:</span>
                    <span className="text-white font-semibold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Hostel / PG Assistance:</span>
                    <span className="text-emerald-400 font-semibold">Available for outstation students</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Next Batch Starts:</span>
                    <span className="text-[#ff7b47] font-semibold">This Monday</span>
                  </div>
                </div>

                <button
                  onClick={onOpenCounseling}
                  className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#e8602e]" />
                  <span>Get Directions & Counseling</span>
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
