import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Admission from '@/models/Admission';
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

    // Get query params
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const classFilter = searchParams.get('class');
    const paymentStatus = searchParams.get('paymentStatus');

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } }
      ];
    }

    if (classFilter) {
      query.standard = classFilter;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const students = await Admission.find(query)
      .sort({ createdAt: -1 })
      .select('-password -otp -otpExpiry');

    return NextResponse.json({
      success: true,
      data: students
    });

  } catch (error: any) {
    console.error('Admin Students Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching students'
    }, { status: 500 });
  }
}
