import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/database';
import Article from '@/models/Article';

// GET: Fetch a single article by slug or _id (public)
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    await connectDB();

    const query: Record<string, any> = {
      $or: [
        { slug: slug.toLowerCase() },
        ...(mongoose.Types.ObjectId.isValid(slug) ? [{ _id: slug }] : []),
      ],
      isPublished: true,
    };

    const article = await Article.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!article) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      );
    }

    // Also fetch 3 related articles from same or similar category
    const relatedArticles = await Article.find({
      _id: { $ne: article._id },
      isPublished: true,
      category: article.category,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    return NextResponse.json({
      success: true,
      article,
      relatedArticles,
    });
  } catch (error) {
    console.error('Error fetching article detail:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
