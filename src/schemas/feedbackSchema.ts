export interface StudentFeedbackInput {
  studentName: string;
  email: string;
  courseId: string;
  rating: number;
  comments: string;
  category?: 'curriculum' | 'faculty' | 'facilities' | 'general';
}

export function validateFeedback(data: Partial<StudentFeedbackInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.studentName || data.studentName.trim().length < 2) errors.studentName = 'Name must be at least 2 characters';
  if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = 'Valid email is required';
  if (!data.rating || data.rating < 1 || data.rating > 5) errors.rating = 'Rating must be between 1 and 5';
  if (!data.comments || data.comments.trim().length < 5) errors.comments = 'Comments must be at least 5 characters';
  return { isValid: Object.keys(errors).length === 0, errors };
}
