import { NextResponse } from 'next/server';
import { rsatQuestionBank } from '@/constants/rsatQuestions';

export async function GET() {
  // Strip correctAnswer when sending to client
  const clientQuestions = rsatQuestionBank.map(({ id, subject, question, options }) => ({
    id,
    subject,
    question,
    options,
  }));

  return NextResponse.json({
    success: true,
    totalQuestions: clientQuestions.length,
    durationMinutes: 15,
    questions: clientQuestions,
  });
}
