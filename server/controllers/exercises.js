import Exercise from "../models/Exercise.js";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';

export const exercisesFromAPIToDB = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises',
            params: {limit: '9999'},
            headers: {
              'X-RapidAPI-Key': process.env.RAPID_KEY,
              'X-RapidAPI-Host': process.env.RAPID_HOST
            }
        };

        const response = await axios.request(options);

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        for ( const exercise of response.data ) {
            const result = await cloudinary.uploader.upload(exercise.gifUrl);

            const createExercise = new Exercise({
                exerciseId: exercise.id,
                bodyPart: exercise.bodyPart,
                equipment: exercise.equipment,
                name: exercise.name,
                target: exercise.target,
                secondaryTarget: [...exercise.secondaryMuscles],
                instructions: [...exercise.instructions],
                gifUrl: result.secure_url,
            });

            const savedExercise = await createExercise.save();
        }
        
        res.status(201).json({
            message: 'all good',
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find({});

        res.status(200).json({
            exercises: allExercises,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getExercise = async (req, res) => {
    try {
        const {
            input,
        } = req.body;

        const results = await Exercise.find({
            $or: [
                {
                    "name": {
                        $regex: new RegExp(input, "i"),
                    }
                },
                {
                    "target": {
                        $regex: new RegExp(input, "i"),
                    }
                },
                {
                    "bodyPart": {
                        $regex: new RegExp(input, "i"),
                    }
                },
                {
                    "equipment": {
                        $regex: new RegExp(input, "i"),
                    }
                }
            ]
        });

        res.status(200).json({
            exercises: results,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getExerciseByName = async (req, res) => {
    try {
        const {
            name,
        } = req.body;

        const results = await Exercise.find({
            "name": {
                $regex: new RegExp(name, "i"),
            }
        })

        res.status(200).json({
            results: results
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getExerciseByBodyPart = async (req, res) => {
    try {
        const {
            bodyPart,
        } = req.body;

        const results = await Exercise.find({
            "bodyPart": {
                $regex: new RegExp(bodyPart, "i"),
            }
        })

        res.status(200).json({
            results: results
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getExerciseByTarget = async (req, res) => {
    try {
        const {
            target,
        } = req.body;

        const results = await Exercise.find({
            "target": {
                $regex: new RegExp(target, "i"),
            }
        })

        res.status(200).json({
            results: results
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}