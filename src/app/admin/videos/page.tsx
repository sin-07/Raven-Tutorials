'use client';

import React from 'react';
import { Video, Sparkles, Clock, Zap, Star } from 'lucide-react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';

export const dynamic = 'force-dynamic';

const Videos: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
              <Video size={14} />
              <span>Media Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
              Video Management
            </h2>
            <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
              Manage educational video lectures, live recordings, and class highlights
            </p>
          </div>
        </div>

        {/* Coming Soon Hero Card */}
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 md:p-12 relative overflow-hidden text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10b981]/15 border border-[#10b981]/30 px-4 py-1.5 rounded-full font-space font-bold uppercase text-xs text-[#34d399] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-4 h-4 text-[#10b981]" />
            <span>Under Construction</span>
            <Sparkles className="w-4 h-4 text-[#10b981]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-black text-white tracking-tight mb-6">
            Video Vault Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7]">Coming Soon!</span>
          </h1>

          {/* Central Highlight Card */}
          <div className="bg-[#121522] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] max-w-2xl mx-auto mb-10">
            <div className="w-16 h-16 bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-2">
              Launching Very Soon!
            </h2>
            <p className="text-base font-jakarta font-medium text-zinc-400">
              Our development team is currently integrating high-speed CDN video streaming and YouTube unlisted lecture playlists. Get ready for a smooth video experience!
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-[#121522] border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#10b981]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] flex items-center justify-center mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-white mb-1">Upload & Stream</h3>
              <p className="text-xs font-jakarta font-medium text-zinc-400">
                Direct MP4 uploads & secure embed links for private lessons.
              </p>
            </div>

            <div className="bg-[#121522] border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#10b981]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-white mb-1">Fast Playback</h3>
              <p className="text-xs font-jakarta font-medium text-zinc-400">
                Adaptive bitrate streaming optimized for low-bandwidth mobile devices.
              </p>
            </div>

            <div className="bg-[#121522] border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#10b981]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-white mb-1">Standard Tags</h3>
              <p className="text-xs font-jakarta font-medium text-zinc-400">
                Categorized by class, subject, and chapter for effortless student discovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function ProtectedVideosPage() {
  return (
    <AdminProtectedRoute>
      <Videos />
    </AdminProtectedRoute>
  );
}
