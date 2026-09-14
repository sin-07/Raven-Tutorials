'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Filter, BookOpen, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { STANDARDS } from '@/constants/classes';

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
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
              <BookOpen size={14} className="text-black" />
              <span>Resources & Notes</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
              Study Materials 📚
            </h1>
            <p className="text-black/80 font-jakarta font-semibold mt-1">
              Upload, organize, and distribute PDF guides and notes to students
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="inline-flex items-center justify-center gap-2 bg-[#fef08a] text-black border-2 border-black px-6 py-3 rounded-2xl font-outfit font-black text-base shadow-[4px_4px_0px_#000] hover:bg-[#fde047] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {showUploadForm ? <X size={20} /> : <Upload size={20} />}
            {showUploadForm ? 'Close Form' : 'Upload Material'}
          </button>
        </div>

        {/* Upload Form Card */}
        {showUploadForm && (
          <div className="bg-[#f0fdf4] rounded-3xl shadow-[6px_6px_0px_#000] p-6 md:p-8 border-3 border-black">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <Upload size={20} className="text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-outfit font-black text-black">Upload New Material</h2>
                  <p className="text-xs font-space font-bold text-black/60 uppercase">Add PDF guide for standard & subject</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-space font-black uppercase text-black mb-2">
                    Title <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400"
                    placeholder="e.g., Chapter 5 - Quadratic Equations"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-space font-black uppercase text-black mb-2">
                    Class / Standard <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-space font-black uppercase text-black mb-2">
                    Subject <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-space font-black uppercase text-black mb-2">
                    PDF File <span className="text-rose-600">* (Max 10MB)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-semibold text-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-2 file:border-black file:text-xs file:font-outfit file:font-black file:bg-[#fef08a] file:cursor-pointer shadow-[2px_2px_0px_#000]"
                    required
                  />
                  {formData.file && (
                    <p className="text-xs font-mono font-bold text-black mt-2 bg-[#dcfce7] p-1.5 rounded-lg border border-black inline-block">
                      ✓ Selected: {formData.file.name} ({(formData.file.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-space font-black uppercase text-black mb-2">
                  Description / Topic Summary
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400"
                  placeholder="Brief description of the material, key topics covered, or instructions for students..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#86efac] text-black border-2 border-black px-6 py-3 rounded-xl font-outfit font-black text-base shadow-[3px_3px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {loading ? 'Uploading PDF...' : 'Upload Material 🚀'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="bg-white text-black border-2 border-black px-6 py-3 rounded-xl font-outfit font-black text-base shadow-[3px_3px_0px_#000] hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[5px_5px_0px_#000]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#86efac] border-2 border-black flex items-center justify-center">
              <Filter size={16} className="text-black" />
            </div>
            <h3 className="font-outfit font-black text-lg text-black">Filter Study Materials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-space font-black uppercase text-black mb-1">Standard / Class</label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f0fdf4] border-2 border-black rounded-xl text-black font-jakarta font-bold focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-space font-black uppercase text-black mb-1">Subject</label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f0fdf4] border-2 border-black rounded-xl text-black font-jakarta font-bold focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
              >
                <option value="">All Subjects</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Materials Container */}
        <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="p-4 md:p-5 bg-[#86efac] border-b-3 border-black flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-black" />
              <h3 className="font-outfit font-black text-xl text-black">
                Uploaded Materials ({materials.length})
              </h3>
            </div>
          </div>

          <div className="divide-y-2 divide-black">
            {materials.length === 0 ? (
              <div className="p-12 text-center bg-[#f0fdf4] m-4 rounded-2xl border-2 border-dashed border-black/30">
                <FileText size={48} className="mx-auto mb-3 text-black/40" />
                <p className="font-outfit font-black text-lg text-black">No study materials found</p>
                <p className="text-sm font-jakarta font-medium text-black/60 mt-1">
                  Upload PDF study guides or clear the filters to see all resources.
                </p>
              </div>
            ) : (
              materials.map(material => (
                <div key={material._id} className="p-5 hover:bg-[#f0fdf4]/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#dcfce7] border-2 border-black text-black px-2.5 py-0.5 rounded-lg text-xs font-space font-black uppercase">
                          {material.class}
                        </span>
                        <span className="bg-[#fef08a] border-2 border-black text-black px-2.5 py-0.5 rounded-lg text-xs font-space font-black uppercase">
                          {material.subject}
                        </span>
                        <span className="bg-neutral-100 border border-black text-black font-mono text-xs px-2 py-0.5 rounded-md">
                          {formatFileSize(material.fileSize)}
                        </span>
                        <span className="bg-neutral-100 border border-black text-black font-mono text-xs px-2 py-0.5 rounded-md hidden sm:inline-block">
                          {new Date(material.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-outfit font-black text-xl text-black mt-2">
                        {material.title}
                      </h4>
                      {material.description && (
                        <p className="text-sm font-jakarta font-medium text-black/70 mt-1 max-w-2xl">
                          {material.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#86efac] text-black border-2 border-black px-3.5 py-2 rounded-xl font-outfit font-black text-sm shadow-[2px_2px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                        title="Download PDF"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="inline-flex items-center justify-center p-2 bg-rose-100 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-200 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                        title="Delete Material"
                      >
                        <Trash2 size={18} />
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
