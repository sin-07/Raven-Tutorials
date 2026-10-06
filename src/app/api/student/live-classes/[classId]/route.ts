export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/database';
import LiveClass from '@/models/LiveClass';

function buildQuery(classId: string) {
  const isObjectId = mongoose.isValidObjectId(classId);
  return isObjectId
    ? { $or: [{ classId }, { _id: classId }, { roomName: classId }] }
    : { $or: [{ classId }, { roomName: classId }] };
}

// GET - Get single live class details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;
    await connectDB();

    const liveClass = await LiveClass.findOne(buildQuery(classId))
      .select('-participants')
      .lean();

    if (!liveClass) {
      return NextResponse.json(
        { success: false, message: 'Live class not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: liveClass
    });
  } catch (error: any) {
    console.error('Get live class error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching live class', error: error.message },
      { status: 500 }
    );
  }
}
