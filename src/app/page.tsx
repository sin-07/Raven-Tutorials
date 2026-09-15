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
  Stethoscope
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
  const [topperCategory, setTopperCategory] = useState<'All' | 'JEE' | 'NEET' | 'Boards'>('All');

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
      // 1. Hero: Badge from Up, Title & Subtitle from Down, Buttons from Left & Right
      if (heroBadgeRef.current) animateFromUp(heroBadgeRef.current, 0.1, 35, 0.65);
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

      // 6. Testimonials: Alternating Left & Right entrance
      if (testimonialsSectionRef.current) {
        const cards = testimonialsSectionRef.current.querySelectorAll('.testimonial-card');
        scrollStaggerDirectional(cards, 'alternating', 0.09, { distance: 45 });
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
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4ade80] hover:bg-[#86efac] text-black font-black rounded-2xl border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm sm:text-base"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </Link>
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f0fdf4] hover:bg-[#dcfce7] text-black font-black rounded-2xl border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm sm:text-base font-jakarta"
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

      {/* ── TOPPERS WALL & VERIFIED TESTIMONIALS SECTION ────────────────────────── */}
      <section ref={testimonialsSectionRef} className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="pill-badge mb-4">Hall of Fame & Results</span>
            <WavyHeading
              text="Toppers Wall & Verified"
              gradientText="Student Stories"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight"
            />
            <p className="mt-4 text-base sm:text-lg text-neutral-600 font-bold max-w-2xl mx-auto font-jakarta">
              From Patna to IITs, AIIMS, and Top Universities. Meet the students who achieved top percentiles with Raven Tutorials mentorship.
            </p>
          </div>

          {/* 3D-Style Cartoon Podium for Patna's Top Rankers */}
          <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] mb-14">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Academic Year 2024-25 State & National Stars</span>
              </span>
            </div>

            <div className="flex items-end justify-center gap-3 sm:gap-6 pt-4 max-w-2xl mx-auto">
              {/* Rank 2: NEET 692 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold text-lg mb-2">
                  <Medal className="w-6 h-6 text-slate-700" />
                </div>
                <p className="font-black text-black text-sm font-outfit text-center">Rahul Kumar</p>
                <p className="text-xs font-black text-emerald-800 font-mono">692 / 720</p>
                <p className="text-[10px] font-bold text-neutral-600 font-jakarta text-center">AIIMS Patna (MBBS)</p>
                <div className="w-full h-32 bg-[#e2e8f0] border-3 border-black rounded-t-2xl shadow-[3px_0px_0px_#000] flex flex-col items-center justify-center mt-3">
                  <span className="font-black font-outfit text-3xl text-slate-800">2nd</span>
                  <span className="text-[10px] font-black font-space uppercase text-slate-600">NEET Rank</span>
                </div>
              </div>

              {/* Rank 1: JEE Adv AIR 142 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-300 border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-xl mb-2">
                  <Crown className="w-7 h-7 text-amber-950" />
                </div>
                <p className="font-black text-black text-base font-outfit text-center">Ananya Verma</p>
                <p className="text-xs font-black text-amber-900 font-mono">AIR 142 • 99.8%ile</p>
                <p className="text-[10px] font-bold text-neutral-600 font-jakarta text-center">IIT Bombay (CSE)</p>
                <div className="w-full h-44 bg-[#fde047] border-3 border-black rounded-t-2xl shadow-[4px_0px_0px_#000] flex flex-col items-center justify-center mt-3">
                  <span className="font-black font-outfit text-4xl text-amber-950">1st</span>
                  <span className="text-[10px] font-black font-space uppercase text-amber-900">JEE Adv Rank</span>
                </div>
              </div>

              {/* Rank 3: CBSE 98.8% */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#fed7aa] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-bold text-lg mb-2">
                  <Award className="w-6 h-6 text-amber-900" />
                </div>
                <p className="font-black text-black text-sm font-outfit text-center">Priya Singh</p>
                <p className="text-xs font-black text-orange-900 font-mono">98.8% Aggregate</p>
                <p className="text-[10px] font-bold text-neutral-600 font-jakarta text-center">Bihar State Rank 2</p>
                <div className="w-full h-24 bg-[#fed7aa] border-3 border-black rounded-t-2xl shadow-[3px_0px_0px_#000] flex flex-col items-center justify-center mt-3">
                  <span className="font-black font-outfit text-2xl text-orange-950">3rd</span>
                  <span className="text-[10px] font-black font-space uppercase text-orange-800">12th Boards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto">
            {(['All', 'JEE', 'NEET', 'Boards'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setTopperCategory(cat)}
                className={`btn-cartoon px-5 py-2 rounded-xl text-xs sm:text-sm font-black font-outfit transition-all flex items-center gap-1.5 ${
                  topperCategory === cat
                    ? 'bg-emerald-400 text-black border-2 border-black shadow-[2.5px_2.5px_0px_#000]'
                    : 'bg-[#f0fdf4] hover:bg-[#dcfce7] text-neutral-700 border border-black/30'
                }`}
              >
                {cat === 'All' ? (
                  <>
                    <Star className="w-3.5 h-3.5" />
                    <span>All Toppers</span>
                  </>
                ) : cat === 'JEE' ? (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>JEE Main & Adv</span>
                  </>
                ) : cat === 'NEET' ? (
                  <>
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>NEET Medical</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>CBSE & State Boards</span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Verified Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: 'Ananya Verma',
                exam: 'JEE Advanced',
                score: 'AIR 142 (99.8%ile)',
                college: 'IIT Bombay (CSE)',
                category: 'JEE',
                quote: 'The rigorous mock tests and 1-on-1 problem-solving sessions at Raven gave me the exact exam mindset required for JEE Advanced.',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              },
              {
                id: 2,
                name: 'Rahul Kumar',
                exam: 'NEET UG',
                score: '692 / 720 Marks',
                college: 'AIIMS Patna (MBBS)',
                category: 'NEET',
                quote: 'Biology NCERT line-by-line drills and daily DPPs cleared all my conceptual doubts. Raven faculty is truly top-tier in Patna.',
                avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
              },
              {
                id: 3,
                name: 'Priya Singh',
                exam: 'CBSE 12th Board',
                score: '98.8% Aggregate',
                college: 'Bihar State Rank 2',
                category: 'Boards',
                quote: 'Scoring 100 in Mathematics and 98 in Chemistry was only possible due to continuous weekly subjective tests and teacher feedback.',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
              },
              {
                id: 4,
                name: 'Shivam Saurabh',
                exam: 'JEE Main',
                score: '99.64 Percentile',
                college: 'NIT Trichy (ECE)',
                category: 'JEE',
                quote: 'Speed and accuracy strategies taught in the crash course helped me jump from 94%ile to 99.64%ile in my second attempt.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              },
              {
                id: 5,
                name: 'Sneha Kumari',
                exam: 'NEET UG',
                score: '675 / 720 Marks',
                college: 'PMCH Patna',
                category: 'NEET',
                quote: 'The study material and test analysis graphs on the student portal showed me exactly where I was making negative markings.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
              },
              {
                id: 6,
                name: 'Aditya Raj',
                exam: 'CBSE 10th Board',
                score: '98.4% Aggregate',
                college: 'Foundation Topper',
                category: 'Boards',
                quote: 'Raven Tutorials made Science and Mathematics so fun with practical experiments. I secured a perfect 100/100 in Standard Maths!',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
              },
            ]
              .filter((item) => topperCategory === 'All' || item.category === topperCategory)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-card bg-[#f0fdf4] hover:bg-[#e6f9ee] rounded-3xl p-7 transition-all duration-200 hover:-translate-y-1.5 border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] text-black flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-0.5 bg-emerald-200 border border-black rounded-lg text-xs font-black font-space uppercase">
                        {testimonial.exam}
                      </span>
                      <span className="font-mono font-black text-xs text-emerald-900 bg-white px-2 py-0.5 rounded border border-black">
                        {testimonial.score}
                      </span>
                    </div>
                    <p className="text-neutral-800 text-sm leading-relaxed mb-6 font-jakarta font-medium">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t-2 border-black/10">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-black shadow-[2px_2px_0px_#000]"
                    />
                    <div>
                      <p className="font-black text-black font-outfit text-sm">{testimonial.name}</p>
                      <p className="text-xs text-emerald-800 font-bold font-jakarta">{testimonial.college}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

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


