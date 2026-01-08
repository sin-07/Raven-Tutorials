'use client';

import React, { useEffect, useState } from 'react';
import { Megaphone, User, Clock, Download, Eye, AlertCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from '@/components/Footer';

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

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      if (data.success) setNotices(data.data);
      else toast.error('Failed to load notices');
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
      <div className="min-h-screen bg-blue-50 py-8 pt-20 sm:py-12 sm:pt-24 md:py-16 md:pt-28">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes modalBackdropFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .notice-card { animation: fadeIn 0.5s ease-out forwards; }
          .notice-header { animation: slideInLeft 0.6s ease-out; }
          .notice-biscuit { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
          .notice-biscuit:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(124, 58, 237, 0.2); border-color: rgba(124, 58, 237, 0.4); }
          .modal-backdrop { animation: modalBackdropFadeIn 0.3s ease-out; backdrop-filter: blur(8px); }
          .modal-content { animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .document-link { transition: all 0.3s ease; }
          .document-link:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); }
          .blur-background { filter: blur(4px); transition: filter 0.3s ease-out; }
        `}</style>

        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${modalOpen ? 'blur-background' : ''}`}>
          {/* Header */}
          <div className="notice-header mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Megaphone size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Institute Notices
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">Important announcements and updates</p>
              </div>
            </div>
          </div>

          {/* Notices Grid */}
          <div>
            {loading ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-600 mt-4 text-lg">Loading notices...</p>
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <Megaphone size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No notices yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for important updates!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {notices.map((notice, index) => (
                  <div 
                    key={notice._id} 
                    className="notice-card notice-biscuit bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 overflow-hidden"
                    style={{ '--index': index } as React.CSSProperties}
                    onClick={() => openNoticeModal(notice)}
                  >
                    {/* Category Badge */}
                    <div className="flex items-start justify-between mb-3">
                      {notice.class && (
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {notice.class}
                        </div>
                      )}
                      {notice.documentUrl && (
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Eye size={16} className="text-green-600" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {notice.title}
                    </h3>

                    {/* Message Preview */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {notice.message}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={14} />
                        <span className="truncate">{formatDate(notice.createdAt)}</span>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                        View More
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && selectedNotice && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-50 px-6 sm:px-8 py-5 sm:py-6 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <Megaphone size={20} className="text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notice Details</h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{formatDate(selectedNotice.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                {/* Posted By */}
                <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Posted by</p>
                    <p className="font-bold text-gray-900 truncate">{selectedNotice.postedBy || 'Administrator'}</p>
                  </div>
                  {selectedNotice.class && (
                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold flex-shrink-0">
                      {selectedNotice.class}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {selectedNotice.title}
                </h1>

                {/* Message */}
                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {selectedNotice.message}
                  </p>
                </div>

                {/* Document Section */}
                {selectedNotice.documentUrl && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 sm:p-6">
                    <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Eye size={18} className="text-blue-600" />
                      Attached Document
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={selectedNotice.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="document-link flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm sm:text-base flex-1"
                      >
                        <Eye size={18} />
                        View Document
                      </a>
                      <a
                        href={selectedNotice.documentUrl}
                        download
                        className="document-link flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-200 flex-1"
                      >
                        <Download size={18} />
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Notice;
