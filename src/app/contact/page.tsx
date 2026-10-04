'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import CartoonDropdown from '@/components/ui/CartoonDropdown';
import { 
  gsap,
  animateFromUp, 
  animateFromDown, 
  scrollFromLeft, 
  scrollFromRight, 
  scrollStaggerDirectional 
} from '@/lib/gsap';

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

  // GSAP directional refs
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animateFromUp(badgeRef.current, { distance: 25, duration: 0.6 });
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -4,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6,
      });
    }
    animateFromDown(titleRef.current, { distance: 30, duration: 0.7, delay: 0.1 });
    animateFromDown(subtitleRef.current, { distance: 25, duration: 0.7, delay: 0.2 });

    if (infoCardsRef.current) {
      scrollStaggerDirectional(infoCardsRef.current.children, 'cross', 0.1, { distance: 35 });
    }

    if (formRef.current) {
      scrollFromLeft(formRef.current, { distance: 40 });
    }

    if (mapRef.current) {
      scrollFromRight(mapRef.current, { distance: 40 });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate contact dispatch
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Admissions Hotline',
      details: ['+91 8618281816', '+91 93041 23456'],
    },
    {
      icon: Mail,
      title: 'Email Inquiries',
      details: ['raventutorials@gmail.com', 'admissions@raventutorials.com'],
    },
    {
      icon: MapPin,
      title: 'Patna Campus',
      details: ['Bajrangpuri, Patna - 800007', 'Bihar, India'],
    },
    {
      icon: Clock,
      title: 'Counseling Hours',
      details: ['Mon - Sat: 8:00 AM - 8:00 PM', 'Sunday: 9:00 AM - 4:00 PM'],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 pt-36 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-center">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#e8602e]/30 text-[#ff7b47] text-xs sm:text-sm font-space font-bold shadow-[0_0_15px_rgba(232,96,46,0.2)] mx-auto">
            <Sparkles className="w-4 h-4 text-[#e8602e]" />
            <span>Connect with our Patna Faculty</span>
          </div>

          <div ref={titleRef} className="w-full">
            <WavyHeading
              text="Get in"
              gradientText="Touch"
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-outfit tracking-tight leading-[1.1] text-center w-full"
            />
          </div>

          <p ref={subtitleRef} className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium text-center">
            Have questions regarding batch schedules, course fees, or scholarship tests? Send us a message or visit our campus.
          </p>
        </section>

        {/* Contact Information Cards */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div ref={infoCardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-[#0f111a]/85 backdrop-blur-xl border border-white/10 hover:border-[#e8602e]/50 shadow-xl hover:shadow-[0_0_25px_rgba(232,96,46,0.25)] hover:-translate-y-1.5 text-center flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#161922] border border-[#e8602e]/30 flex items-center justify-center text-[#ff7b47] mb-4 shadow-[0_0_15px_rgba(232,96,46,0.2)] group-hover:scale-110 transition-transform duration-300 ease-out">
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-white mb-2 font-outfit">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-neutral-400 text-xs sm:text-sm font-jakarta font-medium">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Form & Map Section */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-20">
            {/* Contact Form */}
            <div ref={formRef} className="p-8 sm:p-10 rounded-3xl bg-[#0f111a]/90 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#161922] border border-[#e8602e]/30 flex items-center justify-center text-[#ff7b47] shadow-[0_0_15px_rgba(232,96,46,0.2)]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white font-outfit">Send an Inquiry</h2>
                  <p className="text-neutral-400 text-xs sm:text-sm font-jakarta font-medium">We typically reply within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#161922] border border-[#e8602e]/40 rounded-full flex items-center justify-center mx-auto text-[#e8602e] shadow-[0_0_20px_rgba(232,96,46,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-outfit">Inquiry Received!</h3>
                  <p className="text-neutral-300 text-sm font-jakarta font-medium max-w-sm mx-auto">
                    Thank you for reaching out. Our academic counselors will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-sheryians px-6 py-2.5 text-sm font-outfit"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-jakarta">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-2 font-space">
                        Student / Parent Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Aniket Singh"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-2 font-space">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-2 font-space">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 8618281816"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-2 font-space">
                        Interested Track
                      </label>
                      <CartoonDropdown
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Select target class/stream"
                        options={[
                          { label: 'Class 9 & 10 Foundation', value: 'class-9-10' },
                          { label: 'Class 11 & 12 Boards', value: 'class-11-12' },
                          { label: 'JEE / NEET Prep', value: 'jee-neet' },
                          { label: 'Exam Crash Course', value: 'crash-course' },
                          { label: 'Other Inquiry', value: 'other' },
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-300 mb-2 font-space">
                      Message / Question
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about current academic standard or specific questions..."
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-sheryians w-full py-4 text-sm font-outfit uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(232,96,46,0.35)]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Patna Location Map */}
            <div ref={mapRef} className="rounded-3xl overflow-hidden border border-white/15 bg-[#08090d] shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative min-h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.544773820253!2d85.1843236!3d25.6004944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c148fa7949%3A0x6b4f74d6c4eef888!2sBajrangpuri%2C%20Patna%2C%20Bihar%20800007!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raven Tutorials Patna Campus Map"
              />
            </div>
          </div>
        </section>

        <LMSFooter />
      </div>
    </>
  );
}


