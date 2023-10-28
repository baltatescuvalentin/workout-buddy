import WorkoutRoutine from "../models/WorkoutRoutine.js";

export const createWorkoutRoutine = async (req, res) => {
    try {
        const {
            name,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        } = req.body;

        const workoutRoutine = new WorkoutRoutine({
            name,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        });

        const savedWorkout = await workoutRoutine.save();

        res.status(201).json(
            savedWorkout,
        )
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const deleteWorkoutRoutineByParams = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        await WorkoutRoutine.findByIdAndDelete({
            _id: id,
        })

        res.status(200).json({
            message: 'Workout routine removed'
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const deleteWorkoutRoutineById = async (req, res) => {
    try {
        const {
            id,
        } = req.body;

        await WorkoutRoutine.findByIdAndDelete({
            _id: id,
        })

        res.status(200).json({
            message: 'Workout routine removed'
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const updateWorkoutRoutine = async (req, res) => {
    try {
        const {
            name,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        } = req.body;

        const { id } = req.params;

        const updatedWorkoutRoutine = await WorkoutRoutine.findByIdAndUpdate(id, {
            name,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        }, {
            new: true,
        });

        res.status(200).json({
            user: updatedWorkoutRoutine,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}