import express from 'express';
import { getUsers, updateUser } from './user.controller';

const router = express.Router();

router.get('/', getUsers);
router.put('/:id', updateUser);

export default router;
