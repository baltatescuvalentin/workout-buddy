import WorkoutExercise from "../models/WorkoutExercise.js";

export const createWorkoutExercise = async (req, res) => {
    try {
        const {
            exerciseId,
            workoutId,
            reps,
            sets,
        } = req.body;

        const workoutExercise = new WorkoutExercise({
            exerciseId,
            workoutId,
            reps,
            sets
        });

        const savedWorkoutExercise = await workoutExercise.save();

        res.status(201).json(
            savedWorkoutExercise,
        )
    } 
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const deleteWorkoutExercise = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        await WorkoutExercise.findByIdAndDelete({
            _id: id,
        })

        res.status(200).json({
            message: 'Exercise removed'
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const updateWorkoutExercise = async (req, res) => {
    try {
        const {
            reps,
            sets,
        } = req.body;

        const { id } = req.params;

        const updatedWorkoutExercise = await WorkoutExercise.findByIdAndUpdate(id, {
            reps,
            sets,
        }, {
            new: true,
        });

        res.status(200).json(updatedWorkoutExercise);
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}