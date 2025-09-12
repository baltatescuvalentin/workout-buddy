import express from "express";
import Exercise from "../models/Exercise.js";
import {
  exercisesFromAPIToDB,
  getExercises,
  getExerciseByBodyPart,
  getExerciseByName,
  getExercise,
  getExerciseById,
  getBodyParts,
  getBodyPartsFromAPI,
  getEquipmentFromAPI,
  getEquipment,
  getTargets,
  getExerciseUtils,
  getExerciseFilter,
  getTypesFromAPI,
} from "../controllers/exercises.js";

const router = express.Router();

//router.post('/all', exercicesFromAPIToDB);
router.get("/getExercises", getExercises);
// router.get("/v2/getExercises", get);
router.get("/getExerciseByName", getExerciseByName);
router.get("/getExerciseById", getExerciseById);
// router.get("/getBodyPartsFromAPI", getBodyPartsFromAPI);
router.get("/getEquipmentFromAPI", getEquipmentFromAPI);
router.get("/getTypesFromAPI", getTypesFromAPI);
router.get("/getEquipment", getEquipment);
router.get("/getTargets", getTargets);
router.get("/getBodyParts", getBodyParts);
router.get("/getExerciseUtils", getExerciseUtils);
router.get("/getExerciseFilter", getExerciseFilter);
router.get("/getExerciseByBodyPart", getExerciseByBodyPart);
router.post("/getExercise", getExercise);

export default router;
