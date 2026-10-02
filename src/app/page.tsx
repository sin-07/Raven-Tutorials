'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  GraduationCap, 
  Video, 
  MessageCircle, 
  FileText, 
  BarChart, 
  Award,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Microscope,
  Calculator,
  Monitor,
  BookMarked,
  TrendingUp,
  Palette,
  ShieldCheck,
  Zap,
  Target,
  Trophy,
  Crown,
  Medal,
  Stethoscope,
  HeartHandshake,
  Quote,
  MapPin
} from 'lucide-react';
import { LMSFooter, CourseCard } from '@/components/lms';
import { testimonials, features, categories } from '@/constants/lmsData';
import { Course } from '@/types/lms';
import WavyHeading from '@/components/WavyHeading';
import {
  gsap,
  scrollFromLeft,
  scrollFromRight,
  scrollFromUp,
  scrollFromDown,
  scrollStaggerDirectional,
  animateFromUp,
  animateFromDown,
  animateFromLeft,
  animateFromRight,
} from '@/lib/gsap';


// Lazily load heavy admission section to optimize initial bundle
const AdmissionSection = dynamic(() => import('@/components/AdmissionSection'), {
  ssr: false,
  loading: () => (
    <div className="py-24 flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-emerald-500" />
    </div>
  ),
});

