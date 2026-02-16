import { Request, Response } from 'express';
import { PastProject } from './pastProject.model';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';

// Create a new past project
export const createPastProject = catchAsync(async (req: Request, res: Response) => {
  // Handle file uploads (multer should provide req.files)
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  let pastImage = req.body.pastImage;
  let remodelImage = req.body.remodelImage;
  let thumbnailImage = req.body.thumbnailImage;

  // Upload images to Cloudinary if files are present
  if (files) {
    if (files['pastImage']?.[0]) {
      const upload = await uploadToCloudinary(files['pastImage'][0].path);
      pastImage = upload?.secure_url;
    }
    if (files['remodelImage']?.[0]) {
      const upload = await uploadToCloudinary(files['remodelImage'][0].path);
      remodelImage = upload?.secure_url;
    }
    if (files['thumbnailImage']?.[0]) {
      const upload = await uploadToCloudinary(files['thumbnailImage'][0].path);
      thumbnailImage = upload?.secure_url;
    }
  }

  const project = await PastProject.create({
    title: req.body.title,
    description: req.body.description,
    pastImage,
    remodelImage,
    thumbnailImage,
  });
  res.status(201).json({ success: true, data: project });
});

// Get all past projects
export const getAllPastProjects = catchAsync(async (_req: Request, res: Response) => {
  const projects = await PastProject.find();
  res.status(200).json({ success: true, data: projects });
});

// Get a single past project by ID
export const getPastProjectById = catchAsync(async (req: Request, res: Response) => {
  const project = await PastProject.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.status(200).json({ success: true, data: project });
});

// Update a past project by ID
export const updatePastProject = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  let updateData: any = {
    ...req.body,
  };
  // Handle file uploads for update
  if (files) {
    if (files['pastImage']?.[0]) {
      const upload = await uploadToCloudinary(files['pastImage'][0].path);
      updateData.pastImage = upload?.secure_url;
    }
    if (files['remodelImage']?.[0]) {
      const upload = await uploadToCloudinary(files['remodelImage'][0].path);
      updateData.remodelImage = upload?.secure_url;
    }
    if (files['thumbnailImage']?.[0]) {
      const upload = await uploadToCloudinary(files['thumbnailImage'][0].path);
      updateData.thumbnailImage = upload?.secure_url;
    }
  }
  const project = await PastProject.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.status(200).json({ success: true, data: project });
});

// Delete a past project by ID
export const deletePastProject = catchAsync(async (req: Request, res: Response) => {
  const project = await PastProject.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.status(200).json({ success: true, message: 'Project deleted' });
});
