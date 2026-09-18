export interface CertificatePayload {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  grade: string;
}

export function generateCertificateId(studentId: string, courseId: string): string {
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RAVEN-CERT-${studentId.slice(-4)}-${courseId.slice(-3)}-${hash}`;
}
