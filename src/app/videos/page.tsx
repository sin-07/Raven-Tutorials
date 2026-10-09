'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Clock, Eye, Filter, Play, X } from 'lucide-react';
import StudentProtectedRoute from '@/components/StudentProtectedRoute';
import Loader from '@/components/Loader';

interface VideoItem {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  standard: string;
  subject: string;
  duration?: number;
  thumbnail?: string;
  viewCount?: number;
  isPublished: boolean;
  createdAt: string;
}

function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [studentStandard, setStudentStandard] = useState<string>('');

  useEffect(() => {
    fetchStudentProfileAndVideos();
  }, []);

  const fetchStudentProfileAndVideos = async () => {
    try {
      setLoading(true);
      const [profileRes, videoRes] = await Promise.all([
        fetch('/api/auth/verify'),
        fetch('/api/admin/videos/student/standard')
      ]);

      const [profileData, videoData] = await Promise.all([
        profileRes.json().catch(() => ({})),
        videoRes.json().catch(() => ({}))
      ]);

      if (profileData?.success && profileData?.user?.standard) {
        setStudentStandard(profileData.user.standard);
      }

      if (videoData?.success) {
        setVideos(videoData.videos || []);
      }
    } catch (err) {
      console.error('Failed to load videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const subjects = Array.from(new Set(videos.map(v => v.subject))).filter(Boolean);

  const filteredVideos = videos.filter(v => {
    if (!filterSubject) return true;
    return v.subject.toLowerCase() === filterSubject.toLowerCase();
  });

  const groupedVideos = filteredVideos.reduce((acc, video) => {
    const sub = video.subject || 'General Studies';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(video);
    return acc;
  }, {} as Record<string, VideoItem[]>);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '—';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  if (loading) {
    return (
      <Loader
        fullScreen
        size="lg"
        text="Loading Video Vault"
        subtitle="Preparing your class playlist..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#121422] to-[#181c2e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#10b981]/15 border border-[#10b981]/30 px-3 py-1 rounded-full text-xs font-space font-bold uppercase mb-2 text-[#34d399]">
              <Video size={14} />
              <span>Video Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-black text-white tracking-tight">
              Recorded Video Lectures
            </h1>
            <p className="text-zinc-400 font-jakarta font-medium mt-1">
              Watch curated topic explanations, chapter summaries, and revision masterclasses
            </p>
          </div>

          {studentStandard && (
            <div className="self-start md:self-auto bg-[#121522] border border-white/10 px-4 py-2 rounded-2xl text-center">
              <span className="text-[10px] font-space font-bold uppercase text-zinc-400 block">Enrolled</span>
              <span className="font-outfit font-bold text-white text-base">Class {studentStandard}</span>
            </div>
          )}
        </div>

        {/* Filter Controls Card */}
        <div className="bg-[#0f111a] rounded-3xl p-5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#34d399] shrink-0">
              <Filter size={16} />
            </div>
            <span className="font-outfit font-bold text-white text-base">Filter by Subject:</span>
          </div>

          <div className="inline-flex gap-1.5 p-1 rounded-full bg-[#0b0e18] border border-white/10 flex-wrap w-full sm:w-auto relative">
            <button
              onClick={() => setFilterSubject('')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-outfit font-bold transition-colors duration-200 cursor-pointer z-10 ${
                filterSubject === ''
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {filterSubject === '' && (
                <motion.div
                  layoutId="videoSubjectTabSlider"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#059669] to-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.45)] z-[-1]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span>All Subjects</span>
            </button>
            {subjects.map(subject => {
              const isActive = filterSubject === subject;
              return (
                <button
                  key={subject}
                  onClick={() => setFilterSubject(subject)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-outfit font-bold transition-colors duration-200 cursor-pointer z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="videoSubjectTabSlider"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#059669] to-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.45)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span>{subject}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Catalog */}
        <AnimatePresence mode="popLayout">
          {filteredVideos.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f111a] rounded-3xl p-12 border border-white/10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-xl mx-auto"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <Video size={28} />
              </div>
              <h3 className="font-outfit font-bold text-xl text-white">No Videos Available</h3>
              <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1">
                Check back soon for new lecture recordings or choose a different subject filter.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              key={filterSubject || 'all'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-10"
            >
              {Object.entries(groupedVideos).map(([subject, subjectVideos]) => (
                <div key={subject} className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)] inline-block" />
                    <h2 className="text-2xl font-outfit font-bold text-white">{subject}</h2>
                    <span className="text-xs font-space font-medium uppercase bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-zinc-400">
                      {subjectVideos.length} Lecture{subjectVideos.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjectVideos.map(video => (
                      <div
                        key={video._id}
                        className="bg-[#0f111a] rounded-3xl border border-white/10 hover:border-[#10b981]/50 hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.7)] transition-all overflow-hidden cursor-pointer flex flex-col justify-between group"
                        onClick={() => setSelectedVideo(video)}
                      >
                        {/* Video Thumbnail */}
                        <div className="relative w-full h-44 bg-[#141622] border-b border-white/10 overflow-hidden">
                          {video.thumbnail ? (
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#121422] to-[#1a1e30]">
                              <Video size={44} className="text-zinc-600" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform">
                              <Play size={20} className="text-white fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Video Content Info */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase">
                                {video.subject}
                              </span>
                              <span className="bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase">
                                Class {video.standard}
                              </span>
                            </div>
                            <h3 className="font-outfit font-bold text-white text-lg line-clamp-2 mb-1.5 group-hover:text-[#34d399] transition-colors">
                              {video.title}
                            </h3>
                            {video.description && (
                              <p className="text-xs font-jakarta font-medium text-zinc-400 line-clamp-2 mb-4">
                                {video.description}
                              </p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono font-medium text-zinc-500">
                            {video.duration ? (
                              <span className="flex items-center gap-1">
                                <Clock size={13} className="text-zinc-400" />
                                {formatDuration(video.duration)}
                              </span>
                            ) : (
                              <span>Lecture</span>
                            )}
                            <span className="flex items-center gap-1">
                              <Eye size={13} className="text-zinc-400" />
                              {video.viewCount || 0} views
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overscroll-contain">
            <div className="bg-[#0c0e17] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] max-w-4xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border border-white/10">
              {/* Header */}
              <div className="sticky top-0 bg-[#121422] p-5 border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5 max-w-[85%]">
                  <Video size={20} className="text-[#10b981] shrink-0" />
                  <h2 className="text-xl font-outfit font-bold text-white truncate">{selectedVideo.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center font-bold cursor-pointer transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Player Body */}
              <div className="p-6 space-y-6">
                <div className="w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
                  <iframe
                    width="100%"
                    height="450"
                    src={getEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                </div>

                {/* Details Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#121522] rounded-xl p-3 border border-white/10 text-center">
                    <p className="text-[10px] font-space font-medium uppercase text-zinc-500">Subject</p>
                    <p className="font-outfit font-bold text-white text-sm">{selectedVideo.subject}</p>
                  </div>
                  <div className="bg-[#121522] rounded-xl p-3 border border-white/10 text-center">
                    <p className="text-[10px] font-space font-medium uppercase text-zinc-500">Standard</p>
                    <p className="font-outfit font-bold text-white text-sm">Class {selectedVideo.standard}</p>
                  </div>
                  <div className="bg-[#121522] rounded-xl p-3 border border-white/10 text-center">
                    <p className="text-[10px] font-space font-medium uppercase text-zinc-500">Duration</p>
                    <p className="font-outfit font-bold text-white text-sm">{formatDuration(selectedVideo.duration)}</p>
                  </div>
                  <div className="bg-[#121522] rounded-xl p-3 border border-white/10 text-center">
                    <p className="text-[10px] font-space font-medium uppercase text-zinc-500">Total Views</p>
                    <p className="font-outfit font-bold text-white text-sm">{selectedVideo.viewCount || 0}</p>
                  </div>
                </div>

                {/* Description */}
                {selectedVideo.description && (
                  <div className="bg-[#121522] p-4 rounded-2xl border border-white/10">
                    <h3 className="font-outfit font-bold text-xs uppercase text-zinc-400 mb-1">Lecture Overview:</h3>
                    <p className="text-sm font-jakarta font-medium text-zinc-300 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="btn-sheryians w-full py-3 text-white rounded-xl font-outfit font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer transition"
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap with StudentProtectedRoute for security
export default function ProtectedVideosPage() {
  return (
    <StudentProtectedRoute>
      <VideosPage />
    </StudentProtectedRoute>
  );
}
