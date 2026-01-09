import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Admission from '@/models/Admission';

// Helper function to format date from DDMMYYYY to Date object
const parseDOBPassword = (dobString: string): Date | null => {
  try {
    // Expected format: DDMMYYYY
    if (dobString.length !== 8) return null;
    
    const day = dobString.substring(0, 2);
    const month = dobString.substring(2, 4);
    const year = dobString.substring(4, 8);
    
    return new Date(`${year}-${month}-${day}`);
  } catch (error) {
    return null;
  }
};

// Compare dates (ignoring time)
const compareDates = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();

    console.log('[INFO] STUDENT LOGIN ATTEMPT');
    console.log('[INFO] Email:', email);
    console.log('[INFO] Timestamp:', new Date().toISOString());

    // Validate input
    if (!email || !password) {
      console.log('[ERROR] Missing credentials');
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }

    // Find student by email
    const student = await Admission.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!student) {
      console.log('[ERROR] Student not found for email:', email);
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }

    console.log('[INFO] Student found:', student.studentName);
    console.log('[INFO] Payment status:', student.paymentStatus);
    console.log('[INFO] Is pending payment:', student.isPendingPayment);

    // Check if payment is completed
    if (student.isPendingPayment || student.paymentStatus !== 'completed') {
      console.log('[ERROR] Payment not completed');
      return NextResponse.json({
        success: false,
        message: 'Payment not completed. Please complete your admission payment first.'
      }, { status: 403 });
    }

    // Verify password (DOB in DDMMYYYY format)
    const dobFromPassword = parseDOBPassword(password);
    
    console.log('[DEBUG] DOB from password:', dobFromPassword);
    console.log('[DEBUG] DOB from database:', student.dateOfBirth);
    
    if (!dobFromPassword || !compareDates(dobFromPassword, student.dateOfBirth)) {
      console.log('[ERROR] Password mismatch');
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }

    console.log('[SUCCESS] Student login successful:', student.studentName);

    // Generate JWT token (1 hour expiry for security)
    const token = jwt.sign(
      { 
        studentId: student._id.toString(),
        email: student.email,
        registrationId: student.registrationId
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '1h' } // 1 hour session
    );

    // Prepare student data (remove sensitive info)
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

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      student: studentData
    });

    // Set httpOnly cookie (1 hour expiry)
    response.cookies.set('studentToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/'
    });

    return response;

  } catch (error: any) {
    console.error('[FATAL] Student login error:', error.message);
    
    // Handle specific error types
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return NextResponse.json({
        success: false,
        message: 'Database connection error. Please try again in a moment.'
      }, { status: 503 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Server error during login. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
