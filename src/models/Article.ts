import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  readTime: string;
  isPublished: boolean;
  featured: boolean;
  views: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Article slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Article excerpt is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Exam Tips',
    },
    author: {
      type: String,
      default: 'Raven Mentorship Team',
      trim: true,
    },
    authorRole: {
      type: String,
      default: 'Senior Faculty',
      trim: true,
    },
    authorAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    readTime: {
      type: String,
      default: '4 min read',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ slug: 1 });
articleSchema.index({ isPublished: 1, createdAt: -1 });
articleSchema.index({ category: 1 });

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', articleSchema);

export default Article;
