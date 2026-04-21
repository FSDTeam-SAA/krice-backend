import { Request, Response } from 'express';
import { Member } from './member.model';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { getPaginationParams, buildMetaPagination } from '../../utils/pagination';

// Create a new member
export const createMember = catchAsync(async (req: Request, res: Response) => {
  console.log('req.body:', req.body);  // Debug log
  console.log('req.files:', req.files);  // Debug log
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
    email: req.body.email,
  });
  res.status(201).json({ success: true, data: member });
});

// Get all members
export const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, skip } = getPaginationParams(req.query);

  const [members, total] = await Promise.all([
    Member.find().skip(skip).limit(limit),
    Member.countDocuments(),
  ]);

  const meta = buildMetaPagination(total, page, limit);

  res.status(200).json({
    success: true,
    data: members,
    meta,
  });
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
