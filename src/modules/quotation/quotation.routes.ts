import { Router } from 'express';
import {
      createQuotation,
      getAllQuotations,
      getQuotationById,
      updateQuotation,
      deleteQuotation,
} from './quotation.controller';

const router = Router();

// Public CRUD routes
router.post('/', createQuotation);
router.get('/', getAllQuotations);
router.get('/:id', getQuotationById);
router.put('/:id', updateQuotation);
router.delete('/:id', deleteQuotation);

export default router;
