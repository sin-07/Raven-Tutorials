import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmission extends Document {
  registrationId?: string;
  password?: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'Other';
  phoneNumber: string;
  alternatePhoneNumber?: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  standard: string;
  previousSchool: string;
  photo?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentAmount?: number;
  paymentId?: string;
  orderId?: string;
  isPendingPayment?: boolean;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const admissionSchema = new Schema<IAdmission>({
  registrationId: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['General', 'OBC', 'SC', 'ST', 'Other']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  alternatePhoneNumber: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
  },
  standard: {
    type: String,
    required: [true, 'Standard is required'],
    enum: ['6th', '7th', '8th', '9th', '10th', '11th', '12th']
  },
  previousSchool: {
    type: String,
    required: [true, 'Previous school is required'],
    trim: true
  },
  photo: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number
  },
  paymentId: {
    type: String
  },
  orderId: {
    type: String
  },
  isPendingPayment: {
    type: Boolean,
    default: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Admission: Model<IAdmission> = mongoose.models.Admission || mongoose.model<IAdmission>('Admission', admissionSchema);

export default Admission;
