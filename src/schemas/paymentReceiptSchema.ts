export interface PaymentReceiptInput {
  transactionId: string;
  studentId: string;
  amount: number;
  paymentMode: 'upi' | 'card' | 'netbanking' | 'cash';
  timestamp: string;
}

export function validatePaymentReceipt(data: Partial<PaymentReceiptInput>): boolean {
  return Boolean(data.transactionId && data.studentId && data.amount && data.amount > 0);
}
