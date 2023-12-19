import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    fullName: {
        required: [true, "Please type your fullname"],
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
        validate: [validator.isEmail, "Invalid email"]
    },
    password: {
        required: [true, "Please choose a password"],
        type: String,
        min: 6,
        max: 50,
    },
    sex: String,
    age: Number,
    weight: Number,
    height: Number,
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;