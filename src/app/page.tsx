'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlowBackground } from '@/components/ui';
import { 
  GraduationCap, 
  Video, 
  MessageCircle, 
  FileText, 
  BarChart, 
  Award,
  ArrowRight,
  Play,
  Star,
  Users,
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Youtube,
  Microscope,
  Calculator,
  Monitor,
  BookMarked,
  TrendingUp,
  Palette
} from 'lucide-react';
import { LMSFooter, CourseCard } from '@/components/lms';
import AdmissionSection from '@/components/AdmissionSection';
import { dummyCourses, testimonials, features, categories, dashboardStats } from '@/constants/lmsData';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  GraduationCap,
  Video,
  MessageCircle,
  FileText,
  BarChart,
  Award,
};

const categoryIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Microscope,
  Calculator,
  Monitor,
  BookMarked,
  TrendingUp,
  Palette,
};

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Green Radial Glow Effect */}
      <GlowBackground />

      {/* Hero Section - Sheryians Style */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-[-0.03em] font-machina"
          >
            <span className="block">At <span className="text-[#00E5A8] font-juana italic">Raven</span>, we teach</span>
            <span className="block">what we do best.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-helvetica"
          >
            Master your skills with India&apos;s most passionate educators. 
            Real-world knowledge, hands-on learning, guaranteed results.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#00E5A8] text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#00E5A8]/25 text-sm sm:text-lg"
            >
              Check Courses – Make an Impact
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-sm font-medium mb-4 border border-[#00E5A8]/20">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-machina">
              Everything You Need to{' '}
              <span className="text-[#00E5A8]">Succeed</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-helvetica">
              We provide comprehensive learning solutions to help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || GraduationCap;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 bg-[#111111] rounded-2xl border border-gray-800 hover:border-[#00E5A8]/30 hover:shadow-xl hover:shadow-[#00E5A8]/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00E5A8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 font-machina">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-helvetica">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-sm font-medium mb-4 border border-[#00E5A8]/20">
                Popular Courses
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-machina">
                Explore Our Top Courses
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-xl font-helvetica">
                Choose from 150+ courses designed by expert educators to help you excel.
              </p>
            </motion.div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-[#00E5A8] font-medium hover:underline mt-4 md:mt-0"
            >
              View All Courses
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Swipeable */}
          <div className="md:hidden relative">
            <div className="flex gap-4 overflow-x-scroll pb-4 -mx-4 px-4" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
              {dummyCourses.slice(0, 6).map((course) => (
                <div key={course.id} className="min-w-[280px] flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <Link href={`/courses/${course.id}`}>
                    <div className="bg-[#111111] rounded-2xl overflow-hidden border border-gray-800">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <span className="text-xs text-[#00E5A8]">{course.category}</span>
                        <h3 className="text-white font-semibold mt-1 line-clamp-2">{course.title}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-400">{course.rating}</span>
                          <span className="text-sm text-gray-500">• {course.totalStudents} students</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-lg font-bold text-[#00E5A8]">₹{course.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{course.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs mt-2">← Swipe to see more →</p>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyCourses.slice(0, 6).map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-sm font-medium mb-4 border border-[#00E5A8]/20">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-machina">
              Browse by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const CategoryIcon = categoryIconMap[category.icon] || Microscope;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={`/courses?category=${category.name.toLowerCase()}`}
                    className="block p-6 bg-[#111111] rounded-2xl hover:bg-[#00E5A8] group transition-all duration-300 text-center border border-gray-800 hover:border-[#00E5A8]"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      <CategoryIcon className="w-6 h-6 text-[#00E5A8] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-black transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-black/70 transition-colors mt-1">
                      {category.count} Courses
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* I Want to Learn - Admission Section */}
      <AdmissionSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-sm font-medium mb-4 border border-[#00E5A8]/20">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-machina">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-helvetica">
              Join thousands of successful students who achieved their dreams with us.
            </p>
          </motion.div>

          {/* Mobile Swipeable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[280px] flex-shrink-0 bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-[#00E5A8]/30 transition-colors"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-[#00E5A8]/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0b0b0b] to-[#00E5A8]/10 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-machina">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-helvetica">
              Join 250,000+ students and transform your skills with industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00E5A8] text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#00E5A8]/25"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-gray-700 hover:border-[#00E5A8] transition-all"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}
