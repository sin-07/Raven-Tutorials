export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const studentId = await verifyStudentToken();
    const { searchParams } = new URL(request.url);
    const queryClass = searchParams.get('class');

    let studentStandard: string | null = null;
    if (studentId) {
      const student = await Admission.findById(studentId).select('standard').lean();
      if (student) {
        studentStandard = (student as any).standard;
      }
    }

    const targetClass = studentStandard || queryClass;

    const filter: Record<string, any> = {
      status: { $in: ['Scheduled', 'Live', 'scheduled', 'live'] }
    };

    if (targetClass && targetClass !== 'All') {
      filter.$or = [
        { class: targetClass },
        { class: 'All' },
        { class: new RegExp(`^${targetClass}`, 'i') }
      ];
    }

    const liveClasses = await LiveClass.find(filter)
      .select('-participants')
      .sort({ status: -1, scheduledDate: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: liveClasses
    });
  } catch (error: any) {
    console.error('Get student live classes error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching live classes', error: error.message },
      { status: 500 }
    );
  }
}
