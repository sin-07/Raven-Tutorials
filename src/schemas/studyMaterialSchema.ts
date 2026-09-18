export interface StudyMaterialInput {
  title: string;
  standard: string;
  subject: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'video';
  fileSizeMb: number;
}

export function validateStudyMaterial(data: Partial<StudyMaterialInput>): boolean {
  return Boolean(data.title && data.standard && data.subject && data.fileUrl);
}
