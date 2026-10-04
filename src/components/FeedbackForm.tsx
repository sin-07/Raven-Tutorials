'use client';

import React, { useState } from 'react';
import { Send, Star, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

interface FeedbackFormProps {
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  studentStandard?: string;
  isAuthenticated?: boolean;
  onSuccess?: () => void;
  onSubmitSuccess?: () => void;
}

const categories = [
  { value: 'Teaching Quality', label: 'Teaching Quality' },
  { value: 'Course Content', label: 'Course Content' },
  { value: 'Doubt Resolution', label: 'Doubt Resolution' },
  { value: 'App/Platform Experience', label: 'App/Platform Experience' },
  { value: 'Study Materials', label: 'Study Materials' },
  { value: 'Test & Assessments', label: 'Test & Assessments' },
  { value: 'General Suggestion', label: 'General Suggestion' },
];

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  studentId,
  studentName,
  studentEmail,
  studentStandard,
  isAuthenticated = !!studentId,
  onSuccess,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState({
    category: 'Teaching Quality',
    rating: 5,
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login as a student to submit feedback');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Please enter a feedback subject');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please write your feedback message');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          studentId,
          studentName,
          studentEmail,
          studentStandard
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      toast.success('Feedback submitted successfully! Thank you.');
      setSubmitted(true);
      setFormData({
        category: 'Teaching Quality',
        rating: 5,
        subject: '',
        message: ''
      });

      if (onSuccess) onSuccess();
      if (onSubmitSuccess) onSubmitSuccess();

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Feedback error:', err);
      toast.error(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f111a] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-[#e8602e]/15 border border-[#e8602e]/30 flex items-center justify-center text-[#ff7b47]">
          <Send className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-outfit font-bold text-white">
          {isAuthenticated ? 'Share Your Feedback' : 'Send Feedback'}
        </h3>
      </div>
      <p className="text-xs font-jakarta font-medium text-zinc-400 mb-6">
        Help us improve by sharing your honest thoughts and academic suggestions
      </p>

      {submitted && (
        <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-emerald-400">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-xs font-jakarta font-semibold">Thank you! Your feedback has been safely submitted.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Authentication Notice */}
        {!isAuthenticated && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-xs font-jakarta font-medium">
                Please <a href="/login" className="underline font-bold hover:text-white">login</a> to submit student feedback.
              </p>
            </div>
          </div>
        )}

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1.5">
            Category
          </label>
          <CartoonDropdown
            name="category"
            value={formData.category}
            onChange={(e: any) => {
              const val = typeof e === 'string' ? e : e?.target?.value;
              setFormData((prev) => ({ ...prev, category: val }));
            }}
            disabled={!isAuthenticated}
            options={categories}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1.5">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={!isAuthenticated}
            placeholder="Brief topic of your feedback"
            className="w-full px-4 py-2.5 bg-[#121522] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] placeholder-zinc-500 text-sm disabled:opacity-50 transition"
            maxLength={100}
          />
          <p className="text-[10px] font-mono font-medium text-zinc-500 mt-1">{formData.subject.length}/100</p>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1">
            Overall Rating
          </label>
          <div className="flex gap-2 bg-[#121522] border border-white/10 rounded-xl p-2.5 w-fit">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                disabled={!isAuthenticated}
                className="hover:scale-110 active:scale-95 disabled:cursor-not-allowed p-0.5 cursor-pointer transition"
              >
                <Star className={`w-5 h-5 transition-colors ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-space font-bold uppercase text-zinc-400 mb-1.5">
            Your Feedback Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={!isAuthenticated}
            placeholder="Share your detailed thoughts, suggestions, or concerns..."
            rows={4}
            className="w-full px-4 py-2.5 bg-[#121522] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] resize-none placeholder-zinc-500 text-sm disabled:opacity-50 transition"
            maxLength={1000}
          />
          <p className="text-[10px] font-mono font-medium text-zinc-500 mt-1">{formData.message.length}/1000</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isAuthenticated}
          className="btn-sheryians w-full py-3 text-white rounded-xl font-outfit font-bold text-sm shadow-[0_0_20px_rgba(232,96,46,0.35)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
