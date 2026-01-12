'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import { GlowBackground } from '@/components/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      color: 'bg-[#00E5A8]/20 text-[#00E5A8]',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@raventutorials.com', 'info@raventutorials.com'],
      color: 'bg-green-500/20 text-green-400',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Education Street', 'Mumbai, Maharashtra 400001'],
      color: 'bg-[#00E5A8]/20 text-[#00E5A8]',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      color: 'bg-orange-500/20 text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden">
      {/* Green Radial Glow Effect */}
      <GlowBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-12 bg-gradient-to-br from-[#080808] via-[#111111] to-[#080808] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message 
              and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] rounded-2xl p-6 shadow-sm border border-gray-800 text-center"
              >
                <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-400 text-sm">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#111111] rounded-2xl p-8 shadow-sm border border-gray-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5A8] to-[#00B386] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                  <p className="text-gray-500 text-sm">Fill out the form below</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#00E5A8] text-black font-medium rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-gray-800 text-white placeholder-gray-500 focus:border-[#00E5A8] focus:ring-4 focus:ring-[#00E5A8]/10 transition-all outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-gray-800 text-white placeholder-gray-500 focus:border-[#00E5A8] focus:ring-4 focus:ring-[#00E5A8]/10 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-gray-800 text-white placeholder-gray-500 focus:border-[#00E5A8] focus:ring-4 focus:ring-[#00E5A8]/10 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-gray-800 text-white focus:border-[#00E5A8] focus:ring-4 focus:ring-[#00E5A8]/10 transition-all outline-none"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="courses">Course Information</option>
                        <option value="technical">Technical Support</option>
                        <option value="payment">Payment Issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-gray-800 text-white placeholder-gray-500 focus:border-[#00E5A8] focus:ring-4 focus:ring-[#00E5A8]/10 transition-all outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#00E5A8] text-black font-semibold rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition-all shadow-lg shadow-[#00E5A8]/25 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#111111] rounded-2xl overflow-hidden shadow-sm border border-gray-800"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mb-8">
            Can&apos;t find what you&apos;re looking for? Check out our FAQ section for quick answers.
          </p>
          <a
            href="/faqs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] border border-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            View FAQs
          </a>
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}
