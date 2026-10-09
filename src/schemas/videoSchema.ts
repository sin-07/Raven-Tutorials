export interface VideoMetadata {
  title: string;
  videoUrl: string;
  standard: string;
  subject: string;
  duration?: number;
}

export function validateVideo(data: Partial<VideoMetadata>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.title?.trim()) errors.title = 'Title is required';
  if (!data.videoUrl?.trim()) errors.videoUrl = 'Video URL is required';
  if (!data.standard) errors.standard = 'Standard is required';
  if (!data.subject) errors.subject = 'Subject is required';
  return errors;
}
