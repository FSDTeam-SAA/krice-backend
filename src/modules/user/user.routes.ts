import express from 'express';
import { getUsers, getSingleUser, updateUser } from './user.controller';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getSingleUser);
router.put('/:id', updateUser);

export default router;
