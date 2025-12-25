import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Test from '@/models/Test';
import Admission from '@/models/Admission';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

// Helper function to verify student token
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

// GET - Get single test details for student
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const studentId = await verifyStudentToken();
    
    if (!studentId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { testId } = await params;
    
    await connectDB();
    
    // Get student details to verify class
    const student = await Admission.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }
    
    // Get test and verify it's for student's class
    const test = await Test.findById(testId)
      .select('title description subject testDate duration totalMarks passingMarks questions class status results');
    
    if (!test) {
      return NextResponse.json(
        { success: false, message: 'Test not found' },
        { status: 404 }
      );
    }
    
    // Verify student's class matches test class
    if (test.class !== student.standard) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to view this test' },
        { status: 403 }
      );
    }
    
    // Check if test is published
    if (test.status !== 'Published') {
      return NextResponse.json(
        { success: false, message: 'This test is not yet available' },
        { status: 403 }
      );
    }
    
    // Check if student has already submitted this test
    const alreadySubmitted = test.results && test.results.some(
      (r: any) => r.studentId && r.studentId.toString() === studentId.toString()
    );
    if (alreadySubmitted) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted this test' },
        { status: 403 }
      );
    }
    
    // Remove results field before sending to student
    const testObj = test.toObject();
    delete testObj.results;
    
    return NextResponse.json({
      success: true,
      data: testObj
    });
  } catch (error: any) {
    console.error('Get student test error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching test' },
      { status: 500 }
    );
  }
}
