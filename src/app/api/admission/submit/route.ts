import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import TempAdmission from '@/models/TempAdmission';
import Admission from '@/models/Admission';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate 6-digit OTP
const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    
    const studentName = formData.get('studentName') as string;
    const fatherName = formData.get('fatherName') as string;
    const motherName = formData.get('motherName') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const gender = formData.get('gender') as string;
    const bloodGroup = formData.get('bloodGroup') as string;
    const category = formData.get('category') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const alternatePhoneNumber = formData.get('alternatePhoneNumber') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const pincode = formData.get('pincode') as string;
    const standard = formData.get('standard') as string;
    const previousSchool = formData.get('previousSchool') as string;
    const photo = formData.get('photo') as File;

    // Validate required fields
    if (!studentName || !fatherName || !motherName || !dateOfBirth || 
        !gender || !bloodGroup || !category || !phoneNumber || 
        !email || !address || !city || !state || !pincode || 
        !standard || !previousSchool) {
      return NextResponse.json({
        success: false,
        message: 'All required fields must be filled'
      }, { status: 400 });
    }

    // Check if email already exists in permanent admissions
    const existingAdmission = await Admission.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingAdmission) {
      return NextResponse.json({
        success: false,
        message: 'This email is already registered. Please use a different email address or contact support.'
      }, { status: 400 });
    }

    // Delete any existing temp admission for this email
    await TempAdmission.deleteOne({ 
      email: email.toLowerCase().trim() 
    });

    // Clean up expired temp admissions
    await TempAdmission.deleteMany({ 
      expiresAt: { $lte: new Date() } 
    });

    // Upload photo to Cloudinary
    let photoUrl = null;
    if (photo) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'raven-tutorials/students' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      
      photoUrl = result.secure_url;
    } else {
      return NextResponse.json({
        success: false,
        message: 'Student photo is required'
      }, { status: 400 });
    }

    // Get admission fee from environment
    const admissionFee = parseInt(process.env.ADMISSION_FEE || '1000');

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in temporary collection
    const tempAdmission = await TempAdmission.create({
      studentName,
      fatherName,
      motherName,
      dateOfBirth,
      gender,
      bloodGroup,
      category,
      phoneNumber,
      alternatePhoneNumber,
      email: email.toLowerCase().trim(),
      address,
      city,
      state,
      pincode,
      standard,
      previousSchool,
      photo: photoUrl,
      paymentAmount: admissionFee,
      otp,
      otpExpiry
    });

    // TODO: Send OTP email (implement email service)
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email. Please verify to continue.',
      data: {
        tempAdmissionId: tempAdmission._id,
        studentName: tempAdmission.studentName,
        email: tempAdmission.email,
        amount: admissionFee
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Submit Admission Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error submitting admission form'
    }, { status: 500 });
  }
}