const HomeArticlesSection = dynamic(() => import('@/components/HomeArticlesSection'), {
  loading: () => (
    <div className="py-24 flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-emerald-500" />
    </div>
  ),
});

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
  const [activeTab, setActiveTab] = useState('all');
  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'students' | 'parents'>('all');

  // GSAP animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const featuresSectionRef = useRef<HTMLElement>(null);
  const featuresTitleRef = useRef<HTMLHeadingElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);

  const methodologySectionRef = useRef<HTMLElement>(null);
  const methodologyGridRef = useRef<HTMLDivElement>(null);

  const coursesSectionRef = useRef<HTMLElement>(null);
  const coursesTitleRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLElement>(null);
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success && Array.isArray(data.courses)) {
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

  // GSAP Directional Animations (Left, Right, Up, Down)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Hero: Badge from Up with smooth continuous float, Title & Subtitle from Down, Buttons from Left & Right
      if (heroBadgeRef.current) {
        animateFromUp(heroBadgeRef.current, 0.1, 35, 0.65);
        gsap.to(heroBadgeRef.current, {
          y: -5,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.8,
        });
      }
      if (heroTitleRef.current) animateFromDown(heroTitleRef.current, 0.25, 45, 0.7);
      if (heroSubRef.current) animateFromDown(heroSubRef.current, 0.4, 35, 0.65);
      if (heroCTARef.current) {
        const buttons = Array.from(heroCTARef.current.children);
        if (buttons[0]) animateFromLeft(buttons[0], 0.5, 40, 0.6);
        if (buttons[1]) animateFromRight(buttons[1], 0.5, 40, 0.6);
      }

      // 2. Features Section: Title from Up, Cards in cross pattern (Left, Up, Down, Right)
      if (featuresTitleRef.current) scrollFromUp(featuresTitleRef.current, { distance: 40 });
      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll('.feature-card');
        scrollStaggerDirectional(cards, 'cross', 0.1, { distance: 45 });
      }

      // 3. 4-Step Methodology: 01 from Left, 02 from Up, 03 from Down, 04 from Right
      if (methodologyGridRef.current) {
        const steps = methodologyGridRef.current.querySelectorAll('.methodology-step');
        if (steps[0]) scrollFromLeft(steps[0], { distance: 50 });
        if (steps[1]) scrollFromUp(steps[1], { distance: 45 });
        if (steps[2]) scrollFromDown(steps[2], { distance: 45 });
        if (steps[3]) scrollFromRight(steps[3], { distance: 50 });
      }

      // 4. Featured Courses: Catalog title from Left
      if (coursesTitleRef.current) scrollFromLeft(coursesTitleRef.current, { distance: 45 });

      // 5. Subject Focus Categories: Stagger alternating from Left & Right
      if (categoriesGridRef.current) {
        const catCards = categoriesGridRef.current.querySelectorAll('.cat-card');
        scrollStaggerDirectional(catCards, 'cross', 0.07, { distance: 35 });
      }

      // 6. Testimonials: Stats entrance animation
      if (testimonialsSectionRef.current) {
        const statCards = testimonialsSectionRef.current.querySelectorAll('.testimonial-stat-card');
        if (statCards.length > 0) {
          scrollStaggerDirectional(statCards, 'cross', 0.08, { distance: 30 });
        }
      }

      // 7. CTA Banner: Reveal from Down
      if (ctaSectionRef.current) {
        scrollFromDown(ctaSectionRef.current, { distance: 45 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);



  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'foundation') return c.category.toLowerCase().includes('foundation') || c.category.toLowerCase().includes('class');
    if (activeTab === 'science') return c.category.toLowerCase().includes('science') || c.category.toLowerCase().includes('physics') || c.category.toLowerCase().includes('math');
    if (activeTab === 'competitive') return c.category.toLowerCase().includes('jee') || c.category.toLowerCase().includes('neet');
    return true;
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-neutral-900 selection:bg-yellow-300 selection:text-black relative overflow-hidden">

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-7">
          {/* Badge Pill */}
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Academic Excellence & Competitive Mastery</span>
          </div>

          {/* Display Headline */}
          <div ref={heroTitleRef}>
            <WavyHeading
              text="Empower Your Mind."
              gradientText="Lead Your Future."
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-neutral-950 leading-[1.08] tracking-tight font-outfit"
              continuous={true}
            />
          </div>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="text-base sm:text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto font-jakarta font-semibold leading-relaxed"
          >
            Premier coaching for <span className="text-black font-black underline decoration-emerald-400 decoration-4">CBSE, ICSE, BSEB, JEE</span>, and <span className="text-black font-black underline decoration-teal-400 decoration-4">NEET</span>. Experience personalized mentorship with India&apos;s finest educators.
          </p>

          {/* Action CTAs */}
          <div ref={heroCTARef} className="flex flex-wrap items-center justify-center gap-4 pt-3 font-outfit">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4ade80] hover:bg-[#86efac] text-black font-black rounded-2xl border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#000] transition-spring text-sm sm:text-base cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </Link>
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f0fdf4] hover:bg-[#dcfce7] text-black font-black rounded-2xl border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#000] transition-spring text-sm sm:text-base font-jakarta cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Apply for Admission</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE RAVEN (FEATURES MATRIX) ────────────────────────── */}
      <section ref={featuresSectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="pill-badge mb-4">Why Choose RAVEN</span>
            <WavyHeading
              text="An Ecosystem Built for"
              gradientText="High Achievers"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight"
            />
            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-bold max-w-2xl mx-auto font-jakarta">
              From foundational concepts to advanced competitive problem-solving, our structured methodology ensures top results.
            </p>
          </div>

          <div ref={featuresGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || GraduationCap;
              const cardColors = [
                'bg-[#f0fdf4]',
                'bg-[#dcfce7]',
                'bg-[#bbf7d0]',
                'bg-[#ecfdf5]',
                'bg-[#e6f9ee]',
                'bg-[#d1fae5]',
              ];
              const cardBg = cardColors[index % cardColors.length];

              return (
                <div
                  key={index}
                  className={`feature-card ${cardBg} group p-8 rounded-3xl transition-all duration-200 border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000] group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3 font-outfit">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-800 leading-relaxed font-jakarta font-bold text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4-STEP LEARNING METHODOLOGY ────────────────────────── */}
      <section ref={methodologySectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="pill-badge mb-4">Structured Pedagogy</span>
            <WavyHeading
              text="The 4-Step Road to"
              gradientText="Rank 1"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight"
            />
            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-bold max-w-2xl mx-auto font-jakarta">
              A scientifically proven preparation model that leaves zero knowledge gaps.
            </p>
          </div>

          <div ref={methodologyGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="methodology-step bg-[#f0fdf4] p-7 rounded-3xl border-2 border-black shadow-[4px_4px_0px_#000] relative transition-all duration-200 hover:-translate-y-1">
              <span className="w-10 h-10 bg-black text-emerald-300 rounded-xl flex items-center justify-center font-black font-space text-base border-2 border-black shadow-[2px_2px_0px_#000] absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-200 border-2 border-black flex items-center justify-center text-black mb-5 shadow-[2px_2px_0px_#000]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-black mb-2 font-outfit">Concept Mastery</h3>
              <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed font-jakarta font-bold">
                Deep theoretical breakdown with visualization, live demonstrations, and intuitive understanding.
              </p>
            </div>

            <div className="methodology-step bg-[#dcfce7] p-7 rounded-3xl border-2 border-black shadow-[4px_4px_0px_#000] relative transition-all duration-200 hover:-translate-y-1">
              <span className="w-10 h-10 bg-black text-emerald-300 rounded-xl flex items-center justify-center font-black font-space text-base border-2 border-black shadow-[2px_2px_0px_#000] absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-200 border-2 border-black flex items-center justify-center text-black mb-5 shadow-[2px_2px_0px_#000]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-black mb-2 font-outfit">Targeted Practice</h3>
              <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed font-jakarta font-bold">
                Graded Daily Practice Papers (DPPs) ranging from foundational boards to high-difficulty competitive questions.
              </p>
            </div>

            <div className="methodology-step bg-[#bbf7d0] p-7 rounded-3xl border-2 border-black shadow-[4px_4px_0px_#000] relative transition-all duration-200 hover:-translate-y-1">
              <span className="w-10 h-10 bg-black text-emerald-300 rounded-xl flex items-center justify-center font-black font-space text-base border-2 border-black shadow-[2px_2px_0px_#000] absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-200 border-2 border-black flex items-center justify-center text-black mb-5 shadow-[2px_2px_0px_#000]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-black mb-2 font-outfit">1-on-1 Doubt Relief</h3>
              <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed font-jakarta font-bold">
                Dedicated daily doubt clearing clinics ensuring no student leaves the classroom with unresolved questions.
              </p>
            </div>

            <div className="methodology-step bg-[#ecfdf5] p-7 rounded-3xl border-2 border-black shadow-[4px_4px_0px_#000] relative transition-all duration-200 hover:-translate-y-1">
              <span className="w-10 h-10 bg-black text-emerald-300 rounded-xl flex items-center justify-center font-black font-space text-base border-2 border-black shadow-[2px_2px_0px_#000] absolute top-6 right-6">04</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-200 border-2 border-black flex items-center justify-center text-black mb-5 shadow-[2px_2px_0px_#000]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-black mb-2 font-outfit">Real-Time Testing</h3>
              <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed font-jakarta font-bold">
                National level mock tests with instant graphical AI analysis, speed benchmarking, and rank prediction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES SHOWCASE ────────────────────────── */}
      <section ref={coursesSectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={coursesTitleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="pill-badge mb-4">Academic Catalog</span>
              <WavyHeading
                text="Featured Programs &"
                gradientText="Batches"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight !text-left"
              />
              <p className="mt-3 text-base text-neutral-600 font-bold max-w-xl font-jakarta">
                Choose the specialized batch aligned with your academic year and competitive target.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap font-jakarta text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#f0fdf4] text-neutral-800 hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setActiveTab('foundation')}
                className={`px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all ${
                  activeTab === 'foundation'
                    ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#f0fdf4] text-neutral-800 hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                }`}
              >
                Class 8 - 10
              </button>
              <button
                onClick={() => setActiveTab('science')}
                className={`px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all ${
                  activeTab === 'science'
                    ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#f0fdf4] text-neutral-800 hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                }`}
              >
                Class 11 - 12
              </button>
              <button
                onClick={() => setActiveTab('competitive')}
                className={`px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all ${
                  activeTab === 'competitive'
                    ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#f0fdf4] text-neutral-800 hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                }`}
              >
                JEE & NEET
              </button>
            </div>
          </div>

          {/* Grid of Courses */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-emerald-500" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-[#f0fdf4] border-2 border-black rounded-3xl p-8 shadow-[4px_4px_0px_#000]">
                <p className="text-neutral-700 font-bold font-jakarta">No courses currently found in this category.</p>
              </div>
            ) : (
              filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY SUBJECT / CATEGORY ────────────────────────── */}
      <section ref={categoriesSectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="pill-badge mb-4">Curriculum Disciplines</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight">
              Browse by Subject Focus
            </h2>
          </div>

          <div ref={categoriesGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, cIdx) => {
              const CategoryIcon = categoryIconMap[category.icon] || Microscope;
              const catBgs = [
                'bg-[#f0fdf4]',
                'bg-[#dcfce7]',
                'bg-[#bbf7d0]',
                'bg-[#ecfdf5]',
                'bg-[#e6f9ee]',
                'bg-[#d1fae5]',
              ];
              const cardBg = catBgs[cIdx % catBgs.length];

              return (
                <div key={category.name} className="cat-card">
                  <Link
                    href={`/courses?category=${category.name.toLowerCase()}`}
                    className={`block p-6 rounded-2xl ${cardBg} border-2 border-black shadow-[4px_4px_0px_#000] group transition-all duration-200 text-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]`}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-black text-black font-outfit text-sm sm:text-base">
                      {category.name}
                    </h3>
                    <p className="text-xs text-emerald-900 font-bold mt-1 font-jakarta">
                      {category.count} Modules
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RSAT SCHOLARSHIP ADMISSION TEST PROMO CALLOUT ────────────────────────── */}
      <section className="py-16 bg-[#dcfce7] border-t-3 border-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#86efac] border-2 border-black rounded-full text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Raven Scholarship Admission Test (RSAT) 2026-27</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-outfit text-black leading-tight">
                Win Up To <span className="bg-emerald-300 px-2 py-0.5 rounded-xl border-2 border-black inline-block shadow-[2px_2px_0px_#000]">50% Tuition Waiver</span> in 15 Minutes!
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 font-bold font-jakarta leading-relaxed">
                Take our free 20-question online diagnostic test. Test your Physics, Chemistry, Maths, and Logical Reasoning concepts and get instant scholarship discount certificates for our Patna campus!
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-black font-space uppercase pt-1">
                <span className="flex items-center gap-1.5 text-emerald-950"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> 100% Free Assessment</span>
                <span className="flex items-center gap-1.5 text-emerald-950"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Instant Verified Certificate</span>
                <span className="flex items-center gap-1.5 text-emerald-950"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Class 8th to 12th</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2.5">
              <Link
                href="/rsat"
                className="btn-cartoon px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit uppercase tracking-wider text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 text-center"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Take 15-Min RSAT Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] font-bold text-center text-neutral-500 font-jakarta flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Instant online evaluation & certificate</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMISSION FLOW COMPONENT ────────────────────────── */}
      <AdmissionSection />

      {/* ── STUDENTS & PARENTS TESTIMONIALS SECTION (DUAL-ROW MARQUEE) ────────────────────────── */}
      <section ref={testimonialsSectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="pill-badge mb-4">
              <Sparkles className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
              Real Voices & Authentic Experiences
            </span>
            <WavyHeading
              text="Hear From Our"
              gradientText="Students & Parents"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight"
            />
            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-bold max-w-2xl mx-auto font-jakarta">
              Real stories of academic transformation from students cracking JEE, NEET & Boards, and the parents who trusted Raven Tutorials for their journey.
            </p>
          </div>

          {/* Trust & Satisfaction Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
            <div className="testimonial-stat-card bg-[#f0fdf4] border-2 sm:border-[2.5px] border-black rounded-2xl p-4 sm:p-5 text-center shadow-[3px_3px_0px_#000] flex flex-col justify-center items-center">
              <div className="flex items-center justify-center gap-0.5 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-black stroke-[1.5]" />
                ))}
              </div>
              <p className="text-2xl sm:text-3xl font-black text-black font-outfit">4.9 / 5.0</p>
              <p className="text-xs font-black text-neutral-800 font-jakarta mt-0.5">Average Review Rating</p>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-black/30 px-2 py-0.5 rounded mt-1.5">1,400+ Verified Reviews</span>
            </div>

            <div className="testimonial-stat-card bg-[#f0fdf4] border-2 sm:border-[2.5px] border-black rounded-2xl p-4 sm:p-5 text-center shadow-[3px_3px_0px_#000] flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-200 border border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                <GraduationCap className="w-4 h-4 text-emerald-950" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-outfit">98.4%</p>
              <p className="text-xs font-black text-neutral-800 font-jakarta mt-0.5">Target Score Growth</p>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-black/30 px-2 py-0.5 rounded mt-1.5">Board & Competitive</span>
            </div>

            <div className="testimonial-stat-card bg-[#f0fdf4] border-2 sm:border-[2.5px] border-black rounded-2xl p-4 sm:p-5 text-center shadow-[3px_3px_0px_#000] flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-xl bg-amber-200 border border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                <HeartHandshake className="w-4 h-4 text-amber-950" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-amber-950 font-outfit">99.1%</p>
              <p className="text-xs font-black text-neutral-800 font-jakarta mt-0.5">Parent Recommendation</p>
              <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 border border-black/30 px-2 py-0.5 rounded mt-1.5">Transparent Mentorship</span>
            </div>

            <div className="testimonial-stat-card bg-[#f0fdf4] border-2 sm:border-[2.5px] border-black rounded-2xl p-4 sm:p-5 text-center shadow-[3px_3px_0px_#000] flex flex-col justify-center items-center">
              <div className="w-8 h-8 rounded-xl bg-sky-200 border border-black flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_#000]">
                <Users className="w-4 h-4 text-sky-950" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">1 : 15</p>
              <p className="text-xs font-black text-neutral-800 font-jakarta mt-0.5">Optimal Batch Ratio</p>
              <span className="text-[10px] font-mono font-bold text-sky-900 bg-sky-100 border border-black/30 px-2 py-0.5 rounded mt-1.5">Personal Attention</span>
            </div>
          </div>

          {/* Perspective Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Testimonials', count: 12, icon: Star },
              { key: 'students', label: 'Student Stories', count: 6, icon: GraduationCap },
              { key: 'parents', label: 'Parent Reviews', count: 6, icon: HeartHandshake },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = testimonialFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setTestimonialFilter(tab.key as 'all' | 'students' | 'parents')}
                  className={`btn-cartoon px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black font-outfit transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] translate-y-[-1px]'
                      : 'bg-[#f0fdf4] hover:bg-[#dcfce7] text-neutral-700 border-2 border-black/40 shadow-[1px_1px_0px_#000]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
                      isActive ? 'bg-black text-emerald-300' : 'bg-black/10 text-black'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DUAL-ROW INFINITE MARQUEE CAROUSEL ────────────────────────── */}
        {(() => {
          const row1List = [
            {
              id: 's1',
              type: 'student' as const,
              name: 'Ananya Verma',
              relationOrCollege: 'IIT Bombay (CSE) • AIR 142',
              highlightBadge: 'JEE Adv 99.8%ile',
              tag: 'Class 12 • JEE Adv',
              rating: 5,
              quote: 'Just go for it — best decision for JEE!',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              location: 'Boring Road, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p1',
              type: 'parent' as const,
              name: 'Dr. Arvind Verma',
              relationOrCollege: 'Father of Ananya (AIR 142)',
              highlightBadge: 'Parent of JEE Topper',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Mentors treat your child like family.',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              location: 'Boring Road, Patna',
              verifiedLabel: 'Verified Parent',
            },
            {
              id: 's2',
              type: 'student' as const,
              name: 'Rahul Kumar',
              relationOrCollege: 'AIIMS Patna (MBBS) • 692/720',
              highlightBadge: 'NEET UG Star',
              tag: 'Class 12 • NEET UG',
              rating: 5,
              quote: 'Cracked AIIMS in my very first attempt!',
              avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
              location: 'Kankarbagh, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p2',
              type: 'parent' as const,
              name: 'Sunita & Manoj Kumar',
              relationOrCollege: 'Parents of Rahul (AIIMS Patna)',
              highlightBadge: 'Parents of NEET Scholar',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Unmatched personal care & regular guidance.',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
              location: 'Kankarbagh, Patna',
              verifiedLabel: 'Verified Parents',
            },
            {
              id: 's3',
              type: 'student' as const,
              name: 'Shivam Saurabh',
              relationOrCollege: 'NIT Trichy (ECE) • 99.64%ile',
              highlightBadge: 'JEE Main 99.64%ile',
              tag: 'Class 12 • JEE Main',
              rating: 5,
              quote: 'Mock tests were an absolute game changer!',
              avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
              location: 'Bailey Road, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p3',
              type: 'parent' as const,
              name: 'Anita Sharma',
              relationOrCollege: 'Mother of Shivam (NIT Trichy)',
              highlightBadge: 'Parent of NIT Scholar',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Their discipline and positivity are contagious.',
              avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
              location: 'Bailey Road, Patna',
              verifiedLabel: 'Verified Parent',
            },
          ];

          const row2List = [
            {
              id: 's4',
              type: 'student' as const,
              name: 'Priya Singh',
              relationOrCollege: 'Bihar State Rank 2 • 98.8%',
              highlightBadge: 'CBSE 12th Topper',
              tag: 'Class 12 • CBSE Board',
              rating: 5,
              quote: 'Scored 100/100 in Maths — pure concept clarity!',
              avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
              location: 'Bailey Road, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p4',
              type: 'parent' as const,
              name: 'Rajeshwar Prasad',
              relationOrCollege: 'Father of Ayush (Class 9)',
              highlightBadge: 'Parent of Foundation',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Cultivated true love for science in my child.',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
              location: 'Danapur, Patna',
              verifiedLabel: 'Verified Parent',
            },
            {
              id: 's5',
              type: 'student' as const,
              name: 'Aditya Raj',
              relationOrCollege: 'Standard Maths 100/100 • 98.4%',
              highlightBadge: 'Class 10 Foundation',
              tag: 'Class 10 Board',
              rating: 5,
              quote: 'Zero exam fear, only rock-solid confidence!',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
              location: 'Rajendra Nagar, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p5',
              type: 'parent' as const,
              name: 'Dr. Meenakshi Jha',
              relationOrCollege: 'Mother of Tanmay (CBSE 97.6%)',
              highlightBadge: 'Parent of Board Topper',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Weekly reports gave us total peace of mind.',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
              location: 'Ashiana Nagar, Patna',
              verifiedLabel: 'Verified Parent',
            },
            {
              id: 's6',
              type: 'student' as const,
              name: 'Sneha Kumari',
              relationOrCollege: 'PMCH Patna (MBBS) • 675 Marks',
              highlightBadge: 'NEET UG 675/720',
              tag: 'Class 12 • NEET UG',
              rating: 5,
              quote: '1-on-1 doubt clearing was key to my rank!',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
              location: 'Patliputra, Patna',
              verifiedLabel: 'Verified Student',
            },
            {
              id: 'p6',
              type: 'parent' as const,
              name: 'Vikramaditya Roy',
              relationOrCollege: 'Father of Sneha (PMCH Patna)',
              highlightBadge: 'Parent of Medical Student',
              tag: 'Parent Review',
              rating: 5,
              quote: 'Hands down the most reliable mentors in Bihar.',
              avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
              location: 'Patliputra, Patna',
              verifiedLabel: 'Verified Parent',
            },
          ];

          const filtered1 = row1List.filter((item) =>
            testimonialFilter === 'all' ? true : testimonialFilter === 'students' ? item.type === 'student' : item.type === 'parent'
          );
          const filtered2 = row2List.filter((item) =>
            testimonialFilter === 'all' ? true : testimonialFilter === 'students' ? item.type === 'student' : item.type === 'parent'
          );

          // Duplicate items to ensure wide seamless infinite marquee loop
          const row1Items = [...filtered1, ...filtered1, ...filtered1, ...filtered1];
          const row2Items = [...filtered2, ...filtered2, ...filtered2, ...filtered2];

          const renderCard = (item: typeof row1List[0], uniqueKey: string) => (
            <div
              key={uniqueKey}
              className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-[#f0fdf4] hover:bg-[#e6f9ee] rounded-3xl p-5 sm:p-6 border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1 transition-all duration-200 text-black flex flex-col justify-between relative overflow-hidden group select-none cursor-default"
            >
              {/* Decorative Subtle Watermark Quote */}
              <Quote className="absolute top-3 right-3 w-10 h-10 text-black/5 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                {/* Top Row: Role Badge & Highlight Tag */}
                <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                  {item.type === 'student' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-200 border border-black rounded-lg text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-950" />
                      <span>Student Story</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-200 border border-black rounded-lg text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-950" />
                      <span>Parent Review</span>
                    </span>
                  )}
                  <span className="font-mono font-black text-xs text-neutral-900 bg-white px-2.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                    {item.highlightBadge}
                  </span>
                </div>

                {/* Star Rating & Category Pill */}
                <div className="flex items-center justify-between gap-1 mb-2.5 pt-0.5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-black stroke-[1.5]" />
                    ))}
                    <span className="text-xs font-black font-mono ml-1 text-neutral-800">5.0</span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-600 font-jakarta bg-black/5 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                {/* Single-Line Punchy Quote (As requested: e.g. "Go for it!") */}
                <div className="my-2.5">
                  <p className="text-black text-base sm:text-lg font-black font-outfit leading-tight tracking-tight line-clamp-1 relative z-10" title={item.quote}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Avatar, Name, Relationship & Location */}
              <div className="flex items-center gap-3 pt-3 border-t-2 border-black/10 relative z-10 mt-1">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-black shadow-[2px_2px_0px_#000] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-black text-black font-outfit text-sm truncate">{item.name}</p>
                    <span className="inline-flex items-center text-emerald-700" title={item.verifiedLabel}>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-400 text-black stroke-[1.5]" />
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 font-bold font-jakarta truncate">{item.relationOrCollege}</p>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium font-jakarta mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <div className="relative w-full overflow-hidden py-3 space-y-6">
              {/* Left & Right Subtle Fade Masks for Magazine-Quality Carousel */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#f6fcf8] via-[#f6fcf8]/80 to-transparent z-20" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#f6fcf8] via-[#f6fcf8]/80 to-transparent z-20" />

              {/* ROW 1: Moving to the RIGHT (upr wali line right) */}
              <div className="marquee-track overflow-hidden py-1">
                <div className="animate-marquee-right flex gap-5 sm:gap-6">
                  {row1Items.map((item, idx) => renderCard(item, `r1-${item.id}-${idx}`))}
                </div>
              </div>

              {/* ROW 2: Moving to the LEFT (second line left) */}
              <div className="marquee-track overflow-hidden py-1">
                <div className="animate-marquee-left flex gap-5 sm:gap-6">
                  {row2Items.map((item, idx) => renderCard(item, `r2-${item.id}-${idx}`))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Bottom Feedback Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 bg-[#f0fdf4] border-2 sm:border-[2.5px] border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 border border-black rounded-full text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000] mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Join Our Growing Family</span>
              </span>
              <h3 className="font-outfit font-black text-xl sm:text-2xl text-black">
                Ready to begin your child’s success story?
              </h3>
              <p className="text-xs sm:text-sm font-jakarta text-neutral-600 font-bold mt-1">
                Meet our academic mentors for a personalized diagnostic session and campus walkthrough in Patna.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-outfit w-full sm:w-auto">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-neutral-100 text-black font-black rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm active:translate-x-0.5 active:translate-y-0.5 transition-all font-jakarta cursor-pointer"
              >
                <span>Talk to Counselor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST ARTICLES & INSIGHTS SECTION ────────────────────────── */}
      <HomeArticlesSection />

      {/* ── CONVERSION CTA BANNER ────────────────────────── */}
      <section ref={ctaSectionRef} className="py-24 relative overflow-hidden border-t-3 border-black px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto bg-[#dcfce7] border-3 border-black rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-[8px_8px_0px_#000000]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-emerald-300 text-xs uppercase tracking-wider font-space font-black border border-black shadow-[2px_2px_0px_#000]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Admissions for 2026-27 Academic Session Now Open</span>
          </div>

          <WavyHeading
            text="Ready to Accelerate Your"
            gradientText="Learning?"
            as="h2"
            className="text-3xl sm:text-5xl md:text-6xl font-black text-black font-outfit tracking-tight"
          />

          <p className="text-base sm:text-lg text-neutral-800 max-w-2xl mx-auto font-jakarta font-bold leading-relaxed">
            Secure your seat in our premier batch. Experience expert classroom mentorship, personalized tests, and continuous rank improvement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 font-outfit">
            <Link
              href="/admission"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-base active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#f0fdf4] hover:bg-[#bbf7d0] text-black font-black rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-base font-jakarta active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>Speak to Academic Counselor</span>
            </Link>
          </div>
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}


