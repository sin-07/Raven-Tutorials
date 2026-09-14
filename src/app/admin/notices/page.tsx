'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Megaphone, User, Trash2, FileText, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';

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
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
            <Megaphone size={14} className="text-black" />
            <span>Official Announcements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
            Notice Board 📢
          </h1>
          <p className="text-black/80 font-jakarta font-semibold mt-1">
            Broadcast institute circulars, holiday announcements, and exam schedules
          </p>
        </div>

        {/* Post Notice Card */}
        <div className="bg-[#f0fdf4] rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
            <div className="w-10 h-10 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Sparkles size={20} className="text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-outfit font-black text-black">Post a New Notice</h2>
              <p className="text-xs font-space font-bold uppercase text-black/60">Broadcast to all or target classes</p>
            </div>
          </div>

          <form onSubmit={handlePost} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                Notice Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Mid-Term Examination Schedule Announcement"
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                Notice Message <span className="text-rose-600">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write full announcement details, instructions, or exam timings..."
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400 text-sm"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                  Attachment Document (Optional)
                </label>
                <input
                  type="file"
                  name="document"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-2 file:border-black file:text-xs file:font-outfit file:font-black file:bg-[#fef08a] file:cursor-pointer shadow-[2px_2px_0px_#000] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                  Target Class / Standard
                </label>
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black font-jakarta font-bold focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] text-sm"
                >
                  <option value="All">All Classes (General Announcement)</option>
                  {STANDARDS.map(std => (
                    <option key={std} value={std}>{STANDARD_LABELS[std]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={posting}
                className="bg-[#86efac] text-black border-2 border-black px-6 py-3 rounded-xl font-outfit font-black text-base shadow-[3px_3px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <Send size={18} />
                <span>{posting ? 'Broadcasting Notice...' : 'Broadcast Notice 🚀'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notice Board Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-outfit font-black text-black">Active Notices Feed ({notices.length})</h3>
          </div>

          {loading ? (
            <div className="text-center py-12 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000]">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-[#86efac] mx-auto"></div>
              <p className="font-outfit font-bold text-black mt-3">Loading notices...</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-8">
              <Megaphone size={40} className="text-black/30 mx-auto mb-2" />
              <p className="font-outfit font-black text-xl text-black">No notices published yet</p>
              <p className="text-sm font-jakarta font-medium text-black/60 mt-1">
                Use the form above to publish your first institute notice.
              </p>
            </div>
          ) : (
            notices.map(notice => (
              <div 
                key={notice._id} 
                className="bg-white rounded-3xl p-6 border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-[#dcfce7] border-2 border-black px-3 py-1 rounded-full text-xs font-space font-black uppercase shadow-[1px_1px_0px_#000]">
                      <User size={12} className="text-black" />
                      <span>{notice.postedBy}</span>
                    </div>
                    <span className="bg-[#fef08a] border-2 border-black px-3 py-1 rounded-full text-xs font-space font-black uppercase text-black shadow-[1px_1px_0px_#000]">
                      {notice.class === 'All' ? '📢 All Classes' : `Class ${notice.class}`}
                    </span>
                    <span className="text-xs font-mono font-bold text-black/60 ml-1">
                      {new Date(notice.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="self-end sm:self-auto p-2 bg-rose-100 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-200 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                    title="Delete Notice"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 className="text-2xl font-outfit font-black text-black mb-2">{notice.title}</h3>
                <p className="text-black/80 font-jakarta font-medium text-sm whitespace-pre-line leading-relaxed">
                  {notice.message}
                </p>

                {notice.documentUrl && (
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-black/20">
                    <a
                      href={notice.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#86efac] text-black border-2 border-black rounded-xl font-outfit font-black text-xs shadow-[2px_2px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 transition-all"
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
