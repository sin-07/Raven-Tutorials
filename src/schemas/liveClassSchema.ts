export interface LiveClassInput {
  topic: string;
  tutorName: string;
  startTime: string;
  meetingLink: string;
  batchId: string;
}

export function validateLiveClass(data: Partial<LiveClassInput>): boolean {
  return Boolean(data.topic && data.tutorName && data.startTime && data.meetingLink);
}
