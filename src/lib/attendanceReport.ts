export interface StudentAttendanceSummary {
  studentId: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  isEligibleForExams: boolean;
}

export function evaluateAttendance(totalClasses: number, attendedClasses: number, thresholdPercent = 75): StudentAttendanceSummary {
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
  return {
    studentId: '',
    totalClasses,
    attendedClasses,
    percentage,
    isEligibleForExams: percentage >= thresholdPercent
  };
}
