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

    // Get completed tests for this student's class
    const tests = await Test.find({
      class: student.standard,
      status: 'completed'
    }).sort({ testDate: -1 });

    // Extract results for this student
    const results = tests.map(test => {
      const studentResult = test.results?.find(
        (r: any) => r.studentId?.toString() === student._id.toString()
      );

      return {
        title: test.title,
        subject: test.subject,
        marksObtained: studentResult?.marksObtained || 0,
        totalMarks: test.totalMarks,
        passingMarks: test.passingMarks,
        testDate: test.testDate
      };
    }).filter(r => r.marksObtained > 0); // Only show tests the student attempted

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error: any) {
    console.error('Test Results Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching test results'
    }, { status: 500 });
  }
}
