import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Admin from '@/models/Admin';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'No token provided'
      }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'raven-tutorials-secret-key'
    ) as { id: string };

    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Admin not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });

  } catch (error: any) {
    console.error('Admin verify error:', error);
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token'
    }, { status: 401 });
  }
}
