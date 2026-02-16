import { Router } from 'express';
import {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} from './contactUs.controller';

const router = Router();

// Public CRUD routes
router.post('/', createContactUs);
router.get('/', getAllContactUs);
router.get('/:id', getContactUsById);
router.put('/:id', updateContactUs);
router.delete('/:id', deleteContactUs);

export default router;
