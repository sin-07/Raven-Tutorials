'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Grid3X3, 
  List,
  X,
  GraduationCap,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { LMSFooter, CourseCard } from '@/components/lms';
import { categories, dummyCourses } from '@/constants/lmsData';
import { Course } from '@/types/lms';
import WavyHeading from '@/components/WavyHeading';
import { animateFromUp, animateFromDown, scrollFromDown } from '@/lib/gsap';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(dummyCourses);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  // Directional GSAP refs
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    animateFromUp(badgeRef.current, { distance: 25, duration: 0.6 });
    animateFromDown(titleRef.current, { distance: 30, duration: 0.7, delay: 0.1 });
    animateFromDown(subRef.current, { distance: 25, duration: 0.7, delay: 0.2 });
    animateFromUp(searchRef.current, { distance: 20, duration: 0.7, delay: 0.3 });
    if (filtersRef.current) {
      scrollFromDown(filtersRef.current, { distance: 25 });
    }
  }, []);

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success && Array.isArray(data.courses) && data.courses.length > 0) {
        setCourses(data.courses);
      } else {
        setCourses(dummyCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(dummyCourses);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesPrice = showFreeOnly ? course.isFree : true;

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'Highest Rated':
        return b.rating - a.rating;
      case 'Newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      default:
        return b.totalStudents - a.totalStudents;
    }
  });

  return (
    <>
      <div className="min-h-screen bg-transparent text-white selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 pt-36 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-5 flex flex-col items-center justify-center">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#e8602e]/30 text-[#ff7b47] text-xs sm:text-sm font-space font-bold shadow-[0_0_15px_rgba(232,96,46,0.2)] mx-auto">
            <Sparkles className="w-4 h-4 text-[#e8602e]" />
            <span>Curated Academic Curricula</span>
          </div>

          <div ref={titleRef} className="w-full">
            <WavyHeading
              text="Explore Our"
              gradientText="Courses"
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-outfit tracking-tight leading-[1.1] text-center w-full"
            />
          </div>

          <p ref={subRef} className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium text-center">
            Comprehensive foundation programs, board preparations, and competitive JEE & NEET batches taught by master educators.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-2xl mx-auto pt-4 font-jakarta w-full">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject (Physics, Math), standard (Class 10, 12), or topic..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 text-white placeholder-neutral-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus:outline-none focus:border-[#e8602e] focus:ring-1 focus:ring-[#e8602e] text-sm sm:text-base font-jakarta transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Filters & Course Catalog */}
        <section ref={filtersRef} className="py-8 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border ${
                  selectedCategory === 'All'
                    ? 'btn-sheryians shadow-[0_0_20px_rgba(232,96,46,0.35)]'
                    : 'bg-[#0f111a]/80 text-white/70 hover:text-white border-white/10 hover:border-[#e8602e]/40'
                }`}
              >
                All Courses
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'btn-sheryians shadow-[0_0_20px_rgba(232,96,46,0.35)]'
                      : 'bg-[#0f111a]/80 text-white/70 hover:text-white border-white/10 hover:border-[#e8602e]/40'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="w-48">
                <CartoonDropdown
                  value={sortBy}
                  onChange={(e) => setSortBy(typeof e === 'string' ? e : e.target.value)}
                  options={sortOptions}
                  placeholder="Sort by"
                />
              </div>

              <div className="hidden sm:flex items-center bg-[#0f111a] rounded-xl border border-white/10 p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-[#e8602e] text-white font-black shadow-[0_0_12px_rgba(232,96,46,0.5)]' : 'text-neutral-400 hover:text-white'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-[#e8602e] text-white font-black shadow-[0_0_12px_rgba(232,96,46,0.5)]' : 'text-neutral-400 hover:text-white'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs sm:text-sm text-neutral-400 font-jakarta font-medium">
              Showing <span className="font-black text-white">{sortedCourses.length}</span> programs
              {selectedCategory !== 'All' && (
                <span> in <span className="text-[#ff7b47] bg-[#161922] px-2.5 py-0.5 rounded-lg border border-[#e8602e]/30 font-bold">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-[#e8602e]" />
            </div>
          ) : sortedCourses.length > 0 ? (
            <div className={`grid gap-6 sm:gap-8 ${
              viewMode === 'grid' 
                ? 'sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] max-w-xl mx-auto p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#161922] border border-[#e8602e]/30 flex items-center justify-center mx-auto mb-4 text-[#ff7b47] shadow-[0_0_20px_rgba(232,96,46,0.25)]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white font-outfit mb-2">No matching courses found</h3>
              <p className="text-neutral-400 text-sm mb-6 font-jakarta font-medium">
                Try adjusting your search keywords or switching category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLevel('All Levels');
                }}
                className="btn-sheryians px-6 py-2.5 text-sm font-outfit"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <LMSFooter />
      </div>
    </>
  );
}


