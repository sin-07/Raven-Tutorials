import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from './auth';
import connectDB from './database';

// Type definitions
export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthResult {
  admin: AdminUser | null;
  error: NextResponse | null;
}

// Reusable admin authentication function
export async function authenticateAdmin(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return {
        admin: null,
        error: NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        )
      };
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded.success || !decoded.admin) {
      return {
        admin: null,
        error: NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        )
      };
    }

    await connectDB();

    return {
      admin: decoded.admin as unknown as AdminUser,
      error: null
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      admin: null,
      error: NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 500 }
      )
    };
  }
}

// Standard error response helper
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

// Standard success response helper
export function successResponse(data: object, status: number = 200) {
  return NextResponse.json(
    { success: true, ...data },
    { status }
  );
}
