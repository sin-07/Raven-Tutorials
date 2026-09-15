import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFee extends Document {
  studentId: mongoose.Types.ObjectId;
  registrationId: string;
  studentName: string;
  standard: string;
  month: string; // e.g. "April 2026"
  tuitionFee: number;
  examFee: number;
  labFee: number;
  totalAmount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  receiptNumber?: string;
  paymentMode?: 'UPI' | 'Card' | 'Cash' | 'Online';
  transactionId?: string;
  remarks?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const feeSchema = new Schema<IFee>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Admission',
      required: true,
      index: true,
    },
    registrationId: {
      type: String,
      required: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    standard: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    tuitionFee: {
      type: Number,
      required: true,
      min: 0,
    },
    examFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    labFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending',
      index: true,
    },
    receiptNumber: {
      type: String,
      sparse: true,
      index: true,
    },
    paymentMode: {
      type: String,
      enum: ['UPI', 'Card', 'Cash', 'Online'],
    },
    transactionId: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

feeSchema.index({ studentId: 1, month: 1 }, { unique: true });
feeSchema.index({ standard: 1, status: 1 });

const Fee: Model<IFee> = mongoose.models.Fee || mongoose.model<IFee>('Fee', feeSchema);

export default Fee;
