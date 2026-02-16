import { Request, Response } from 'express';
import { ContactUs } from './contactUs.model';
import catchAsync from '../../utils/catchAsync';

// Create a new contact us entry
export const createContactUs = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactUs.create({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    message: req.body.message,
  });
  res.status(201).json({ success: true, data: contact });
});

// Get all contact us entries
export const getAllContactUs = catchAsync(async (_req: Request, res: Response) => {
  const contacts = await ContactUs.find();
  res.status(200).json({ success: true, data: contacts });
});

// Get a single contact us entry by ID
export const getContactUsById = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactUs.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  res.status(200).json({ success: true, data: contact });
});

// Update a contact us entry by ID
export const updateContactUs = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  res.status(200).json({ success: true, data: contact });
});

// Delete a contact us entry by ID
export const deleteContactUs = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactUs.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  res.status(200).json({ success: true, message: 'Contact deleted' });
});
