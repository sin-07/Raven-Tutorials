import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Notice from '@/models/Notice';

// GET all notices
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const notices = await Notice.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notices });
  } catch (error: any) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch notices' 
    }, { status: 500 });
  }
}

// POST a new notice (admin only)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Verify admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required'
      }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'raven-tutorials-secret-key'
    ) as { id: string };

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;
    const noticeClass = formData.get('class') as string || 'All';
    const postedBy = 'Admin';
    let documentUrl = '';

    console.log('POST /api/notices:', { title, message, noticeClass });

    if (!title || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Title and message required' 
      }, { status: 400 });
    }

    // Handle file upload if present
    const file = formData.get('document') as File | null;
    if (file && file.size > 0) {
      // For now, save locally. In production, use Cloudinary or similar
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const filename = `${Date.now()}-${file.name}`;
      const fs = require('fs').promises;
      const path = require('path');
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      
      documentUrl = `/uploads/${filename}`;
      console.log(`[SUCCESS] Document saved: ${file.name} → ${documentUrl}`);
    }

    const notice = new Notice({
      title,
      message,
      postedBy,
      class: noticeClass,
      documentUrl
    });

    await notice.save();
    return NextResponse.json({ success: true, data: notice });

  } catch (error: any) {
    console.error('Error posting notice:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to post notice' 
    }, { status: 500 });
  }
}
