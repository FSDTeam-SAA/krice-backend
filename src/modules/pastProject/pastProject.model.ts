import { Schema, model } from 'mongoose';

export interface IPastProject {
  title: string;
  description: string; // rich text (HTML allowed)
  pastImage: string;
  remodelImage: string;
  thumbnailImage: string;
}

const pastProjectSchema = new Schema<IPastProject>({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Accepts HTML
  pastImage: { type: String, required: true },
  remodelImage: { type: String, required: true },
  thumbnailImage: { type: String, required: true },
}, {
  timestamps: true,
});

export const PastProject = model<IPastProject>('PastProject', pastProjectSchema);
