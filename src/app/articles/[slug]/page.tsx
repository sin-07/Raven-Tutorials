'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import Loader from '@/components/Loader';

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
          <h3 key={idx} className="font-outfit font-black text-xl sm:text-2xl text-[#34d399] mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-outfit font-black text-2xl sm:text-3xl text-white mt-10 mb-4 border-b border-white/10 pb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="font-jakarta text-zinc-300 text-base leading-relaxed ml-5 list-disc my-1.5 font-normal">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="font-jakarta text-zinc-300 text-base sm:text-lg leading-relaxed my-3 font-normal">
          {trimmed}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <Loader
        fullScreen
        size="lg"
        text="Loading Article..."
        subtitle="Retrieving academic analysis"
      />
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col justify-center items-center py-32 px-4 text-center">
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-8 max-w-md shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
          <BookOpen className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <h2 className="font-outfit font-black text-2xl text-white mb-2">Article Not Found</h2>
          <p className="font-jakarta text-sm text-zinc-400 mb-6">
            The article you are looking for may have been moved or unpublished.
          </p>
          <Link
            href="/articles"
            className="btn-sheryians inline-flex items-center gap-2 px-6 py-3 text-white font-black font-outfit rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Return to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#10b981] selection:text-white pt-28 pb-16 relative overflow-hidden">
      {/* Ambient background glows matching the rest of the site */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold font-outfit text-zinc-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#34d399] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold font-outfit text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Header Card (Obsidian Cyber Style) */}
        <div className="bg-gradient-to-b from-[#111422] to-[#090b14] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-8 relative overflow-hidden">
          {/* Top ambient green laser accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#10b981]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="px-3 py-1 bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] rounded-full text-xs font-extrabold font-space uppercase">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{new Date(article.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Eye className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{article.views || 1} views</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-white leading-tight tracking-tight mb-6">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg font-jakarta text-zinc-300 leading-relaxed border-l-2 border-[#10b981] pl-4 italic mb-8">
              &ldquo;{article.excerpt}&rdquo;
            </p>

            {/* Author Badge */}
            <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
              <Image
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={article.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border border-[#10b981]/30 shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-extrabold text-white font-outfit text-base">{article.author}</p>
                  <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                </div>
                <p className="text-xs font-medium font-jakarta text-[#34d399]">{article.authorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-10 h-72 sm:h-96 w-full bg-[#090b14]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <article className="bg-gradient-to-b from-[#10121a] to-[#08090f] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-12 relative overflow-hidden">
          <div className="prose prose-invert max-w-none text-zinc-300 font-jakarta leading-relaxed">
            {renderFormattedContent(article.content)}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-white/10">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono font-medium text-zinc-300 shadow-sm"
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
            <h3 className="font-outfit font-black text-2xl text-white mb-6">
              More Insights in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#6ee7b7]">{article.category}</span>
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/articles/${rel.slug}`}
                  className="group bg-gradient-to-b from-[#111422] to-[#090b14] hover:from-[#151a2e] hover:to-[#0c0f1c] border border-white/10 hover:border-[#10b981]/50 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/35 to-transparent group-hover:via-[#34d399]/85 transition-all duration-500" />
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#10b981]/15 border border-[#10b981]/30 rounded text-[10px] font-space font-bold uppercase text-[#34d399] mb-2.5">
                      {rel.category}
                    </span>
                    <h4 className="font-outfit font-black text-base text-white group-hover:text-[#34d399] line-clamp-2 leading-snug mb-2 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="font-jakarta text-xs text-zinc-400 line-clamp-2 font-normal leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black font-outfit text-[#34d399] pt-4 mt-3 border-t border-white/10">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Admission Callout Banner */}
        <div className="bg-gradient-to-b from-[#111422] to-[#090b14] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-28 bg-[#10b981]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#10b981]/15 text-[#34d399] rounded-full text-xs font-bold font-space uppercase border border-[#10b981]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Raven Mentorship</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white">
              Turn Expert Strategies into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7]">Top Ranks</span>
            </h2>
            <p className="text-sm sm:text-base font-jakarta font-normal text-zinc-300 max-w-xl mx-auto mt-2">
              Experience dedicated 1-on-1 home tuition, rigorous problem drills, and concept-first faculty in Patna.
            </p>
            <div className="pt-4">
              <Link
                href="/courses"
                className="btn-sheryians inline-flex items-center gap-2 px-8 py-3.5 text-white font-extrabold font-outfit rounded-full shadow-[0_0_25px_rgba(16,185,129,0.45)] text-sm"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <LMSFooter />
      </div>
    </div>
  );
}
