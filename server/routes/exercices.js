import express from 'express';
import Exercise from '../models/Exercise.js';
import { exercicesFromAPIToDB, getExercices, getExerciceByBodyPart, getExerciceByName, getExercice } from '../controllers/exercices.js';

const router = express.Router();

//router.post('/all', exercicesFromAPIToDB);
router.get('/getExercices', getExercices);
router.get('/getExerciceByName', getExerciceByName);
router.get('/getExerciceByBodyPart', getExerciceByBodyPart);
router.get('/getExercice', getExercice);

export default router;