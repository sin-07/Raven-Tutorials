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
      <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-yellow-300 selection:text-black relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 pt-36 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-5 flex flex-col items-center justify-center">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mx-auto">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Curated Academic Curricula</span>
          </div>

          <div ref={titleRef} className="w-full">
            <WavyHeading
              text="Explore Our"
              gradientText="Courses"
              className="text-4xl sm:text-6xl md:text-7xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full"
            />
          </div>

          <p ref={subRef} className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium text-center">
            Comprehensive foundation programs, board preparations, and competitive JEE & NEET batches taught by master educators.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-2xl mx-auto pt-4 font-jakarta w-full">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject (Physics, Math), standard (Class 10, 12), or topic..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-[#f0fdf4] border-3 border-black text-black placeholder-neutral-500 shadow-[4px_4px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm sm:text-base font-jakarta transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black hover:text-neutral-600"
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
                className={`btn-cartoon px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border-2 border-black ${
                  selectedCategory === 'All'
                    ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#f0fdf4] text-black hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
                }`}
              >
                All Courses
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`btn-cartoon px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all border-2 border-black ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#4ade80] text-black shadow-[3px_3px_0px_#000]'
                      : 'bg-[#f0fdf4] text-black hover:bg-[#dcfce7] shadow-[2px_2px_0px_#000]'
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

              <div className="hidden sm:flex items-center bg-[#f0fdf4] rounded-xl border-2 border-black p-1 shadow-[3px_3px_0px_#000]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-[#4ade80] text-black font-black' : 'text-neutral-500'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-[#4ade80] text-black font-black' : 'text-neutral-500'
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
            <p className="text-xs sm:text-sm text-neutral-700 font-jakarta font-medium">
              Showing <span className="font-black text-black">{sortedCourses.length}</span> programs
              {selectedCategory !== 'All' && (
                <span> in <span className="text-black bg-[#dcfce7] px-2 py-0.5 rounded-lg border border-black font-bold shadow-[1px_1px_0px_#000]">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-emerald-500" />
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
            <div className="text-center py-16 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[6px_6px_0px_#000] max-w-xl mx-auto p-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center mx-auto mb-4 text-black shadow-[3px_3px_0px_#000]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-black font-outfit mb-2">No matching courses found</h3>
              <p className="text-neutral-700 text-sm mb-6 font-jakarta font-medium">
                Try adjusting your search keywords or switching category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLevel('All Levels');
                }}
                className="btn-cartoon px-6 py-2.5 bg-emerald-400 text-black font-black rounded-xl text-sm font-outfit border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-emerald-300 transition"
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


