import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion {
  questionText: string;
  questionType: 'MCQ' | 'Short Answer' | 'Long Answer' | 'True/False';
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface ITestResult {
  studentId: mongoose.Types.ObjectId;
  marksObtained: number;
  status: 'Pass' | 'Fail' | 'Absent';
  submittedAt?: Date;
  answers?: Array<{
    questionId: string;
    answer: string;
    marksAwarded: number;
  }>;
  violations?: Array<{
    violationType: string;
    timestamp: Date;
    question: number;
  }>;
  timeSpent?: number;
}

export interface ITest extends Document {
  title: string;
  description?: string;
  section?: mongoose.Types.ObjectId;
  class: '9th standard' | '10th standard' | '11th standard' | '12th standard';
  subject: string;
  testDate: Date;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: IQuestion[];
  results?: ITestResult[];
  status: 'Draft' | 'Published' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new Schema<ITest>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section'
  },
  class: {
    type: String,
    enum: ['9th standard', '10th standard', '11th standard', '12th standard'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  testDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  passingMarks: {
    type: Number,
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['MCQ', 'Short Answer', 'Long Answer', 'True/False'],
      required: true
    },
    options: [{
      type: String
    }],
    correctAnswer: {
      type: String
    },
    marks: {
      type: Number,
      required: true
    }
  }],
  results: [{
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Admission'
    },
    marksObtained: {
      type: Number
    },
    status: {
      type: String,
      enum: ['Pass', 'Fail', 'Absent'],
      default: 'Absent'
    },
    submittedAt: {
      type: Date
    },
    answers: [{
      questionId: String,
      answer: String,
      marksAwarded: Number
    }],
    violations: [{
      violationType: String,
      timestamp: Date,
      question: Number
    }],
    timeSpent: {
      type: Number,
      default: 0
    }
  }],
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Completed'],
    default: 'Draft'
  }
}, {
  timestamps: true
});

const Test: Model<ITest> = mongoose.models.Test || mongoose.model<ITest>('Test', testSchema);

export default Test;
