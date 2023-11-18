import express from 'express';
import { changePassword, loginUser, registerUser, updateUserInfo, userCheck } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/update', updateUserInfo);
router.patch('/changePassword', changePassword);
router.post('/user/', userCheck);

export default router;