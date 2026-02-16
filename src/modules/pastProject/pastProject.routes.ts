import { Router } from 'express';

import {
  createPastProject,
  getAllPastProjects,
  getPastProjectById,
  updatePastProject,
  deletePastProject,
} from './pastProject.controller';
import { upload } from '../../middlewares/multer.middleware';

const router = Router();


// Public CRUD routes
router.post(
  '/',
  upload.fields([
    { name: 'pastImage', maxCount: 1 },
    { name: 'remodelImage', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 },
  ]),
  createPastProject
);
router.get('/', getAllPastProjects);
router.get('/:id', getPastProjectById);
router.put(
  '/:id',
  upload.fields([
    { name: 'pastImage', maxCount: 1 },
    { name: 'remodelImage', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 },
  ]),
  updatePastProject
);
router.delete('/:id', deletePastProject);

export default router;
