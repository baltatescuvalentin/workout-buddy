import mongoose from "mongoose";

const workoutRoutine = mongoose.Schema({
    name: String,
    description: String,
    userId: {
        required: [true, "We need the user ID!"],
        type: String,
    },
    days: {
        monday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        tuesday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        wednesday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        thursday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        friday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        saturday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        },
        sunday: {
            dayName: {
                type: String,
            },
            name: {
                type: String,
            },
            exercises: {
                type: Array,
                default: [],
            }
        }
    }
})

const WorkoutRoutine = mongoose.model("WorkoutRoutine", workoutRoutine);
export default WorkoutRoutine;