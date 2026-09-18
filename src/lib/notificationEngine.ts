export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'reminder' | 'grade' | 'fee';
  timestamp: string;
  read: boolean;
}

export function createNotification(title: string, message: string, type: AppNotification['type']): AppNotification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title,
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };
}
