import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Article from '@/models/Article';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper: verify admin token
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('adminToken')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// GET: Fetch all articles for admin (including drafts)
export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const articles = await Article.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error('Error in admin GET articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST: Create a new article
export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const {
      title,
      excerpt,
      content,
      category,
      coverImage,
      author,
      authorRole,
      authorAvatar,
      readTime,
      isPublished = true,
      featured = false,
      tags = [],
    } = body;

    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { success: false, message: 'Title, category, excerpt, and content are required' },
        { status: 400 }
      );
    }

    // Ensure unique slug
    let slug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    const existing = await Article.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newArticle = new Article({
      title,
      slug,
      excerpt,
      content,
      category,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      author: author || 'Raven Mentorship Team',
      authorRole: authorRole || 'Academic Faculty',
      authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      readTime: readTime || '4 min read',
      isPublished: Boolean(isPublished),
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags : [],
      views: 0,
    });

    await newArticle.save();

    return NextResponse.json({
      success: true,
      message: 'Article created successfully',
      article: newArticle,
    });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create article' },
      { status: 500 }
    );
  }
}
