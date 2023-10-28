import express from 'express';
import { createWorkoutRoutine, updateWorkoutRoutine, deleteWorkoutRoutineById, deleteWorkoutRoutineByParams } from '../controllers/workoutroutines.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createWorkoutRoutine);
router.patch('/update/:id', verifyToken, updateWorkoutRoutine);
router.delete('/delete/:id', verifyToken, deleteWorkoutRoutineByParams);
router.delete('/delete', verifyToken, deleteWorkoutRoutineById);

export default router;