export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import LiveClass from '@/models/LiveClass';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded.success || !decoded.admin) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const className = searchParams.get('class');

    const query: Record<string, any> = {};
    
    if (status) query.status = status;
    if (className) query.class = className;

    const liveClasses = await LiveClass.find(query).sort({ scheduledDate: -1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: liveClasses
    });

  } catch (error: any) {
    console.error('Get Live Classes Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching live classes'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded.success || !decoded.admin) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { 
      title, 
      description, 
      subject, 
      class: className, 
      teacherName,
      scheduledDate, 
      startTime, 
      endTime, 
      duration, 
      maxParticipants, 
      isRecordingEnabled 
    } = body;

    if (!title || !subject || !className || !scheduledDate || !startTime || !endTime) {
      return NextResponse.json({
        success: false,
        message: 'Please fill all required fields'
      }, { status: 400 });
    }

    // Generate unique class ID and safe room name for Jitsi Meet
    const classId = uuidv4();
    const cleanTitleSlug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 25);
    const roomName = `raven-live-${cleanTitleSlug}-${classId.slice(0, 8)}`;

    const dateObj = new Date(scheduledDate);

    const liveClass = await LiveClass.create({
      classId,
      roomName,
      title,
      description: description || '',
      subject,
      class: className,
      teacherName: teacherName || (decoded.admin as any)?.name || 'Raven Senior Faculty',
      teacherEmail: (decoded.admin as any)?.email || '',
      scheduledDate: dateObj,
      scheduledAt: dateObj,
      startTime,
      endTime,
      duration: Number(duration) || 60,
      maxParticipants: Number(maxParticipants) || 100,
      isRecordingEnabled: Boolean(isRecordingEnabled),
      status: 'Scheduled',
      participants: []
    });

    return NextResponse.json({
      success: true,
      message: 'Live class created successfully',
      data: liveClass
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create Live Class Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error creating live class'
    }, { status: 500 });
  }
}
