'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import WavyHeading from '@/components/WavyHeading';
import { LMSFooter } from '@/components/lms';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

const subjectOptions = [
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'English',
  'Social Science',
  'Computer Science',
  'Hindi',
  'Sanskrit',
  'Other'
];

const experienceOptions = [
  'Fresher (0-1 years)',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

export default function TeacherAdmissionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    subjects: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.qualification || !formData.experience) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.subjects.length === 0) {
      setError('Please select at least one subject');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/teacher-admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to submit application. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <div className="min-h-screen bg-transparent pt-36 pb-20 px-4 flex items-center justify-center">
          <div className="max-w-md w-full text-center bg-[#f0fdf4] rounded-3xl p-8 sm:p-10 border-3 border-black shadow-[8px_8px_0px_#000]">
            <div className="w-20 h-20 bg-emerald-300 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#000]">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black font-outfit mb-3">
              Application Submitted!
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base font-jakarta font-medium mb-6">
              Thank you for applying to teach at RAVEN Tutorials. Our academic board will review your profile and contact you within 3–5 working days.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSuccess(false)}
                className="btn-cartoon w-full py-3.5 bg-[#dcfce7] hover:bg-[#bbf7d0] text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition font-outfit"
              >
                Submit Another Application
              </button>
              <Link
                href="/"
                className="btn-cartoon w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition font-outfit"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
        <LMSFooter />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 selection:bg-emerald-300 selection:text-black">
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mb-4">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Teaching Faculty Recruitment</span>
            </div>

            <WavyHeading
              text="Join Our Teaching"
              gradientText="Faculty"
              className="text-3xl sm:text-5xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full mb-3"
            />

            <p className="text-sm sm:text-base text-neutral-700 font-jakarta font-medium text-center">
              Mentor ambitious students and teach top-ranking batches at our Patna campus.
            </p>
          </div>

          {/* Cartoonish Form Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#f0fdf4] rounded-3xl p-6 sm:p-10 border-3 border-black shadow-[8px_8px_0px_#000] space-y-6"
          >
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-rose-100 border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <p className="text-rose-900 text-sm font-jakarta font-bold">{error}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Full Name <span className="text-rose-600 font-black">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Priya Sharma"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Email Address <span className="text-rose-600 font-black">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="priya@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Phone Number <span className="text-rose-600 font-black">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Highest Academic Qualification <span className="text-rose-600 font-black">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g. M.Sc. Physics (IIT Kharagpur) / B.Tech"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-xl text-black font-jakarta font-medium shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                Teaching Experience <span className="text-rose-600 font-black">*</span>
              </label>
              <CartoonDropdown
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Select teaching experience level"
                options={experienceOptions}
              />
            </div>

            {/* Subjects You Can Teach */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-3">
                Subjects You Specialize In <span className="text-rose-600 font-black">*</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {subjectOptions.map(subject => {
                  const isSelected = formData.subjects.includes(subject);
                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle(subject)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-space border-2 border-black transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                        isSelected
                          ? 'bg-emerald-300 text-black scale-105'
                          : 'bg-white text-black hover:bg-[#dcfce7]'
                      }`}
                    >
                      {subject} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
              {formData.subjects.length > 0 && (
                <p className="mt-3 text-xs text-neutral-700 font-jakarta font-semibold">
                  Selected: <span className="text-black font-black">{formData.subjects.join(', ')}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-cartoon w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base sm:text-lg rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-black" />
                  <span>Submit Faculty Application</span>
                </>
              )}
            </button>
          </form>

          {/* Check Status Redirection */}
          <div className="mt-8 text-center">
            <p className="text-neutral-700 text-sm font-jakarta font-medium">
              Already submitted?{' '}
              <Link href="/admission/tutor/status" className="text-black font-black underline hover:text-emerald-800">
                Check your faculty application status →
              </Link>
            </p>
          </div>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}
