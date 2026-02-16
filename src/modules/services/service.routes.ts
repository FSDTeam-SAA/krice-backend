import { Router } from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from './service.controller';
import { upload } from '../../middlewares/multer.middleware';

const router = Router();

// Public CRUD routes
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateService);
router.delete('/:id', deleteService);

export default router;
