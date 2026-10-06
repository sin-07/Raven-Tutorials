'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Filter, BookOpen, Sparkles, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { STANDARDS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';

interface MaterialData {
  _id: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  fileUrl: string;
  fileSize: number;
  createdAt: string;
}

interface FormDataState {
  title: string;
  description: string;
  class: string;
  subject: string;
  file: File | null;
}

const StudyMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    class: '',
    subject: '',
    file: null
  });

  const classes = STANDARDS;
  const subjects = ['Mathematics', 'Social Science', 'Biology', 'Chemistry', 'Physics', 'English'];

  useEffect(() => {
    fetchMaterials();
  }, [filterClass, filterSubject]);

  const fetchMaterials = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filterClass) queryParams.append('class', filterClass);
      if (filterSubject) queryParams.append('subject', filterSubject);

      const res = await fetch(`/api/admin/study-materials?${queryParams}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMaterials(data.data);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    } else {
      toast.error('Please select a PDF file');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.class || !formData.subject || !formData.file) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('class', formData.class);
      uploadData.append('subject', formData.subject);
      uploadData.append('file', formData.file);

      const res = await fetch('/api/admin/study-materials/upload', {
        method: 'POST',
        credentials: 'include',
        body: uploadData
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Study material uploaded successfully!');
        setFormData({ title: '', description: '', class: '', subject: '', file: null });
        setShowUploadForm(false);
        fetchMaterials();
      } else {
        toast.error(data.message || 'Failed to upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading material');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;

    try {
      const res = await fetch(`/api/admin/study-materials/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Material deleted successfully');
        fetchMaterials();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting material');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#e8602e]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7a45]/10 border border-[#ff7a45]/30 text-[#ffaa40] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                <BookOpen size={14} />
                <span>Resources & Notes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Study Materials
              </h1>
              <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                Upload, organize, and distribute PDF guides and notes to students
              </p>
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit px-5 py-3 rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(232,96,46,0.35)] text-sm transition-all cursor-pointer"
            >
              {showUploadForm ? <X size={18} /> : <Upload size={18} />}
              {showUploadForm ? 'Close Form' : 'Upload Material'}
            </button>
          </div>
        </div>

        {/* Upload Form Card */}
        {showUploadForm && (
          <div className="bg-[#0c0f1c] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 md:p-8 border border-white/15 text-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff7a45]/15 border border-[#ff7a45]/30 flex items-center justify-center shadow-sm text-[#ffaa40]">
                  <Upload size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-outfit text-white">Upload New Material</h2>
                  <p className="text-xs font-space font-bold text-zinc-400 uppercase">Add PDF guide for standard & subject</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-2">
                    Title <span className="text-[#ff7a45]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#ff7a45] placeholder-zinc-500 text-sm"
                    placeholder="e.g., Chapter 5 - Quadratic Equations"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-2">
                    Class / Standard <span className="text-[#ff7a45]">*</span>
                  </label>
                  <CartoonDropdown
                    value={formData.class}
                    onChange={(val) => setFormData(prev => ({ ...prev, class: val }))}
                    placeholder="Select Class"
                    options={[
                      { value: '', label: 'Select Class' },
                      ...classes.map(cls => ({ value: cls, label: cls }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-2">
                    Subject <span className="text-[#ff7a45]">*</span>
                  </label>
                  <CartoonDropdown
                    value={formData.subject}
                    onChange={(val) => setFormData(prev => ({ ...prev, subject: val }))}
                    placeholder="Select Subject"
                    options={[
                      { value: '', label: 'Select Subject' },
                      ...subjects.map(sub => ({ value: sub, label: sub }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-2">
                    PDF File <span className="text-[#ffaa40]">* (Max 10MB)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-zinc-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border file:border-white/10 file:text-xs file:font-outfit file:font-bold file:bg-[#ff7a45]/20 file:text-[#ffaa40] file:cursor-pointer text-sm"
                    required
                  />
                  {formData.file && (
                    <p className="text-xs font-mono font-medium text-emerald-400 mt-2 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30 inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected: {formData.file.name} ({(formData.file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-2">
                  Description / Topic Summary
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#ff7a45] placeholder-zinc-500 text-sm"
                  placeholder="Brief description of the material, key topics covered, or instructions for students..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white border border-white/10 px-6 py-3 rounded-xl font-outfit font-bold text-sm shadow-[0_8px_20px_rgba(232,96,46,0.35)] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {loading ? 'Uploading PDF...' : 'Upload Material'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="bg-white/5 text-zinc-300 border border-white/10 px-6 py-3 rounded-xl font-outfit font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Controls Card */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff7a45]/15 border border-[#ff7a45]/30 flex items-center justify-center text-[#ffaa40]">
              <Filter size={16} />
            </div>
            <h3 className="font-outfit font-bold text-lg text-white">Filter Study Materials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-400 mb-1">Standard / Class</label>
              <CartoonDropdown
                value={filterClass}
                onChange={(val) => setFilterClass(val)}
                placeholder="All Classes"
                options={[
                  { value: '', label: 'All Classes' },
                  ...classes.map(cls => ({ value: cls, label: cls }))
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-400 mb-1">Subject</label>
              <CartoonDropdown
                value={filterSubject}
                onChange={(val) => setFilterSubject(val)}
                placeholder="All Subjects"
                options={[
                  { value: '', label: 'All Subjects' },
                  ...subjects.map(sub => ({ value: sub, label: sub }))
                ]}
              />
            </div>
          </div>
        </div>

        {/* Materials Container */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="p-4 md:p-5 bg-[#0f1222] border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#ffaa40]" />
              <h3 className="font-outfit font-bold text-lg text-white">
                Uploaded Materials ({materials.length})
              </h3>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {materials.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={44} className="mx-auto mb-3 text-zinc-600" />
                <p className="font-outfit font-bold text-lg text-white">No study materials found</p>
                <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1">
                  Upload PDF study guides or clear the filters to see all resources.
                </p>
              </div>
            ) : (
              materials.map(material => (
                <div key={material._id} className="p-5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="bg-[#ff7a45]/15 border border-[#ff7a45]/30 text-[#ffaa40] px-2.5 py-0.5 rounded-lg text-xs font-space font-bold uppercase">
                          {material.class}
                        </span>
                        <span className="bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded-lg text-xs font-space font-medium uppercase">
                          {material.subject}
                        </span>
                        <span className="bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs px-2 py-0.5 rounded-md">
                          {formatFileSize(material.fileSize)}
                        </span>
                        <span className="bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs px-2 py-0.5 rounded-md hidden sm:inline-block">
                          {new Date(material.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-outfit font-bold text-lg sm:text-xl text-white">
                        {material.title}
                      </h4>
                      {material.description && (
                        <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1 max-w-2xl">
                          {material.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white border border-white/10 px-4 py-2 rounded-xl font-outfit font-bold text-sm shadow-[0_4px_12px_rgba(232,96,46,0.3)] transition-all cursor-pointer"
                        title="Download PDF"
                      >
                        <Download size={15} />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="inline-flex items-center justify-center p-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/25 transition-colors cursor-pointer"
                        title="Delete Material"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedStudyMaterials = () => (
  <AdminProtectedRoute>
    <StudyMaterials />
  </AdminProtectedRoute>
);

export default ProtectedStudyMaterials;
