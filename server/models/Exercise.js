import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    exerciseId: {
        type: String,
        required: true,
    },
    name: String,
    bodyPart: String,
    equipment: String,
    target: String,
    secondaryTarget: {
        type: Array,
        default: [],
    },
    instructions: {
        type: Array,
        default: [],
    },
    gifUrl: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;