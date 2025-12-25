import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Admission from '@/models/Admission';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('studentToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'No token provided'
      }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    ) as { studentId: string; email: string; registrationId: string };

    // Get student data
    const student = await Admission.findById(decoded.studentId);

    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Check payment status
    if (student.isPendingPayment || student.paymentStatus !== 'completed') {
      return NextResponse.json({
        success: false,
        message: 'Payment not completed'
      }, { status: 403 });
    }

    // Return student data
    const studentData = {
      _id: student._id,
      registrationId: student.registrationId,
      studentName: student.studentName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      alternatePhoneNumber: student.alternatePhoneNumber,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      fatherName: student.fatherName,
      motherName: student.motherName,
      address: student.address,
      city: student.city,
      state: student.state,
      pincode: student.pincode,
      previousSchool: student.previousSchool,
      standard: student.standard,
      category: student.category,
      paymentAmount: student.paymentAmount,
      paymentStatus: student.paymentStatus,
      submittedAt: student.submittedAt,
      photoUrl: student.photo
    };

    return NextResponse.json({
      success: true,
      student: studentData
    });

  } catch (error: any) {
    console.error('Token verification error:', error);
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token'
    }, { status: 401 });
  }
}
