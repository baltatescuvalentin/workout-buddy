import Exercise from "../models/Exercise.js";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import BodyPart from "../models/BodyPart.js";
import Equipment from "../models/Equipment.js";
import Type from "../models/Type.js";

export const exercisesFromAPIToDB = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://exercisedb-api1.p.rapidapi.com/api/v1/exercises",
      params: { limit: "9999" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host": process.env.RAPID_HOST,
      },
    };

    const response = await axios.request(options);

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    for (const exercise of response.data) {
      const result = await cloudinary.uploader.upload(exercise.gifUrl);

      const createExercise = new Exercise({
        exerciseId: exercise.id,
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        name: exercise.name,
        target: exercise.target,
        secondaryTarget: [...exercise.secondaryMuscles],
        instructions: [...exercise.instructions],
        gifUrl: result.secure_url,
      });

      const savedExercise = await createExercise.save();
    }

    res.status(201).json({
      message: "all good",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getBodyPartsFromAPI = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://exercisedb-api1.p.rapidapi.com/api/v1/bodyparts",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host": process.env.RAPID_HOST,
      },
    };

    const response = await axios.request(options);

    for (const bodyPart of response.data.data) {
      const bp = new BodyPart({
        name: bodyPart.name,
        imageUrl: bodyPart.imageUrl,
      });

      await bp.save();
    }

    res.status(201).json({
      message: "body parts saved",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEquipmentFromAPI = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://exercisedb-api1.p.rapidapi.com/api/v1/equipments",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host": process.env.RAPID_HOST,
      },
    };

    const response = await axios.request(options);

    for (const bodyPart of response.data.data) {
      const equipment = new Equipment({
        name: bodyPart.name,
        imageUrl: bodyPart.imageUrl,
      });

      await equipment.save();
    }

    res.status(201).json({
      message: "equipment saved",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getTypesFromAPI = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://exercisedb-api1.p.rapidapi.com/api/v1/exercisetypes",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host": process.env.RAPID_HOST,
      },
    };

    const response = await axios.request(options);

    for (const type of response.data.data) {
      const exType = new Type({
        name: type.name,
        imageUrl: type.imageUrl,
      });

      await exType.save();
    }

    res.status(201).json({
      message: "types saved",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExercises = async (req, res) => {
  try {
    const allExercises = await Exercise.find({});

    res.status(200).json({
      exercises: allExercises,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await Exercise.find({
      id,
    });

    if (!result) {
      return res.status(404).json({
        message: "Exercise does not exist",
      });
    }

    res.status(200).json({
      exercise: result,
      message: "Exercise found",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExercise = async (req, res) => {
  try {
    const { input } = req.body;

    const results = await Exercise.find({
      $or: [
        {
          name: {
            $regex: new RegExp(input, "i"),
          },
        },
        {
          target: {
            $regex: new RegExp(input, "i"),
          },
        },
        {
          bodyPart: {
            $regex: new RegExp(input, "i"),
          },
        },
        {
          equipment: {
            $regex: new RegExp(input, "i"),
          },
        },
      ],
    });

    res.status(200).json({
      exercises: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseFilter = async (req, res) => {
  try {
    const { target, equipment, bodyPart, filter } = req.query;

    const query = {};

    if (!target && !equipment && !bodyPart && !filter) {
      return res.status(200).json({
        data: [],
      });
    }

    if (target) query.target = target;
    if (equipment) query.equipment = equipment;
    if (bodyPart) query.bodyPart = bodyPart;
    if (filter) query.name = { $regex: new RegExp(filter, "i") };

    const results = await Exercise.find(query);

    if (!results) {
      return res.status(204).json({
        data: [],
        message: "No exercise found",
      });
    }

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseByName = async (req, res) => {
  try {
    const { name } = req.body;

    const results = await Exercise.find({
      name: {
        $regex: new RegExp(name, "i"),
      },
    });

    res.status(200).json({
      results: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getBodyParts = async (req, res) => {
  try {
    const results = await BodyPart.find({}).select("-_id -__v");

    if (!results) {
      return res.status(500).json({
        message: "Error at fetching data",
      });
    }

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEquipment = async (req, res) => {
  try {
    const results = await Equipment.find({}).select("-_id -__v");

    if (!results) {
      return res.status(500).json({
        message: "Error at fetching data",
      });
    }

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getTargets = async (req, res) => {
  try {
    const results = await Exercise.distinct("target");

    if (!results) {
      return res.status(500).json({
        message: "Error at fetching data",
      });
    }

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getTypes = async (req, res) => {
  try {
    const results = await Type.find({}).select("-_id -__v");

    if (!results) {
      return res.status(500).json({
        message: "Error at fetching data",
      });
    }

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseUtils = async (req, res) => {
  try {
    const e = await Equipment.find({}).select("-_id -__v -imageUrl");
    const target = await Exercise.distinct("target");
    const bp = await BodyPart.find({}).select("-_id -__v -imageUrl");
    const type = await Type.find({}).select("-_id -__v");

    let equipment = e.map((eq) => {
      let s = String(eq["name"]).toLowerCase();
      return s;
    });

    let bodyParts = bp.map((b) => {
      let s = String(b["name"]).toLowerCase();
      return s;
    });

    let types = type.map((b) => {
      let s = String(b["name"]).toLowerCase();
      return s;
    });

    res.status(200).json({
      data: {
        equipment,
        target,
        bodyParts,
        types,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseByBodyPart = async (req, res) => {
  try {
    const { bodyPart } = req.body;

    const results = await Exercise.find({
      bodyPart: {
        $regex: new RegExp(bodyPart, "i"),
      },
    });

    res.status(200).json({
      results: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getExerciseByTarget = async (req, res) => {
  try {
    const { target } = req.body;

    const results = await Exercise.find({
      target: {
        $regex: new RegExp(target, "i"),
      },
    });

    res.status(200).json({
      results: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
