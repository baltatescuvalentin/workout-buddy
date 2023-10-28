import mongoose from "mongoose";
import isEmail from "validator/lib/isemail.js";

const userSchema = mongoose.Schema({
    firstName: {
        required: [true, "Please type your firstname"],
        type: String,
        min: 2,
    },
    lastName: {
        required: [true, "Please type your lastname"],
        type: String,
        min: 2,
    },
    userName: {
        required: [true, "Please type an username"],
        type: String,
        min: 6,
    },
    email: {
        required: [true, "Please type your email"],
        type: String,
        min: 2,
        unique: true,
        validate: [isEmail, "Invalid email"]
    },
    password: {
        required: [true, "Please choose a password"],
        type: String,
        min: 6,
        max: 50,
    },
    workouts: {
        type: Array,
        default: [],
    },
    age: Number,
    weight: Number,
    height: Number,
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;