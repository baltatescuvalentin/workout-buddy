import express from 'express';
import { createWorkoutExercise, deleteWorkoutExercise, updateWorkoutExercise } from '../controllers/workoutexercises.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createWorkoutExercise);
router.delete('/delete/:id', verifyToken, deleteWorkoutExercise);
router.patch('/update/:id', verifyToken, updateWorkoutExercise);

export default router;