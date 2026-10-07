'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  X, 
  ExternalLink,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import Loader, { ButtonLoader } from '@/components/Loader';

interface ArticleItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  coverImage?: string;
  readTime: string;
  isPublished: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
}

const SUGGESTED_TAGS = [
  'Wildlife',
  'Nature',
  'Biodiversity',
  'Environment',
  'Ecology',
  'Science',
  'Biology',
  'Student Life',
];

const QUICK_COVERS = [
  { label: 'Wildlife / Tiger', url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80' },
  { label: 'Nature / Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80' },
  { label: 'Birds / Raven', url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&auto=format&fit=crop&q=80' },
  { label: 'Mountains / Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80' },
  { label: 'Marine / Ocean', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80' },
  { label: 'Books / Study', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80' },
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wildlife',
    readTime: '4 min read',
    coverImage: QUICK_COVERS[0].url,
    author: 'Raven Editorial Team',
    authorRole: 'Wildlife & Nature Writer',
    excerpt: '',
    content: '',
    isPublished: true,
    featured: false,
  });

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

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      } else {
        toast.error('Failed to load articles');
      }
    } catch {
      toast.error('Error fetching articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Wildlife',
      readTime: '4 min read',
      coverImage: QUICK_COVERS[0].url,
      author: 'Raven Editorial Team',
      authorRole: 'Wildlife & Nature Writer',
      excerpt: '',
      content: '',
      isPublished: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (art: ArticleItem) => {
    setEditingId(art._id);
    setFormData({
      title: art.title,
      category: art.category,
      readTime: art.readTime || '4 min read',
      coverImage: art.coverImage || QUICK_COVERS[0].url,
      author: art.author || 'Raven Mentorship Team',
      authorRole: art.authorRole || 'Senior Academic Faculty',
      excerpt: art.excerpt,
      content: art.content,
      isPublished: art.isPublished,
      featured: art.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      toast.error('Please fill in Title, Summary, and Content');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : '/api/admin/articles';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? 'Article updated successfully!' : 'Article published successfully!');
        setIsModalOpen(false);
        fetchArticles();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch {
      toast.error('Error saving article');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (art: ArticleItem) => {
    try {
      const res = await fetch(`/api/admin/articles/${art._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !art.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(art.isPublished ? 'Article set to Draft' : 'Article Published!');
        fetchArticles();
      }
    } catch {
      toast.error('Failed to change status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Article deleted');
        setArticles((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch {
      toast.error('Error deleting article');
    }
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      art.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPublished = articles.filter((a) => a.isPublished).length;
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Executive Header Banner */}
          <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Knowledge Base & Insights</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                  Article & Blog Management
                </h1>
                <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                  Write educational articles, exam strategies, and advice that automatically display on the Home page.
                </p>
              </div>

              <button
                onClick={openCreateModal}
                className="px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <p className="text-xs font-bold text-zinc-400 font-jakarta uppercase">Total Articles</p>
              <p className="text-2xl sm:text-3xl font-black text-white font-outfit mt-1">{articles.length}</p>
            </div>
            <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <p className="text-xs font-bold text-zinc-400 font-jakarta uppercase">Published Live</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-outfit mt-1">{totalPublished}</p>
            </div>
            <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <p className="text-xs font-bold text-zinc-400 font-jakarta uppercase">Drafts</p>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-outfit mt-1">{articles.length - totalPublished}</p>
            </div>
            <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <p className="text-xs font-bold text-zinc-400 font-jakarta uppercase">Total Reads / Views</p>
              <p className="text-2xl sm:text-3xl font-black text-[#6ee7b7] font-outfit mt-1">{totalViews}</p>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, summary, author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 text-xs sm:text-sm font-medium font-jakarta focus:outline-none focus:border-[#34d399] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <Filter className="w-4 h-4 text-zinc-500 shrink-0 hidden sm:block" />
              {availableCategories.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#10b981] to-[#34d399] text-white border-transparent shadow-[0_4px_12px_rgba(16,185,129,0.35)]'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles List / Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader size="lg" text="Loading Articles..." subtitle="Fetching editorial catalogue" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-3xl p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-xl mx-auto space-y-4">
              <BookOpen className="w-12 h-12 text-[#34d399] mx-auto opacity-80" />
              <h3 className="font-outfit font-bold text-xl text-white">No Articles Found</h3>
              <p className="text-sm font-jakarta text-zinc-400 font-medium">
                {search ? 'Try adjusting your search query or filter.' : 'Start sharing your knowledge! Write your first article today.'}
              </p>
              <button
                onClick={openCreateModal}
                className="px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_4px_12px_rgba(16,185,129,0.35)] text-sm cursor-pointer"
              >
                Write First Article
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <div
                  key={art._id}
                  className="bg-[#0b0e1a]/90 hover:bg-[#0e1222] border border-white/10 hover:border-[#34d399]/40 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between group"
                >
                  {/* Article Card Top Cover */}
                  <div>
                    <div className="relative h-44 w-full bg-[#070914] border-b border-white/10 overflow-hidden">
                      <img
                        src={art.coverImage || QUICK_COVERS[0].url}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#6ee7b7] border border-[#34d399]/30 rounded-md text-xs font-bold font-space uppercase shadow-sm">
                          {art.category}
                        </span>
                        {art.featured && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md text-[10px] font-bold font-space uppercase shadow-sm">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleTogglePublish(art)}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border shadow-sm cursor-pointer transition-all ${
                            art.isPublished
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-white/10 text-zinc-400 border-white/10'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {art.isPublished ? '● Published' : '○ Draft'}
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{art.readTime}</span>
                        <span>•</span>
                        <span>{new Date(art.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h3 className="font-outfit font-bold text-lg text-white group-hover:text-[#6ee7b7] transition-colors line-clamp-2 leading-snug mb-2">
                        {art.title}
                      </h3>
                      <p className="font-jakarta text-xs text-zinc-400 line-clamp-3 font-medium leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 pt-0">
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{art.views || 0} reads</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {art.isPublished && (
                          <Link
                            href={`/articles/${art.slug}`}
                            target="_blank"
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-zinc-300 hover:text-white shadow-sm transition-all"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <button
                          onClick={() => openEditModal(art)}
                          className="p-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300 shadow-sm cursor-pointer transition-all"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(art._id, art.title)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-300 shadow-sm cursor-pointer transition-all"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── WRITE / EDIT ARTICLE MODAL ── */}
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="bg-[#0c0f1c] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative my-auto text-white">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <h2 className="font-outfit font-bold text-2xl text-white">
                      {editingId ? 'Edit Article' : 'Write New Article'}
                    </h2>
                    <p className="text-xs font-jakarta text-zinc-400 font-medium mt-0.5">
                      Articles published here immediately show up in the Home Page articles section.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master NCERT Biology: Strategy from AIIMS Mentors"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                    />
                  </div>

                  {/* Category & Read Time Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                        Category / Topic *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wildlife, Nature, Ecology, Animals..."
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-bold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                      />
                      {/* Quick fill tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-bold text-zinc-500">Quick fill:</span>
                        {SUGGESTED_TAGS.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: tag })}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md border cursor-pointer transition ${
                              formData.category === tag
                                ? 'bg-[#34d399] text-white border-transparent'
                                : 'bg-white/5 hover:bg-white/10 text-zinc-400 border-white/10 hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4 min read"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                      />
                    </div>
                  </div>

                  {/* Author Name & Role */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                        Author Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Er. Sandeep Verma"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                        Author Role / Qualification
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Head of Physics (IIT Alumni)"
                        value={formData.authorRole}
                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                      />
                    </div>
                  </div>

                  {/* Cover Image URL & Presets */}
                  <div>
                    <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="Paste image URL or pick one below"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399] mb-2"
                    />

                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      <span className="text-xs font-bold text-zinc-500 shrink-0">Quick picks:</span>
                      {QUICK_COVERS.map((cov) => (
                        <button
                          key={cov.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImage: cov.url })}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-bold shrink-0 transition-all ${
                            formData.coverImage === cov.url
                              ? 'bg-[#34d399]/20 border-[#34d399] text-[#6ee7b7]'
                              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {cov.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div>
                    <label className="block text-xs font-space font-bold uppercase text-zinc-300 mb-1.5">
                      Short Excerpt / Summary * (Shows on cards)
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Brief 1-2 sentence hook highlighting the main takeaway..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-medium font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                    />
                  </div>

                  {/* Full Article Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-space font-bold uppercase text-zinc-300">
                        Article Body Content * (Markdown / Plain Text supported)
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">Supports ## Headings & - Bullet points</span>
                    </div>
                    <textarea
                      required
                      rows={8}
                      placeholder="Write your article body here. You can use ## for section headings and - for bullet points."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-sm font-medium font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 accent-[#34d399] rounded"
                      />
                      <span className="text-xs font-bold font-outfit text-white">Publish Live to Website</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span className="text-xs font-bold font-outfit text-white">Mark as Featured</span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 font-bold text-sm bg-white/5 hover:bg-white/10 text-zinc-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-2.5 rounded-xl border border-white/10 font-bold text-sm bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white shadow-[0_6px_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <ButtonLoader size={16} />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{editingId ? 'Update Article' : 'Publish Article'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
