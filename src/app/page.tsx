'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
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
import { testimonials, features, categories, dashboardStats } from '@/constants/lmsData';
import { Course } from '@/types/lms';
import {
  gsap,
  ScrollTrigger,
  scrollFadeUp,
  scrollStagger,
  cardTilt,
  magneticHover,
} from '@/lib/gsap';

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // ── GSAP refs ─────────────────────────────────────────────────────────────
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);
  const featuresTitleRef = useRef<HTMLHeadingElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const coursesSectionRef = useRef<HTMLElement>(null);
  const coursesTitleRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLElement>(null);
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaBtnsRef = useRef<HTMLDivElement>(null);
  const ctaTopBtnRef = useRef<HTMLAnchorElement>(null);

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── Text: Hero title — animate each line (block span) sequentially ────────
    if (heroTitleRef.current) {
      const lines = Array.from(heroTitleRef.current.children);
      if (lines.length) {
        gsap.fromTo(lines,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.2, delay: 0.1, ease: 'power3.out', clearProps: 'all' }
        );
      }
    }

    // ── Core: Hero subtitle + CTA fade up ─────────────────────────────────────
    if (heroSubRef.current) {
      gsap.fromTo(heroSubRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out', clearProps: 'all' }
      );
    }
    if (heroCTARef.current) {
      gsap.fromTo(heroCTARef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.0, ease: 'power3.out', clearProps: 'all' }
      );
    }

    // ── UI: Magnetic CTA button ──────────────────────────────────────────────
    if (ctaTopBtnRef.current) {
      magneticHover(ctaTopBtnRef.current, ctaTopBtnRef.current, 0.35);
    }

    // ── Scroll: Features section title word-by-word ──────────────────────────
    if (featuresTitleRef.current) {
      scrollFadeUp(featuresTitleRef.current);
    }

    // ── Scroll: Feature cards stagger ───────────────────────────────────────
    if (featuresGridRef.current) {
      const cards = featuresGridRef.current.querySelectorAll('.feature-card');
      scrollStagger(cards, 0.1);

      // UI: card tilt on each feature card
      cards.forEach((card) => cardTilt(card as HTMLElement));
    }

    // ── Scroll: Courses section title ───────────────────────────────────────
    if (coursesTitleRef.current) {
      scrollFadeUp(coursesTitleRef.current);
    }

    // ── Scroll: Categories grid ──────────────────────────────────────────────
    if (categoriesGridRef.current) {
      const catCards = categoriesGridRef.current.querySelectorAll('.cat-card');
      scrollStagger(catCards, 0.06);
    }

    // ── Scroll: Testimonials ─────────────────────────────────────────────────
    if (testimonialsSectionRef.current) {
      const cards = testimonialsSectionRef.current.querySelectorAll('.testimonial-card');
      scrollStagger(cards, 0.1);
    }

    // ── Text: CTA section title + Scroll ────────────────────────────────────
    if (ctaTitleRef.current) {
      gsap.fromTo(ctaTitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: ctaTitleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }

    // ── Core: CTA buttons stagger ────────────────────────────────────────────
    if (ctaBtnsRef.current) {
      const btns = ctaBtnsRef.current.querySelectorAll('a');
      gsap.fromTo(Array.from(btns),
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)', clearProps: 'all',
          scrollTrigger: { trigger: ctaBtnsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Green Radial Glow Effect */}
      <GlowBackground />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto pt-16 pb-12">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-space font-medium uppercase tracking-wider mb-8 shadow-sm backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>India&apos;s Premier Learning Platform</span>
          </div>

          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.08] tracking-[-0.03em] font-outfit"
          >
            <span className="block">At <span className="text-gradient-emerald">Raven</span>, we teach</span>
            <span className="block text-gradient-subtle">what we do best.</span>
          </h1>

          <p
            ref={heroSubRef}
            className="mt-8 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-jakarta font-normal leading-relaxed"
          >
            Master your skills with India&apos;s most passionate educators. 
            Real-world knowledge, interactive live classes, and guaranteed results.
          </p>

          {/* CTA Button */}
          <div ref={heroCTARef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              ref={ctaTopBtnRef}
              href="/courses"
              className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 bg-[#00E5A8] text-black font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-[#00E5A8]/20 text-sm sm:text-base font-outfit"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-emerald-400/50 transition-all duration-300 text-sm sm:text-base font-jakarta backdrop-blur-sm"
            >
              Take Admission
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSectionRef} className="py-24 bg-[#090a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-xs font-space uppercase tracking-wider font-semibold mb-4 border border-[#00E5A8]/20">
              Why Choose Us
            </span>
            <h2 ref={featuresTitleRef} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-outfit tracking-tight">
              Everything You Need to{' '}
              <span className="text-[#00E5A8]">Succeed</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-jakarta">
              We provide comprehensive learning solutions designed to help you achieve your career and academic goals.
            </p>
          </div>

          <div ref={featuresGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || GraduationCap;
              return (
                <div
                  key={index}
                  className="feature-card group p-8 bg-[#10131c] rounded-2xl border border-white/5 hover:border-[#00E5A8]/30 hover:shadow-2xl hover:shadow-[#00E5A8]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5A8] to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#00E5A8]/20">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-outfit">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-jakarta text-sm sm:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={coursesSectionRef} className="py-24 bg-[#07080c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={coursesTitleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-xs font-space uppercase tracking-wider font-semibold mb-4 border border-[#00E5A8]/20">
                Popular Courses
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-outfit tracking-tight">
                Explore Our Top Courses
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl font-jakarta">
                Choose from 150+ courses designed by expert educators to help you excel.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-[#00E5A8] font-semibold hover:text-emerald-300 font-jakarta mt-4 md:mt-0 group"
            >
              <span>View All Courses</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Swipeable */}
          <div className="md:hidden relative">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00E5A8]"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 font-jakarta">No courses available yet</p>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-scroll pb-4 -mx-4 px-4" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                {courses.map((course) => (
                  <div key={course.id} className="min-w-[280px] flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                    <Link href={`/courses/${course.id}`}>
                      <div className="bg-[#10131c] rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <span className="text-xs font-space font-medium text-[#00E5A8] uppercase tracking-wider">{course.category}</span>
                          <h3 className="text-white font-bold font-outfit mt-1 line-clamp-2">{course.title}</h3>
                          <div className="flex items-center gap-2 mt-3 font-jakarta">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm text-gray-300">{course.rating}</span>
                            <span className="text-sm text-gray-500">• {course.totalStudents} students</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2 font-space">
                            {course.isFree ? (
                              <span className="text-lg font-bold text-green-400">Free</span>
                            ) : (
                              <>
                                <span className="text-lg font-bold text-[#00E5A8]">₹{course.price}</span>
                                {course.originalPrice && course.originalPrice > course.price && (
                                  <span className="text-sm text-gray-500 line-through">₹{course.originalPrice}</span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {!loading && courses.length > 0 && (
              <p className="text-center text-gray-500 text-xs mt-2 font-jakarta">← Swipe to see more →</p>
            )}
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5A8]"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 font-jakarta">No courses available yet</p>
              </div>
            ) : (
              courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesSectionRef} className="py-24 bg-[#090a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-xs font-space uppercase tracking-wider font-semibold mb-4 border border-[#00E5A8]/20">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-outfit tracking-tight">
              Browse by Category
            </h2>
          </div>

          <div ref={categoriesGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const CategoryIcon = categoryIconMap[category.icon] || Microscope;
              return (
                <div key={category.name} className="cat-card">
                  <Link
                    href={`/courses?category=${category.name.toLowerCase()}`}
                    className="block p-6 bg-[#10131c] rounded-2xl hover:bg-[#00E5A8] group transition-all duration-300 text-center border border-white/5 hover:border-[#00E5A8] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00E5A8]/15"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      <CategoryIcon className="w-6 h-6 text-[#00E5A8] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-bold text-white group-hover:text-black transition-colors font-outfit">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 group-hover:text-black/70 transition-colors mt-1 font-jakarta">
                      {category.count} Courses
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* I Want to Learn - Admission Section */}
      <AdmissionSection />

      {/* Testimonials Section */}
      <section ref={testimonialsSectionRef} className="py-24 bg-[#07080c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#00E5A8]/10 text-[#00E5A8] rounded-full text-xs font-space uppercase tracking-wider font-semibold mb-4 border border-[#00E5A8]/20">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-outfit tracking-tight">
              What Our Students Say
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-jakarta">
              Join thousands of successful students who achieved their dreams with Raven Tutorials.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-[#10131c] rounded-2xl p-6 border border-white/5 hover:border-[#00E5A8]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00E5A8]/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-jakarta">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20" />
                  <div>
                    <p className="font-bold text-white font-outfit text-sm">{testimonial.name}</p>
                    <p className="text-xs text-emerald-400 font-space">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="py-28 bg-gradient-to-b from-[#090a0f] to-emerald-950/20 relative overflow-hidden border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 ref={ctaTitleRef} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-outfit tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-jakarta leading-relaxed">
            Join 250,000+ students and transform your academic success with expert educators.
          </p>
          <div ref={ctaBtnsRef} className="flex flex-col sm:flex-row gap-4 justify-center font-outfit">
            <Link
              href="/admission"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#00E5A8] text-black font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-[#00E5A8]/25 text-base"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-emerald-400/50 transition-all text-base font-jakarta backdrop-blur-sm"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}

