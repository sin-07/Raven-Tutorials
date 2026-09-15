import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Fee from '@/models/Fee';
import { verifyAdminToken } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'raven-tutorials-secret-key-production-change';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const feeId = params.id;

    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    const studentToken = cookieStore.get('token')?.value || cookieStore.get('studentToken')?.value;

    let isAdmin = false;
    let studentId: string | null = null;

    if (adminToken) {
      const auth = await verifyAdminToken(adminToken);
      if (auth.success) isAdmin = true;
    }

    if (!isAdmin && studentToken) {
      try {
        const decoded = jwt.verify(studentToken, JWT_SECRET) as any;
        studentId = decoded.studentId || decoded.id;
      } catch {
        // Invalid student token
      }
    }

    if (!isAdmin && !studentId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const fee = await Fee.findById(feeId);
    if (!fee) {
      return NextResponse.json({ success: false, message: 'Fee record not found' }, { status: 404 });
    }

    // If student, ensure they only pay their own fee
    if (!isAdmin && fee.studentId.toString() !== studentId) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const { paymentMode = 'UPI', transactionId } = body;

    // Generate unique official Receipt Number
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = fee.receiptNumber || `RT-RCP-${yearMonth}-${randomSeq}`;

    fee.status = 'paid';
    fee.paidDate = now;
    fee.paymentMode = paymentMode;
    fee.receiptNumber = receiptNumber;
    fee.transactionId = transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    await fee.save();

    return NextResponse.json({
      success: true,
      message: 'Payment recorded successfully! Receipt generated.',
      fee,
    });
  } catch (error: any) {
    console.error('Pay fee error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
