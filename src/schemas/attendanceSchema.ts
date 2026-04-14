export interface AttendanceRecordInput {
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export function validateAttendance(data: Partial<AttendanceRecordInput>): boolean {
  return Boolean(data.studentId && data.classId && data.date && data.status);
}
