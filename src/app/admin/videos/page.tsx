'use client';

import React from 'react';
import { Video, Sparkles, Clock, Rocket, Zap, Star } from 'lucide-react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';

const Videos: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
            <Video size={14} className="text-black" />
            <span>Media Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
            Video Management
          </h2>
          <p className="text-black/80 font-jakarta font-semibold mt-1">
            Manage educational video lectures, live recordings, and class highlights
          </p>
        </div>

        {/* Coming Soon Hero Card */}
        <div className="bg-white border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 md:p-12 relative overflow-hidden text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#dcfce7] border-2 border-black px-4 py-1.5 rounded-full font-space font-black uppercase text-xs text-black shadow-[2px_2px_0px_#000] mb-6">
            <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s' }} />
            <span>Under Construction</span>
            <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-black text-black tracking-tight mb-6">
            Video Vault Is <span className="bg-[#fef08a] px-3 py-1 border-2 border-black rounded-2xl inline-block shadow-[4px_4px_0px_#000] transform -rotate-1">Coming Soon!</span>
          </h1>

          {/* Central Highlight Card */}
          <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_#000] max-w-2xl mx-auto mb-10">
            <div className="w-16 h-16 bg-[#86efac] border-2 border-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
              <Clock className="w-8 h-8 text-black animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-3xl font-outfit font-black text-black mb-2">
              Launching Very Soon!
            </h2>
            <p className="text-base font-jakarta font-medium text-black/80">
              Our development team is currently integrating high-speed CDN video streaming and YouTube unlisted lecture playlists. Get ready for a smooth video experience!
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-[#f0fdf4] border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <Video className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-outfit font-black text-lg text-black mb-1">Upload & Stream</h3>
              <p className="text-xs font-jakarta font-medium text-black/70">
                Direct MP4 uploads & secure embed links for private lessons.
              </p>
            </div>

            <div className="bg-[#f0fdf4] border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#fef08a] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-outfit font-black text-lg text-black mb-1">Fast Playback</h3>
              <p className="text-xs font-jakarta font-medium text-black/70">
                Adaptive bitrate streaming optimized for low-bandwidth mobile devices.
              </p>
            </div>

            <div className="bg-[#f0fdf4] border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#bfdbfe] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <Star className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-outfit font-black text-lg text-black mb-1">Standard Tags</h3>
              <p className="text-xs font-jakarta font-medium text-black/70">
                Categorized by class, subject, and chapter for effortless student discovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedVideos = () => (
  <AdminProtectedRoute>
    <Videos />
  </AdminProtectedRoute>
);

export default ProtectedVideos;
