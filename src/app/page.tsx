'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  GraduationCap, 
  Video, 
  PlayCircle,
  Clock,
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
import SheryiansSplash from '@/components/SheryiansSplash';
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
      <div className="animate-spin rounded-full h-10 w-10 border border-white/15 border-t-[#e8602e]" />
    </div>
  ),
});

const HomeArticlesSection = dynamic(() => import('@/components/HomeArticlesSection'), {
  loading: () => (
    <div className="py-24 flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border border-white/15 border-t-[#e8602e]" />
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
  const [activeMarqueeCard, setActiveMarqueeCard] = useState<string | null>(null);
  const [activeHeroCard, setActiveHeroCard] = useState<number | null>(null);

  // GSAP animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroCardsGridRef = useRef<HTMLDivElement>(null);

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

      // Hero Academic Feature Cards: Staggered entrance from bottom + subtle floating
      if (heroCardsGridRef.current) {
        gsap.from(heroCardsGridRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.35,
        });
        const cards = Array.from(heroCardsGridRef.current.children);
        cards.forEach((card, idx) => {
          gsap.to(card, {
            y: idx % 2 === 0 ? -6 : 6,
            duration: 3 + idx * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1 + idx * 0.15,
          });
        });
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
    <div ref={containerRef} className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      <SheryiansSplash />

      {/* ── HERO SECTION (SHERYIANS LUXURY OBSIDIAN & ORANGE THEME) ────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto">
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-b from-[#e8602e]/20 via-[#ff733d]/8 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-60 left-1/4 w-[350px] h-[350px] bg-[#e8602e]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Hero Top Content: Centered editorial headline & actions */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Floating Pill Badge */}
          <div 
            ref={heroBadgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121420] border border-[#e8602e]/40 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(232,96,46,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#e8602e] animate-pulse shadow-[0_0_8px_#e8602e]" />
            <span>Admissions Open 2026-27 • Patna Campus</span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="hidden sm:inline text-zinc-300 font-semibold">IIT-JEE • NEET • Foundations</span>
          </div>

          {/* Majestic Sheryians Headline */}
          <h1 
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white font-outfit tracking-tight leading-[1.06]"
          >
            India&apos;s Premier Coaching for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40] drop-shadow-[0_0_35px_rgba(232,96,46,0.35)]">
              JEE, NEET &amp; Boards.
            </span>
          </h1>

          {/* Subheading */}
          <p 
            ref={heroSubRef}
            className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 font-jakarta max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Elevate your academic rank with Patna&apos;s top master educators. Strict 1:15 batch attention, daily test series, IITian mentors, and up to 100% scholarship through RSAT.
          </p>

          {/* Sheryians Dual CTA Buttons */}
          <div 
            ref={heroCTARef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#e8602e] hover:bg-[#ff733d] text-white font-black text-sm font-outfit uppercase tracking-wider shadow-[0_0_30px_rgba(232,96,46,0.45)] hover:shadow-[0_0_40px_rgba(232,96,46,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Explore All Batches</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/rsat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#121420]/90 hover:bg-[#1a1d2e] text-white border border-white/15 hover:border-[#e8602e]/60 font-bold text-sm font-outfit transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(232,96,46,0.2)] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#ff7b47]" />
              <span>Take RSAT Scholarship Test</span>
            </Link>
          </div>

          {/* Key Metrics Strip / Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#0f111a]/70 border border-white/5">
              <p className="font-outfit font-black text-2xl sm:text-3xl text-white">12,000+</p>
              <p className="text-xs text-zinc-400 font-jakarta mt-0.5">Students Mentored</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0f111a]/70 border border-white/5">
              <p className="font-outfit font-black text-2xl sm:text-3xl text-[#ff7b47]">150+</p>
              <p className="text-xs text-zinc-400 font-jakarta mt-0.5">IIT &amp; AIIMS Selections</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0f111a]/70 border border-white/5">
              <p className="font-outfit font-black text-2xl sm:text-3xl text-white">1:15</p>
              <p className="text-xs text-zinc-400 font-jakarta mt-0.5">Strict Batch Ratio</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0f111a]/70 border border-white/5">
              <p className="font-outfit font-black text-2xl sm:text-3xl text-[#ffaa40]">100%</p>
              <p className="text-xs text-zinc-400 font-jakarta mt-0.5">Max RSAT Scholarship</p>
            </div>
          </div>
        </div>

        {/* ── HERO ACADEMIC BENTO CARDS (RAVEN SKELETON WITH SHERYIANS OBSIDIAN GLASS) ── */}
        <div 
          ref={heroCardsGridRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Live Classroom */}
          <div className="group p-6 rounded-3xl bg-[#0c0e17] border border-white/10 hover:border-[#e8602e]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.18)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8602e]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#e8602e]/20 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] text-[10px] font-space font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8602e] animate-ping" />
                  Live Smart Class
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">Target JEE &apos;26</span>
              </div>
              <h3 className="text-lg font-black text-white font-outfit leading-snug group-hover:text-[#ff7b47] transition-colors">
                Rotational Dynamics &amp; COM
              </h3>
              <p className="text-xs text-zinc-400 font-jakarta mt-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#e8602e] shrink-0" />
                <span>Er. Alok Sharma (IIT Kanpur)</span>
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#ff7b47]">148 Students Live</span>
              <Link 
                href="/courses" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e8602e] border border-white/10 hover:border-[#e8602e] text-white flex items-center justify-center transition-colors"
                title="View Course"
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
              </Link>
            </div>
          </div>

          {/* Card 2: Patna Hall of Fame */}
          <div className="group p-6 rounded-3xl bg-[#0c0e17] border border-white/10 hover:border-amber-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(255,170,64,0.18)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/20 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-space font-extrabold uppercase">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  Hall of Fame
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">Patna 2024</span>
              </div>
              <h3 className="text-lg font-black text-white font-outfit leading-snug group-hover:text-amber-300 transition-colors">
                AIR 24 &amp; AIR 78
              </h3>
              <p className="text-xs text-zinc-400 font-jakarta mt-2">
                Aarav Sinha (IIT Bombay) &amp; Priyanshu (AIIMS)
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">150+ Top Selections</span>
              <Link 
                href="/about" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-500 text-white flex items-center justify-center transition-colors"
                title="View Rankers"
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
              </Link>
            </div>
          </div>

          {/* Card 3: RSAT Diagnostic Test */}
          <div className="group p-6 rounded-3xl bg-[#0c0e17] border border-white/10 hover:border-[#e8602e]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.18)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8602e]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#e8602e]/20 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] text-[10px] font-space font-extrabold uppercase">
                  <Zap className="w-3 h-3 text-[#e8602e]" />
                  RSAT &apos;26 Test
                </span>
                <span className="text-[10px] font-mono font-bold text-white bg-[#e8602e]/20 px-2 py-0.5 rounded-full border border-[#e8602e]/30">
                  Up to 100% Off
                </span>
              </div>
              <h3 className="text-lg font-black text-white font-outfit leading-snug group-hover:text-[#ff7b47] transition-colors">
                Instant Scholarship Engine
              </h3>
              <p className="text-xs text-zinc-400 font-jakarta mt-2">
                20-MCQ timed diagnostic for Classes 8th-12th. Get ranking &amp; certificate instantly.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#ff7b47]">Free Online Mock</span>
              <Link 
                href="/rsat" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e8602e] border border-white/10 hover:border-[#e8602e] text-white flex items-center justify-center transition-colors"
                title="Start Diagnostic"
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
              </Link>
            </div>
          </div>

          {/* Card 4: 24/7 Doubt Engine & Patna Bajrangpuri Campus */}
          <div className="group p-6 rounded-3xl bg-[#0c0e17] border border-white/10 hover:border-[#e8602e]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.18)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8602e]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#e8602e]/20 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-space font-extrabold uppercase">
                  <MapPin className="w-3 h-3 text-[#e8602e]" />
                  Patna Campus
                </span>
                <span className="text-[10px] font-mono font-bold text-[#ff7b47]">Bajrangpuri</span>
              </div>
              <h3 className="text-lg font-black text-white font-outfit leading-snug group-hover:text-[#ff7b47] transition-colors">
                1:1 Mentorship &amp; Labs
              </h3>
              <p className="text-xs text-zinc-400 font-jakarta mt-2">
                AC digital smart classrooms, dedicated doubt cells, and direct parent weekly progress reporting.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-300">Offline &amp; Hybrid</span>
              <Link 
                href="/contact" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e8602e] border border-white/10 hover:border-[#e8602e] text-white flex items-center justify-center transition-colors"
                title="View Campus"
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANCED LEADERSHIP & METHODOLOGY CARDS (IMAGE 2 & 3) ────────────── */}
      <section ref={featuresSectionRef} className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div ref={featuresTitleRef} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Advanced Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">Strategies</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-jakarta font-normal">
            Explore case studies and real-world examples that illustrate the application of advanced learning strategies. Enhance your decision-making and problem-solving skills.
          </p>
        </div>

        {/* 3 Dark Notched Cards with Recessed Corner Arrow Buttons */}
        <div ref={featuresGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Card 1 */}
          <div className="feature-card group p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10121a] to-[#08090f] border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.15)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e8602e]/10 border border-[#e8602e]/20 text-[#ff7b47] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                {/* Signature Circle Corner Action Button (↗) */}
                <div className="circle-action-btn">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-2 font-outfit group-hover:text-[#ff7b47] transition-colors">
                Adaptive Learning Framework
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-jakarta">
                Learn to navigate and lead through complex and rapidly changing competitive exam patterns with deep concept retention.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-space text-[#ff7b47] font-semibold">
              <span>Class 8 - 12 & Droppers</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card group p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10121a] to-[#08090f] border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.15)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e8602e]/10 border border-[#e8602e]/20 text-[#ff7b47] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                {/* Signature Circle Corner Action Button (↗) */}
                <div className="circle-action-btn">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-2 font-outfit group-hover:text-[#ff7b47] transition-colors">
                Transformational Coaching Techniques
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-jakarta">
                Discover powerful problem-solving strategies to inspire and drive positive academic change and top percentile ranks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-space text-[#ff7b47] font-semibold">
              <span>AIR Rank Acceleration</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card group p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10121a] to-[#08090f] border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(232,96,46,0.15)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e8602e]/10 border border-[#e8602e]/20 text-[#ff7b47] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                {/* Signature Circle Corner Action Button (↗) */}
                <div className="circle-action-btn">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-2 font-outfit group-hover:text-[#ff7b47] transition-colors">
                Influential Problem-Solving Mastery
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-jakarta">
                Develop advanced speed, mental calculation, and precision to effectively solve multi-concept questions in JEE & NEET.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-space text-[#ff7b47] font-semibold">
              <span>National Benchmarking</span>
            </div>
          </div>
        </div>

        {/* Foundational Courses Syllabus Table (Image 2) */}
        <div className="bg-[#090b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-space uppercase text-[#ff7b47] font-extrabold tracking-wider">Curriculum Roadmap</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit mt-1">
                Foundational Courses: Transformational Learning Techniques
              </h3>
            </div>
            <Link
              href="/courses"
              className="btn-sheryians px-5 py-2.5 rounded-full text-white font-extrabold text-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-[0_0_20px_rgba(232,96,46,0.4)]"
            >
              <span>Show All</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
            </Link>
          </div>

          {/* Module List Rows */}
          <div className="space-y-4">
            {[
              {
                title: 'Physics & Mechanics Fundamentals',
                desc: 'Develop deep conceptual clarity from Newtonian vectors to Rotational Dynamics.',
                tags: ['Planning', 'Execution', 'Formulas'],
                date: 'Session 2026-27',
              },
              {
                title: 'Organic & Physical Chemistry Mastery',
                desc: 'Reaction mechanisms, stoichiometry, equilibrium & high-scoring shortcut methods.',
                tags: ['Mechanisms', 'Analysis', 'Practice'],
                date: 'Session 2026-27',
              },
              {
                title: 'Higher Mathematics & Calculus Integration',
                desc: 'Rigorous problem solving across Functions, Differential Equations & 3D Vectors.',
                tags: ['Calculus', 'Speed', 'Accuracy'],
                date: 'Session 2026-27',
              },
            ].map((module, mIdx) => (
              <div
                key={mIdx}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#e8602e]/40 transition-all hover:bg-white/[0.06] group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-black text-lg text-white group-hover:text-[#ff7b47] transition-colors">
                      {module.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 font-jakarta mt-0.5">
                      {module.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap justify-between md:justify-end shrink-0 pt-2 md:pt-0">
                  <div className="flex items-center gap-1.5">
                    {module.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-space font-semibold text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">{module.date}</span>
                  <Link
                    href="/courses"
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#e8602e] hover:text-white text-white text-xs font-extrabold font-outfit transition-all flex items-center gap-1 hover:shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STEP LEARNING METHODOLOGY ────────────────────────── */}
      <section ref={methodologySectionRef} className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Structured Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            The 4-Step Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">Rank 1</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-jakarta">
            A scientifically proven preparation model that leaves zero knowledge gaps.
          </p>
        </div>

        <div ref={methodologyGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="methodology-step bg-[#0f111a] hover:bg-[#131622] p-7 rounded-3xl border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(232,96,46,0.15)] relative transition-all duration-300 hover:-translate-y-1">
            <span className="w-10 h-10 bg-[#e8602e]/15 text-[#ff7b47] border border-[#e8602e]/30 rounded-xl flex items-center justify-center font-black font-space text-base absolute top-6 right-6">01</span>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff7b47] mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 font-outfit">Concept Mastery</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-jakarta">
              Deep theoretical breakdown with visualization, live demonstrations, and intuitive understanding.
            </p>
          </div>

          <div className="methodology-step bg-[#0f111a] hover:bg-[#131622] p-7 rounded-3xl border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(232,96,46,0.15)] relative transition-all duration-300 hover:-translate-y-1">
            <span className="w-10 h-10 bg-[#e8602e]/15 text-[#ff7b47] border border-[#e8602e]/30 rounded-xl flex items-center justify-center font-black font-space text-base absolute top-6 right-6">02</span>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff7b47] mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 font-outfit">Targeted Practice</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-jakarta">
              Graded Daily Practice Papers (DPPs) ranging from foundational boards to high-difficulty competitive questions.
            </p>
          </div>

          <div className="methodology-step bg-[#0f111a] hover:bg-[#131622] p-7 rounded-3xl border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(232,96,46,0.15)] relative transition-all duration-300 hover:-translate-y-1">
            <span className="w-10 h-10 bg-[#e8602e]/15 text-[#ff7b47] border border-[#e8602e]/30 rounded-xl flex items-center justify-center font-black font-space text-base absolute top-6 right-6">03</span>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff7b47] mb-5">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 font-outfit">1-on-1 Doubt Relief</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-jakarta">
              Dedicated daily doubt clearing clinics ensuring no student leaves the classroom with unresolved questions.
            </p>
          </div>

          <div className="methodology-step bg-[#0f111a] hover:bg-[#131622] p-7 rounded-3xl border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(232,96,46,0.15)] relative transition-all duration-300 hover:-translate-y-1">
            <span className="w-10 h-10 bg-[#e8602e]/15 text-[#ff7b47] border border-[#e8602e]/30 rounded-xl flex items-center justify-center font-black font-space text-base absolute top-6 right-6">04</span>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff7b47] mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 font-outfit">Real-Time Testing</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-jakarta">
              National level mock tests with instant graphical AI analysis, speed benchmarking, and rank prediction.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES SHOWCASE ────────────────────────── */}
      <section ref={coursesSectionRef} className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={coursesTitleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight !text-left">
              Featured Programs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">Batches</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-jakarta">
              Choose the specialized batch aligned with your academic year and competitive target.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap font-jakarta text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-full font-extrabold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                  : 'btn-dark-pill text-zinc-300'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab('foundation')}
              className={`px-4 py-2.5 rounded-full font-extrabold transition-all cursor-pointer ${
                activeTab === 'foundation'
                  ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                  : 'btn-dark-pill text-zinc-300'
              }`}
            >
              Class 8 - 10
            </button>
            <button
              onClick={() => setActiveTab('science')}
              className={`px-4 py-2.5 rounded-full font-extrabold transition-all cursor-pointer ${
                activeTab === 'science'
                  ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                  : 'btn-dark-pill text-zinc-300'
              }`}
            >
              Class 11 - 12
            </button>
            <button
              onClick={() => setActiveTab('competitive')}
              className={`px-4 py-2.5 rounded-full font-extrabold transition-all cursor-pointer ${
                activeTab === 'competitive'
                  ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                  : 'btn-dark-pill text-zinc-300'
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
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/10 border-t-[#e8602e]" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-[#0f111a] border border-white/10 rounded-3xl p-8">
              <p className="text-zinc-400 font-jakarta">No courses currently found in this category.</p>
            </div>
          ) : (
            filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))
          )}
        </div>
      </section>

      {/* ── WATCH THE FREE LESSONS (IMAGE 4) ────────────────────────── */}
      <section className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090b10] border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          
          {/* Top Row: Title, Subtitle, Chrome Prism Asset & Nav Arrows */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10 relative z-10">
            <div className="max-w-xl space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight">
                Watch the free lessons
              </h2>
              <p className="text-sm text-zinc-400 font-jakarta leading-relaxed">
                Equip yourself with innovative problem-solving strategies to tackle tomorrow&apos;s competitive exam challenges with confidence.
              </p>
            </div>

            {/* Right: Iridescent Chrome Glass Prism Asset & Slider Arrows */}
            <div className="flex items-center gap-5 self-end lg:self-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/15 shadow-xl hidden sm:block">
                <img
                  src="/images/chrome-prism-torus.jpg"
                  alt="Chrome Prism"
                  className="w-full h-full object-cover animate-levitate"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous lesson"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  aria-label="Next lesson"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Video Lesson Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Innovative Problem Solving for Mechanics & Rotational Motion',
                desc: 'Master the high-scoring rotational dynamics tricks used by top 100 JEE rankers.',
                duration: '45 min',
                views: '1.2k views',
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
              },
              {
                title: 'Empowering Aspirants: The Art of Cracking NEET Biology',
                desc: 'Rapid NCERT diagram memorization techniques and high-yield genetics breakdown.',
                duration: '60 min',
                views: '2.1k views',
                thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
              },
              {
                title: 'Dynamic Calculus: Thriving in High-Difficulty Advanced Exams',
                desc: 'Step-by-step shortcuts to evaluate complex definite integrals in under 90 seconds.',
                duration: '35 min',
                views: '980 views',
                thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
              },
            ].map((lesson, idx) => (
              <div
                key={idx}
                className="group bg-[#0f111a] hover:bg-[#131622] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e8602e]/50 shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Thumbnail with Play Icon */}
                  <div className="relative aspect-video overflow-hidden bg-black/60">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#e8602e] text-white flex items-center justify-center shadow-[0_0_20px_rgba(232,96,46,0.6)] group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-7 h-7 fill-white text-[#e8602e] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-outfit font-black text-base sm:text-lg text-white group-hover:text-[#ff7b47] transition-colors line-clamp-2">
                      {lesson.title}
                    </h3>
                    <p className="font-jakarta text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {lesson.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/5 flex items-center gap-3 text-[11px] font-mono font-medium text-zinc-400">
                    <span className="flex items-center gap-1 text-[#ff7b47]">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.duration}
                    </span>
                    <span>•</span>
                    <span>{lesson.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY SUBJECT / CATEGORY ────────────────────────── */}
      <section ref={categoriesSectionRef} className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-3">
            <Microscope className="w-3.5 h-3.5" />
            <span>Curriculum Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight">
            Browse by Subject <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">Focus</span>
          </h2>
        </div>

        <div ref={categoriesGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const CategoryIcon = categoryIconMap[category.icon] || Microscope;

            return (
              <div key={category.name} className="cat-card">
                <Link
                  href={`/courses?category=${category.name.toLowerCase()}`}
                  className="block p-6 rounded-3xl bg-[#0f111a] hover:bg-[#131622] border border-white/10 hover:border-[#e8602e]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group transition-all duration-300 text-center hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(232,96,46,0.2)]"
                >
                  <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff7b47] group-hover:scale-110 group-hover:bg-[#e8602e]/15 transition-transform">
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-white font-outfit text-sm sm:text-base group-hover:text-[#ff7b47] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-semibold mt-1 font-jakarta">
                    {category.count} Modules
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── RSAT SCHOLARSHIP ADMISSION TEST PROMO CALLOUT ────────────────────────── */}
      <section className="py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0d0f18] via-[#121524] to-[#090b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] rounded-full text-xs font-extrabold font-space uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Raven Scholarship Admission Test (RSAT) 2026-27</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white leading-tight">
                Win Up To <span className="text-white bg-[#e8602e] px-3 py-0.5 rounded-xl font-black shadow-[0_0_20px_rgba(232,96,46,0.6)]">50% Tuition Waiver</span> in 15 Minutes!
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-normal font-jakarta leading-relaxed">
                Take our free 20-question online diagnostic test. Test your Physics, Chemistry, Maths, and Logical Reasoning concepts and get instant scholarship discount certificates for our Patna campus!
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold font-space uppercase pt-1 text-zinc-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#ff7b47]" /> 100% Free Assessment</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#ff7b47]" /> Instant Verified Certificate</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#ff7b47]" /> Class 8th to 12th</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2.5">
              <Link
                href="/rsat"
                className="btn-sheryians px-8 py-4 text-white font-extrabold font-outfit uppercase tracking-wider text-sm rounded-full shadow-[0_0_30px_rgba(232,96,46,0.4)] flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Take 15-Min RSAT Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] font-medium text-center text-zinc-500 font-jakarta flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ff7b47]" />
                <span>Instant online evaluation & certificate</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMISSION FLOW COMPONENT ────────────────────────── */}
      <AdmissionSection />

      {/* ── STUDENTS & PARENTS TESTIMONIALS SECTION (IMAGE 4 STYLE + DUAL-ROW MARQUEE) ── */}
      <section ref={testimonialsSectionRef} className="py-24 relative z-10 content-auto overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header: Image 4 Title & Action */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real Voices & Authentic Experiences</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight">
                What our students are <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">saying about us:</span>
              </h2>
            </div>

            <Link
              href="/admission"
              className="btn-sheryians px-6 py-2.5 rounded-full text-white font-extrabold text-sm self-start md:self-auto inline-flex items-center gap-2 shadow-[0_0_25px_rgba(232,96,46,0.35)] cursor-pointer"
            >
              <span>Leave Feedback</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </Link>
          </div>

          {/* Trust & Satisfaction Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
            <div className="testimonial-stat-card bg-[#0f111a] border border-white/10 hover:border-[#e8602e]/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg flex flex-col justify-center items-center transition-colors">
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-outfit">4.9 / 5.0</p>
              <p className="text-xs font-bold text-zinc-400 font-jakarta mt-0.5">Average Review Rating</p>
              <span className="text-[10px] font-mono font-bold text-[#ff7b47] bg-[#e8602e]/10 border border-[#e8602e]/20 px-2 py-0.5 rounded-full mt-1.5">1,400+ Verified Reviews</span>
            </div>

            <div className="testimonial-stat-card bg-[#0f111a] border border-white/10 hover:border-[#e8602e]/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg flex flex-col justify-center items-center transition-colors">
              <div className="w-8 h-8 rounded-xl bg-[#e8602e]/10 border border-[#e8602e]/20 flex items-center justify-center mb-1.5 text-[#ff7b47]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-outfit">98.4%</p>
              <p className="text-xs font-bold text-zinc-400 font-jakarta mt-0.5">Target Score Growth</p>
              <span className="text-[10px] font-mono font-bold text-[#ff7b47] bg-[#e8602e]/10 border border-[#e8602e]/20 px-2 py-0.5 rounded-full mt-1.5">Board & Competitive</span>
            </div>

            <div className="testimonial-stat-card bg-[#0f111a] border border-white/10 hover:border-[#e8602e]/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg flex flex-col justify-center items-center transition-colors">
              <div className="w-8 h-8 rounded-xl bg-[#e8602e]/10 border border-[#e8602e]/20 flex items-center justify-center mb-1.5 text-[#ff7b47]">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-outfit">99.1%</p>
              <p className="text-xs font-bold text-zinc-400 font-jakarta mt-0.5">Parent Recommendation</p>
              <span className="text-[10px] font-mono font-bold text-[#ff7b47] bg-[#e8602e]/10 border border-[#e8602e]/20 px-2 py-0.5 rounded-full mt-1.5">Transparent Mentorship</span>
            </div>

            <div className="testimonial-stat-card bg-[#0f111a] border border-white/10 hover:border-[#e8602e]/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg flex flex-col justify-center items-center transition-colors">
              <div className="w-8 h-8 rounded-xl bg-[#e8602e]/10 border border-[#e8602e]/20 flex items-center justify-center mb-1.5 text-[#ff7b47]">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-outfit">1 : 15</p>
              <p className="text-xs font-bold text-zinc-400 font-jakarta mt-0.5">Optimal Batch Ratio</p>
              <span className="text-[10px] font-mono font-bold text-[#ff7b47] bg-[#e8602e]/10 border border-[#e8602e]/20 px-2 py-0.5 rounded-full mt-1.5">Personal Attention</span>
            </div>
          </div>

          {/* Perspective Filter Tabs */}
          <div className="flex items-center justify-center gap-2.5 mb-8 overflow-x-auto pb-2">
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
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold font-outfit transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'btn-sheryians text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                      : 'btn-dark-pill text-zinc-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
                      isActive ? 'bg-black/60 text-[#ffaa40]' : 'bg-white/10 text-white'
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

          const renderCard = (item: typeof row1List[0], uniqueKey: string) => {
            const isSelected = activeMarqueeCard === uniqueKey;
            return (
              <div
                key={uniqueKey}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMarqueeCard(prev => prev === uniqueKey ? null : uniqueKey);
                }}
                data-active={isSelected ? "true" : "false"}
                className={`marquee-card w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-[#0f111a] rounded-3xl p-6 border text-white select-none relative overflow-hidden group transition-all ${
                  isSelected 
                    ? 'border-[#e8602e] bg-[#141724] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(232,96,46,0.3)]' 
                    : 'border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(232,96,46,0.12)]'
                }`}
              >
                {/* Decorative Subtle Watermark Quote */}
                <Quote className="absolute top-3 right-3 w-10 h-10 text-white/5 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Top Row: Role Badge & Highlight Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                    {item.type === 'student' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] rounded-full text-xs font-extrabold font-space uppercase">
                        <GraduationCap className="w-3.5 h-3.5 text-[#ff7b47]" />
                        <span>Student Story</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-extrabold font-space uppercase">
                        <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                        <span>Parent Review</span>
                      </span>
                    )}
                    <span className="font-mono font-bold text-xs text-[#ffaa40] bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                      {item.highlightBadge}
                    </span>
                  </div>

                  {/* Star Rating & Category Pill */}
                  <div className="flex items-center justify-between gap-1 mb-2.5 pt-0.5">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold font-mono ml-1 text-zinc-400">5.0</span>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-400 font-jakarta bg-white/5 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  {/* Single-Line Punchy Quote (As requested: e.g. "Go for it!") */}
                  <div className="my-2.5">
                    <p className="text-white text-base sm:text-lg font-black font-outfit leading-tight tracking-tight line-clamp-1 relative z-10" title={item.quote}>
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer: Avatar, Name, Relationship & Location */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10 relative z-10 mt-1">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-extrabold text-white font-outfit text-sm truncate">{item.name}</p>
                      <span className="inline-flex items-center text-[#e8602e]" title={item.verifiedLabel}>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-black text-[#e8602e]" />
                      </span>
                    </div>
                    <p className="text-xs text-[#ff814e] font-medium font-jakarta truncate">{item.relationOrCollege}</p>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium font-jakarta mt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          return (
            <div 
              className="marquee-container relative w-full overflow-hidden py-3 space-y-6"
              data-has-active={activeMarqueeCard !== null ? "true" : "false"}
              onClick={() => setActiveMarqueeCard(null)}
            >
              {/* Left & Right Subtle Fade Masks for Magazine-Quality Carousel */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent z-20" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent z-20" />

              {/* ROW 1: Moving to the RIGHT (upr wali line right) */}
              <div className="marquee-track overflow-hidden py-2">
                <div className="animate-marquee-right flex gap-5 sm:gap-6">
                  {row1Items.map((item, idx) => renderCard(item, `r1-${item.id}-${idx}`))}
                </div>
              </div>

              {/* ROW 2: Moving to the LEFT (second line left) */}
              <div className="marquee-track overflow-hidden py-2">
                <div className="animate-marquee-left flex gap-5 sm:gap-6">
                  {row2Items.map((item, idx) => renderCard(item, `r2-${item.id}-${idx}`))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Bottom Feedback Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 bg-gradient-to-r from-[#0d0f18] to-[#141726] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8602e]/15 border border-[#e8602e]/30 text-[#ff7b47] rounded-full text-xs font-extrabold font-space uppercase mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Join Our Growing Family</span>
              </span>
              <h3 className="font-outfit font-black text-xl sm:text-2xl text-white">
                Ready to begin your child’s success story?
              </h3>
              <p className="text-xs sm:text-sm font-jakarta text-zinc-400 font-normal mt-1">
                Meet our academic mentors for a personalized diagnostic session and campus walkthrough in Patna.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-outfit w-full sm:w-auto">
              <Link
                href="/admission"
                className="btn-sheryians inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-extrabold rounded-full text-sm shadow-[0_0_20px_rgba(232,96,46,0.35)] cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/contact"
                className="btn-dark-pill inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-jakarta cursor-pointer"
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
      <section ref={ctaSectionRef} className="py-24 relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-b from-[#121422] to-[#08090f] border border-[#e8602e]/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(232,96,46,0.15)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-[#ff7b47] text-xs uppercase tracking-wider font-space font-extrabold border border-white/10 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Admissions for 2026-27 Academic Session Now Open</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-outfit tracking-tight">
            Ready to Accelerate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff814e] via-[#e8602e] to-[#ffaa40]">Learning?</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-jakarta font-normal leading-relaxed">
            Secure your seat in our premier batch. Experience expert classroom mentorship, personalized tests, and continuous rank improvement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 font-outfit">
            <Link
              href="/admission"
              className="btn-sheryians inline-flex items-center justify-center gap-2 px-9 py-4 text-white font-extrabold rounded-full text-base shadow-[0_0_30px_rgba(232,96,46,0.5)] cursor-pointer"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="/contact"
              className="btn-dark-pill inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-base font-jakarta cursor-pointer"
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


