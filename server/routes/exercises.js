import express from 'express';
import Exercise from '../models/Exercise.js';
import { exercisesFromAPIToDB, getExercises, getExerciseByBodyPart, getExerciseByName, getExercise } from '../controllers/exercises.js';

const router = express.Router();

//router.post('/all', exercicesFromAPIToDB);
router.get('/getExercises', getExercises);
router.get('/getExerciseByName', getExerciseByName);
router.get('/getExerciseByBodyPart', getExerciseByBodyPart);
router.post('/getExercise', getExercise);

export default router;