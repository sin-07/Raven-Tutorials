import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Fee from '@/models/Fee';
import Admission from '@/models/Admission';
import { verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    const auth = await verifyAdminToken(token);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const standard = searchParams.get('standard');
    const status = searchParams.get('status');
    const month = searchParams.get('month');
    const search = searchParams.get('search');

    const query: any = {};
    if (standard && standard !== 'All') query.standard = standard;
    if (status && status !== 'All') query.status = status;
    if (month && month !== 'All') query.month = month;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { receiptNumber: { $regex: search, $options: 'i' } },
      ];
    }

    // Auto update overdue fees
    const now = new Date();
    await Fee.updateMany(
      { status: 'pending', dueDate: { $lt: now } },
      { $set: { status: 'overdue' } }
    );

    const fees = await Fee.find(query).sort({ createdAt: -1 }).lean();

    // Summary KPIs
    const allFees = await Fee.find({}).lean();
    let totalCollected = 0;
    let totalPending = 0;
    let overdueCount = 0;

    allFees.forEach((f) => {
      if (f.status === 'paid') {
        totalCollected += f.totalAmount;
      } else {
        totalPending += f.totalAmount;
        if (f.status === 'overdue' || new Date(f.dueDate) < now) {
          overdueCount++;
        }
      }
    });

    return NextResponse.json({
      success: true,
      fees,
      metrics: {
        totalCollected,
        totalPending,
        overdueCount,
        totalRecords: allFees.length,
      },
    });
  } catch (error: any) {
    console.error('Fetch fees error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const auth = await verifyAdminToken(token);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { mode, standard, studentId, month, tuitionFee, examFee = 0, labFee = 0, dueDate, remarks } = body;

    if (!month || !dueDate || tuitionFee === undefined) {
      return NextResponse.json(
        { success: false, message: 'Month, Due Date, and Tuition Fee are required' },
        { status: 400 }
      );
    }

    const totalAmount = Number(tuitionFee) + Number(examFee || 0) + Number(labFee || 0);

    if (mode === 'batch') {
      // Create fee dues for all active students in the selected standard
      const studentQuery: any = { paymentStatus: 'completed' };
      if (standard && standard !== 'All') {
        studentQuery.standard = standard;
      }

      const students = await Admission.find(studentQuery).select('_id studentName standard registrationId').lean();

      if (!students.length) {
        return NextResponse.json(
          { success: false, message: 'No enrolled students found for this standard' },
          { status: 404 }
        );
      }

      let createdCount = 0;
      for (const st of students) {
        try {
          await Fee.create({
            studentId: st._id,
            registrationId: st.registrationId || `RT-${st._id.toString().slice(-6).toUpperCase()}`,
            studentName: st.studentName,
            standard: st.standard,
            month,
            tuitionFee: Number(tuitionFee),
            examFee: Number(examFee || 0),
            labFee: Number(labFee || 0),
            totalAmount,
            dueDate: new Date(dueDate),
            status: new Date(dueDate) < new Date() ? 'overdue' : 'pending',
            remarks: remarks || '',
          });
          createdCount++;
        } catch {
          // Ignore duplicate month entries
        }
      }

      return NextResponse.json({
        success: true,
        message: `Generated monthly fee records for ${createdCount} students.`,
        createdCount,
      });
    } else {
      // Single student
      const student = await Admission.findById(studentId).lean();
      if (!student) {
        return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
      }

      const newFee = await Fee.create({
        studentId: student._id,
        registrationId: student.registrationId || `RT-${student._id.toString().slice(-6).toUpperCase()}`,
        studentName: student.studentName,
        standard: student.standard,
        month,
        tuitionFee: Number(tuitionFee),
        examFee: Number(examFee || 0),
        labFee: Number(labFee || 0),
        totalAmount,
        dueDate: new Date(dueDate),
        status: new Date(dueDate) < new Date() ? 'overdue' : 'pending',
        remarks: remarks || '',
      });

      return NextResponse.json({
        success: true,
        message: 'Fee demand created successfully',
        fee: newFee,
      });
    }
  } catch (error: any) {
    console.error('Create fee error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create fee demand' },
      { status: 500 }
    );
  }
}
