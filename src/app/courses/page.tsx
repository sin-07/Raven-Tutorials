'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GlowBackground } from '@/components/ui';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Grid3X3, 
  List,
  X
} from 'lucide-react';
import { LMSFooter, CourseCard } from '@/components/lms';
import { categories } from '@/constants/lmsData';
import { Course } from '@/types/lms';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
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

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesPrice = showFreeOnly ? course.isFree : (course.price >= priceRange[0] && course.price <= priceRange[1]);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'Highest Rated':
        return b.rating - a.rating;
      case 'Newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      default:
        return b.totalStudents - a.totalStudents;
    }
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden">
      {/* Green Radial Glow Effect */}
      <GlowBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-12 bg-gradient-to-br from-[#080808] via-[#111111] to-[#080808] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Discover 150+ expert-led courses designed to help you achieve academic excellence.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses..."
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#111111] border border-gray-800 text-white placeholder-gray-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-[#00E5A8]/30 focus:border-[#00E5A8]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-xl border border-gray-800 text-gray-300"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              {/* Category Pills */}
              <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-[#00E5A8] text-black'
                      : 'bg-[#111111] text-gray-400 hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  All Courses
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-[#00E5A8] text-black'
                        : 'bg-[#111111] text-gray-400 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-[#111111] rounded-xl border border-gray-800 text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00E5A8]"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* View Toggle */}
                <div className="hidden sm:flex items-center bg-[#111111] rounded-xl border border-gray-800 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#00E5A8]/20 text-[#00E5A8]' : 'text-gray-500'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#00E5A8]/20 text-[#00E5A8]' : 'text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111111] rounded-2xl p-6 mb-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#080808] border border-gray-800 text-white"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#080808] border border-gray-800 text-white"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Free Only */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 text-[#00E5A8] bg-[#080808]"
                />
                <span className="text-sm text-gray-400">Free courses only</span>
              </label>
            </motion.div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing <span className="font-semibold text-white">{sortedCourses.length}</span> courses
              {selectedCategory !== 'All' && (
                <span> in <span className="font-semibold text-white">{selectedCategory}</span></span>
              )}
            </p>

            {/* Desktop Level Filter */}
            <div className="hidden md:flex items-center gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-[#00E5A8]/20 text-[#00E5A8]'
                      : 'text-gray-500 hover:bg-gray-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5A8]"></div>
            </div>
          ) : sortedCourses.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLevel('All Levels');
                  setShowFreeOnly(false);
                }}
                className="px-6 py-3 bg-[#00E5A8] text-black font-medium rounded-full hover:bg-[#00E5A8]/90 hover:scale-105 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <LMSFooter />
    </div>
  );
}

