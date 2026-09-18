export type AdmissionState = 'submitted' | 'under_review' | 'fees_pending' | 'enrolled' | 'rejected';

export function getNextAdmissionState(current: AdmissionState): AdmissionState {
  switch (current) {
    case 'submitted': return 'under_review';
    case 'under_review': return 'fees_pending';
    case 'fees_pending': return 'enrolled';
    default: return current;
  }
}
