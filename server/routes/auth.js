import express from 'express';
import { loginUser, registerUser, updateUserInfo } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/update', updateUserInfo);

export default router;