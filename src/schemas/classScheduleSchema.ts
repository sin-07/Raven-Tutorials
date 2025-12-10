export interface ClassScheduleInput {
  batchId: string;
  dayOfWeek: number;
  subjectName: string;
  tutorName: string;
  roomNumber: string;
  startTime: string;
  endTime: string;
}

export function validateClassSchedule(data: Partial<ClassScheduleInput>): boolean {
  return Boolean(data.batchId && data.subjectName && data.startTime && data.endTime);
}
