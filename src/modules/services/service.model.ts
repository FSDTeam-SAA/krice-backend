import { Schema, model } from 'mongoose';

export interface IService {
  title: string;
  description: string; // rich text (HTML allowed, e.g. from tiptap)
  image: string;
}

const serviceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Accepts HTML
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export const Service = model<IService>('Service', serviceSchema);
