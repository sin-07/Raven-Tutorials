'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  PenTool
} from 'lucide-react';
import WavyHeading from '@/components/WavyHeading';

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
  createdAt: string;
}

export default function HomeArticlesSection() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const res = await fetch('/api/articles?limit=3');
        const data = await res.json();
        if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error('Error fetching home articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticles();
  }, []);

  return (
    <section className="py-24 bg-transparent border-t border-white/10 relative z-10 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121814] border border-white/10 text-emerald-400 text-xs font-space font-extrabold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base, Nature & Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight">
            Latest Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">Stories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-medium max-w-2xl mx-auto font-jakarta">
            Fascinating reads on wildlife, nature, science, student strategies, and educational insights.
          </p>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/10 border-t-lime-400 mb-3" />
            <p className="font-outfit font-black text-sm text-zinc-400">Loading Latest Insights...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <Link
                key={art._id}
                href={`/articles/${art.slug}`}
                className="group bg-[#0e1410] hover:bg-[#121a15] border border-white/10 hover:border-emerald-400/40 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(74,222,128,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Thumbnail */}
                  <div className="relative h-48 w-full bg-black/40 border-b border-white/10 overflow-hidden">
                    <img
                      src={art.coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-lime-400 border border-lime-400/30 rounded-full text-xs font-extrabold font-space uppercase">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-zinc-500 mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{art.readTime || '4 min read'}</span>
                      <span>•</span>
                      <span>{new Date(art.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-outfit font-black text-xl text-white line-clamp-2 leading-snug mb-3 group-hover:text-lime-300 transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-zinc-400 line-clamp-3 font-normal leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-white font-outfit text-xs">{art.author}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold font-jakarta">{art.authorRole}</p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black font-outfit text-lime-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA Row */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/articles"
            className="btn-lime px-8 py-3.5 text-black font-extrabold font-outfit rounded-full text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(163,230,53,0.35)] cursor-pointer"
          >
            <span>Explore All Educational Articles</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>

          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold font-outfit text-zinc-400 hover:text-lime-400 transition-colors"
          >
            <PenTool className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin: Write an Article</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
