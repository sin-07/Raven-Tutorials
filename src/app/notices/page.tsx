'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Megaphone, User, Clock, Download, Eye, AlertCircle, Sparkles, X, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface NoticeData {
  _id: string;
  title: string;
  message: string;
  postedBy?: string;
  class?: string;
  documentUrl?: string;
  createdAt: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<NoticeData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Freeze background when notice popup is open
  useBodyScrollLock(modalOpen && !!selectedNotice);

  useEffect(() => {
    setMounted(true);
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotices(data.data);
      } else {
        toast.error('Failed to load notices');
      }
    } catch {
      toast.error('Error fetching notices');
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const openNoticeModal = (notice: NoticeData) => {
    setSelectedNotice(notice);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedNotice(null), 300);
  };

  return (
    <>
      <div className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-14 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#e8602e]/30 text-[#ff7b47] text-xs sm:text-sm font-space font-bold shadow-[0_0_15px_rgba(232,96,46,0.2)] mx-auto">
              <Sparkles className="w-4 h-4 text-[#e8602e]" />
              <span>Official Announcements</span>
            </div>

            <WavyHeading
              text="Institute"
              gradientText="Notice Board"
              className="text-4xl sm:text-6xl font-black text-white font-outfit tracking-tight leading-[1.1] text-center w-full"
            />

            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium text-center">
              Stay up to date with exam schedules, class announcements, test dates, and holiday circulars.
            </p>
          </div>

          {/* Notices List */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-[#e8602e]" />
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 p-8 max-w-md mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#e8602e]/30 flex items-center justify-center mx-auto mb-4 text-[#ff7b47] shadow-[0_0_15px_rgba(232,96,46,0.2)]">
                <Megaphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white font-outfit mb-2">No Active Notices</h3>
              <p className="text-neutral-400 text-sm font-jakarta font-medium">
                All announcements and notices will appear here as soon as they are published.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  onClick={() => openNoticeModal(notice)}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0f111a]/85 hover:bg-[#131622] border border-white/10 hover:border-[#e8602e]/50 shadow-xl hover:shadow-[0_0_25px_rgba(232,96,46,0.25)] hover:-translate-y-1 cursor-pointer group transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-[#1a1412] text-[#ffaa40] text-xs font-bold font-space uppercase border border-[#ffaa40]/30 shadow-sm">
                          {notice.class ? `Class ${notice.class}` : 'General Notice'}
                        </span>
                        <span className="text-xs text-neutral-400 flex items-center gap-1 font-jakarta font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#ff7b47]" />
                          {formatDate(notice.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition-colors">
                        {notice.title}
                      </h3>

                      <p className="text-neutral-400 text-sm font-jakarta line-clamp-2 leading-relaxed font-medium">
                        {notice.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="text-xs font-black text-[#ff7b47] group-hover:text-[#ffaa40] font-outfit flex items-center gap-1 transition-colors">
                        <span>Read Notice</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notice Reader Modal */}
      {mounted && modalOpen && selectedNotice && createPortal(
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[999999] p-4 sm:p-6 overflow-y-auto overscroll-contain"
          onClick={closeModal}
        >
          <div
            className="bg-[#0f111a] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto overscroll-contain border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6 relative z-[1000000] my-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#1a1412] text-[#ffaa40] text-xs font-bold font-space uppercase border border-[#ffaa40]/30 shadow-sm">
                  {selectedNotice.class ? `Class ${selectedNotice.class}` : 'General Circular'}
                </span>
                <h2 className="text-2xl font-black text-white font-outfit mt-2">
                  {selectedNotice.title}
                </h2>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 font-jakarta font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#ff7b47]" />
                  Published: {formatDate(selectedNotice.createdAt)}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-[#161922] text-white border border-white/10 shadow-lg hover:text-[#e8602e] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-jakarta text-sm sm:text-base text-neutral-300 font-medium leading-relaxed whitespace-pre-wrap">
              {selectedNotice.message}
            </div>

            {selectedNotice.documentUrl && (
              <div className="pt-4 border-t border-white/10">
                <a
                  href={selectedNotice.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheryians inline-flex items-center gap-2 px-6 py-3 text-sm font-outfit shadow-[0_0_20px_rgba(232,96,46,0.35)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Attached Document</span>
                </a>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      <LMSFooter />
    </>
  );
};

export default Notice;
