import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Article from '@/models/Article';

const SAMPLE_ARTICLES = [
  {
    title: 'Top 5 Strategies to Master JEE Advanced Physics in 6 Months',
    slug: 'top-5-strategies-jee-advanced-physics',
    excerpt: 'Physics in JEE Advanced requires intuitive visualization rather than rote formulas. Here is the exact blueprint our top percentilers follow.',
    content: `## The Mindset Shift: Intuition Over Memorization

Physics in JEE Advanced is deliberately designed to test your understanding of first principles. Most students fail not because they don't know the formulas, but because they can't identify which physical law governs a multi-concept problem.

### 1. Master Free-Body Diagrams (FBDs) Completely
Before touching any equations, draw your system boundaries and identify all contact and non-contact forces. Whether it's rotational mechanics or electromagnetic induction, a clean diagram prevents 90% of sign and direction errors.

### 2. Connect Mechanics to Electrodynamics
Notice the recurring mathematical symmetries in physics:
- Linear momentum maps to angular momentum
- Electrostatic potential maps to gravitational potential
- LC oscillations are mathematically identical to Simple Harmonic Motion (SHM)

Understanding these analogies halves your memorization burden.

### 3. Practice Timed Mixed-Topic Problem Sets
Do not solve 50 consecutive problems from the same chapter. In the actual JEE Advanced paper, you jump from Thermodynamics to Optics to Nuclear Physics. Train your brain to switch topics rapidly with Daily Practice Problems (DPPs).

### 4. Rigorous Mock Analysis
Maintain a dedicated 'Mistake Log'. After every weekly mock test at Raven Tutorials, record:
- Was the error conceptual?
- Was it a calculation blunder?
- Did you run out of time?

Reviewing this log before every major test is the single fastest way to boost your percentile.`,
    coverImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    category: 'JEE Prep',
    author: 'Er. Sandeep Verma',
    authorRole: 'Head of Physics Department (IIT Alumni)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    isPublished: true,
    featured: true,
    views: 420,
    tags: ['JEE Advanced', 'Physics', 'Preparation Strategy'],
  },
  {
    title: 'How to Score 350+ in NEET Biology: NCERT Line-by-Line Guide',
    slug: 'how-to-score-350-plus-neet-biology',
    excerpt: 'Biology accounts for 50% of your NEET score. Learn how our mentors dissect NCERT diagrams, tables, and summary statements for 350+ marks.',
    content: `## Why Biology is Your Ticket to Government Medical Colleges

In NEET UG, Biology carries 360 marks out of 720. A student targeting AIIMS or top state medical colleges in Bihar like PMCH and IGIMS must aim for 340+ in Biology to remain safely competitive.

### 1. Every Line in NCERT is a Potential Assertion-Reason Question
In recent years, NTA has significantly increased Assertion-Reason and Statement-based questions. Reading NCERT casually is no longer enough. You must understand the causal link between adjacent sentences.

### 2. Don't Skip Summaries and Introductory Chapter Notes
Many students overlook the summary section at the end of each chapter and the scientist biographical introductions. Historically, direct questions have been framed from these often-ignored pages.

### 3. Diagram-Based Flashcards
From the structure of an antibody to the human reproductive system and plant anatomy cross-sections, label every diagram from memory. Raven classroom tests include unlabeled diagrams to train active recall.

### 4. Practice Daily Biology Drills
Dedicate 45 minutes every morning to solving 90 Biology MCQs with strict 45-minute timers. Speed in Biology frees up precious buffer time for lengthy Physics numericals.`,
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    category: 'NEET Tips',
    author: 'Dr. Priya Sinha',
    authorRole: 'Senior Biology Mentor (AIIMS Alumni)',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    readTime: '4 min read',
    isPublished: true,
    featured: true,
    views: 610,
    tags: ['NEET UG', 'Biology', 'NCERT'],
  },
  {
    title: 'Building Unshakeable Foundations in Class 9 & 10 for Competitive Exams',
    slug: 'building-foundations-class-9-10-competitive-exams',
    excerpt: 'Early preparation is not about overloading young students—it is about nurturing curiosity and scientific temper before high-stakes years.',
    content: `## The Real Purpose of Foundation Coaching

A common question parents ask us at Raven Tutorials is: *"Is Class 8 or 9 too early to prepare for competitive exams?"*

The answer is simple: Foundation coaching is not about making 14-year-olds solve 12th-grade calculus. It is about eradicating rote-learning habits and teaching children how to ask 'why' and 'how'.

### Why Foundation Matters
1. **Mathematical Reasoning:** Transitioning from simple arithmetic to abstract algebra and geometric proofs requires guided logic.
2. **Scientific Curiosity:** Seeing physical laws demonstrated in our classroom lab makes concepts stick for life.
3. **Overcoming Exam Fear:** Facing weekly structured tests in a supportive environment builds natural test resilience.

Invest in strong foundations today so Class 11 and 12 feel like a natural progression rather than an overwhelming shock.`,
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    category: 'Foundation',
    author: 'Rajeev Ranjan',
    authorRole: 'Academic Director, Raven Tutorials',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    readTime: '3 min read',
    isPublished: true,
    featured: false,
    views: 380,
    tags: ['Class 9', 'Class 10', 'Foundation', 'Parent Guide'],
  },
];

// GET: Fetch published articles (public)
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const filter: Record<string, any> = { isPublished: true };
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    let articles = await Article.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit);

    // Auto-seed starter articles if database has none
    if (articles.length === 0 && (!category || category === 'All')) {
      const count = await Article.countDocuments();
      if (count === 0) {
        await Article.insertMany(SAMPLE_ARTICLES);
        articles = await Article.find(filter)
          .sort({ featured: -1, createdAt: -1 })
          .limit(limit);
      }
    }

    return NextResponse.json({
      success: true,
      articles,
      count: articles.length,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
