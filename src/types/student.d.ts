export interface StudentCredential {
  registrationId: string;
  name: string;
  course: string;
  batch: string;
  rollNumber: string;
  bloodGroup?: string;
  validUpto: string;
  avatarUrl?: string;
  qrPayload: string;
}

export interface AcademicRecord {
  testId: string;
  testName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentile: number;
  conductedOn: string;
}
