import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Test from '@/models/Test';
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

    const test = await Test.findById(id);

    if (!test) {
      return NextResponse.json({
        success: false,
        message: 'Test not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: test
    });

  } catch (error: any) {
    console.error('Get Test Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching test'
    }, { status: 500 });
  }
}

export async function PUT(
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
    const body = await request.json();

    const test = await Test.findByIdAndUpdate(id, body, { new: true });

    if (!test) {
      return NextResponse.json({
        success: false,
        message: 'Test not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Test updated successfully',
      data: test
    });

  } catch (error: any) {
    console.error('Update Test Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error updating test'
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

    const test = await Test.findByIdAndDelete(id);

    if (!test) {
      return NextResponse.json({
        success: false,
        message: 'Test not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Test deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete Test Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error deleting test'
    }, { status: 500 });
  }
}

export async function PATCH(
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
    const body = await request.json();

    // Only allow status updates via PATCH
    const updateData: { status?: string } = {};
    if (body.status) {
      updateData.status = body.status;
    }

    const test = await Test.findByIdAndUpdate(id, updateData, { new: true });

    if (!test) {
      return NextResponse.json({
        success: false,
        message: 'Test not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Test status updated successfully',
      data: test
    });

  } catch (error: any) {
    console.error('Patch Test Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error updating test status'
    }, { status: 500 });
  }
}
