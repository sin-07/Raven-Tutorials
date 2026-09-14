'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  level: string;
  duration: string;
  totalLessons: number;
  totalStudents: number;
  rating: number;
  totalRatings: number;
  price: number;
  originalPrice: number;
  isFree: boolean;
  isPopular: boolean;
  features: string[];
  syllabus: string[];
  createdAt: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.course);
      } else {
        setError(data.message || 'Course not found');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, fetchCourse]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-yellow-400"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black text-black font-outfit mb-4">Course Not Found</h1>
        <p className="text-neutral-700 mb-6 font-medium font-jakarta">{error || 'The course you are looking for does not exist.'}</p>
        <Link
          href="/courses"
          className="btn-cartoon px-8 py-3.5 bg-yellow-300 text-black border-2 border-black font-black rounded-2xl shadow-[4px_4px_0px_#000] font-outfit"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  // Group syllabus items into sections
  const syllabusPerSection = Math.ceil(course.syllabus.length / 3) || 1;
  const sections = course.syllabus.length > 0 ? [
    { title: 'Getting Started', items: course.syllabus.slice(0, syllabusPerSection) },
    { title: 'Core Concepts', items: course.syllabus.slice(syllabusPerSection, syllabusPerSection * 2) },
    { title: 'Advanced Topics', items: course.syllabus.slice(syllabusPerSection * 2) },
  ].filter(s => s.items.length > 0) : [];

  const features = [
    { icon: Clock, text: `${course.duration} of content` },
    { icon: BookOpen, text: `${course.totalLessons} lessons` },
    { icon: Download, text: 'Downloadable resources' },
    { icon: Award, text: 'Certificate of completion' },
    { icon: MessageCircle, text: 'Doubt support' },
    { icon: PlayCircle, text: 'Lifetime access' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-emerald-300 selection:text-black relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-12 bg-[#f0fdf4] border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <Link 
                href="/courses" 
                className="btn-cartoon inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#dcfce7] border-2 border-black font-bold text-xs text-black shadow-[2px_2px_0px_#000] mb-6 hover:bg-[#bbf7d0] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Courses</span>
              </Link>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3.5 py-1 bg-emerald-300 text-black rounded-full text-xs font-bold font-space uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                  {course.category}
                </span>
                <span className="px-3.5 py-1 bg-[#bbf7d0] text-black rounded-full text-xs font-bold font-space uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                  {course.level}
                </span>
                {course.isPopular && (
                  <span className="px-3.5 py-1 bg-emerald-400 text-black rounded-full text-xs font-bold font-space uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-black font-outfit mb-4">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-neutral-700 mb-6 leading-relaxed font-jakarta font-medium">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-neutral-800 font-jakarta font-bold text-sm mb-6">
                <div className="flex items-center gap-1.5 bg-[#dcfce7] px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-black text-black">{course.rating}</span>
                  <span className="text-neutral-600">({course.totalRatings} ratings)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#bbf7d0] px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <Users className="w-4 h-4 text-black" />
                  <span>{course.totalStudents.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#d1fae5] px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <Clock className="w-4 h-4 text-black" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 bg-[#dcfce7] p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] inline-flex">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-black shadow-[2px_2px_0px_#000]"
                />
                <div>
                  <p className="text-neutral-600 text-xs font-medium font-jakarta">Course Instructor</p>
                  <p className="text-black font-black font-outfit text-base">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Right - Course Card (Desktop) */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-28 bg-[#f0fdf4] rounded-3xl shadow-[8px_8px_0px_#000] overflow-hidden border-3 border-black"
              >
                {/* Video Preview */}
                <div className="relative aspect-video bg-neutral-100 border-b-3 border-black">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-emerald-300 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-black ml-0.5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-6">
                    {course.isFree ? (
                      <p className="text-3xl font-black text-black font-outfit">Free</p>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-3xl font-black text-black font-outfit">
                          ₹{course.price.toLocaleString()}
                        </p>
                        {course.originalPrice && (
                          <p className="text-lg text-neutral-400 line-through font-bold">
                            ₹{course.originalPrice.toLocaleString()}
                          </p>
                        )}
                        {course.originalPrice && (
                          <span className="px-2 py-0.5 bg-emerald-200 text-black border border-black text-xs font-bold rounded-lg shadow-[1px_1px_0px_#000]">
                            {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="btn-cartoon w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black rounded-2xl border-2 border-black transition-all shadow-[4px_4px_0px_#000] font-outfit text-base active:translate-x-1 active:translate-y-1">
                      {course.isFree ? 'Enroll Now - Free' : 'Buy Now'}
                    </button>
                    {!course.isFree && (
                      <button className="btn-cartoon w-full py-3.5 bg-white hover:bg-[#dcfce7] text-black font-bold rounded-2xl border-2 border-black transition-all shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1">
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Wishlist & Share */}
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t-2 border-black font-bold">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="flex items-center gap-2 text-neutral-700 hover:text-black transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-sm">Wishlist</span>
                    </button>
                    <button className="flex items-center gap-2 text-neutral-700 hover:text-black transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t-2 border-black space-y-3">
                    <h4 className="font-black text-black font-outfit">This course includes:</h4>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-neutral-800 font-medium">
                        <feature.icon className="w-4 h-4 text-black" />
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
      <div className="lg:hidden sticky top-20 z-40 bg-[#f0fdf4] border-b-2 border-black px-4 py-4 shadow-[0_4px_0_#000]">
        <div className="flex items-center justify-between">
          <div>
            {course.isFree ? (
              <p className="text-2xl font-black text-black">Free</p>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black text-black">₹{course.price.toLocaleString()}</p>
                {course.originalPrice && (
                  <p className="text-sm text-neutral-400 line-through font-bold">₹{course.originalPrice.toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
          <button className="btn-cartoon px-6 py-2.5 bg-emerald-400 text-black font-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
            {course.isFree ? 'Enroll Free' : 'Buy Now'}
          </button>
        </div>
      </div>

      {/* Course Content */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-2xl">
            {/* What you'll learn */}
            {course.features.length > 0 && (
              <div className="mb-12 p-8 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[6px_6px_0px_#000]">
                <h2 className="text-2xl font-black text-black font-outfit mb-6">What you&apos;ll learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-800 font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Content - Syllabus */}
            {sections.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-black font-outfit">Course Content</h2>
                  <p className="text-sm text-neutral-700 font-bold font-jakarta">
                    {sections.length} sections • {course.syllabus.length} modules • {course.duration}
                  </p>
                </div>

                <div className="border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_#000] bg-[#f0fdf4]">
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-b-2 border-black last:border-b-0">
                      <button
                        onClick={() => setExpandedSection(expandedSection === sectionIndex ? -1 : sectionIndex)}
                        className="w-full flex items-center justify-between p-5 hover:bg-[#e6f9ee] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSection === sectionIndex ? (
                            <ChevronUp className="w-5 h-5 text-black" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-black" />
                          )}
                          <span className="font-black text-black font-outfit text-base">{section.title}</span>
                        </div>
                        <span className="text-xs font-bold text-neutral-800 bg-[#dcfce7] px-2.5 py-1 rounded-full border border-black">
                          {section.items.length} modules
                        </span>
                      </button>

                      {expandedSection === sectionIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-white"
                        >
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-3 px-6 py-3.5 border-t border-neutral-200"
                            >
                              <BookOpen className="w-4 h-4 text-black" />
                              <span className="text-neutral-800 text-sm font-semibold">{item}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="text-2xl font-black text-black font-outfit mb-6">Your Instructor</h2>
              <div className="bg-[#f0fdf4] rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[6px_6px_0px_#000]">
                <div className="flex items-start gap-4 flex-col sm:flex-row">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-black shadow-[3px_3px_0px_#000]"
                  />
                  <div>
                    <h3 className="text-2xl font-black text-black font-outfit">{course.instructor.name}</h3>
                    <p className="text-neutral-700 font-bold text-sm mb-3">Senior Educator & Subject Expert</p>
                    <div className="flex items-center gap-4 text-sm font-bold text-neutral-800">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-black" />
                        <span>10,000+ Students</span>
                      </div>
                    </div>
                    <p className="mt-4 text-neutral-800 text-sm leading-relaxed font-medium">
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

