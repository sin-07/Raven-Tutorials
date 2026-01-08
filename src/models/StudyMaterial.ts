import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudyMaterial extends Document {
  title: string;
  subject: string;
  class: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  cloudinaryId?: string;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const studyMaterialSchema = new Schema<IStudyMaterial>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    enum: ['9th standard', '10th standard', '11th standard', '12th standard']
  },
  description: {
    type: String
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  fileType: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

const StudyMaterial: Model<IStudyMaterial> = mongoose.models.StudyMaterial || mongoose.model<IStudyMaterial>('StudyMaterial', studyMaterialSchema);

export default StudyMaterial;
