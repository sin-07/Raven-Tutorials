import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import StudyMaterial from '@/models/StudyMaterial';
import Admission from '@/models/Admission';
import { verifyStudentToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyStudentToken(token);
    
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    await connectDB();

    // Get student
    const student = await Admission.findById(decoded.studentId);
    if (!student) {
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Get study materials for this student's class
    const materials = await StudyMaterial.find({
      class: student.standard
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: materials
    });

  } catch (error: any) {
    console.error('Study Materials Error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching study materials'
    }, { status: 500 });
  }
}
