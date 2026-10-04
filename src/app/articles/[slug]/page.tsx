'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Eye, 
  Share2, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';

interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  coverImage?: string;
  readTime: string;
  views: number;
  tags?: string[];
  createdAt: string;
}

export default function ArticleDetailPage() {
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || '';

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();
        if (data.success && data.article) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  // Helper to format markdown-like text (## for headings, - for list items)
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-outfit font-black text-xl sm:text-2xl text-black mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-outfit font-black text-2xl sm:text-3xl text-black mt-8 mb-4 border-b border-white/10/15 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="font-jakarta text-neutral-800 text-base leading-relaxed ml-5 list-disc my-1">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="font-jakarta text-neutral-800 text-base sm:text-lg leading-relaxed my-2 font-medium">
          {trimmed}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex flex-col justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border border-white/15 border-t-emerald-500 mb-4" />
        <p className="font-outfit font-black text-black">Loading Article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f6fcf8] flex flex-col justify-center items-center py-32 px-4 text-center">
        <div className="bg-[#f0fdf4] border border-white/10 rounded-3xl p-8 max-w-md shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
          <BookOpen className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h2 className="font-outfit font-black text-2xl text-black mb-2">Article Not Found</h2>
          <p className="font-jakarta text-sm text-neutral-600 mb-6">
            The article you are looking for may have been moved or unpublished.
          </p>
          <Link
            href="/"
            className="btn-sheryians inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-black font-black font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fcf8] text-neutral-900 selection:bg-emerald-300 selection:text-black pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black font-outfit text-black hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-emerald-100 border border-white/10 rounded-xl text-xs font-black font-outfit shadow-[0_4px_12px_rgba(0,0,0,0.3)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Header Card */}
        <div className="bg-[#f0fdf4] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-emerald-300 border border-black rounded-lg text-xs font-black font-space uppercase shadow-sm">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-neutral-600 bg-white border border-black px-2.5 py-1 rounded-md shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-neutral-600 bg-white border border-black px-2.5 py-1 rounded-md shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-neutral-600 bg-white border border-black px-2.5 py-1 rounded-md shadow-sm">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views || 1} views</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-black leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg font-jakarta font-semibold text-neutral-700 leading-relaxed border-l-4 border-emerald-500 pl-4 italic mb-6">
            &ldquo;{article.excerpt}&rdquo;
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/10/10">
            <img
              src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={article.author}
              className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-black text-black font-outfit text-base">{article.author}</p>
                <CheckCircle2 className="w-4 h-4 fill-emerald-400 text-black stroke-[1.5]" />
              </div>
              <p className="text-xs font-bold font-jakarta text-emerald-900">{article.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-10 h-72 sm:h-96 w-full bg-slate-100">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <article className="bg-[#f0fdf4] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-12">
          <div className="prose max-w-none text-neutral-900 font-jakarta">
            {renderFormattedContent(article.content)}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-white/10/15">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white border border-black rounded-lg text-xs font-mono font-bold text-neutral-800 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mb-14">
            <h3 className="font-outfit font-black text-2xl text-black mb-6">
              More Insights in {article.category}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/articles/${rel.slug}`}
                  className="bg-[#f0fdf4] hover:bg-[#e6f9ee] border border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-emerald-200 border border-black rounded text-[10px] font-space font-black uppercase mb-2">
                      {rel.category}
                    </span>
                    <h4 className="font-outfit font-black text-base text-black line-clamp-2 leading-snug mb-2">
                      {rel.title}
                    </h4>
                    <p className="font-jakarta text-xs text-neutral-600 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black font-outfit text-emerald-800 pt-4 mt-2 border-t border-black/10">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Admission Callout Banner */}
        <div className="bg-[#dcfce7] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-emerald-300 rounded-full text-xs font-black font-space uppercase border border-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Raven Mentorship</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit text-black">
            Turn Expert Strategies into Top Ranks
          </h2>
          <p className="text-sm sm:text-base font-jakarta font-semibold text-neutral-700 max-w-xl mx-auto">
            Experience structured classroom coaching, daily problem drills, and 1-on-1 mentor guidance in Patna.
          </p>
          <div className="pt-2">
            <Link
              href="/admission"
              className="btn-sheryians inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black font-outfit rounded-2xl border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.4)] text-sm"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <LMSFooter />
      </div>
    </div>
  );
}
