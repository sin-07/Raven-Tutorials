export interface TutorApplicationInput {
  name: string;
  email: string;
  subjectSpecialization: string;
  yearsOfExperience: number;
  highestDegree: string;
}

export function validateTutorApplication(data: Partial<TutorApplicationInput>): boolean {
  return Boolean(data.name && data.email && data.subjectSpecialization && data.yearsOfExperience !== undefined);
}
