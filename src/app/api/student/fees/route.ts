import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Fee from '@/models/Fee';
import Admission from '@/models/Admission';

const JWT_SECRET = process.env.JWT_SECRET || 'raven-tutorials-secret-key-production-change';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || cookieStore.get('studentToken')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not logged in' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const studentId = decoded.studentId || decoded.id;

    if (!studentId) {
      return NextResponse.json({ success: false, message: 'Invalid session' }, { status: 401 });
    }

    await connectDB();

    const student = await Admission.findById(studentId).lean();
    if (!student) {
      return NextResponse.json({ success: false, message: 'Student record not found' }, { status: 404 });
    }

    // Auto mark overdue
    const now = new Date();
    await Fee.updateMany(
      { studentId: student._id, status: 'pending', dueDate: { $lt: now } },
      { $set: { status: 'overdue' } }
    );

    const fees = await Fee.find({ studentId: student._id }).sort({ dueDate: -1 }).lean();

    const pendingFees = fees.filter((f) => f.status === 'pending' || f.status === 'overdue');
    const paidFees = fees.filter((f) => f.status === 'paid');

    const totalPendingAmount = pendingFees.reduce((sum, f) => sum + f.totalAmount, 0);
    const totalPaidAmount = paidFees.reduce((sum, f) => sum + f.totalAmount, 0);

    return NextResponse.json({
      success: true,
      fees,
      pendingFees,
      paidFees,
      summary: {
        totalPendingAmount,
        totalPaidAmount,
        pendingCount: pendingFees.length,
        hasOverdue: pendingFees.some((f) => f.status === 'overdue'),
      },
      student: {
        name: student.studentName,
        registrationId: student.registrationId,
        standard: student.standard,
        email: student.email,
        phone: student.phoneNumber,
        address: student.address,
      },
    });
  } catch (error: any) {
    console.error('Student fees error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
