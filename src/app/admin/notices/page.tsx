'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone, User, Trash2, FileText, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import Loader from '@/components/Loader';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';

interface Notice {
  _id: string;
  title: string;
  message: string;
  class: string;
  postedBy: string;
  documentUrl?: string;
  documentName?: string;
  createdAt: string;
}

interface FormData {
  title: string;
  message: string;
  class: string;
  document: File | null;
}

function AdminNoticesPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormData>({ title: '', message: '', class: 'All', document: null });
  const [posting, setPosting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, document: e.target.files?.[0] || null });
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('message', form.message);
      formData.append('class', form.class);
      if (form.document) {
        formData.append('document', form.document);
      }
      const res = await fetch('/api/notices', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Notice broadcast successfully!');
        setForm({ title: '', message: '', class: 'All', document: null });
        fetchNotices();
      } else {
        toast.error(data.message || 'Failed to post notice');
      }
    } catch {
      toast.error('Error posting notice');
    }
    setPosting(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Notice deleted successfully');
        fetchNotices();
      } else {
        toast.error(data.message || 'Failed to delete notice');
      }
    } catch {
      toast.error('Error deleting notice');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
              <Megaphone size={14} />
              <span>Official Announcements</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
              Notice Board
            </h1>
            <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
              Broadcast institute circulars, holiday announcements, and exam schedules
            </p>
          </div>
        </div>

        {/* Post Notice Card */}
        <div className="bg-[#0c0f1c] rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#6ee7b7] shadow-sm">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-outfit text-white">Post a New Notice</h2>
              <p className="text-xs font-space font-bold uppercase text-zinc-400">Broadcast to all or target classes</p>
            </div>
          </div>

          <form onSubmit={handlePost} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                Notice Title <span className="text-[#34d399]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Mid-Term Examination Schedule Announcement"
                className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                Notice Message <span className="text-[#34d399]">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write full announcement details, instructions, or exam timings..."
                className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                  Attachment Document (Optional)
                </label>
                <input
                  type="file"
                  name="document"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-zinc-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border file:border-white/10 file:text-xs file:font-outfit file:font-bold file:bg-[#34d399]/20 file:text-[#6ee7b7] file:cursor-pointer text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                  Target Class / Standard
                </label>
                <CartoonDropdown
                  value={form.class}
                  onChange={(val) => setForm(prev => ({ ...prev, class: val }))}
                  options={[
                    { value: 'All', label: 'All Classes (General Announcement)' },
                    ...STANDARDS.map(std => ({
                      value: std,
                      label: STANDARD_LABELS[std] || std,
                    }))
                  ]}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={posting}
                className="bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white border border-white/10 px-6 py-3 rounded-xl font-outfit font-bold text-sm shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <Send size={16} />
                <span>{posting ? 'Broadcasting Notice...' : 'Broadcast Notice'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notice Board Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-outfit font-bold text-white">Active Notices Feed ({notices.length})</h3>
          </div>

          {loading ? (
            <div className="py-16">
              <Loader size="lg" text="Loading Notices..." subtitle="Syncing official announcements" />
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12 bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-8">
              <Megaphone size={40} className="text-zinc-600 mx-auto mb-2" />
              <p className="font-outfit font-bold text-xl text-white">No notices published yet</p>
              <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1">
                Use the form above to publish your first institute notice.
              </p>
            </div>
          ) : (
            notices.map(notice => (
              <div 
                key={notice._id} 
                className="bg-[#0b0e1a]/90 rounded-2xl p-6 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all text-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-space font-medium uppercase text-zinc-300">
                      <User size={12} className="text-[#6ee7b7]" />
                      <span>{notice.postedBy}</span>
                    </div>
                    <span className="bg-[#34d399]/15 border border-[#34d399]/30 px-3 py-1 rounded-full text-xs font-space font-bold uppercase text-[#6ee7b7] inline-flex items-center gap-1">
                      <Megaphone size={12} />
                      <span>{notice.class === 'All' ? 'All Classes' : `Class ${notice.class}`}</span>
                    </span>
                    <span className="text-xs font-mono font-medium text-zinc-400 ml-1">
                      {new Date(notice.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="self-end sm:self-auto p-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/25 transition-colors cursor-pointer"
                    title="Delete Notice"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-2">{notice.title}</h3>
                <p className="text-zinc-300 font-jakarta font-medium text-sm whitespace-pre-line leading-relaxed">
                  {notice.message}
                </p>

                {notice.documentUrl && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <a
                      href={notice.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white border border-white/10 rounded-xl font-outfit font-bold text-xs shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>{notice.documentName || 'Download Attachment Document'}</span>
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// Wrap with AdminProtectedRoute for security
export default function ProtectedAdminNoticesPage() {
  return (
    <AdminProtectedRoute>
      <AdminNoticesPage />
    </AdminProtectedRoute>
  );
}
