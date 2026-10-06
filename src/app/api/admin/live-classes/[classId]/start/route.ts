export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/database';
import LiveClass from '@/models/LiveClass';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

function buildQuery(classId: string) {
  const isObjectId = mongoose.isValidObjectId(classId);
  return isObjectId
    ? { $or: [{ classId }, { _id: classId }, { roomName: classId }] }
    : { $or: [{ classId }, { roomName: classId }] };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
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
    const { classId } = await params;

    const liveClass = await LiveClass.findOneAndUpdate(
      buildQuery(classId),
      { 
        status: 'Live',
        actualStartTime: new Date()
      },
      { new: true }
    );

    if (!liveClass) {
      return NextResponse.json({
        success: false,
        message: 'Live class not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Live class started',
      data: liveClass
    });

  } catch (error: any) {
    console.error('Start Live Class Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error starting live class'
    }, { status: 500 });
  }
}
