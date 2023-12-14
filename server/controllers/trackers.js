import mongoose from "mongoose";
import Tracker from "../models/Tracker.js";

export const createTracker = async (req, res) => {
    try {
        const {
            date,
            userId,
        } = req.body;

        const tracker = new Tracker({
            userId: userId,
            date: date,
        })

        const newTracker = await tracker.save();
        
        res.status(201).json({
            tracker: newTracker,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const editTracker = async (req, res) => {
    try {
        const {
            data,
            field
        } = req.body;

        const {
            id
        } = req.params;

        const tracker = await Tracker.findById(id);

        if(!tracker) {
            return res.status(404).json({
                message: 'This date is not tracked'
            })
        }

        tracker[field] = data;

        await tracker.save();

        res.status(200).json({
            tracker: tracker,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
} 

export const deleteTracker = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        await Tracker.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Tracker successfully deleted!'
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getTrackerByDay = async (req, res) => {
    try {
        const {
            day,
        } = req.params;

        const tracker = await Tracker.findOne({
            date: day,
        });

        if(!tracker) {
            return res.status(200).json({
                tracker: null,
            })
        }

        res.status(200).json({
            tracker: tracker,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getTrackedDates = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        const dates = await Tracker.find({
            userId: id,
        }).select('date');

        if(!dates) {
            return res.status(200).json({
                dates: [],
            })
        }

        res.status(200).json({
            dates: dates,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getUserTrackers = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        const trackers = await Tracker.find({
            userId: id,
        });

        if(!trackers) {
            return res.status(200).json({
                trackers: null,
            })
        }

        res.status(200).json({
            trackers: trackers,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getTrackerMetrics = async (req, res) => {
    try {
        const {
            userId,
        } = req.params;

        const result = await Tracker.aggregate([
            {
                $match: {
                    userId: userId,
                }
            },
            {
                $group: {
                  _id: null,
                  avgBMI: { $avg: '$BMI' },
                  minBMI: { $min: '$BMI' },
                  maxBMI: { $max: '$BMI' },
                  avgBodyFat: { $avg: '$bodyFat' },
                  minBodyFat: { $min: '$bodyFat' },
                  maxBodyFat: { $max: '$bodyFat' },
                  avgWHR: { $avg: '$WHR' },
                  minWHR: { $min: '$WHR' },
                  maxWHR: { $max: '$WHR' },
                  avgWeight: { $avg: '$weight' },
                  minWeight: { $min: '$weight' },
                  maxWeight: { $max: '$weight' },
                  avgHips: { $avg: '$hips' },
                  minHips: { $min: '$hips' },
                  maxHips: { $max: '$hips' },
                  avgNeck: { $avg: '$neck' },
                  minNeck: { $min: '$neck' },
                  maxNeck: { $max: '$neck' },
                  avgWaist: { $avg: '$waist' },
                  minWaist: { $min: '$waist' },
                  maxWaist: { $max: '$waist' },
                  avgCaloriesIntake: { $avg: { $sum: '$caloriesIntake.calories' }},
                  minCaloriesIntake: { $min: { $sum: '$caloriesIntake.calories' }},
                  maxCaloriesIntake: { $max: { $sum: '$caloriesIntake.calories' }},
                  minCaloriesBurned: { $min: { $sum: '$caloriesBurned.calories' }},
                  avgCaloriesBurned: { $avg: { $sum: '$caloriesBurned.calories' }},
                  maxCaloriesBurned: { $max: { $sum: '$caloriesBurned.calories' }},
                //   sumCaloriesIntake: { $sum: '$caloriesIntake.calories' },
                //   sumCaloriesBurned: { $sum: '$caloriesBurned.calories' },
                },
              },
              {
                $project: {
                  _id: 0,
                  avgBMI: 1,
                  minBMI: 1,
                  maxBMI: 1,
                  avgBodyFat: 1,
                  minBodyFat: 1,
                  maxBodyFat: 1,
                  avgWHR: 1,
                  minWHR: 1,
                  maxWHR: 1,
                  avgWeight: 1,
                  minWeight: 1,
                  maxWeight: 1,
                  avgHips: 1,
                  minHips: 1,
                  maxHips: 1,
                  avgNeck: 1,
                  minNeck: 1,
                  maxNeck: 1,
                  avgWaist: 1,
                  minWaist: 1,
                  maxWaist: 1,
                  avgCaloriesIntake: 1,
                  minCaloriesIntake: 1,
                  maxCaloriesIntake: 1,
                  avgCaloriesBurned: 1,
                  minCaloriesBurned: 1,
                  maxCaloriesBurned: 1,
                },
              },
            ]).exec();

        if(result.length === 0) {
            return res.status(404).json({
                message: 'No matching documents'
            })
        }

        res.status(200).json({
            metrics: result[0],
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}