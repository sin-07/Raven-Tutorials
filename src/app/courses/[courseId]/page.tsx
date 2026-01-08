'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Users, 
  PlayCircle, 
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Award,
  Download,
  MessageCircle,
  Share2,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import { dummyCourses } from '@/constants/lmsData';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = dummyCourses.find(c => c.id === courseId) || dummyCourses[0];
  
  const [expandedSection, setExpandedSection] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Group lessons into sections (for demo)
  const sections = [
    { title: 'Getting Started', lessons: course.lessons.slice(0, 2) },
    { title: 'Core Concepts', lessons: course.lessons.slice(2, 4) },
    { title: 'Advanced Topics', lessons: course.lessons.slice(4) },
  ];

  const features = [
    { icon: Clock, text: `${course.duration} of content` },
    { icon: BookOpen, text: `${course.totalLessons} lessons` },
    { icon: Download, text: 'Downloadable resources' },
    { icon: Award, text: 'Certificate of completion' },
    { icon: MessageCircle, text: 'Doubt support' },
    { icon: PlayCircle, text: 'Lifetime access' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <Link 
                href="/courses" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {course.level}
                </span>
                {course.isPopular && (
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span>(2,345 ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.totalStudents.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-slate-400 text-sm">Created by</p>
                  <p className="text-white font-medium">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Right - Course Card (Desktop) */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Video Preview */}
                <div className="relative aspect-video bg-slate-200">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-blue-600 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-6">
                    {course.isFree ? (
                      <p className="text-3xl font-bold text-green-600">Free</p>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-3xl font-bold text-slate-900">
                          ₹{course.price.toLocaleString()}
                        </p>
                        {course.originalPrice && (
                          <p className="text-lg text-slate-400 line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </p>
                        )}
                        {course.originalPrice && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                            {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg">
                      {course.isFree ? 'Enroll Now - Free' : 'Buy Now'}
                    </button>
                    {!course.isFree && (
                      <button className="w-full py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all">
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Wishlist & Share */}
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-sm">Wishlist</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <h4 className="font-semibold text-slate-900">This course includes:</h4>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Price Card */}
      <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-slate-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            {course.isFree ? (
              <p className="text-2xl font-bold text-green-600">Free</p>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-900">₹{course.price.toLocaleString()}</p>
                {course.originalPrice && (
                  <p className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">
            {course.isFree ? 'Enroll Free' : 'Buy Now'}
          </button>
        </div>
      </div>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-2xl">
            {/* What you'll learn */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What you&apos;ll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Understand core concepts and fundamentals',
                  'Apply knowledge to solve real problems',
                  'Build confidence for competitive exams',
                  'Master advanced techniques and strategies',
                  'Practice with hundreds of problems',
                  'Get personalized doubt support',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Course Content</h2>
                <p className="text-sm text-slate-500">
                  {sections.length} sections • {course.totalLessons} lectures • {course.duration}
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border-b border-slate-200 last:border-b-0">
                    <button
                      onClick={() => setExpandedSection(expandedSection === sectionIndex ? -1 : sectionIndex)}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSection === sectionIndex ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                        <span className="font-medium text-slate-900">{section.title}</span>
                      </div>
                      <span className="text-sm text-slate-500">
                        {section.lessons.length} lectures
                      </span>
                    </button>

                    {expandedSection === sectionIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50"
                      >
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-4 py-3 border-t border-slate-200"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.isFree ? (
                                <PlayCircle className="w-5 h-5 text-blue-600" />
                              ) : (
                                <Lock className="w-5 h-5 text-slate-400" />
                              )}
                              <span className="text-slate-700">{lesson.title}</span>
                              {lesson.isFree && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-slate-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Instructor</h2>
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{course.instructor.name}</h3>
                    <p className="text-slate-500 mb-3">Senior Educator & Subject Expert</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>10,000+ Students</span>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      With over 10 years of teaching experience, specializing in competitive exam preparation. 
                      Alumni of IIT Delhi with a passion for making complex concepts simple and accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}
