'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  Search, 
  Clock, 
  Eye, 
  ArrowRight, 
  BookOpen, 
  Filter, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import Loader from '@/components/Loader';

interface ArticleItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  coverImage?: string;
  readTime: string;
  views: number;
  featured: boolean;
  createdAt: string;
}

const CATEGORIES = [
  'All',
  'JEE Prep',
  'NEET Tips',
  'Board Exam',
  'Foundation',
  'Study Strategy',
  'Parent Guide',
];

export default function ArticlesDirectoryPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const availableCategories = React.useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category && a.category.trim()) set.add(a.category.trim());
    });
    if (set.size === 0) {
      return ['All', 'Wildlife', 'Nature', 'Science'];
    }
    return ['All', ...Array.from(set)];
  }, [articles]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/articles?limit=30');
        const data = await res.json();
        if (data.success && data.articles) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#10b981] selection:text-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161922] border border-[#10b981]/30 text-xs font-space font-bold uppercase text-[#34d399] mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Newspaper className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Stories, Wildlife & Educational Insights</span>
          </div>
          <WavyHeading
            text="Articles & Editorial"
            gradientText="Stories"
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-outfit tracking-tight"
          />
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-medium font-jakarta">
            Fascinating insights into nature, wildlife, biology, and student learning guides written by the Raven team.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, subject, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#08090d] border border-white/10 rounded-xl text-sm font-medium font-jakarta text-white placeholder-neutral-500 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-neutral-400 shrink-0 hidden sm:block" />
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-outfit transition-all cursor-pointer border shrink-0 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'btn-sheryians shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                    : 'bg-[#08090d] text-neutral-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader size="lg" text="Loading Articles..." subtitle="Fetching educational publications" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-xl max-w-lg mx-auto space-y-3">
            <BookOpen className="w-12 h-12 text-neutral-500 mx-auto" />
            <h3 className="font-outfit font-black text-xl text-white">No Articles Found</h3>
            <p className="text-sm font-jakarta text-neutral-400 font-medium">
              Try choosing a different category or clearing your search term.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <Link
                key={art._id}
                href={`/articles/${art.slug}`}
                className="group bg-[#0f111a]/85 hover:bg-[#131622] border border-white/10 hover:border-[#10b981]/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-[#161922] border-b border-white/10 overflow-hidden">
                    <img
                      src={art.coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 bg-[#08090d]/90 backdrop-blur-md text-[#34d399] border border-[#10b981]/30 rounded-md text-xs font-bold font-space uppercase shadow-sm">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-neutral-400 mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{new Date(art.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-outfit font-black text-xl text-white line-clamp-2 leading-snug mb-3 group-hover:text-[#34d399] transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-neutral-400 line-clamp-3 font-medium leading-relaxed mb-4">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-black text-white font-outfit text-xs">{art.author}</p>
                      <p className="text-[10px] text-[#34d399] font-bold font-jakarta">{art.authorRole}</p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-black font-outfit text-[#6ee7b7] group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-24">
        <LMSFooter />
      </div>
    </div>
  );
}
