import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import ScholarshipLead from '@/models/ScholarshipLead';
import { rsatQuestionBank } from '@/constants/rsatQuestions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, phoneNumber, email, standard, targetExam, answers } = body;

    if (!studentName || !phoneNumber || !email || !standard || !targetExam) {
      return NextResponse.json(
        { success: false, message: 'Please provide all registration details.' },
        { status: 400 }
      );
    }

    // Evaluate answers
    let score = 0;
    const answerReview: Array<{
      questionId: number;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      subject: string;
    }> = [];

    rsatQuestionBank.forEach((q) => {
      const selected = answers ? answers[q.id] : null;
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) score += 1;

      answerReview.push({
        questionId: q.id,
        selectedAnswer: selected || 'Unanswered',
        correctAnswer: q.correctAnswer,
        isCorrect,
        subject: q.subject,
      });
    });

    const totalQuestions = rsatQuestionBank.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Scholarship Tier & Coupon
    let discountPercent = 10;
    let scholarshipTier = '10% Welcome Scholarship';
    let baseCoupon = 'RAVEN-WELCOME-10';

    if (percentage >= 90) {
      discountPercent = 50;
      scholarshipTier = '50% Mega Merit Scholarship';
      baseCoupon = 'RAVEN-SCHOLAR-50';
    } else if (percentage >= 75) {
      discountPercent = 30;
      scholarshipTier = '30% Distinction Scholarship';
      baseCoupon = 'RAVEN-SCHOLAR-30';
    } else if (percentage >= 50) {
      discountPercent = 15;
      scholarshipTier = '15% Achiever Scholarship';
      baseCoupon = 'RAVEN-SCHOLAR-15';
    }

    const uniqueCodeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const couponCode = `${baseCoupon}-${uniqueCodeSuffix}`;

    await connectDB();

    const lead = await ScholarshipLead.create({
      studentName,
      phoneNumber,
      email,
      standard,
      targetExam,
      score,
      totalQuestions,
      percentage,
      scholarshipTier,
      discountPercent,
      couponCode,
      answers: answerReview.map((r) => ({
        questionId: r.questionId,
        selectedAnswer: r.selectedAnswer,
        isCorrect: r.isCorrect,
      })),
    });

    return NextResponse.json({
      success: true,
      message: 'Test submitted and scholarship awarded!',
      result: {
        id: lead._id,
        studentName,
        standard,
        targetExam,
        score,
        totalQuestions,
        percentage,
        scholarshipTier,
        discountPercent,
        couponCode,
        evaluatedAt: lead.createdAt,
        review: answerReview,
      },
    });
  } catch (error: any) {
    console.error('RSAT submit error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Submission failed' },
      { status: 500 }
    );
  }
}
