import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
  registrationId: string;
  password: string;
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
  paymentStatus: 'completed';
  paymentAmount: number;
  paymentId: string;
  orderId: string;
  admissionDate: Date;
  isActive: boolean;
  attendancePercentage?: number;
  totalClasses?: number;
  attendedClasses?: number;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
  registrationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
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
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
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
    required: [true, 'Standard is required']
  },
  previousSchool: {
    type: String,
    required: [true, 'Previous school name is required'],
    trim: true
  },
  photo: {
    type: String
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['completed'],
    default: 'completed'
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  attendancePercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalClasses: {
    type: Number,
    default: 0
  },
  attendedClasses: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate registration ID before saving
studentSchema.pre('save', async function(next) {
  if (!this.registrationId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.models.Student?.countDocuments() || 0;
    this.registrationId = `RT${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Method to calculate attendance percentage
studentSchema.methods.updateAttendance = function() {
  if (this.totalClasses > 0) {
    this.attendancePercentage = Math.round((this.attendedClasses / this.totalClasses) * 100);
  }
};

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);

export default Student;
