import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/database';
import Admin from '@/models/Admin';
import Admission from '@/models/Admission';
import Test from '@/models/Test';
import Attendance from '@/models/Attendance';
import TeacherApplication from '@/models/TeacherApplication';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required'
      }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'raven-tutorials-secret-key'
    ) as { id: string };

    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      console.error('❌ No admin found in request');
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required'
      }, { status: 401 });
    }

    console.log('📊 Fetching dashboard stats for admin:', admin.email);

    console.log('🔍 Counting students...');
    // Get counts with error handling for each query
    const totalStudents = await Admission.countDocuments({ 
      paymentStatus: 'completed' 
    }).catch(err => {
      console.error('❌ Error counting students:', err.message);
      return 0;
    });
    
    console.log('🔍 Counting tests...');
    const totalTests = await Test.countDocuments().catch(err => {
      console.error('❌ Error counting tests:', err.message);
      return 0;
    });
    
    console.log('🔍 Counting recent admissions...');
    // Get recent admissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentAdmissions = await Admission.countDocuments({
      paymentDate: { $gte: sevenDaysAgo },
      paymentStatus: 'completed'
    }).catch(err => {
      console.error('❌ Error counting recent admissions:', err.message);
      return 0;
    });

    console.log('🔍 Counting today\'s attendance...');
    // Get today's attendance count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today }
    }).catch(err => {
      console.error('❌ Error counting attendance:', err.message);
      return 0;
    });

    console.log('🔍 Fetching upcoming tests...');
    // Get upcoming tests
    const upcomingTests = await Test.find({
      testDate: { $gte: new Date() },
      status: 'Published'
    }).limit(5).select('title testDate class subject status').lean().catch(err => {
      console.error('❌ Error fetching upcoming tests:', err.message);
      return [];
    });

    console.log('🔍 Fetching teacher application stats...');
    // Get teacher application stats
    const totalTeacherApplications = await TeacherApplication.countDocuments().catch(err => {
      console.error('❌ Error counting teacher applications:', err.message);
      return 0;
    });
    const pendingTeacherApplications = await TeacherApplication.countDocuments({ status: 'pending' }).catch(err => {
      console.error('❌ Error counting pending teacher apps:', err.message);
      return 0;
    });
    const approvedTeacherApplications = await TeacherApplication.countDocuments({ status: 'approved' }).catch(err => {
      console.error('❌ Error counting approved teacher apps:', err.message);
      return 0;
    });
    const rejectedTeacherApplications = await TeacherApplication.countDocuments({ status: 'rejected' }).catch(err => {
      console.error('❌ Error counting rejected teacher apps:', err.message);
      return 0;
    });

    // Get recent teacher applications (latest 5)
    const recentTeacherApplications = await TeacherApplication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone subjects status createdAt')
      .lean()
      .catch(err => {
        console.error('❌ Error fetching recent teacher applications:', err.message);
        return [];
      });

    console.log('✅ Dashboard stats fetched successfully');
    console.log('📈 Stats:', { totalStudents, totalTests, recentAdmissions, todayAttendance, upcomingTestsCount: upcomingTests.length, totalTeacherApplications });

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalTests,
          recentAdmissions,
          todayAttendance,
          totalTeacherApplications,
          pendingTeacherApplications,
          approvedTeacherApplications,
          rejectedTeacherApplications
        },
        upcomingTests,
        recentTeacherApplications
      }
    });

  } catch (error: any) {
    console.error('❌ Dashboard stats error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
