'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Upload, BookOpen, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
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
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 text-black relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
                <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
                <span>Curriculum Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight">
                Courses & Batches
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-xs sm:text-sm mt-1">
                Create, edit, publish, and manage academic courses and syllabus
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="btn-cartoon flex items-center gap-2 bg-white hover:bg-[#dcfce7] text-black font-black px-4 py-2.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm font-outfit"
            >
              <Plus size={18} className="text-black" />
              <span>Add New Course</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/60" size={20} />
          <input
            type="text"
            placeholder="Search courses by title, instructor, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-black rounded-2xl text-black placeholder-neutral-500 font-medium font-jakarta focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[3px_3px_0px_#000]"
          />
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 shadow-[6px_6px_0px_#000] text-center max-w-xs w-full">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-emerald-500 mx-auto mb-2"></div>
              <p className="font-outfit font-black text-black">Loading courses...</p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#000]">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <p className="text-black font-black text-xl font-outfit">No courses found</p>
            <p className="text-neutral-600 text-sm font-jakarta mt-1 mb-4">Start by creating your first academic course</p>
            <button
              onClick={openCreateModal}
              className="btn-cartoon px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] inline-flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              <span>Create Your First Course</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cartoon-stagger">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="card-cartoon bg-[#f0fdf4] rounded-3xl overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-44 bg-[#dcfce7] border-b-2 border-black">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-1">
                        <BookOpen size={32} className="text-black/40" />
                        <span className="text-xs font-bold font-space uppercase">No Thumbnail</span>
                      </div>
                    )}
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg border border-black text-xs font-black font-space uppercase shadow-[2px_2px_0px_#000] ${
                      course.isPublished ? 'bg-[#86efac] text-black' : 'bg-amber-200 text-black'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-black text-[10px] font-black uppercase font-space text-black shadow-[1px_1px_0px_#000]">
                        {course.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] border border-black text-[10px] font-black uppercase font-space text-black">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-black font-outfit mb-1.5 line-clamp-1">{course.title}</h3>
                    <p className="text-neutral-700 font-medium font-jakarta text-xs mb-3 line-clamp-2 leading-relaxed">{course.description}</p>
                    
                    <div className="flex items-center gap-2.5 mb-3 p-2 bg-white rounded-xl border border-black/20">
                      {course.instructorAvatar ? (
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-7 h-7 rounded-full object-cover border border-black"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-200 border border-black flex items-center justify-center text-xs font-bold">
                          {course.instructor.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-black font-bold font-jakarta text-xs block leading-tight">{course.instructor}</span>
                        {course.instructorQualification && (
                          <span className="text-[10px] text-neutral-500 font-medium block">{course.instructorQualification}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-space font-bold text-neutral-700 mb-3">
                      <span>⏱ {course.duration}</span>
                      <span>👥 {course.enrolledStudents} Enrolled</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/10">
                      <div>
                        <span className="text-black font-black font-mono text-xl">₹{course.price}</span>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-neutral-500 font-mono line-through ml-2 text-xs">₹{course.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => togglePublish(course)}
                    className={`btn-cartoon flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black font-outfit border-2 border-black shadow-[2px_2px_0px_#000] transition-colors ${
                      course.isPublished
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-950'
                        : 'bg-emerald-400 hover:bg-emerald-300 text-black'
                    }`}
                  >
                    {course.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{course.isPublished ? 'Unpublish' : 'Publish'}</span>
                  </button>
                  <button
                    onClick={() => handleEdit(course)}
                    className="btn-cartoon p-2 bg-white hover:bg-sky-100 text-black rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
                    title="Edit course"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="btn-cartoon p-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
                    title="Delete course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cartoon Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overscroll-contain">
            <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 bg-[#86efac] p-5 border-b-2 border-black flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-lg border border-black shadow-[1px_1px_0px_#000]">
                    <BookOpen size={18} className="text-black" />
                  </div>
                  <h2 className="text-xl font-black font-outfit text-black">
                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-cartoon p-1.5 rounded-lg bg-white border border-black hover:bg-rose-100 text-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                    placeholder="e.g. Class 10 Foundation Physics"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                    placeholder="Detailed overview of syllabus, targets, and objectives..."
                  />
                </div>

                {/* Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Instructor Name *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="e.g., Er. Aniket Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Instructor Qualification</label>
                    <input
                      type="text"
                      name="instructorQualification"
                      value={formData.instructorQualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="e.g., B.Tech, 8+ Yrs Exp"
                    />
                  </div>
                </div>

                {/* Instructor Avatar */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Instructor Avatar</label>
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
                      className="btn-cartoon flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-xs cursor-pointer hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]"
                    >
                      <Upload size={16} />
                      Upload Photo
                    </label>
                    {formData.instructorAvatar && (
                      <div className="flex items-center gap-2 p-1.5 bg-white border border-black rounded-xl">
                        <img
                          src={formData.instructorAvatar}
                          alt="Avatar preview"
                          className="w-8 h-8 rounded-lg object-cover border border-black"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, instructorAvatar: '' }))}
                          className="text-rose-600 hover:text-rose-800 p-1"
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
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="e.g., 6 Months"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Level *</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="e.g., Class 10 Foundation"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Syllabus */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Syllabus Modules</label>
                  {formData.syllabus.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('syllabus', index, e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
                        placeholder={`Module ${index + 1} Title`}
                      />
                      {formData.syllabus.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('syllabus', index)}
                          className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl border border-black"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('syllabus')}
                    className="text-xs font-black font-outfit text-black hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    + Add Another Module
                  </button>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Key Highlights & Features</label>
                  {formData.features.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
                        placeholder={`Highlight ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', index)}
                          className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl border border-black"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="text-xs font-black font-outfit text-black hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    + Add Another Feature
                  </button>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-cartoon flex-1 py-2.5 px-4 bg-white hover:bg-neutral-100 text-black font-black font-outfit rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-cartoon flex-1 py-2.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] disabled:opacity-50"
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
