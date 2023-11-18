import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            userName,
        } = req.body;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            userName,
        });
    
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {
            userName,
            password,
        } = req.body;

        const user = await User.findOne({
            userName,
        });

        if(!user) {
            return res.status(404).json({
                message: 'User does not exist!',
            })
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({
                message: 'Invalid credentials!',
            })
        }

        const userFiltered = { ...user._doc };
        delete userFiltered.password;

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            token: token,
            user: userFiltered,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const {
            id,
            age,
            height,
            weight,
            sex,
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, {
            age,
            height,
            weight,
            sex,
        }, {
            new: true,
        });

        const userFiltered = { ...updatedUser._doc };
        delete userFiltered.password;

        res.status(200).json({
            user: userFiltered,
        })

    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email: email,
        });

        if(!user) {
            return res.status(404).json({
                message: 'User does not exist!',
            })
        }

        const userId = user._id;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            password: hashedPassword,
        }, {
            new: true,
        });

        console.log(updatedUser);

        const userFiltered = { ...updatedUser._doc };
        delete userFiltered.password;

        res.status(200).json({
            user: userFiltered,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const userCheck = async(req, res) => {
    try {
        const {
            email,
        } = req.body;

        const user = await User.findOne({
            email,
        });

        if(!user) {
            return res.status(404).json({
                message: 'User does not exist!',
            });
        }

        const userFiltered = { ...user._doc };
        delete userFiltered.password;

        res.status(200).json({
            user: userFiltered,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}
