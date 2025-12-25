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

interface AnswerSubmission {
  questionId: string;
  answer: string | null;
  questionText?: string;
}

interface Violation {
  violationType: string;
  timestamp: string;
  question: number;
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

// POST - Submit test answers
export async function POST(
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
    const body = await request.json();
    const { answers, violations = [], timeSpent = 0 } = body as {
      answers: AnswerSubmission[];
      violations?: Violation[];
      timeSpent?: number;
    };
    
    await connectDB();
    
    // Get student details
    const student = await Admission.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }
    
    // Get test
    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json(
        { success: false, message: 'Test not found' },
        { status: 404 }
      );
    }
    
    // Verify student's class
    if (test.class !== student.standard) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to submit this test' },
        { status: 403 }
      );
    }
    
    // Check if already submitted
    const existingResult = test.results.find(
      (r: any) => r.studentId && r.studentId.toString() === studentId.toString()
    );
    if (existingResult) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted this test' },
        { status: 400 }
      );
    }
    
    // Calculate marks for MCQ and True/False questions
    let marksObtained = 0;
    const gradedAnswers = answers.map((ans) => {
      const question = test.questions.find(
        (q: any) => q._id.toString() === ans.questionId || q.questionText === ans.questionText
      );
      let marksAwarded = 0;
      
      if (!question) {
        return {
          questionId: ans.questionId,
          answer: ans.answer,
          marksAwarded: 0
        };
      }
      
      if (question.questionType === 'MCQ' || question.questionType === 'True/False') {
        if (ans.answer && ans.answer === question.correctAnswer) {
          marksAwarded = question.marks;
          marksObtained += marksAwarded;
        }
      }
      // For Short Answer and Long Answer, marks need manual grading
      
      return {
        questionId: ans.questionId || question._id,
        answer: ans.answer,
        marksAwarded
      };
    });
    
    // Add result to test with violations tracking
    const resultStatus = marksObtained >= test.passingMarks ? 'Pass' : 'Fail';
    
    test.results.push({
      studentId,
      marksObtained,
      status: resultStatus,
      submittedAt: new Date(),
      answers: gradedAnswers,
      violations: violations || [],
      timeSpent: timeSpent || 0
    });
    
    await test.save();
    
    // Send email notification (optional - you can implement this with Brevo or other email service)
    // ... email logic can be added here
    
    return NextResponse.json({
      success: true,
      message: 'Test submitted successfully',
      data: {
        marksObtained,
        totalMarks: test.totalMarks,
        passingMarks: test.passingMarks,
        status: resultStatus,
        violationsCount: violations.length
      }
    });
  } catch (error: any) {
    console.error('Submit test error:', error);
    return NextResponse.json(
      { success: false, message: 'Error submitting test' },
      { status: 500 }
    );
  }
}
