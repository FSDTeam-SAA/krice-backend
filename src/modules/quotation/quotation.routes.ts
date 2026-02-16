import { Router } from 'express';
import {
      createQuotation,
      getAllQuotations,
      getQuotationById,
      updateQuotation,
      deleteQuotation,
} from './quotation.controller';
import { upload } from '../../middlewares/multer.middleware';

const router = Router();

router.post('/', upload.fields([{ name: 'planFiles', maxCount: 10 }]), createQuotation);
router.get('/', getAllQuotations);
router.get('/:id', getQuotationById);
router.put('/:id', upload.fields([{ name: 'planFiles', maxCount: 10 }]), updateQuotation);
router.delete('/:id', deleteQuotation);

export default router;
