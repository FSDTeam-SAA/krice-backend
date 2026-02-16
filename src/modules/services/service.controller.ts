import { Request, Response } from 'express';
import { Service } from './service.model';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';

// Create a new service
export const createService = catchAsync(async (req: Request, res: Response) => {
  let image = req.body.image;
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  if (files?.['image']?.[0]) {
    const upload = await uploadToCloudinary(files['image'][0].path);
    image = upload?.secure_url;
  }
  const service = await Service.create({
    title: req.body.title,
    description: req.body.description,
    image,
  });
  res.status(201).json({ success: true, data: service });
});

// Get all services
export const getAllServices = catchAsync(async (_req: Request, res: Response) => {
  const services = await Service.find();
  res.status(200).json({ success: true, data: services });
});

// Get a single service by ID
export const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.status(200).json({ success: true, data: service });
});

// Update a service by ID
export const updateService = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  let updateData: any = { ...req.body };
  if (files?.['image']?.[0]) {
    const upload = await uploadToCloudinary(files['image'][0].path);
    updateData.image = upload?.secure_url;
  }
  const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.status(200).json({ success: true, data: service });
});

// Delete a service by ID
export const deleteService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.status(200).json({ success: true, message: 'Service deleted' });
});
