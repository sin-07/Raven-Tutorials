import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDatabase } from './database';
import Admin from '@/models/Admin';
import Admission from '@/models/Admission';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  id?: string;
  studentId?: string;
  email: string;
  registrationId?: string;
}

export async function verifyAdminToken(): Promise<{ success: boolean; admin?: { _id: string; email: string; name: string; role: string } }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return { success: false };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    await connectDatabase();
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || !admin.isActive) {
      return { success: false };
    }

    return {
      success: true,
      admin: {
        _id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    };
  } catch {
    return { success: false };
  }
}

export async function verifyStudentToken(): Promise<{ success: boolean; student?: { _id: string; email: string; registrationId: string; studentName: string; standard: string } }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('studentToken')?.value;

    if (!token) {
      return { success: false };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    await connectDatabase();
    const student = await Admission.findById(decoded.studentId);

    if (!student || student.paymentStatus !== 'completed') {
      return { success: false };
    }

    return {
      success: true,
      student: {
        _id: student._id.toString(),
        email: student.email,
        registrationId: student.registrationId || '',
        studentName: student.studentName,
        standard: student.standard
      }
    };
  } catch {
    return { success: false };
  }
}

export function generateAdminToken(adminId: string, email: string): string {
  return jwt.sign(
    { id: adminId, email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function generateStudentToken(studentId: string, email: string, registrationId: string): string {
  return jwt.sign(
    { studentId, email, registrationId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function setAdminCookie(token: string): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: 'adminToken',
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/'
    }
  };
}

export function setStudentCookie(token: string): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: 'studentToken',
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/'
    }
  };
}
