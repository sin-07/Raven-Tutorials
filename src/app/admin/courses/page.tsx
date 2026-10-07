'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Upload, BookOpen, Sparkles, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import Loader from '@/components/Loader';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  instructorQualification?: string;
  instructorAvatar?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  price: number;
  originalPrice?: number;
  thumbnail?: string;
  syllabus: string[];
  features: string[];
  isPublished: boolean;
  enrolledStudents: number;
  rating: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
}

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  instructorQualification: string;
  instructorAvatar: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  syllabus: string[];
  features: string[];
}

const initialFormData: CourseFormData = {
  title: '',
  description: '',
  instructor: '',
  instructorQualification: '',
  instructorAvatar: '',
  duration: '',
  level: 'Beginner',
  category: '',
  price: 0,
  originalPrice: 0,
  thumbnail: '',
  syllabus: [''],
  features: [''],
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Freeze background when modal is open
  useBodyScrollLock(showModal);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleArrayChange = (field: 'syllabus' | 'features', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'syllabus' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'syllabus' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          instructorAvatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const filteredSyllabus = formData.syllabus.filter(item => item.trim() !== '');
      const filteredFeatures = formData.features.filter(item => item.trim() !== '');

      const payload = {
        ...formData,
        syllabus: filteredSyllabus,
        features: filteredFeatures,
      };

      const url = editingCourse 
        ? `/api/admin/courses/${editingCourse._id}` 
        : '/api/admin/courses';
      
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingCourse ? 'Course updated successfully' : 'Course created successfully');
        setShowModal(false);
        setEditingCourse(null);
        setFormData(initialFormData);
        fetchCourses();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      instructorQualification: course.instructorQualification || '',
      instructorAvatar: course.instructorAvatar || '',
      duration: course.duration,
      level: course.level,
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice || 0,
      thumbnail: course.thumbnail || '',
      syllabus: course.syllabus.length > 0 ? course.syllabus : [''],
      features: course.features.length > 0 ? course.features : [''],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Course deleted successfully');
        fetchCourses();
      } else {
        toast.error(data.message || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  const togglePublish = async (course: Course) => {
    try {
      const response = await fetch(`/api/admin/courses/${course._id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(course.isPublished ? 'Course unpublished' : 'Course published');
        fetchCourses();
      } else {
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast.error('Failed to update course');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curriculum Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Courses & Batches
              </h1>
              <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                Create, edit, publish, and manage academic courses and syllabus
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit px-5 py-3 rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] text-sm transition-all cursor-pointer"
            >
              <Plus size={18} />
              <span>Add New Course</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search courses by title, instructor, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0b0e1a]/90 border border-white/10 rounded-2xl text-white placeholder-zinc-500 font-medium font-jakarta focus:outline-none focus:border-[#34d399] shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-sm"
          />
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size="lg" text="Loading Courses..." subtitle="Fetching active curriculum" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#0b0e1a]/90 border border-white/10 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-[#6ee7b7]">
              <BookOpen className="w-8 h-8" />
            </div>
            <p className="text-white font-bold text-xl font-outfit">No courses found</p>
            <p className="text-zinc-400 text-sm font-jakarta mt-1 mb-4">Start by creating your first academic course</p>
            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] inline-flex items-center gap-2 text-sm cursor-pointer transition-all"
            >
              <Plus size={16} />
              <span>Create Your First Course</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-[#0b0e1a]/90 rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-white/20 flex flex-col justify-between transition-all text-white"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-44 bg-[#070914] border-b border-white/10">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-1">
                        <BookOpen size={32} />
                        <span className="text-xs font-bold font-space uppercase">No Thumbnail</span>
                      </div>
                    )}
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg border text-xs font-bold font-space uppercase shadow-sm ${
                      course.isPublished ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#34d399]/15 border border-[#34d399]/30 text-[10px] font-bold uppercase font-space text-[#6ee7b7]">
                        {course.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium uppercase font-space text-zinc-300">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-outfit mb-1.5 line-clamp-1">{course.title}</h3>
                    <p className="text-zinc-400 font-medium font-jakarta text-xs mb-3 line-clamp-2 leading-relaxed">{course.description}</p>
                    
                    <div className="flex items-center gap-2.5 mb-3 p-2 bg-[#070914] rounded-xl border border-white/10">
                      {course.instructorAvatar ? (
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-7 h-7 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#34d399]/20 border border-[#34d399]/30 text-[#6ee7b7] flex items-center justify-center text-xs font-bold">
                          {course.instructor.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-white font-bold font-jakarta text-xs block leading-tight">{course.instructor}</span>
                        {course.instructorQualification && (
                          <span className="text-[10px] text-zinc-400 font-medium block">{course.instructorQualification}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-space font-medium text-zinc-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#6ee7b7]" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#6ee7b7]" />
                        {course.enrolledStudents} Enrolled
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <span className="text-white font-bold font-mono text-xl">₹{course.price}</span>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-zinc-500 font-mono line-through ml-2 text-xs">₹{course.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => togglePublish(course)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold font-outfit border transition-colors cursor-pointer ${
                      course.isPublished
                        ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {course.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{course.isPublished ? 'Unpublish' : 'Publish'}</span>
                  </button>
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
                    title="Edit course"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="p-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 rounded-xl border border-rose-500/30 transition-colors cursor-pointer"
                    title="Delete course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Executive Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-[100] p-4 overscroll-contain">
            <div className="bg-[#0c0f1c] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain my-auto text-white">
              <div className="sticky top-0 bg-[#0f1222] p-5 border-b border-white/10 flex justify-between items-center z-10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#34d399]/15 rounded-xl border border-[#34d399]/30 text-[#6ee7b7]">
                    <BookOpen size={18} />
                  </div>
                  <h2 className="text-xl font-bold font-outfit text-white">
                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                    placeholder="e.g. Class 10 Foundation Physics"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                    placeholder="Detailed overview of syllabus, targets, and objectives..."
                  />
                </div>

                {/* Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Instructor Name *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="e.g., Er. Aniket Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Instructor Qualification</label>
                    <input
                      type="text"
                      name="instructorQualification"
                      value={formData.instructorQualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="e.g., B.Tech, 8+ Yrs Exp"
                    />
                  </div>
                </div>

                {/* Instructor Avatar */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Instructor Avatar</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:text-white font-bold text-xs cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <Upload size={16} />
                      <span>Upload Photo</span>
                    </label>
                    {formData.instructorAvatar && (
                      <div className="flex items-center gap-2 p-1.5 bg-[#070914] border border-white/10 rounded-xl">
                        <img
                          src={formData.instructorAvatar}
                          alt="Avatar preview"
                          className="w-8 h-8 rounded-lg object-cover border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, instructorAvatar: '' }))}
                          className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration, Level, Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="e.g., 6 Months"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Level *</label>
                    <CartoonDropdown
                      value={formData.level}
                      onChange={(val) => setFormData(prev => ({ ...prev, level: val }))}
                      options={[
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Advanced', label: 'Advanced' },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="e.g., Class 10 Foundation"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-[#34d399] text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-[#34d399] text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Syllabus */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Syllabus Modules</label>
                  {formData.syllabus.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('syllabus', index, e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-[#070914] border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#34d399] text-sm"
                        placeholder={`Module ${index + 1} Title`}
                      />
                      {formData.syllabus.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('syllabus', index)}
                          className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-xl border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('syllabus')}
                    className="text-xs font-bold font-outfit text-[#6ee7b7] hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    + Add Another Module
                  </button>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Key Highlights & Features</label>
                  {formData.features.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-[#070914] border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#34d399] text-sm"
                        placeholder={`Highlight ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', index)}
                          className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-xl border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="text-xs font-bold font-outfit text-[#6ee7b7] hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    + Add Another Feature
                  </button>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 px-4 bg-white/5 hover:bg-white/10 text-zinc-300 font-bold font-outfit rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
