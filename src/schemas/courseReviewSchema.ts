export interface CourseReviewInput {
  reviewTitle: string;
  rating: number;
  pros: string;
  cons?: string;
  batchYear: number;
  recommend: boolean;
}

export function validateCourseReview(data: Partial<CourseReviewInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.reviewTitle || data.reviewTitle.trim().length < 3) errors.reviewTitle = 'Review title is required';
  if (!data.rating || data.rating < 1 || data.rating > 5) errors.rating = 'Rating must be 1 to 5';
  if (!data.pros || data.pros.trim().length < 5) errors.pros = 'Please share positive feedback';
  return { isValid: Object.keys(errors).length === 0, errors };
}
