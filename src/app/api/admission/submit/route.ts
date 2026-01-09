import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import TempAdmission from '@/models/TempAdmission';
import Admission from '@/models/Admission';
import Student from '@/models/Student';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
import { sendOTPEmail } from '@/lib/email';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Generate 6-digit OTP
const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function POST(request: NextRequest) {
  // Wrap everything in try-catch to prevent process crashes
  let response;
  
  try {
    response = await handleAdmissionSubmit(request);
  } catch (criticalError: any) {
    console.error('CRITICAL ERROR - Process crash prevented:', criticalError);
    return NextResponse.json({
      success: false,
      message: 'A critical server error occurred. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? criticalError.message : undefined
    }, { status: 500 });
  }
  
  return response;
}

async function handleAdmissionSubmit(request: NextRequest) {
  try {
    // Configure Cloudinary inside the function to ensure env vars are loaded
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Check if environment variables are set
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not set');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: Database not configured'
      }, { status: 500 });
    }
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables are not set');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: File upload not configured'
      }, { status: 500 });
    }

    // Connect to database with error handling
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({
        success: false,
        message: 'Database connection failed. Please try again.'
      }, { status: 500 });
    }
    
    let formData;
    try {
      formData = await request.formData();
    } catch (formError: any) {
      console.error('Form data parsing error:', formError);
      return NextResponse.json({
        success: false,
        message: 'Invalid form data. Please refresh and try again.'
      }, { status: 400 });
    }
    
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

    // Debug: Log all received fields
    console.log('Received form data:', {
      studentName, fatherName, motherName, dateOfBirth, gender,
      bloodGroup, category, phoneNumber, alternatePhoneNumber,
      email, address, city, state, pincode, standard, previousSchool,
      hasPhoto: !!photo
    });

    // Validate required fields
    const missingFields = [];
    if (!studentName) missingFields.push('studentName');
    if (!fatherName) missingFields.push('fatherName');
    if (!motherName) missingFields.push('motherName');
    if (!dateOfBirth) missingFields.push('dateOfBirth');
    if (!gender) missingFields.push('gender');
    if (!bloodGroup) missingFields.push('bloodGroup');
    if (!category) missingFields.push('category');
    if (!phoneNumber) missingFields.push('phoneNumber');
    if (!email) missingFields.push('email');
    if (!address) missingFields.push('address');
    if (!city) missingFields.push('city');
    if (!state) missingFields.push('state');
    if (!pincode) missingFields.push('pincode');
    if (!standard) missingFields.push('standard');
    if (!previousSchool) missingFields.push('previousSchool');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Check if email already exists in permanent admissions or students
    const existingAdmission = await Admission.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    const existingStudent = await Student.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingAdmission || existingStudent) {
      return NextResponse.json({
        success: false,
        message: 'This email is already registered. Please use a different email address or login if you already have an account.'
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
      try {
        console.log('Starting Cloudinary upload...', {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          hasApiKey: !!process.env.CLOUDINARY_API_KEY,
          hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
          photoSize: photo.size,
          photoType: photo.type
        });

        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        console.log('Photo converted to buffer, size:', buffer.length);
        
        const result = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { 
              folder: 'raven-tutorials/students',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary callback error:', error);
                // Convert object to Error if needed
                const errorMessage = typeof error === 'object' ? JSON.stringify(error) : String(error);
                reject(new Error(`Cloudinary upload failed: ${errorMessage}`));
              } else {
                console.log('Cloudinary upload successful:', result?.secure_url);
                resolve(result);
              }
            }
          );
          
          uploadStream.end(buffer);
        });
        
        photoUrl = result?.secure_url;
        
        if (!photoUrl) {
          console.error('No secure_url in Cloudinary result:', result);
          return NextResponse.json({
            success: false,
            message: 'Failed to upload photo. Please try again.'
          }, { status: 500 });
        }
      } catch (uploadError: any) {
        console.error('Cloudinary upload error FULL:', {
          message: uploadError.message,
          stack: uploadError.stack,
          error: uploadError
        });
        return NextResponse.json({
          success: false,
          message: `Failed to upload photo: ${uploadError.message || 'Unknown error'}`,
          error: process.env.NODE_ENV === 'development' ? uploadError.message : undefined
        }, { status: 500 });
      }
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
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours for temp admission

    // Store in temporary collection
    let tempAdmission;
    try {
      tempAdmission = await TempAdmission.create({
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
        otp,
        otpExpiry,
        expiresAt
      });
    } catch (dbSaveError: any) {
      console.error('Failed to save temp admission:', dbSaveError);
      return NextResponse.json({
        success: false,
        message: 'Failed to save admission data. Please try again.'
      }, { status: 500 });
    }

    // Send OTP email using Brevo
    try {
      const emailSent = await sendOTPEmail({
        to: email.toLowerCase().trim(),
        studentName,
        otp
      });

      if (!emailSent) {
        console.error(`Failed to send OTP email to ${email}`);
      }
    } catch (emailError: any) {
      console.error('Email sending error (non-critical):', emailError);
      // Continue anyway - OTP is saved in database
    }

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
    console.error('Error stack:', error.stack);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error submitting admission form',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
