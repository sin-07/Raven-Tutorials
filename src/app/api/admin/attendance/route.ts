import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Attendance from '@/models/Attendance';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const className = searchParams.get('class');
    const subject = searchParams.get('subject');
    const date = searchParams.get('date');

    const query: { class?: string; subject?: string; date?: Date } = {};
    
    if (className) query.class = className;
    if (subject) query.subject = subject;
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query)
      .populate('students.studentId', 'studentName registrationId')
      .sort({ date: -1 });

    return NextResponse.json({
      success: true,
      data: attendance
    });

  } catch (error: any) {
    console.error('Get Attendance Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching attendance'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { class: className, subject, date, students } = body;

    if (!className || !subject || !date || !students || students.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Please provide class, subject, date, and student attendance'
      }, { status: 400 });
    }

    // Check if attendance already exists for this class/subject/date
    const existingAttendance = await Attendance.findOne({
      class: className,
      subject,
      date: new Date(date)
    });

    if (existingAttendance) {
      // Check if within 2-hour lock period
      const createdAt = new Date(existingAttendance.createdAt);
      const now = new Date();
      const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

      if (hoursSinceCreation > 2) {
        return NextResponse.json({
          success: false,
          message: 'Attendance can only be updated within 2 hours of marking',
          statusCode: 403
        }, { status: 403 });
      }

      // Update existing attendance
      existingAttendance.students = students;
      await existingAttendance.save();

      return NextResponse.json({
        success: true,
        message: 'Attendance updated successfully',
        data: existingAttendance
      });
    }

    // Create new attendance record
    const attendance = await Attendance.create({
      class: className,
      subject,
      date: new Date(date),
      students
    });

    return NextResponse.json({
      success: true,
      message: 'Attendance saved successfully',
      data: attendance
    }, { status: 201 });

  } catch (error: any) {
    console.error('Save Attendance Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error saving attendance'
    }, { status: 500 });
  }
}
