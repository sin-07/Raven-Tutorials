import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IParticipant {
  participantId?: mongoose.Types.ObjectId;
  studentName?: string;
  studentEmail?: string;
  joinedAt: Date;
  leftAt?: Date;
}

export interface ILiveClass extends Document {
  classId: string;
  title: string;
  description?: string;
  roomName: string;
  class: string;
  subject: string;
  teacherName?: string;
  teacherEmail?: string;
  scheduledDate?: Date;
  scheduledAt?: Date;
  startTime?: string;
  endTime?: string;
  duration: number;
  maxParticipants?: number;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled' | string;
  isRecordingEnabled?: boolean;
  actualStartTime?: Date;
  actualEndTime?: Date;
  createdBy?: mongoose.Types.ObjectId;
  participants?: IParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

const liveClassSchema = new Schema<ILiveClass>({
  classId: {
    type: String,
    index: true,
    sparse: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  roomName: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  teacherName: {
    type: String,
    default: 'Raven Senior Faculty'
  },
  teacherEmail: {
    type: String,
    default: ''
  },
  scheduledDate: {
    type: Date
  },
  scheduledAt: {
    type: Date
  },
  startTime: {
    type: String,
    default: '10:00'
  },
  endTime: {
    type: String,
    default: '11:00'
  },
  duration: {
    type: Number,
    default: 60
  },
  maxParticipants: {
    type: Number,
    default: 100
  },
  status: {
    type: String,
    default: 'Scheduled'
  },
  isRecordingEnabled: {
    type: Boolean,
    default: false
  },
  actualStartTime: {
    type: Date
  },
  actualEndTime: {
    type: Date
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  },
  participants: [{
    participantId: {
      type: Schema.Types.ObjectId,
      ref: 'Admission'
    },
    studentName: {
      type: String
    },
    studentEmail: {
      type: String
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    leftAt: {
      type: Date
    }
  }]
}, {
  timestamps: true
});

liveClassSchema.index({ class: 1, status: 1 });
liveClassSchema.index({ status: 1, scheduledDate: -1 });

const LiveClass: Model<ILiveClass> = mongoose.models.LiveClass || mongoose.model<ILiveClass>('LiveClass', liveClassSchema);

export default LiveClass;
