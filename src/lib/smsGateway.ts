export function formatAdmissionSms(studentName: string, regId: string): string {
  return `Dear ${studentName}, Welcome to Raven Tutorials! Your registration ID is ${regId}. Download your Student ID Card from the portal.`;
}

export function formatAttendanceAlertSms(studentName: string, date: string): string {
  return `Alert: ${studentName} was marked absent for scheduled lectures on ${date}. Contact student desk for details.`;
}
