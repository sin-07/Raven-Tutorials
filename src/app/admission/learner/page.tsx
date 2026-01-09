'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Upload, Loader2, AlertCircle } from 'lucide-react';

export default function LearnerAdmissionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    studentName: 'Test Student',
    fatherName: 'Test Father',
    motherName: 'Test Mother',
    dateOfBirth: '2001-12-18',
    gender: 'Male',
    bloodGroup: 'O+',
    category: 'General',
    phoneNumber: '9876543210',
    alternatePhoneNumber: '9876543211',
    email: 'aniket.singh07vs@gmail.com',
    address: 'Test Address, Street No. 1',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800007',
    standard: '10th',
    previousSchool: 'Test School',
    photo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }

      setFormData(prev => ({ ...prev, photo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      const requiredFields = [
        'studentName', 'fatherName', 'motherName', 'dateOfBirth',
        'gender', 'bloodGroup', 'category', 'phoneNumber',
        'email', 'address', 'city', 'state', 'pincode',
        'standard', 'previousSchool'
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          setLoading(false);
          return;
        }
      }

      if (!formData.photo) {
        setError('Please upload your photo');
        setLoading(false);
        return;
      }

      // Validate email
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Validate phone
      if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      if (formData.alternatePhoneNumber && !/^[0-9]{10}$/.test(formData.alternatePhoneNumber)) {
        setError('Please enter a valid 10-digit alternate phone number');
        setLoading(false);
        return;
      }

      // Validate pincode
      if (!/^[0-9]{6}$/.test(formData.pincode)) {
        setError('Please enter a valid 6-digit pincode');
        setLoading(false);
        return;
      }

      // Create form data for submission
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          submitData.append(key, value);
        }
      });

      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        body: submitData
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response:', response.status);
        throw new Error(`Server error. Status: ${response.status}. Please try again later.`);
      }

      const data = await response.json();

      if (!response.ok) {
        // Check if it's a duplicate email error
        if (data.message && data.message.toLowerCase().includes('email') && data.message.toLowerCase().includes('already')) {
          toast.error('This email is already registered!', {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#ef4444',
              color: '#fff',
              fontWeight: '600',
              padding: '16px',
              borderRadius: '12px',
            },
            icon: '⚠️',
          });
        }
        throw new Error(data.message || 'Failed to submit admission form');
      }

      // Show success toast
      toast.success('OTP sent to your email!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
        },
      });

      // Store temp admission data in session storage
      sessionStorage.setItem('tempAdmission', JSON.stringify(data.data));
      
      // Redirect to OTP verification page
      router.push('/admission/verify-otp');

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      // Show error toast if not already shown
      if (!err.message?.toLowerCase().includes('email') || !err.message?.toLowerCase().includes('already')) {
        toast.error(err.message || 'Something went wrong. Please try again.', {
          duration: 4000,
          position: 'top-center',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden py-24">
      {/* Green Radial Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(0,229,168,0.2)_0%,_rgba(0,229,168,0.1)_30%,_transparent_70%)]"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Learner Admission Form</h1>
          <p className="text-gray-400">Fill in your details to complete the admission process</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 mx-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#111111] shadow-xl p-4 md:p-8 border-y border-gray-800">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Father's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter father's name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mother's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter mother's name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="10-digit phone number"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alternate Phone Number
                </label>
                <input
                  type="tel"
                  name="alternatePhoneNumber"
                  value={formData.alternatePhoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="10-digit phone number"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter complete address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter city"
                  required
                />
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                    placeholder="Enter state"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Educational Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Standard/Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="standard"
                  value={formData.standard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  required
                >
                  <option value="">Select Standard</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Previous School <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#080808] border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#00E5A8] focus:border-[#00E5A8] outline-none transition"
                  placeholder="Enter previous school name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Upload Photo</h2>
            
            <div className="flex flex-col items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-40 h-40 object-cover rounded-lg border-2 border-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview(null);
                      setFormData(prev => ({ ...prev, photo: null }));
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-full max-w-md border-2 border-dashed border-gray-800 rounded-lg p-8 text-center cursor-pointer hover:border-[#00E5A8] transition bg-[#080808]">
                  <Upload className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400 mb-1">Click to upload photo</p>
                  <p className="text-sm text-gray-500">Max size: 5MB (JPG, PNG)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-6 border-2 border-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-[#00E5A8] text-black font-semibold rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit & Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
