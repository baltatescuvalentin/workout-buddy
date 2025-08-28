import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAuthResponse } from "../helper/generateAuthResponse.js";

export const testApi = (req, res) => {
  res.status(200).json({
    message: "api alive",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, userName, age, height, weight, sex } =
      req.body;

    const alreadyExists = await User.findOne({
      email: email,
    });

    if (alreadyExists) {
      return res.status(409).json({
        message: "This Email already used!",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      userName,
      age,
      height,
      weight,
      sex,
    });

    const savedUser = await newUser.save();
    // const userFiltered = { ...savedUser._doc };
    // delete userFiltered.password;

    // const { token, user: userFiltered } = generateAuthResponse(savedUser);

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({
      userName,
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist!",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }

    const { token, user: userFiltered } = generateAuthResponse(user);

    res.status(200).json({
      token: token,
      user: userFiltered,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id, age, height, weight, sex } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        age,
        height,
        weight,
        sex,
      },
      {
        new: true,
      }
    );

    const userFiltered = { ...updatedUser._doc };
    delete userFiltered.password;

    res.status(200).json({
      user: userFiltered,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist!",
      });
    }

    const userId = user._id;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    const userFiltered = { ...updatedUser._doc };
    delete userFiltered.password;

    res.status(200).json({
      user: userFiltered,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const userCheck = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist!",
      });
    }

    const userFiltered = { ...user._doc };
    delete userFiltered.password;

    res.status(200).json({
      user: userFiltered,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getProfileInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne(
      {
        _id: id,
      },
      "fullName userName email age height weight sex age"
    );

    if (!user) {
      res.status(404).json({
        message: "User does not exist!",
      });
    }

    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
