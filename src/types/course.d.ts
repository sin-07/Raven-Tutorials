export interface CurriculumModule {
  id: string;
  title: string;
  durationHours: number;
  lectureCount: number;
  topics: string[];
  isLocked?: boolean;
}

export interface LectureSchedule {
  id: string;
  title: string;
  subject: string;
  tutorName: string;
  startTime: string;
  endTime: string;
  meetLink?: string;
  status: 'upcoming' | 'live' | 'completed';
}
