import mongoose from 'mongoose';

const trackerSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    weight: Number,
    hips: Number,
    neck: Number,
    waist: Number,
    BMI: Number,
    WHR: Number,
    bodyFat: Number,
    caloriesIntake: Array,
    caloriesBurned: Array,
});

const Tracker = mongoose.model("Tracker", trackerSchema);
export default Tracker; 