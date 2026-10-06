export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import LiveClass from '@/models/LiveClass';
import Admission from '@/models/Admission';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

function buildQuery(classId: string) {
  const isObjectId = mongoose.isValidObjectId(classId);
  return isObjectId
    ? { $or: [{ classId }, { _id: classId }, { roomName: classId }] }
    : { $or: [{ classId }, { roomName: classId }] };
}

async function verifyStudentToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('studentToken')?.value;
  
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded.id;
  } catch {
    return null;
  }
}

// POST - Join live class (record attendance)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const studentId = await verifyStudentToken();
    const { classId } = await params;
    await connectDB();

    const liveClass = await LiveClass.findOne(buildQuery(classId));
    if (!liveClass) {
      return NextResponse.json(
        { success: false, message: 'Live class not found' },
        { status: 404 }
      );
    }

    if (studentId) {
      const student = await Admission.findById(studentId).select('standard studentName email').lean();
      if (student) {
        const studentName = (student as any).studentName || 'Student';
        const studentEmail = (student as any).email || '';

        if (!liveClass.participants) {
          liveClass.participants = [];
        }

        const alreadyJoined = liveClass.participants.some(
          (p: any) => p.participantId && p.participantId.toString() === studentId.toString()
        );

        if (!alreadyJoined) {
          liveClass.participants.push({
            participantId: studentId as any,
            studentName,
            studentEmail,
            joinedAt: new Date()
          });
          await liveClass.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Joined live class successfully',
      data: {
        classId: liveClass.classId,
        roomName: liveClass.roomName,
        subject: liveClass.subject,
        title: liveClass.title
      }
    });
  } catch (error: any) {
    console.error('Join live class error:', error);
    return NextResponse.json(
      { success: false, message: 'Error joining live class', error: error.message },
      { status: 500 }
    );
  }
}
