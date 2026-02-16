import { Request, Response } from 'express';
import { Member } from './member.model';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';

// Create a new member
export const createMember = catchAsync(async (req: Request, res: Response) => {
  let image = req.body.image;
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  if (files?.['image']?.[0]) {
    const upload = await uploadToCloudinary(files['image'][0].path);
    image = upload?.secure_url;
  }
  const member = await Member.create({
    name: req.body.name,
    role: req.body.role,
    description: req.body.description,
    image,
  });
  res.status(201).json({ success: true, data: member });
});

// Get all members
export const getAllMembers = catchAsync(async (_req: Request, res: Response) => {
  const members = await Member.find();
  res.status(200).json({ success: true, data: members });
});

// Get a single member by ID
export const getMemberById = catchAsync(async (req: Request, res: Response) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }
  res.status(200).json({ success: true, data: member });
});

// Update a member by ID
export const updateMember = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  let updateData: any = { ...req.body };
  if (files?.['image']?.[0]) {
    const upload = await uploadToCloudinary(files['image'][0].path);
    updateData.image = upload?.secure_url;
  }
  const member = await Member.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!member) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }
  res.status(200).json({ success: true, data: member });
});

// Delete a member by ID
export const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, message: 'Member not found' });
  }
  res.status(200).json({ success: true, message: 'Member deleted' });
});
