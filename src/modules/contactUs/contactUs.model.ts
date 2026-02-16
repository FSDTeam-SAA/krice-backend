import { Schema, model } from 'mongoose';

export interface IContactUs {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  message: string;
}

const contactUsSchema = new Schema<IContactUs>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

export const ContactUs = model<IContactUs>('ContactUs', contactUsSchema);
