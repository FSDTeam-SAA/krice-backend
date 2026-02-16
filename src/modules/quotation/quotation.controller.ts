import { Request, Response } from 'express';
import { Quotation } from './quotation.model';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { getPaginationParams, buildMetaPagination } from '../../utils/pagination';

// Create a new quotation
export const createQuotation = catchAsync(async (req: Request, res: Response) => {
      let planFiles: string[] = [];
      const files = req.files as Record<string, Express.Multer.File[]> | undefined;

      // Handle plan files upload to Cloudinary
      if (files?.['planFiles']) {
            for (const file of files['planFiles']) {
                  const upload = await uploadToCloudinary(file.path);
                  if (upload?.secure_url) {
                        planFiles.push(upload.secure_url);
                  }
            }
      }

      const quotation = await Quotation.create({
            ...req.body,
            planFiles: planFiles.length > 0 ? planFiles : [],
      });
      res.status(201).json({ success: true, data: quotation });
});

// Get all quotations
export const getAllQuotations = catchAsync(async (req: Request, res: Response) => {
      const { page, limit, skip } = getPaginationParams(req.query);

      const [quotations, total] = await Promise.all([
            Quotation.find().skip(skip).limit(limit),
            Quotation.countDocuments(),
      ]);

      const meta = buildMetaPagination(total, page, limit);

      res.status(200).json({
            success: true,
            data: quotations,
            meta,
      });
});

// Get a single quotation by ID
export const getQuotationById = catchAsync(async (req: Request, res: Response) => {
      const quotation = await Quotation.findById(req.params.id);
      if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
      }
      res.status(200).json({ success: true, data: quotation });
});

// Update a quotation by ID
export const updateQuotation = catchAsync(async (req: Request, res: Response) => {
      const files = req.files as Record<string, Express.Multer.File[]> | undefined;
      let updateData: any = { ...req.body };

      // Handle new plan files upload to Cloudinary
      if (files?.['planFiles']) {
            let planFiles: string[] = [];
            for (const file of files['planFiles']) {
                  const upload = await uploadToCloudinary(file.path);
                  if (upload?.secure_url) {
                        planFiles.push(upload.secure_url);
                  }
            }
            // Replace with new files
            if (planFiles.length > 0) {
                  updateData.planFiles = planFiles;
            }
      }

      const quotation = await Quotation.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
      }
      res.status(200).json({ success: true, data: quotation });
});

// Delete a quotation by ID
export const deleteQuotation = catchAsync(async (req: Request, res: Response) => {
      const quotation = await Quotation.findByIdAndDelete(req.params.id);
      if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
      }
      res.status(200).json({ success: true, message: 'Quotation deleted' });
});
