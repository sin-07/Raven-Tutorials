import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Student from '@/models/Student';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// GET - Get student's enrolled courses
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      registrationId: string;
      email: string;
    };

    const student = await Student.findOne({ 
      registrationId: decoded.registrationId 
    }).select('registrationId studentName standard enrolledCourses');

    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        registrationId: student.registrationId,
        studentName: student.studentName,
        standard: student.standard,
        enrolledCourses: student.enrolledCourses || []
      }
    });

  } catch (error: any) {
    console.error('Get enrolled courses error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch enrolled courses'
    }, { status: 500 });
  }
}

// POST - Enroll in crash course
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      registrationId: string;
      email: string;
    };

    const { subject } = await request.json();

    if (!subject) {
      return NextResponse.json({
        success: false,
        message: 'Subject is required'
      }, { status: 400 });
    }

    const student = await Student.findOne({ 
      registrationId: decoded.registrationId 
    });

    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Check if already enrolled in this crash course
    const alreadyEnrolled = student.enrolledCourses?.some(
      course => course.courseType === 'crash' && 
                course.subject === subject && 
                course.standard === student.standard
    );

    if (alreadyEnrolled) {
      return NextResponse.json({
        success: false,
        message: 'Already enrolled in this crash course'
      }, { status: 400 });
    }

    // Define available crash courses
    const crashCoursesMap: { [key: string]: string[] } = {
      '9': ['Mathematics', 'Science'],
      '10': ['Mathematics', 'Science', 'English'],
      '11': [], // Coming soon
      '12': ['Physics', 'Chemistry', 'Biology']
    };

    const availableCrashCourses = crashCoursesMap[student.standard] || [];

    if (!availableCrashCourses.includes(subject)) {
      return NextResponse.json({
        success: false,
        message: 'This crash course is not available for your standard'
      }, { status: 400 });
    }

    // Add crash course enrollment
    if (!student.enrolledCourses) {
      student.enrolledCourses = [];
    }

    student.enrolledCourses.push({
      courseType: 'crash',
      subject,
      standard: student.standard,
      enrolledAt: new Date()
    });

    await student.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in crash course',
      data: {
        enrolledCourses: student.enrolledCourses
      }
    });

  } catch (error: any) {
    console.error('Enroll crash course error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to enroll in crash course'
    }, { status: 500 });
  }
}
