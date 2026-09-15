'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  Upload, 
  Loader2, 
  AlertCircle, 
  FileText, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Phone, 
  BookOpen, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Layers,
  HeartPulse
} from 'lucide-react';
import WavyHeading from '@/components/WavyHeading';
import { LMSFooter } from '@/components/lms';
import CartoonDropdown from '@/components/ui/CartoonDropdown';
import CartoonDatePicker from '@/components/ui/CartoonDatePicker';

export default function LearnerAdmissionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreedToConduct, setAgreedToConduct] = useState(false);
  
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    category: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    email: '',
    address: '',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800007',
    standard: '',
    previousSchool: '',
    photo: null as File | null
  });

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border-2 text-black font-jakarta font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-black shadow-[2px_2px_0px_#000] placeholder-neutral-400 transition-all text-sm sm:text-base";
    const errorClass = fieldErrors[fieldName] ? "border-rose-500 bg-rose-50/70" : "border-black";
    return `${baseClass} ${errorClass}`;
  };

  const handleConductScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 15;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: false }));
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
      setFieldErrors(prev => ({ ...prev, photo: false }));
      
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
      const requiredFields = [
        'studentName', 'fatherName', 'motherName', 'dateOfBirth',
        'gender', 'bloodGroup', 'category', 'phoneNumber',
        'email', 'address', 'city', 'state', 'pincode',
        'standard', 'previousSchool'
      ];

      const errors: Record<string, boolean> = {};
      let hasError = false;

      requiredFields.forEach(field => {
        if (!formData[field as keyof typeof formData]) {
          errors[field] = true;
          hasError = true;
        }
      });

      if (!formData.photo) {
        errors.photo = true;
        hasError = true;
      }

      if (hasError) {
        setFieldErrors(errors);
        setError('Please fill in all required fields and upload your photograph.');
        setLoading(false);
        return;
      }

      if (formData.phoneNumber.length !== 10) {
        setFieldErrors(prev => ({ ...prev, phoneNumber: true }));
        setError('Phone number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      if (formData.pincode.length !== 6) {
        setFieldErrors(prev => ({ ...prev, pincode: true }));
        setError('Pincode must be exactly 6 digits');
        setLoading(false);
        return;
      }

      if (!agreedToConduct) {
        setError('Please read and agree to the Code of Conduct');
        setLoading(false);
        return;
      }

      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photo' && formData.photo) {
          submitData.append('photo', formData.photo);
        } else if (key !== 'photo') {
          submitData.append(key, formData[key as keyof typeof formData] as string);
        }
      });

      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        body: submitData
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response:', response.status);
        throw new Error(`Server error. Status: ${response.status}. Please try again later.`);
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.message && data.message.toLowerCase().includes('email') && data.message.toLowerCase().includes('already')) {
          toast.error('This email is already registered!', {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#f87171',
              color: '#000',
              fontWeight: '700',
              border: '2px solid #000',
              padding: '16px',
              borderRadius: '16px',
            },
          });
        }
        throw new Error(data.message || 'Failed to submit admission form');
      }

      toast.success('OTP sent to your email!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4ade80',
          color: '#000',
          fontWeight: '700',
          border: '2px solid #000',
          padding: '16px',
          borderRadius: '16px',
        },
      });

      sessionStorage.setItem('tempAdmission', JSON.stringify(data.data));
      router.push('/admission/verify-otp');

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
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

  const conductRules = [
    { num: "01", title: "Respect and Courtesy", desc: "Treat all students, teachers, and staff with respect and kindness. Harassment, bullying, or discrimination of any kind will not be tolerated." },
    { num: "02", title: "Punctuality", desc: "Arrive on time for all classes, exams, and scheduled activities. Consistent tardiness disrupts the learning environment." },
    { num: "03", title: "Academic Integrity", desc: "Maintain honesty in all academic work. Cheating, plagiarism, or any form of academic dishonesty will result in serious consequences." },
    { num: "04", title: "Attendance Mandate", desc: "Regular attendance is mandatory. Maintain at least 75% attendance to be eligible for examinations and test series benchmarking." },
    { num: "05", title: "Classroom Etiquette", desc: "Maintain disciplined classroom demeanor. Mobile phones must be kept on silent mode or in designated pouches." },
    { num: "06", title: "Neat Dress Code", desc: "Wear decent and comfortable attire. Maintain personal hygiene and neat appearance at all times." },
    { num: "07", title: "Campus Property Care", desc: "Respect and care for institute property, lab kits, smart board equipment, and learning materials." },
    { num: "08", title: "Safety and Security", desc: "Follow all safety protocols and security directives. Report any safety concern immediately to institute faculty." },
    { num: "09", title: "Official Communication", desc: "Use official communication channels for notices and batch updates. Check email and dashboard notices regularly." },
    { num: "10", title: "Timely Fee Schedule", desc: "Ensure batch admission fees are paid timely as per institutional schedules to maintain uninterrupted classroom access." }
  ];

  return (
    <>
      <div className="min-h-screen bg-transparent relative overflow-hidden pt-32 pb-20 selection:bg-emerald-300 selection:text-black">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mb-4">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Offline & Hybrid Classroom Enrollment</span>
            </div>

            <WavyHeading
              text="Student Admission"
              gradientText="Application"
              className="text-3xl sm:text-5xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full mb-3"
            />

            <p className="text-sm sm:text-base text-neutral-700 font-jakarta font-medium max-w-lg mx-auto text-center">
              Complete your student profile below to secure your seat at RAVEN Tutorials Patna.
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-8 p-4 sm:p-5 bg-rose-100 border-3 border-black rounded-2xl shadow-[4px_4px_0px_#000] flex items-start gap-3 text-black">
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm sm:text-base font-jakarta font-bold text-rose-900">{error}</p>
            </div>
          )}

          {/* Cartoonish Main Form Card */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-[#f0fdf4] rounded-3xl p-6 sm:p-10 border-3 border-black shadow-[8px_8px_0px_#000] space-y-10"
          >
            {/* Section 1: Personal Information */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#86efac] border-2 border-black rounded-xl font-outfit font-black text-base sm:text-lg text-black shadow-[3px_3px_0px_#000] mb-6">
                <User className="w-5 h-5 text-black" />
                <span>1. Student Profile & Bio</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Student Full Name <span className="text-rose-600 font-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={getInputClassName("studentName")}
                    placeholder="e.g. Aryan Kumar"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Father&apos;s Name <span className="text-rose-600 font-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={getInputClassName("fatherName")}
                    placeholder="Father's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Mother&apos;s Name <span className="text-rose-600 font-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    className={getInputClassName("motherName")}
                    placeholder="Mother's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Date of Birth <span className="text-rose-600 font-black">*</span>
                  </label>
                  <CartoonDatePicker
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    error={fieldErrors.dateOfBirth}
                    placeholder="Select Date of Birth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Gender <span className="text-rose-600 font-black">*</span>
                  </label>
                  <CartoonDropdown
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    error={fieldErrors.gender}
                    placeholder="Select Gender"
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                      { label: 'Other', value: 'Other' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      Blood Group <span className="text-rose-600 font-black">*</span>
                    </label>
                    <CartoonDropdown
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      error={fieldErrors.bloodGroup}
                      placeholder="Blood Group"
                      options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      Category <span className="text-rose-600 font-black">*</span>
                    </label>
                    <CartoonDropdown
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      error={fieldErrors.category}
                      placeholder="Category"
                      options={['General', 'OBC', 'SC', 'ST', 'Other']}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="pt-6 border-t-2 border-black/15">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#bbf7d0] border-2 border-black rounded-xl font-outfit font-black text-base sm:text-lg text-black shadow-[3px_3px_0px_#000] mb-6">
                <Phone className="w-5 h-5 text-black" />
                <span>2. Contact & Address Details</span>
              </div>
              
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      Primary Phone Number <span className="text-rose-600 font-black">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={getInputClassName("phoneNumber")}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      Alternate / Parent Phone
                    </label>
                    <input
                      type="tel"
                      name="alternatePhoneNumber"
                      value={formData.alternatePhoneNumber}
                      onChange={handleInputChange}
                      className={getInputClassName("alternatePhoneNumber")}
                      placeholder="10-digit emergency number"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Email Address <span className="text-rose-600 font-black">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={getInputClassName("email")}
                    placeholder="student@example.com"
                    required
                  />
                  <p className="text-xs text-neutral-600 font-jakarta mt-1 font-medium">
                    OTP and student credentials will be sent to this email.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Residential Address <span className="text-rose-600 font-black">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className={getInputClassName("address")}
                    placeholder="House / Flat No, Street, Landmark"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      City <span className="text-rose-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={getInputClassName("city")}
                      placeholder="Patna"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      State <span className="text-rose-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={getInputClassName("state")}
                      placeholder="Bihar"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                      Pincode <span className="text-rose-600 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={getInputClassName("pincode")}
                      placeholder="800007"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Educational Information */}
            <div className="pt-6 border-t-2 border-black/15">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#86efac] border-2 border-black rounded-xl font-outfit font-black text-base sm:text-lg text-black shadow-[3px_3px_0px_#000] mb-6">
                <BookOpen className="w-5 h-5 text-black" />
                <span>3. Academic & Prior Schooling</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Enrolling Standard/Class <span className="text-rose-600 font-black">*</span>
                  </label>
                  <CartoonDropdown
                    name="standard"
                    value={formData.standard}
                    onChange={handleInputChange}
                    error={fieldErrors.standard}
                    placeholder="Select Target Standard"
                    options={[
                      { label: 'Class 6th', value: '6th' },
                      { label: 'Class 7th', value: '7th' },
                      { label: 'Class 8th', value: '8th' },
                      { label: 'Class 9th', value: '9th' },
                      { label: 'Class 10th (ICSE / CBSE)', value: '10th' },
                      { label: 'Class 11th (JEE / NEET / Boards)', value: '11th' },
                      { label: 'Class 12th (JEE / NEET / Boards)', value: '12th' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black font-space mb-2">
                    Current / Previous School <span className="text-rose-600 font-black">*</span>
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className={getInputClassName("previousSchool")}
                    placeholder="e.g. St. Xavier's High School"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Photo Upload */}
            <div className="pt-6 border-t-2 border-black/15">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#bbf7d0] border-2 border-black rounded-xl font-outfit font-black text-base sm:text-lg text-black shadow-[3px_3px_0px_#000] mb-6">
                <Upload className="w-5 h-5 text-black" />
                <span>4. Passport Size Photograph</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                {photoPreview ? (
                  <div className="relative group p-2 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000]">
                    <img 
                      src={photoPreview} 
                      alt="Student Preview" 
                      className="w-44 h-44 object-cover rounded-xl border border-black"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setFormData(prev => ({ ...prev, photo: null }));
                      }}
                      className="absolute -top-3 -right-3 w-9 h-9 bg-rose-400 hover:bg-rose-500 text-black font-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-lg active:translate-x-0.5 active:translate-y-0.5 transition"
                      title="Remove Photo"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className={`w-full max-w-lg border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer bg-white hover:bg-[#dcfce7] transition shadow-[4px_4px_0px_#000] group flex flex-col items-center justify-center ${
                    fieldErrors.photo ? 'border-rose-500 bg-rose-50/50' : 'border-black'
                  }`}>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center text-black mb-3 shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
                      <Upload className="w-6 h-6 text-black" />
                    </div>
                    <p className="text-black font-black font-outfit text-base mb-1">
                      Upload Student Passport Photo
                    </p>
                    <p className="text-xs text-neutral-600 font-jakarta font-medium">
                      PNG or JPG (Max 5MB) • Front facing with clear lighting
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Section 5: Code of Conduct */}
            <div className="pt-6 border-t-2 border-black/15">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#86efac] border-2 border-black rounded-xl font-outfit font-black text-base sm:text-lg text-black shadow-[3px_3px_0px_#000] mb-4">
                <FileText className="w-5 h-5 text-black" />
                <span>5. Institute Code of Conduct</span>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShowCodeOfConduct(!showCodeOfConduct)}
                  className="w-full flex items-center justify-between p-4 bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-black font-outfit text-black">
                      {showCodeOfConduct ? "Collapse Code of Conduct" : "Click to Read 10 Rules of Conduct"}
                    </span>
                    <span className="text-xs font-bold font-space bg-white border border-black px-2 py-0.5 rounded-full text-black">
                      Mandatory
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-black transition-transform duration-300 ${
                      showCodeOfConduct ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showCodeOfConduct && (
                  <div className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 shadow-[3px_3px_0px_#000] space-y-4">
                    <p className="text-xs sm:text-sm font-jakarta text-neutral-700 font-semibold">
                      Please scroll through the guidelines below to activate agreement:
                    </p>

                    <div 
                      className="max-h-72 overflow-y-auto p-3 space-y-3 border-2 border-black rounded-xl bg-[#f6fcf8]"
                      onScroll={handleConductScroll}
                    >
                      {conductRules.map(rule => (
                        <div key={rule.num} className="p-3 rounded-xl bg-[#f0fdf4] border-2 border-black shadow-[2px_2px_0px_#000] flex gap-3 items-start">
                          <span className="w-7 h-7 rounded-lg bg-[#86efac] border border-black flex items-center justify-center font-black font-space text-xs text-black flex-shrink-0 shadow-[1px_1px_0px_#000]">
                            {rule.num}
                          </span>
                          <div className="text-xs sm:text-sm font-jakarta text-neutral-800 font-medium">
                            <strong className="text-black font-black font-outfit">{rule.title}: </strong>
                            {rule.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!hasScrolledToBottom && (
                      <p className="text-xs text-emerald-800 font-jakarta font-bold text-center">
                        ↓ Scroll to the bottom of the list to unlock agreement checkbox
                      </p>
                    )}
                  </div>
                )}

                {/* Agreement Checkbox */}
                <div className="p-4 bg-[#dcfce7] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000]">
                  <label className="flex items-start gap-3.5 cursor-pointer select-none">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreedToConduct}
                        onChange={(e) => setAgreedToConduct(e.target.checked)}
                        disabled={!hasScrolledToBottom}
                        className="w-5 h-5 rounded-lg border-2 border-black bg-white checked:bg-emerald-400 checked:border-black disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black font-outfit text-black">
                        I, the student and parent, have read and agree to RAVEN Tutorials&apos; Code of Conduct.
                      </p>
                      {!hasScrolledToBottom && (
                        <p className="text-xs text-neutral-600 font-jakarta font-medium mt-0.5">
                          (Expand and scroll the Code of Conduct above to enable)
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Submit & Back Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-black">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-cartoon sm:w-1/3 py-4 px-6 bg-[#dcfce7] hover:bg-[#bbf7d0] text-black font-black font-outfit text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span>Return Back</span>
              </button>

              <button
                type="submit"
                disabled={loading || !agreedToConduct}
                className="btn-cartoon flex-1 py-4 px-6 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-base sm:text-lg rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-black" />
                    <span>Processing Enrollment...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Proceed to OTP Verification</span>
                    <ArrowRight className="w-5 h-5 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <LMSFooter />
    </>
  );
}
