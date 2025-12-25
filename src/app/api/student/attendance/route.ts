import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Attendance from '@/models/Attendance';
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
    const decoded = verifyStudentToken(token);
    
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();

    // Get student
    const student = await Admission.findById(decoded.studentId);
    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Get attendance records for this student's class
    const attendanceRecords = await Attendance.find({
      class: student.standard
    }).sort({ date: -1 });

    // Calculate subject-wise attendance
    const subjectMap: Record<string, { present: number; total: number }> = {};

    attendanceRecords.forEach(record => {
      const subject = record.subject || 'General';
      
      if (!subjectMap[subject]) {
        subjectMap[subject] = { present: 0, total: 0 };
      }

      subjectMap[subject].total++;

      // Check if student was present
      const studentAttendance = record.students?.find(
        (s: any) => s.studentId?.toString() === student._id.toString()
      );
      
      if (studentAttendance?.status === 'present') {
        subjectMap[subject].present++;
      }
    });

    // Convert to array format
    const attendanceData = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      present: data.present,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.present / data.total) * 100) : 0
    }));

    return NextResponse.json({
      success: true,
      data: attendanceData
    });

  } catch (error: any) {
    console.error('Attendance Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching attendance'
    }, { status: 500 });
  }
}
