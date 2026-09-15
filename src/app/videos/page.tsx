'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Clock, User, Video, Filter, Sparkles, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentProtectedRoute } from '@/components';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface VideoData {
  _id: string;
  title: string;
  description?: string;
  subject: string;
  standard: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
  viewCount?: number;
  tags?: string[];
  uploadedBy?: {
    name: string;
  };
  createdAt: string;
}

function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  // Freeze background when video modal is open
  useBodyScrollLock(!!selectedVideo);
  const [studentStandard, setStudentStandard] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

  // Fetch Videos for Student's Standard
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/videos/student/standard');

      if (!response.ok) throw new Error('Failed to fetch videos');
      const data = await response.json();
      setVideos(data.data || []);

      if (data.data?.length > 0) {
        setStudentStandard(data.data[0].standard);
      }
    } catch (error) {
      toast.error('Error fetching videos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  // Filter Videos
  const filteredVideos = videos.filter(video => {
    const matchesSubject = !filterSubject || video.subject === filterSubject;
    return matchesSubject;
  });

  // Group videos by subject
  const groupedVideos: Record<string, VideoData[]> = {};
  filteredVideos.forEach(video => {
    if (!groupedVideos[video.subject]) {
      groupedVideos[video.subject] = [];
    }
    groupedVideos[video.subject].push(video);
  });

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-black border-t-[#86efac] rounded-full animate-spin mx-auto mb-4" />
          <h3 className="font-outfit font-black text-xl text-black">Loading Video Vault</h3>
          <p className="font-jakarta font-medium text-black/60 text-sm mt-1">Preparing your class playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fcf8] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
              <Video size={14} className="text-black" />
              <span>Video Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-black text-black tracking-tight">
              Recorded Video Lectures
            </h1>
            <p className="text-black/80 font-jakarta font-semibold mt-1">
              Watch curated topic explanations, chapter summaries, and revision masterclasses
            </p>
          </div>

          {studentStandard && (
            <div className="self-start md:self-auto bg-white border-2 border-black px-4 py-2 rounded-2xl shadow-[3px_3px_0px_#000] text-center">
              <span className="text-[10px] font-space font-black uppercase text-black/60 block">Enrolled</span>
              <span className="font-outfit font-black text-black text-base">Class {studentStandard}</span>
            </div>
          )}
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shrink-0">
              <Filter size={16} className="text-black" />
            </div>
            <span className="font-outfit font-black text-black text-base">Filter by Subject:</span>
          </div>

          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setFilterSubject('')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-outfit font-black border-2 border-black transition-all cursor-pointer ${
                filterSubject === ''
                  ? 'bg-[#fef08a] shadow-[2px_2px_0px_#000]'
                  : 'bg-[#f0fdf4] hover:bg-[#dcfce7]'
              }`}
            >
              All Subjects
            </button>
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setFilterSubject(subject)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-outfit font-black border-2 border-black transition-all cursor-pointer ${
                  filterSubject === subject
                    ? 'bg-[#fef08a] shadow-[2px_2px_0px_#000]'
                    : 'bg-[#f0fdf4] hover:bg-[#dcfce7]'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {Object.keys(groupedVideos).length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-3 border-black shadow-[6px_6px_0px_#000]">
            <Video size={48} className="text-black/30 mx-auto mb-3" />
            <h3 className="font-outfit font-black text-xl text-black">No Videos Available</h3>
            <p className="text-sm font-jakarta font-medium text-black/60 mt-1">
              Check back soon for new lecture recordings or choose a different subject filter.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedVideos).map(([subject, subjectVideos]) => (
              <div key={subject} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#86efac] border-2 border-black inline-block" />
                  <h2 className="text-2xl font-outfit font-black text-black">{subject}</h2>
                  <span className="text-xs font-space font-bold uppercase bg-white border border-black px-2 py-0.5 rounded-md">
                    {subjectVideos.length} Lecture{subjectVideos.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjectVideos.map(video => (
                    <div
                      key={video._id}
                      className="bg-white rounded-3xl border-3 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:translate-y-[-2px] transition-all overflow-hidden cursor-pointer flex flex-col justify-between"
                      onClick={() => setSelectedVideo(video)}
                    >
                      {/* Video Thumbnail */}
                      <div className="relative w-full h-44 bg-neutral-100 border-b-3 border-black overflow-hidden group">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#dcfce7]">
                            <Video size={44} className="text-black/60" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:scale-110 transition-transform">
                            <Play size={22} className="text-black fill-black ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Video Content Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#dcfce7] border border-black text-black px-2 py-0.5 rounded-md text-[10px] font-space font-black uppercase">
                              {video.subject}
                            </span>
                            <span className="bg-[#fef08a] border border-black text-black px-2 py-0.5 rounded-md text-[10px] font-space font-black uppercase">
                              Class {video.standard}
                            </span>
                          </div>
                          <h3 className="font-outfit font-black text-black text-lg line-clamp-2 mb-1.5">
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="text-xs font-jakarta font-medium text-black/70 line-clamp-2 mb-4">
                              {video.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-mono font-bold text-black/60">
                          {video.duration ? (
                            <span className="flex items-center gap-1">
                              <Clock size={13} className="text-black" />
                              {formatDuration(video.duration)}
                            </span>
                          ) : (
                            <span>Lecture</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye size={13} className="text-black" />
                            {video.viewCount || 0} views
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overscroll-contain">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] max-w-4xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border-3 border-black">
              {/* Header */}
              <div className="sticky top-0 bg-[#86efac] p-5 border-b-3 border-black flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5 max-w-[85%]">
                  <Video size={20} className="text-black shrink-0" />
                  <h2 className="text-xl font-outfit font-black text-black truncate">{selectedVideo.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Player Body */}
              <div className="p-6 space-y-6">
                <div className="w-full bg-black rounded-2xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_#000]">
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
                  <div className="bg-white rounded-xl p-3 border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                    <p className="text-[10px] font-space font-black uppercase text-black/60">Subject</p>
                    <p className="font-outfit font-black text-black text-sm">{selectedVideo.subject}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                    <p className="text-[10px] font-space font-black uppercase text-black/60">Standard</p>
                    <p className="font-outfit font-black text-black text-sm">Class {selectedVideo.standard}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                    <p className="text-[10px] font-space font-black uppercase text-black/60">Duration</p>
                    <p className="font-outfit font-black text-black text-sm">{formatDuration(selectedVideo.duration)}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                    <p className="text-[10px] font-space font-black uppercase text-black/60">Total Views</p>
                    <p className="font-outfit font-black text-black text-sm">{selectedVideo.viewCount || 0}</p>
                  </div>
                </div>

                {/* Description */}
                {selectedVideo.description && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                    <h3 className="font-outfit font-black text-sm uppercase text-black mb-1">Lecture Overview:</h3>
                    <p className="text-sm font-jakarta font-medium text-black/80 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-full bg-[#fef08a] hover:bg-[#fde047] text-black py-3 rounded-xl border-2 border-black font-outfit font-black text-base shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
