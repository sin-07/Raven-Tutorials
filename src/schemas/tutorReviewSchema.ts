export interface TutorReviewInput {
  tutorId: string;
  studentId?: string;
  pedagogyRating: number;
  doubtClearingRating: number;
  overallRating: number;
  reviewText: string;
}

export function validateTutorReview(data: Partial<TutorReviewInput>): boolean {
  return Boolean(data.tutorId && data.overallRating && data.overallRating >= 1 && data.overallRating <= 5);
}
