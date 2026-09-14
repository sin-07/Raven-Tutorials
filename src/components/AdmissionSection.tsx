'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Upload,
  Send,
  CreditCard,
  CheckCircle,
  Loader,
  Key,
  X,
  ArrowRight,
  ArrowLeft,
  Shield,
  BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';
import { STANDARDS } from '@/constants/classes';
import CartoonDropdown from '@/components/ui/CartoonDropdown';
import CartoonDatePicker from '@/components/ui/CartoonDatePicker';

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

export default function AdmissionSection() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Payment, 4: Success
  const [tempAdmissionId, setTempAdmissionId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(1);
  const [credentials, setCredentials] = useState<Credentials>({ registrationId: '', password: '', email: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const resetForm = () => {
    setStep(1);
    setTempAdmissionId(null);
    setOtp('');
    setCredentials({ registrationId: '', password: '', email: '' });
    setFormData({
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
    setPhotoPreview(null);
    setAcceptedTerms(false);
  };

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
    
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    if (!formData.photo) {
      toast.error('Please upload your photo');
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
      toast.error('Please fill all required fields');
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

      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Failed to submit form');
        return;
      }

      if (data.success) {
        setTempAdmissionId(data.data.tempAdmissionId);
        setPaymentAmount(data.data.amount);
        setStep(2);
        toast.success(`OTP sent to ${formData.email}`);
      } else {
        toast.error(data.message || 'Failed to submit form');
      }
    } catch (error: any) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admission/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admissionId: tempAdmissionId,
          otp: otp
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep(3);
        toast.success('OTP verified! Please proceed to payment.');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
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
              toast.success('Payment successful! Registration complete.');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.error('Payment cancelled');
          }
        },
        prefill: {
          name: formData.studentName,
          email: formData.email,
          contact: formData.phoneNumber
        },
        theme: {
          color: '#7c3aed'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Failed to initiate payment');
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (step === 4) {
      resetForm();
    }
    setShowModal(false);
  };

  return (
    <>
      {/* I Want to Learn Section */}
      <section className="py-20 bg-transparent border-t-2 sm:border-t-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#dcfce7] text-emerald-900 rounded-full text-xs font-space uppercase tracking-wider font-extrabold mb-4 border-2 border-black shadow-[2px_2px_0px_#000]">
              Start Your Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black font-outfit tracking-tight">
              I Want to Learn
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium">
              Take the first step towards your academic success. Join Raven Tutorials and unlock your potential with expert guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 font-jakarta"
            >
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0fdf4] border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="w-12 h-12 rounded-xl bg-emerald-300 border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#000]">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-black mb-1 font-outfit">Expert Faculty</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-medium">Learn from experienced educators who are passionate about teaching.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0fdf4] border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="w-12 h-12 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#000]">
                  <BookOpen className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-black mb-1 font-outfit">Comprehensive Curriculum</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-medium">Well-structured courses covering all subjects with detailed study materials.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f0fdf4] border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="w-12 h-12 rounded-xl bg-emerald-200 border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#000]">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-black mb-1 font-outfit">Personalized Attention</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-medium">Small batch sizes ensure every student gets individual attention.</p>
                </div>
              </div>

              <div className="pt-2 font-outfit">
                <p className="text-2xl font-black text-black">
                  Admission Fee: <span className="text-emerald-700 bg-[#dcfce7] px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">₹1,000</span>
                </p>
                <p className="text-neutral-600 text-xs font-jakarta mt-2 font-bold">One-time registration fee</p>
              </div>
            </motion.div>

            {/* Right Side - CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f0fdf4] rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] p-8 font-jakarta"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#000]">
                  <GraduationCap className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-3 font-outfit">Ready to Join?</h3>
                <p className="text-neutral-700 mb-6 font-jakarta text-sm sm:text-base font-medium">
                  Complete our simple admission process and start your learning journey today.
                </p>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center gap-3 text-neutral-800 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Fill the admission form</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-800 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Verify your email with OTP</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-800 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Complete payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-800 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Get your login credentials</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-base rounded-xl border-2 border-black transition-all shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 font-outfit uppercase tracking-wider"
                >
                  <GraduationCap className="w-5 h-5" />
                  Take Admission Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && step !== 4 && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#f0fdf4] border-3 border-black text-black relative w-full max-w-2xl rounded-3xl shadow-[8px_8px_0px_#000] my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              {step !== 4 && (
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-rose-200 border-2 border-black shadow-[2px_2px_0px_#000] transition-colors z-10"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              )}

              {/* Step Indicator */}
              <div className="p-6 border-b-2 border-black bg-[#dcfce7] rounded-t-3xl">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {['Form', 'OTP', 'Payment', 'Success'].map((label, index) => (
                    <div key={label} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-space border-2 border-black ${
                        step > index + 1 ? 'bg-emerald-400 text-black shadow-[2px_2px_0px_#000]' :
                        step === index + 1 ? 'bg-emerald-400 text-black shadow-[2px_2px_0px_#000]' :
                        'bg-white text-neutral-500'
                      }`}>
                        {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      {index < 3 && (
                        <div className={`w-12 sm:w-16 h-1 mx-1 border-y border-black ${
                          step > index + 1 ? 'bg-emerald-500' : 'bg-neutral-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 font-jakarta">
                {/* Step 1: Form */}
                {step === 1 && (
                  <form onSubmit={handleSubmitForm} className="space-y-6">
                    <h3 className="text-xl font-black text-black mb-6 font-outfit">Admission Form</h3>
                    
                    {/* Photo Upload */}
                    <div className="flex justify-center mb-6">
                      <label className="cursor-pointer">
                        <div className={`w-24 h-24 rounded-full border-2 border-dashed ${photoPreview ? 'border-emerald-600' : 'border-black'} flex items-center justify-center overflow-hidden bg-white hover:bg-[#dcfce7] transition-colors shadow-[2px_2px_0px_#000]`}>
                          {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="w-8 h-8 text-neutral-600" />
                          )}
                        </div>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        <p className="text-xs text-neutral-700 font-bold text-center mt-2">Upload Photo*</p>
                      </label>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Student Name*</label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Father&apos;s Name*</label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Mother&apos;s Name*</label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Date of Birth*</label>
                        <CartoonDatePicker
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder="Select Date of Birth"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Gender*</label>
                        <CartoonDropdown
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          placeholder="Select Gender"
                          options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' },
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Blood Group*</label>
                        <CartoonDropdown
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          placeholder="Select Blood Group"
                          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Category*</label>
                        <CartoonDropdown
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="Select Category"
                          options={['General', 'OBC', 'SC', 'ST', 'EWS']}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Standard*</label>
                        <CartoonDropdown
                          name="standard"
                          value={formData.standard}
                          onChange={handleInputChange}
                          placeholder="Select Standard"
                          options={STANDARDS}
                        />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Phone Number*</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Alternate Phone</label>
                        <input
                          type="tel"
                          name="alternatePhoneNumber"
                          value={formData.alternatePhoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Address*</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">City*</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">State*</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Pincode*</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1 font-space">Previous School*</label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-emerald-600 bg-white border-2 border-black rounded focus:ring-emerald-400"
                      />
                      <label htmlFor="terms" className="text-xs text-neutral-700 font-bold leading-relaxed">
                        I agree to the terms and conditions and understand that my data will be stored securely.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-emerald-400 text-black font-black font-outfit uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit & Get OTP
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]">
                      <Mail className="w-10 h-10 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black mb-2 font-outfit">Verify Your Email</h3>
                      <p className="text-neutral-700 font-medium text-sm">
                        We&apos;ve sent a 6-digit OTP to <span className="font-black text-emerald-800 underline">{formData.email}</span>
                      </p>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-[2px_2px_0px_#000]"
                        maxLength={6}
                      />
                    </div>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={loading || otp.length !== 6}
                      className="w-full max-w-xs mx-auto py-3.5 bg-emerald-400 text-black font-black font-outfit uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify OTP
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setStep(1)}
                      className="text-neutral-600 hover:text-black font-bold text-sm flex items-center gap-1 mx-auto"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Form
                    </button>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]">
                      <CreditCard className="w-10 h-10 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black mb-2 font-outfit">Complete Payment</h3>
                      <p className="text-neutral-700 font-medium text-sm">
                        Pay the admission fee to complete your registration
                      </p>
                    </div>

                    <div className="bg-[#dcfce7] rounded-2xl p-6 max-w-sm mx-auto border-2 border-black shadow-[3px_3px_0px_#000]">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-neutral-800 font-bold">Admission Fee</span>
                        <span className="text-2xl font-black text-black font-outfit">₹{paymentAmount}</span>
                      </div>
                      <div className="text-left text-xs text-neutral-700 font-medium space-y-1">
                        <p>• Secure payment via Razorpay</p>
                        <p>• Instant confirmation</p>
                        <p>• Get login credentials after payment</p>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full max-w-sm mx-auto py-3.5 bg-emerald-400 text-black font-black font-outfit uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay ₹{paymentAmount}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]"
                    >
                      <CheckCircle className="w-12 h-12 text-black" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-emerald-900 mb-2 font-outfit">Registration Successful!</h3>
                      <p className="text-neutral-700 font-medium text-sm">
                        Welcome to Raven Tutorials! Your account has been created.
                      </p>
                    </div>

                    <div className="bg-[#dcfce7] rounded-2xl p-6 max-w-sm mx-auto text-left border-2 border-black shadow-[3px_3px_0px_#000]">
                      <h4 className="font-black text-black mb-4 text-center font-outfit">Your Login Credentials</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-black shadow-[1px_1px_0px_#000]">
                          <Key className="w-5 h-5 text-emerald-700" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-neutral-600 font-space">Registration ID</p>
                            <p className="font-mono font-black text-black">{credentials.registrationId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-black shadow-[1px_1px_0px_#000]">
                          <Mail className="w-5 h-5 text-emerald-700" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-neutral-600 font-space">Email</p>
                            <p className="font-bold text-black text-sm">{credentials.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-black shadow-[1px_1px_0px_#000]">
                          <Shield className="w-5 h-5 text-emerald-700" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-neutral-600 font-space">Password</p>
                            <p className="font-mono font-black text-black">{credentials.password}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-rose-700 font-bold mt-4 text-center">
                        ⚠️ Please save these credentials. You&apos;ll need them to login.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        resetForm();
                        setShowModal(false);
                        window.location.href = '/login';
                      }}
                      className="w-full max-w-sm mx-auto py-3.5 bg-emerald-400 text-black font-black font-outfit uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Go to Login
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

