export interface AttendanceSummary {
  totalClasses: number;
  attended: number;
  percentage: number;
  isEligibleForExam: boolean;
  streakDays: number;
}

export function generateAttendanceSummary(records: { status: 'present' | 'absent' | 'leave' }[]): AttendanceSummary {
  const total = records.length;
  const attended = records.filter(r => r.status === 'present').length;
  const percentage = total > 0 ? (attended / total) * 100 : 0;

  let streak = 0;
  for (let i = records.length - 1; i >= 0; i--) {
    if (records[i].status === 'present') streak++;
    else break;
  }

  return {
    totalClasses: total,
    attended,
    percentage: Math.round(percentage * 10) / 10,
    isEligibleForExam: percentage >= 75,
    streakDays: streak
  };
}
