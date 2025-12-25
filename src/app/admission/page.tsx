'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Send, CreditCard, CheckCircle, Loader, Key, Mail, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { STANDARDS } from '@/constants/classes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeOfConduct from '@/components/CodeOfConduct';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  category: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  standard: string;
  previousSchool: string;
  photo: File | null;
}

interface Credentials {
  registrationId: string;
  password: string;
  email: string;
}

const Admission: React.FC = () => {
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Payment, 4: Success
  const [tempAdmissionId, setTempAdmissionId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(1);
  const [credentials, setCredentials] = useState<Credentials>({ registrationId: '', password: '', email: '' });
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);
  const [acceptedCodeOfConduct, setAcceptedCodeOfConduct] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
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
    city: '',
    state: '',
    pincode: '',
    standard: '',
    previousSchool: '',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Check if student is already logged in
  useEffect(() => {
    const studentInfo = sessionStorage.getItem('studentInfo');
    if (studentInfo) {
      toast.error('You are already registered and logged in. Redirecting to dashboard...', {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: '#fff',
        }
      });
      router.push('/dashboard');
    }
  }, [router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        toast.error('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedCodeOfConduct) {
      toast.error('Please read and accept the Code of Conduct before proceeding');
      setShowCodeOfConduct(true);
      return;
    }
    
    if (!formData.photo) {
      toast.error('Please upload your photo before proceeding', {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: '#fff',
        }
      });
      return;
    }
    
    const requiredFields: (keyof FormData)[] = [
      'studentName', 'fatherName', 'motherName', 'dateOfBirth', 
      'gender', 'bloodGroup', 'category', 'phoneNumber', 
      'email', 'address', 'city', 'state', 'pincode', 
      'standard', 'previousSchool'
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof FormData];
        if (value) {
          formDataToSend.append(key, value as string | Blob);
        }
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error(data.message || 'Please wait before trying again');
        } else {
          toast.error(data.message || `Server error: ${response.status}`);
        }
        return;
      }

      if (data.success) {
        setTempAdmissionId(data.data.tempAdmissionId);
        setPaymentAmount(data.data.amount);
        setStep(2);
        toast.success(`Form submitted! OTP sent to ${formData.email}`);
      } else {
        toast.error(data.message || 'Failed to submit form');
      }
    } catch (error: any) {
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        errorMessage = 'Cannot connect to server. Please check your internet connection.';
      }
      
      toast.error(errorMessage, { duration: 8000 });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: paymentAmount,
          receipt: `admission_${tempAdmissionId}`
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        toast.error('Error creating payment order');
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.data.keyId,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'RAVEN Tutorials',
        description: 'Admission Fee',
        order_id: orderData.data.orderId,
        handler: async function (response: any) {
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tempAdmissionId: tempAdmissionId
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            setCredentials({
              registrationId: verifyData.data.registrationId,
              password: verifyData.data.password,
              email: verifyData.data.loginEmail
            });
            
            setStep(4);
            toast.success('🎉 Payment successful! Registration complete.');
          } else {
            toast.error('Payment verification failed');
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            
            toast.error('💳 Payment Cancelled! Redirecting to admission form...', {
              duration: 3000,
              style: {
                background: '#ef4444',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600'
              },
              icon: '❌'
            });
            
            setTimeout(() => {
              window.location.href = '/admission';
            }, 2000);
          }
        },
        prefill: {
          name: formData.studentName,
          email: formData.email,
          contact: formData.phoneNumber
        },
        theme: {
          color: '#2563eb'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Error processing payment');
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admission/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admissionId: tempAdmissionId,
          otp: otp
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep(3);
        toast.success('✅ OTP verified! Please proceed to payment.');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const standards = STANDARDS;
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const categories = ['General', 'OBC', 'SC', 'ST', 'Other'];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 pt-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="RAVEN Tutorials Logo" 
                  className="w-16 h-16 object-contain"
                />
                <h1 className="text-4xl font-bold ml-4">RAVEN Tutorials</h1>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Student Admission Form</h2>
              <p className="text-xl text-blue-100">
                {step === 1 && 'Step 1: Fill Your Details'}
                {step === 2 && 'Step 2: Verify OTP'}
                {step === 3 && 'Step 3: Complete Payment'}
                {step === 4 && 'Registration Complete!'}
              </p>
            </div>
          </div>
        </section>

        {/* Steps Indicator */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-semibold">Form</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="ml-2 font-semibold">OTP</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="ml-2 font-semibold">Payment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Step 1: Form */}
              {step === 1 && (
                <form onSubmit={handleSubmitForm} className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Student Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Father Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Mother Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Choose Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Blood Group */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Choose Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Alternate Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alternate Phone
                      </label>
                      <input
                        type="tel"
                        name="alternatePhoneNumber"
                        value={formData.alternatePhoneNumber}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Standard */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standard <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="standard"
                        value={formData.standard}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Choose Standard</option>
                        {standards.map((std) => (
                          <option key={std} value={std}>{std}</option>
                        ))}
                      </select>
                    </div>

                    {/* Previous School */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous School <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Address - Full Width */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      ></textarea>
                    </div>

                    {/* Photo Upload - Full Width */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Photo <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                          <Upload className="w-5 h-5" />
                          Upload Photo
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handlePhotoChange}
                            required
                            className="hidden"
                          />
                        </label>
                        {photoPreview && (
                          <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border-2 border-blue-200" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG only. Max 5MB</p>
                    </div>

                    {/* Code of Conduct Section - Full Width */}
                    <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-4">
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <FileText className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              RAVEN Code of Conduct
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">
                              Before proceeding with admission, you must read and accept the RAVEN Code of Conduct. 
                              This document outlines the principles and values that all members must uphold.
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowCodeOfConduct(true)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                            >
                              <FileText className="w-4 h-4" />
                              Read Code of Conduct
                            </button>
                          </div>
                        </div>

                        {/* Checkbox */}
                        <label className={`flex items-start gap-3 mt-4 p-3 bg-white rounded-lg border-2 transition ${
                          acceptedCodeOfConduct 
                            ? 'border-green-300 cursor-pointer hover:border-green-400' 
                            : 'border-gray-200 cursor-not-allowed opacity-60'
                        }`}>
                          <input
                            type="checkbox"
                            checked={acceptedCodeOfConduct}
                            disabled={true}
                            className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-not-allowed"
                          />
                          <span className="text-sm leading-relaxed text-gray-700">
                            I have read, understood, and agree to abide by the <strong>RAVEN Code of Conduct</strong>. 
                            I understand that these principles are mandatory for all members of RAVEN LLC.
                            {!acceptedCodeOfConduct && (
                              <span className="block mt-2 text-red-600 font-semibold text-xs">
                                ⚠️ Click &quot;Read Code of Conduct&quot; button above, scroll to bottom, and accept it first
                              </span>
                            )}
                            {acceptedCodeOfConduct && (
                              <span className="block mt-2 text-green-600 font-semibold text-xs">
                                ✓ Code of Conduct accepted
                              </span>
                            )}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Continue to Payment
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Verify OTP</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    We&apos;ve sent a 6-digit OTP to <strong>{formData.email}</strong>
                  </p>
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Verify & Continue to Payment
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment</h2>
                  <p className="text-gray-600 mb-2">Admission Fee</p>
                  <p className="text-4xl font-bold text-blue-600 mb-6">₹{paymentAmount}</p>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Pay Now
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Step 4: Success with Credentials */}
              {step === 4 && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">🎉 Registration Complete!</h2>
                  <p className="text-gray-600 mb-2">Welcome to RAVEN Tutorials, {formData.studentName}!</p>
                  <p className="text-lg text-gray-700 mb-8">Your admission and payment have been successfully processed.</p>
                  
                  {/* Credentials Display */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-8 max-w-lg mx-auto mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                      <Key className="w-6 h-6 text-blue-600" />
                      Your Login Credentials
                    </h3>
                    
                    <div className="space-y-4 text-left">
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">Registration ID</p>
                        <p className="text-2xl font-mono font-bold text-blue-600">{credentials.registrationId}</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">Password</p>
                        <p className="text-xl font-mono font-bold text-gray-900">{credentials.password}</p>
                        <p className="text-xs text-gray-500 mt-1">Based on your date of birth (DDMMYYYY)</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">Login Email</p>
                        <p className="text-sm font-medium text-gray-900">{credentials.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-lg mx-auto mb-6">
                    <p className="text-sm text-yellow-800 font-semibold mb-2">📧 Credentials sent to your email</p>
                    <p className="text-xs text-yellow-700">
                      We&apos;ve sent your login credentials to <strong>{credentials.email}</strong>. 
                      Please save them securely for future access to the student portal.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                      onClick={() => router.push('/')}
                      className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                    >
                      Go to Home
                    </button>
                    <button
                      onClick={() => router.push('/login')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Key className="w-5 h-5" />
                      Login to Portal
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Code of Conduct Modal */}
        <CodeOfConduct 
          isOpen={showCodeOfConduct}
          onClose={() => setShowCodeOfConduct(false)}
          onAccept={() => {
            setAcceptedCodeOfConduct(true);
            toast.success('✅ Code of Conduct accepted');
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Admission;
