import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import TempAdmission from '@/models/TempAdmission';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { admissionId, otp } = await request.json();

    if (!admissionId || !otp) {
      return NextResponse.json({
        success: false,
        message: 'Admission ID and OTP are required'
      }, { status: 400 });
    }

    // Clean up expired temp admissions
    await TempAdmission.deleteMany({ 
      expiresAt: { $lte: new Date() } 
    });

    // Find temp admission
    const tempAdmission = await TempAdmission.findById(admissionId);

    if (!tempAdmission) {
      return NextResponse.json({
        success: false,
        message: 'Admission session expired or not found. Please start again.'
      }, { status: 404 });
    }

    // Check if session has expired
    if (new Date() >= new Date(tempAdmission.expiresAt)) {
      await TempAdmission.deleteOne({ _id: tempAdmission._id });
      return NextResponse.json({
        success: false,
        message: 'Admission session expired. Please start again.'
      }, { status: 410 });
    }

    // Check if already verified
    if (tempAdmission.isVerified) {
      return NextResponse.json({
        success: false,
        message: 'OTP already verified. Please proceed to payment.'
      }, { status: 400 });
    }

    // Check OTP expiry
    if (!tempAdmission.otpExpiry || new Date() > tempAdmission.otpExpiry) {
      return NextResponse.json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      }, { status: 400 });
    }

    // Verify OTP
    if (!tempAdmission.otp || tempAdmission.otp !== otp) {
      return NextResponse.json({
        success: false,
        message: 'Invalid OTP'
      }, { status: 400 });
    }

    // Mark as verified
    tempAdmission.isVerified = true;
    tempAdmission.otp = undefined;
    tempAdmission.otpExpiry = undefined;
    await tempAdmission.save();

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully! Please proceed to payment.',
      data: {
        admissionId: tempAdmission._id,
        studentName: tempAdmission.studentName,
        email: tempAdmission.email,
        standard: tempAdmission.standard
      }
    });

  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error verifying OTP'
    }, { status: 500 });
  }
}
