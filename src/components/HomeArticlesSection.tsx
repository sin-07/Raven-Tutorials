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
    <section className="py-24 bg-transparent border-t-3 border-black relative z-10 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="pill-badge mb-4">
            <BookOpen className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
            Knowledge Base, Nature & Stories
          </span>
          <WavyHeading
            text="Latest Articles &"
            gradientText="Stories"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 font-outfit tracking-tight"
          />
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-bold max-w-2xl mx-auto font-jakarta">
            Fascinating reads on wildlife, nature, science, student strategies, and educational insights.
          </p>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-emerald-500 mb-3" />
            <p className="font-outfit font-black text-sm text-neutral-700">Loading Latest Insights...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <Link
                key={art._id}
                href={`/articles/${art.slug}`}
                className="group bg-[#f0fdf4] hover:bg-[#e6f9ee] border-2 sm:border-[2.5px] border-black rounded-3xl overflow-hidden shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-200 border-b-2 border-black overflow-hidden">
                    <img
                      src={art.coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 bg-emerald-200 text-emerald-950 border border-black rounded-md text-xs font-black font-space uppercase shadow-[1.5px_1.5px_0px_#000]">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-neutral-500 mb-2.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime || '4 min read'}</span>
                      <span>•</span>
                      <span>{new Date(art.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-outfit font-black text-xl text-black line-clamp-2 leading-snug mb-3 group-hover:text-emerald-800 transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-neutral-600 line-clamp-3 font-medium leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <div className="border-t-2 border-black/10 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-black text-black font-outfit text-xs">{art.author}</p>
                      <p className="text-[10px] text-emerald-800 font-bold font-jakarta">{art.authorRole}</p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black font-outfit text-black group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
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
            className="btn-cartoon px-8 py-3.5 bg-white hover:bg-neutral-100 text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm flex items-center gap-2"
          >
            <span>Explore All Educational Articles</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>

          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-black font-outfit text-neutral-600 hover:text-black hover:underline"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Admin: Write an Article</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
