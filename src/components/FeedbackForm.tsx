'use client';

import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface FeedbackFormProps {
  studentId?: string;
  onSubmitSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ studentId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    category: 'general',
    subject: '',
    message: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isAuthenticated = !!studentId;

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'course_content', label: 'Course Content' },
    { value: 'teaching_method', label: 'Teaching Method' },
    { value: 'study_materials', label: 'Study Materials' },
    { value: 'online_classes', label: 'Online Classes' },
    { value: 'test_system', label: 'Test System' },
    { value: 'complaint', label: 'Complaint' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to submit feedback');
      return;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        rating: formData.rating
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit feedback');
      }

      toast.success('Thank you! Your feedback has been received.');
      setSubmitted(true);
      setFormData({
        category: 'general',
        subject: '',
        message: '',
        rating: 5
      });

      if (onSubmitSuccess) {
        setTimeout(() => onSubmitSuccess(), 1500);
      }

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      console.error('Feedback error:', err);
      toast.error(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0fdf4] rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-6">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
          <Send className="w-4 h-4 text-black" />
        </div>
        <h3 className="text-xl font-outfit font-black text-black">
          {isAuthenticated ? 'Share Your Feedback' : 'Send Feedback'}
        </h3>
      </div>
      <p className="text-xs font-jakarta font-medium text-black/70 mb-5">
        Help us improve by sharing your honest thoughts and academic suggestions
      </p>

      {submitted && (
        <div className="mb-5 p-3.5 bg-[#86efac] border-2 border-black rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_#000]">
          <CheckCircle className="w-5 h-5 text-black shrink-0" />
          <p className="text-black text-xs font-jakarta font-bold">Thank you! Your feedback has been safely submitted.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Authentication Notice */}
        {!isAuthenticated && (
          <div className="bg-[#fef08a] border-2 border-black rounded-xl p-3.5 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-black shrink-0" />
              <p className="text-xs font-jakarta font-bold text-black">
                Please <a href="/login" className="underline font-black hover:text-neutral-800">login</a> to submit student feedback.
              </p>
            </div>
          </div>
        )}

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={!isAuthenticated}
            className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] text-sm disabled:opacity-50"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={!isAuthenticated}
            placeholder="Brief topic of your feedback"
            className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] placeholder-neutral-400 text-sm disabled:opacity-50"
            maxLength={100}
          />
          <p className="text-[10px] font-mono font-bold text-black/50 mt-1">{formData.subject.length}/100</p>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-space font-black uppercase text-black mb-1">
            Overall Rating
          </label>
          <div className="flex gap-1.5 bg-white border-2 border-black rounded-xl p-2 w-fit shadow-[2px_2px_0px_#000]">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                disabled={!isAuthenticated}
                className={`text-2xl transition-transform hover:scale-110 active:scale-95 ${
                  star <= formData.rating ? 'text-amber-500' : 'text-neutral-300'
                } disabled:cursor-not-allowed`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
            Your Feedback Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={!isAuthenticated}
            placeholder="Share your detailed thoughts, suggestions, or concerns..."
            rows={4}
            className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000] resize-none placeholder-neutral-400 text-sm disabled:opacity-50"
            maxLength={1000}
          />
          <p className="text-[10px] font-mono font-bold text-black/50 mt-1">{formData.message.length}/1000</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isAuthenticated}
          className="w-full px-6 py-3 bg-[#86efac] hover:bg-[#4ade80] text-black border-2 border-black rounded-xl font-outfit font-black text-sm shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Submitting...' : 'Submit Feedback 🚀'}</span>
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
