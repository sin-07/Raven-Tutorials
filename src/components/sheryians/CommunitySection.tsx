'use client';

import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  ExternalLink, 
  ArrowRight,
  Youtube,
  Radio,
  Code2,
  Terminal,
  Hash
} from 'lucide-react';

export default function CommunitySection() {
  const simulatedChannels = [
    {
      name: 'doubt-solving-lounge',
      tag: 'Voice & Text',
      activeUsers: '342 online',
      lastMessage: 'Senior TA Rohit: Checked your code sandbox! You forgot to await the JWT verify promise.',
      status: 'Active Now',
    },
    {
      name: 'project-showcase',
      tag: 'Portfolio Roast',
      activeUsers: '189 online',
      lastMessage: 'Aman: Just deployed my Awwwards 3D clone with Three.js shaders! Check out the 60fps physics.',
      status: 'Trending',
    },
    {
      name: 'placement-hiring-drive',
      tag: 'Jobs & Referrals',
      activeUsers: '512 online',
      lastMessage: 'Sheryians Team: Cred & Razorpay recruitment drive open for 2026 batches! Submit resumes.',
      status: 'Verified',
    },
  ];

  return (
    <section id="community" className="py-20 lg:py-28 bg-[#07080e] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[170px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #5865F2 0%, #e8602e 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Glassmorphic Card */}
        <div className="rounded-3xl border border-[#5865F2]/30 bg-gradient-to-br from-[#0c0d18] via-[#101222] to-[#0c0d18] p-8 sm:p-12 lg:p-16 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(88,101,242,0.15)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 text-indigo-300 text-xs font-space font-extrabold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-[#5865F2] animate-pulse" />
                Live Discord Ecosystem • 150,000+ Coders
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight leading-tight">
                India&apos;s Most Active <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-[#e8602e] to-[#ff7b47]">
                  Developer Community.
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Coding can feel lonely, but never at Sheryians. Join 150,000+ passionate developers on Discord. Hop into 24/7 active voice rooms, participate in weekend hackathons, get your projects roasted, and solve bugs together in real-time.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white font-outfit">
                    150K+
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
                    Discord Members
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-outfit flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>24/7</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
                    Active Voice Rooms
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#ff7b47] font-outfit">
                    500K+
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
                    YouTube Coders
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(88,101,242,0.4)] transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Join Sheryians Discord Server</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://youtube.com/@sheryians"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Subscribe on YouTube</span>
                </a>
              </div>

            </div>

            {/* Right 5 Cols: Live Channels Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-[#090a12] border border-white/10 text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>discord.gg/sheryians</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Voice Rooms Online
                </span>
              </div>

              {simulatedChannels.map((channel, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0c0d18] border border-white/10 hover:border-[#5865F2]/50 transition space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-sm font-mono">
                      <Hash className="w-4 h-4 text-zinc-500 group-hover:text-[#5865F2] transition" />
                      <span>{channel.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5865F2]/15 text-indigo-300 font-bold">
                      {channel.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-jakarta leading-relaxed">
                    {channel.lastMessage}
                  </p>

                  <div className="text-[11px] text-zinc-500 font-mono">
                    {channel.activeUsers}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
