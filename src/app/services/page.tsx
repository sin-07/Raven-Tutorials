'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, GraduationCap, Users, Microscope, FileText, BarChart3, Book, Rocket } from 'lucide-react';
import Footer from '@/components/Footer';
import { GlowBackground } from '@/components/ui';

const Services: React.FC = () => {
  const router = useRouter();

  const services = [
    {
      icon: BookOpen,
      title: 'Full Week Classes',
      description: 'Classes conducted throughout the week with extra doubt session class on Sundays and Holidays (subjected to future references).',
      color: 'violet' as const
    },
    {
      icon: GraduationCap,
      title: 'Informative Workshops',
      description: 'Workshops aimed at inculcating future career prospects in various other fields.',
      color: 'teal' as const
    },
    {
      icon: Users,
      title: 'Individual-based Mentorship',
      description: 'Programmes designed for students facing hurdles in their academic performance.',
      color: 'emerald' as const
    },
    {
      icon: Microscope,
      title: 'Science Practical Classes',
      description: 'Hands-on practical classes for science subjects.',
      color: 'amber' as const
    },
    {
      icon: FileText,
      title: 'Month-end Tests',
      description: 'Tests conducted at the end of each month to check academic progress in each subject.',
      color: 'violet' as const
    },
    {
      icon: BarChart3,
      title: 'Board Pattern Tests',
      description: 'Tests conducted every 3 months for Std. XII and Std. X based on respective board patterns.',
      color: 'teal' as const
    },
    {
      icon: Book,
      title: 'Special Revision Batches',
      description: 'Special batches for Std. XII and Std. X based on respective board patterns.',
      color: 'emerald' as const
    },
    {
      icon: Rocket,
      title: 'Crash Course',
      description: 'Crash courses strictly following board patterns for Std. XII and Std. X.',
      color: 'amber' as const
    }
  ];

  const colorClasses: Record<string, string> = {
    violet: 'bg-[#111111] text-[#00E5A8] border-gray-800 hover:border-[#00E5A8]/30',
    teal: 'bg-[#111111] text-[#00E5A8] border-gray-800 hover:border-[#00E5A8]/30',
    emerald: 'bg-[#111111] text-[#00E5A8] border-gray-800 hover:border-[#00E5A8]/30',
    amber: 'bg-[#111111] text-[#00E5A8] border-gray-800 hover:border-[#00E5A8]/30'
  };

  const classDetails = [
    {
      class: 'Std. XII',
      annualBatch: 'Physics, Chemistry, Biology',
      crashCourse: 'Physics, Chemistry, Biology',
      options: 'Subject-wise & Unit-wise Option available'
    },
    {
      class: 'Std. XI',
      annualBatch: 'Physics, Chemistry, Biology',
      crashCourse: 'Subjected to future references',
      options: 'Subject-wise & Unit-wise Option available'
    },
    {
      class: 'Std. X',
      annualBatch: 'Mathematics, Science, Social Science, English, IT (Optional)',
      crashCourse: 'Mathematics, Science, English',
      options: 'Subject-wise & Unit-wise Option available'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden">
        {/* Green Radial Glow Effect */}
      <GlowBackground />
        <div className="relative z-10">
        {/* Header */}
        <section className="py-16 pt-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-4 font-machina">Our Services</h1>
              <p className="text-xl text-gray-400 font-helvetica">
                Comprehensive educational programs designed for your success
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`${colorClasses[service.color]} rounded-xl border-2 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <service.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 font-machina">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-helvetica">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class Details Section */}
        <section className="bg-[#080808] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-12 text-center font-machina">
                Class, Batch and Subject Details
              </h2>

              {/* Desktop Table */}
              <div className="hidden md:block bg-[#111111] rounded-xl shadow-lg overflow-hidden border border-gray-800">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#111111] border-b border-gray-800">
                      <th className="px-6 py-4 text-left font-semibold text-[#00E5A8]">Class</th>
                      <th className="px-6 py-4 text-left font-semibold text-[#00E5A8]">Annual Batch Subject</th>
                      <th className="px-6 py-4 text-left font-semibold text-[#00E5A8]">Crash-course Batch Subject</th>
                      <th className="px-6 py-4 text-left font-semibold text-[#00E5A8]">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classDetails.map((detail, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-[#111111]' : 'bg-[#080808]'} hover:bg-gray-800 transition`}
                      >
                        <td className="px-6 py-4 font-bold text-[#00E5A8] border-t border-gray-800">
                          {detail.class}
                        </td>
                        <td className="px-6 py-4 text-gray-300 border-t border-gray-800">
                          {detail.annualBatch}
                        </td>
                        <td className="px-6 py-4 text-gray-300 border-t border-gray-800">
                          {detail.crashCourse}
                        </td>
                        <td className="px-6 py-4 text-gray-300 border-t border-gray-800">
                          {detail.options}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-6">
                {classDetails.map((detail, index) => (
                  <div key={index} className="bg-[#111111] rounded-xl shadow-lg p-6 border border-gray-800">
                    <h3 className="text-2xl font-bold text-[#00E5A8] mb-4">{detail.class}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Annual Batch Subject</h4>
                        <p className="text-gray-400">{detail.annualBatch}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">Crash-course Batch Subject</h4>
                        <p className="text-gray-400">{detail.crashCourse}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">Options</h4>
                        <p className="text-gray-400">{detail.options}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#080808] py-16 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Choose the right program for your academic goals and start your journey to excellence
            </p>
            <button 
              onClick={() => router.push('/admission')}
              className="bg-[#00E5A8] text-black px-8 py-4 rounded-full hover:scale-105 transition font-semibold"
            >
              Enroll Now
            </button>
          </div>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
