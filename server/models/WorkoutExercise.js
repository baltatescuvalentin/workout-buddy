import mongoose from "mongoose";

const workoutExerciseSchema = mongoose.Schema({
    exerciseId: String,
    wordoutId: String,
    reps: Number,
    sets: Number,
});

const WorkoutExercise = mongoose.model("WorkoutExercise", workoutExerciseSchema);
export default WorkoutExercise;