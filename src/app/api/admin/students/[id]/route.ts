import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Admission from '@/models/Admission';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const decoded = verifyAdminToken(token);
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const student = await Admission.findById(id).select('-password -otp -otpExpiry');

    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: student
    });

  } catch (error: any) {
    console.error('Get Student Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching student'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const decoded = verifyAdminToken(token);
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const student = await Admission.findByIdAndDelete(id);

    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete Student Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error deleting student'
    }, { status: 500 });
  }
}
