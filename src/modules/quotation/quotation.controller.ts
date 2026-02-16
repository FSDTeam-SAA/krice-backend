import { Request, Response } from 'express';
import { Quotation } from './quotation.model';
import catchAsync from '../../utils/catchAsync';

// Create a new quotation
export const createQuotation = catchAsync(async (req: Request, res: Response) => {
      const quotation = await Quotation.create({
            ...req.body,
      });
      res.status(201).json({ success: true, data: quotation });
});

// Get all quotations
export const getAllQuotations = catchAsync(async (_req: Request, res: Response) => {
      const quotations = await Quotation.find();
      res.status(200).json({ success: true, data: quotations });
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
      const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
