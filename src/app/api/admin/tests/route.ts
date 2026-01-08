import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Test from '@/models/Test';
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
    const classFilter = searchParams.get('class');
    const status = searchParams.get('status');

    // Build query
    const query: any = {};
    
    if (classFilter) {
      query.class = classFilter;
    }

    if (status) {
      query.status = status;
    }

    const tests = await Test.find(query)
      .sort({ testDate: -1 });

    return NextResponse.json({
      success: true,
      data: tests
    });

  } catch (error: any) {
    console.error('Admin Tests Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching tests'
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
    const {
      title,
      subject,
      class: testClass,
      testDate,
      duration,
      totalMarks,
      passingMarks,
      questions,
      instructions
    } = body;

    // Validate required fields
    if (!title || !subject || !testClass || !testDate || !duration || !totalMarks || !passingMarks) {
      return NextResponse.json({
        success: false,
        message: 'All required fields must be filled'
      }, { status: 400 });
    }

    const test = await Test.create({
      title,
      subject,
      class: testClass,
      testDate,
      duration,
      totalMarks,
      passingMarks,
      questions: questions || [],
      instructions: instructions || '',
      status: 'scheduled',
      createdBy: decoded.admin._id
    });

    return NextResponse.json({
      success: true,
      message: 'Test created successfully',
      data: test
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create Test Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error creating test'
    }, { status: 500 });
  }
}
