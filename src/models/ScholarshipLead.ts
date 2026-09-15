import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IScholarshipLead extends Document {
  studentName: string;
  phoneNumber: string;
  email: string;
  standard: string;
  targetExam: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  scholarshipTier: string;
  discountPercent: number;
  couponCode: string;
  status: 'pending' | 'contacted' | 'enrolled';
  answers?: Array<{
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const scholarshipLeadSchema = new Schema<IScholarshipLead>(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    standard: {
      type: String,
      required: true,
    },
    targetExam: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      default: 20,
    },
    percentage: {
      type: Number,
      required: true,
    },
    scholarshipTier: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'enrolled'],
      default: 'pending',
    },
    answers: [
      {
        questionId: Number,
        selectedAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

scholarshipLeadSchema.index({ createdAt: -1 });

const ScholarshipLead: Model<IScholarshipLead> =
  mongoose.models.ScholarshipLead ||
  mongoose.model<IScholarshipLead>('ScholarshipLead', scholarshipLeadSchema);

export default ScholarshipLead;
