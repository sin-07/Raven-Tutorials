'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Newspaper, 
  Search, 
  Clock, 
  Eye, 
  ArrowRight, 
  BookOpen, 
  Filter, 
  Sparkles,
  Calendar,
  PenTool
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
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
    <div className="min-h-screen bg-transparent text-white selection:bg-[#10b981] selection:text-white pt-28 pb-16 relative overflow-hidden">
      {/* Ambient Radial Background Glows matching site theme */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#10b981]/30 text-xs font-space font-extrabold uppercase text-[#34d399] mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Newspaper className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Editorial Publications &bull; Academic Journal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-outfit tracking-tight leading-tight">
            Articles &amp; Editorial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7]">Stories</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal font-jakarta leading-relaxed max-w-2xl mx-auto">
            Fascinating insights into nature, wildlife, biology, and student learning guides curated by the Raven academic team.
          </p>
        </div>

        {/* Filter & Search Bar Dock */}
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, subject, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#08090d] border border-white/10 rounded-xl text-sm font-medium font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0 hidden sm:block" />
            {availableCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer border shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#10b981] text-white border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader size="lg" text="Loading Articles..." subtitle="Fetching educational publications" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-12 text-center shadow-xl max-w-lg mx-auto space-y-3">
            <BookOpen className="w-12 h-12 text-zinc-500 mx-auto" />
            <h3 className="font-outfit font-black text-xl text-white">No Articles Found</h3>
            <p className="text-sm font-jakarta text-zinc-400 font-normal">
              Try choosing a different category or clearing your search term.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <Link
                key={art._id}
                href={`/articles/${art.slug}`}
                className="group bg-[#0f111a] hover:bg-[#131622] border border-white/10 hover:border-[#10b981]/50 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative"
              >
                {/* Top ambient green laser accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/35 to-transparent group-hover:via-[#34d399]/85 transition-all duration-500 z-20" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#10b981]/10 group-hover:bg-[#10b981]/22 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-[#08090d] border-b border-white/10 overflow-hidden">
                    <Image
                      src={art.coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#34d399] border border-[#10b981]/30 rounded-full text-[11px] font-bold font-space uppercase">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-zinc-400 mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>{art.readTime || '4 min read'}</span>
                      <span>•</span>
                      <span>{new Date(art.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-outfit font-black text-xl text-white line-clamp-2 leading-snug mb-3 group-hover:text-[#34d399] transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-zinc-400 line-clamp-3 font-normal leading-relaxed mb-4">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-white font-outfit text-xs">{art.author}</p>
                      <p className="text-[10px] text-[#34d399] font-medium font-jakarta">{art.authorRole}</p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black font-outfit text-[#34d399] group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
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
