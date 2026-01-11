import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Test from '@/models/Test';
import Admission from '@/models/Admission';
import { verifyStudentToken } from '@/lib/auth';

// ============================================
// HELPER: Auto-expire tests past endDate
// ============================================
async function autoExpireTests(): Promise<void> {
  const now = new Date();
  await Test.updateMany(
    {
      status: 'PUBLISHED',
      endDate: { $lt: now }
    },
    {
      $set: { status: 'EXPIRED' }
    }
  );
}

// ============================================
// GET: Fetch tests visible to student
// Student visibility rules:
// 1. Status must be PUBLISHED
// 2. Test standard must match student's standard
// 3. Current date must be between startDate and endDate
// ============================================
export async function GET(request: NextRequest) {
  try {
    // Verify student authentication
    const token = request.cookies.get('studentToken')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized: Please login as student'
      }, { status: 401 });
    }

    const decoded = await verifyStudentToken(token);
    
    if (!decoded.success || !decoded.student) {
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired token'
      }, { status: 401 });
    }

    await connectDB();

    // Get student details to find their standard
    const student = await Admission.findById(decoded.student._id);
    
    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Auto-expire tests that are past endDate
    await autoExpireTests();

    // Get current date for comparison (normalize to start of day for fair comparison)
    const now = new Date();

    // Fetch ONLY tests that match ALL visibility criteria:
    // 1. PUBLISHED status (not DRAFT, not EXPIRED)
    // 2. Matching student's standard
    // 3. Current date is within startDate and endDate
    const visibleTests = await Test.find({
      status: 'PUBLISHED',
      standard: student.standard,
      startDate: { $lte: now },
      endDate: { $gte: now }
    })
    .select('testId title description subject startDate endDate duration totalMarks passingMarks results') // Include results to check attempts
    .sort({ startDate: 1 });

    // Check if student has already attempted each test
    const testsWithAttemptStatus = visibleTests.map(test => {
      const testObj = test.toObject();
      const hasAttempted = test.results?.some(
        (result: any) => result.studentId?.toString() === student._id.toString()
      );
      return {
        ...testObj,
        hasAttempted: !!hasAttempted,
        // Calculate time remaining
        timeRemaining: Math.max(0, new Date(test.endDate).getTime() - now.getTime())
      };
    });

    return NextResponse.json({
      success: true,
      data: testsWithAttemptStatus,
      count: testsWithAttemptStatus.length,
      studentStandard: student.standard
    });

  } catch (error: any) {
    console.error('Student Tests Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching tests'
    }, { status: 500 });
  }
}
