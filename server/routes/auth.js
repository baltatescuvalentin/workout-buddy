import express from 'express';
import { changePassword, getProfileInfo, loginUser, registerUser, updateUserInfo, userCheck } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/update', updateUserInfo);
router.patch('/changePassword', changePassword);
router.post('/user/', userCheck);
router.get('/getProfileInfo/:id', verifyToken, getProfileInfo);

export default router;