import { Router } from 'express';
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from './member.controller';
import { upload } from '../../middlewares/multer.middleware';

const router = Router();

// Public CRUD routes
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateMember);
router.delete('/:id', deleteMember);

export default router;
