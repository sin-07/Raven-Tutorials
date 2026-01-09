import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import TempAdmission from '@/models/TempAdmission';
import Student from '@/models/Student';
import Admission from '@/models/Admission';
import { getNextSequence } from '@/models/Counter';
import crypto from 'crypto';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      tempAdmissionId
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !tempAdmissionId) {
      return NextResponse.json({
        success: false,
        message: 'Missing required payment verification parameters'
      }, { status: 400 });
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({
        success: false,
        message: 'Invalid payment signature'
      }, { status: 400 });
    }

    // Find temp admission
    const tempAdmission = await TempAdmission.findById(tempAdmissionId);

    if (!tempAdmission) {
      return NextResponse.json({
        success: false,
        message: 'Admission session not found'
      }, { status: 404 });
    }

    // Check if OTP was verified
    if (!tempAdmission.isVerified) {
      return NextResponse.json({
        success: false,
        message: 'Please verify OTP first'
      }, { status: 400 });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ 
      email: tempAdmission.email.toLowerCase() 
    });

    if (existingStudent) {
      return NextResponse.json({
        success: false,
        message: 'Student already registered with this email'
      }, { status: 400 });
    }

    // Generate registration ID using atomic counter
    const year = new Date().getFullYear().toString().slice(-2);
    const sequence = await getNextSequence(`registration_${year}`);
    const registrationId = `RT${year}${String(sequence).padStart(4, '0')}`;

    // Generate password from Date of Birth (DDMMYYYY format)
    const dob = new Date(tempAdmission.dateOfBirth);
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const dobYear = dob.getFullYear();
    const password = `${day}${month}${dobYear}`;

    // Get admission fee
    const admissionFee = parseInt(process.env.ADMISSION_FEE || '1000');

    // Create student record
    const student = await Student.create({
      registrationId,
      password: password,  // Plain text DOB password
      studentName: tempAdmission.studentName,
      fatherName: tempAdmission.fatherName,
      motherName: tempAdmission.motherName,
      dateOfBirth: tempAdmission.dateOfBirth,
      gender: tempAdmission.gender,
      bloodGroup: tempAdmission.bloodGroup,
      category: tempAdmission.category,
      phoneNumber: tempAdmission.phoneNumber,
      alternatePhoneNumber: tempAdmission.alternatePhoneNumber,
      email: tempAdmission.email,
      address: tempAdmission.address,
      city: tempAdmission.city,
      state: tempAdmission.state,
      pincode: tempAdmission.pincode,
      standard: tempAdmission.standard,
      previousSchool: tempAdmission.previousSchool,
      photo: tempAdmission.photo,
      paymentStatus: 'completed',
      paymentAmount: admissionFee,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      admissionDate: new Date(),
      isActive: true
    });

    // Also create admission record for reference
    await Admission.create({
      registrationId,
      password: password,  // Plain text DOB password
      studentName: tempAdmission.studentName,
      fatherName: tempAdmission.fatherName,
      motherName: tempAdmission.motherName,
      dateOfBirth: tempAdmission.dateOfBirth,
      gender: tempAdmission.gender,
      bloodGroup: tempAdmission.bloodGroup,
      category: tempAdmission.category,
      phoneNumber: tempAdmission.phoneNumber,
      alternatePhoneNumber: tempAdmission.alternatePhoneNumber,
      email: tempAdmission.email,
      address: tempAdmission.address,
      city: tempAdmission.city,
      state: tempAdmission.state,
      pincode: tempAdmission.pincode,
      standard: tempAdmission.standard,
      previousSchool: tempAdmission.previousSchool,
      photo: tempAdmission.photo,
      paymentStatus: 'completed',
      isPendingPayment: false,  // CRITICAL: Payment completed
      paymentAmount: admissionFee,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      submittedAt: new Date()
    });

    // Delete temp admission
    await TempAdmission.deleteOne({ _id: tempAdmission._id });

    // Send welcome email with credentials
    const emailSent = await sendWelcomeEmail({
      to: student.email,
      studentName: student.studentName,
      registrationId: registrationId,
      password: password  // Send DOB password
    });

    if (!emailSent) {
      console.error(`Failed to send welcome email to ${student.email}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Admission completed successfully!',
      data: {
        registrationId,
        studentName: student.studentName,
        email: student.email,
        password,  // DOB-based password
        standard: student.standard
      }
    });

  } catch (error: any) {
    console.error('Admission Payment Verify Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error processing admission payment'
    }, { status: 500 });
  }
}
