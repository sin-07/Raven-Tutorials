export interface ExamResultInput {
  studentId: string;
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  examDate: string;
}

export function validateExamResult(data: Partial<ExamResultInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.studentId) errors.studentId = 'Student ID required';
  if (!data.subject) errors.subject = 'Subject required';
  if (data.obtainedMarks === undefined || data.obtainedMarks < 0) errors.obtainedMarks = 'Marks must be positive';
  if (data.totalMarks && data.obtainedMarks && data.obtainedMarks > data.totalMarks) errors.obtainedMarks = 'Cannot exceed total marks';
  return { isValid: Object.keys(errors).length === 0, errors };
}
