import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Test from '@/models/Test';
import Admission from '@/models/Admission';
import { verifyStudentToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyStudentToken(token);
    
    if (!decoded.success || !decoded.student) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();

    // Get student
    const student = await Admission.findById(decoded.student._id);
    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Get tests for this student's class
    const tests = await Test.find({
      class: student.standard,
      status: { $in: ['scheduled', 'active'] }
    }).sort({ testDate: 1 });

    return NextResponse.json({
      success: true,
      data: tests
    });

  } catch (error: any) {
    console.error('Tests Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching tests'
    }, { status: 500 });
  }
}
