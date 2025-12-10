export interface SupportTicketInput {
  studentEmail: string;
  issueCategory: 'portal' | 'billing' | 'attendance' | 'schedule';
  description: string;
  priority: 'low' | 'normal' | 'urgent';
}

export function validateSupportTicket(data: Partial<SupportTicketInput>): boolean {
  return Boolean(data.studentEmail && data.issueCategory && data.description);
}
