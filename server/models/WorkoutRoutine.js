import mongoose from "mongoose";

const workoutRoutine = mongoose.Schema({
    name: String,
    description: String,
    monday: {
        type: Array,
        default: [],
    },
    tuesday: {
        type: Array,
        default: [],
    },
    wednesday: {
        type: Array,
        default: [],
    },
    thursday: {
        type: Array,
        default: [],
    },
    friday: {
        type: Array,
        default: [],
    },
    saturday: {
        type: Array,
        default: [],
    },
    sunday: {
        type: Array,
        default: [],
    }
})

const WorkoutRoutine = mongoose.model("WorkoutRoutine", workoutRoutine);
export default WorkoutRoutine;