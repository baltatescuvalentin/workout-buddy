import express from 'express';
import { createWorkoutRoutine, updateWorkoutRoutine, deleteWorkoutRoutineById, deleteWorkoutRoutineByParams, getUserWorkouts, getWorkoutById } from '../controllers/workoutroutines.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createWorkoutRoutine);
router.patch('/update/:id', verifyToken, updateWorkoutRoutine);
router.delete('/delete/:id', verifyToken, deleteWorkoutRoutineByParams);
router.delete('/delete', verifyToken, deleteWorkoutRoutineById);
router.get('/getWorkouts/:id', verifyToken, getUserWorkouts);
router.get('/getWorkoutById/:id', verifyToken, getWorkoutById);

export default router;