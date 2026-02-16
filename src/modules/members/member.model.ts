import { Schema, model } from 'mongoose';

export interface IMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const memberSchema = new Schema<IMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export const Member = model<IMember>('Member', memberSchema);
