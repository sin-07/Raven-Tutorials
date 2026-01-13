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
              <h1 className="text-5xl font-bold text-white mb-4 font-cinzel">Our Services</h1>
              <p className="text-xl text-gray-400 font-cinzel">
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
                    <h3 className="text-lg font-bold text-white mb-3 font-cinzel">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-cinzel">
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
              <h2 className="text-4xl font-bold text-white mb-6 text-center font-cinzel">
                Class, Batch and Subject Details
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                Select from our comprehensive Annual Batch for year-round learning or intensive Crash Courses for quick exam preparation
              </p>

              {/* Course Type Info */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-3 px-5 py-3 bg-[#111111] rounded-xl border border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Annual Batch</h4>
                    <p className="text-xs text-gray-400">Complete year-long syllabus coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-[#111111] rounded-xl border border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Crash Course</h4>
                    <p className="text-xs text-gray-400">Intensive exam-focused preparation</p>
                  </div>
                </div>
              </div>

              {/* School Courses Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Class XII */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#111111]/50 backdrop-blur-sm hover:border-[#00E5A8]/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">12</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Class XII</h3>
                          <p className="text-sm text-gray-400">Standard XII</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Subject-wise</span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Unit-wise</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Annual Batch</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Physics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Chemistry</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Biology</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Crash Course</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Physics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Chemistry</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Biology</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class XI */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#111111]/50 backdrop-blur-sm hover:border-[#00E5A8]/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">11</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Class XI</h3>
                          <p className="text-sm text-gray-400">Standard XI</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Subject-wise</span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Unit-wise</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Annual Batch</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Physics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Chemistry</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Biology</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Crash Course</span>
                        </div>
                        <div className="flex items-center justify-center h-full min-h-[80px]">
                          <span className="text-sm text-gray-500 italic">Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class X */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#111111]/50 backdrop-blur-sm hover:border-[#00E5A8]/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">10</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Class X</h3>
                          <p className="text-sm text-gray-400">Standard X</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Subject-wise</span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Unit-wise</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Annual Batch</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Mathematics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Science</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Social Science</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">English</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">IT (Optional)</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Crash Course</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Mathematics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Science</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">English</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class IX */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#111111]/50 backdrop-blur-sm hover:border-[#00E5A8]/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">9</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Class IX</h3>
                          <p className="text-sm text-gray-400">Standard IX</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Subject-wise</span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-[#00E5A8]/20 text-[#00E5A8] rounded-full">Unit-wise</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Annual Batch</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Mathematics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Science</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Social Science</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">English</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a]/60 rounded-xl p-4 border border-gray-800/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-[#00E5A8]" />
                          <span className="font-semibold text-white text-sm">Crash Course</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Mathematics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]" />
                            <span className="text-sm text-gray-300">Science</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

