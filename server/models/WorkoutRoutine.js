import mongoose from "mongoose";

const workoutRoutine = mongoose.Schema({
    name: String,
    description: String,
    monday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    tuesday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    wednesday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    thursday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    friday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    saturday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    },
    sunday: {
        name: {
            type: String,
        },
        exercises: {
            type: Array,
            default: [],
        }
    }
})

const WorkoutRoutine = mongoose.model("WorkoutRoutine", workoutRoutine);
export default WorkoutRoutine;