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

        // const result = await Tracker.aggregate([
        //     {
        //         $match: {
        //             userId: userId,
        //         }
        //     },
        //     {
        //         $group: {
        //           _id: null,
        //           avgBMI: { $avg: '$BMI' },
        //           minBMI: { $min: '$BMI' },
        //           maxBMI: { $max: '$BMI' },
        //           avgBodyFat: { $avg: '$bodyFat' },
        //           minBodyFat: { $min: '$bodyFat' },
        //           maxBodyFat: { $max: '$bodyFat' },
        //           avgWHR: { $avg: '$WHR' },
        //           minWHR: { $min: '$WHR' },
        //           maxWHR: { $max: '$WHR' },
        //           avgWeight: { $avg: '$weight' },
        //           minWeight: { $min: '$weight' },
        //           maxWeight: { $max: '$weight' },
        //           avgHips: { $avg: '$hips' },
        //           minHips: { $min: '$hips' },
        //           maxHips: { $max: '$hips' },
        //           avgNeck: { $avg: '$neck' },
        //           minNeck: { $min: '$neck' },
        //           maxNeck: { $max: '$neck' },
        //           avgWaist: { $avg: '$waist' },
        //           minWaist: { $min: '$waist' },
        //           maxWaist: { $max: '$waist' },
        //           avgCaloriesIntake: { $avg: { $sum: '$caloriesIntake.calories' }},
        //           minCaloriesIntake: { $min: { $sum: '$caloriesIntake.calories' }},
        //           maxCaloriesIntake: { $max: { $sum: '$caloriesIntake.calories' }},
        //           minCaloriesBurned: { $min: { $sum: '$caloriesBurned.calories' }},
        //           avgCaloriesBurned: { $avg: { $sum: '$caloriesBurned.calories' }},
        //           maxCaloriesBurned: { $max: { $sum: '$caloriesBurned.calories' }},
        //         //   sumCaloriesIntake: { $sum: '$caloriesIntake.calories' },
        //         //   sumCaloriesBurned: { $sum: '$caloriesBurned.calories' },
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: 0,
        //           avgBMI: {
        //             $round: ['$avgBMI', 2]
        //           },
        //           minBMI: {
        //             $round: ['$minBMI', 2]
        //           },
        //           maxBMI: {
        //             $round: ['$maxBMI', 2]
        //           },
        //           avgBodyFat: {
        //             $round: ['$avgBodyFat', 2]
        //           },
        //           minBodyFat: {
        //             $round: ['$minBodyFat', 2]
        //           },
        //           maxBodyFat: {
        //             $round: ['$maxBodyFat', 2]
        //           },
        //           avgWHR: {
        //             $round: ['$avgWHR', 2]
        //           },
        //           minWHR: {
        //             $round: ['$minWHR', 2]
        //           },
        //           maxWHR: {
        //             $round: ['$maxWHR', 2]
        //           },
        //           avgWeight: {
        //             $round: ['$avgWeight', 2]
        //           },
        //           minWeight: {
        //             $round: ['$minWeight', 2]
        //           },
        //           maxWeight: {
        //             $round: ['$maxWeight', 2]
        //           },
        //           avgHips: {
        //             $round: ['$avgHips', 2]
        //           },
        //           minHips: {
        //             $round: ['$minHips', 2]
        //           },
        //           maxHips: {
        //             $round: ['$maxHips', 2]
        //           },
        //           avgNeck: {
        //             $round: ['$avgNeck', 2]
        //           },
        //           minNeck: {
        //             $round: ['$minNeck', 2]
        //           },
        //           maxNeck: {
        //             $round: ['$maxNeck', 2]
        //           },
        //           avgWaist: {
        //             $round: ['$avgWaist', 2]
        //           },
        //           minWaist: {
        //             $round: ['$minWaist', 2]
        //           },
        //           maxWaist: {
        //             $round: ['$maxWaist', 2]
        //           },
        //           avgCaloriesIntake: {
        //             $round: ['$avgCaloriesIntake', 2]
        //           },
        //           minCaloriesIntake: {
        //             $round: ['$minCaloriesIntake', 2]
        //           },
        //           maxCaloriesIntake: {
        //             $round: ['$maxCaloriesIntake', 2]
        //           },
        //           avgCaloriesBurned: {
        //             $round: ['$avgCaloriesBurned', 2]
        //           },
        //           minCaloriesBurned: {
        //             $round: ['$minCaloriesBurned', 2]
        //           },
        //           maxCaloriesBurned: {
        //             $round: ['$maxCaloriesBurned', 2]
        //           },
        //         },
        //       },
        //     ]).exec();

        const result = await Tracker.aggregate([
            {
              $match: {
                userId: userId,
              },
            },
            {
              $addFields: {
                // Calculate sum for each array and replace with 0 if the sum is 0
                caloriesIntakeSum: {
                  $cond: [
                    { $eq: [{ $sum: '$caloriesIntake.calories' }, 0] },
                    null,
                    { $sum: '$caloriesIntake.calories' },
                  ],
                },
                caloriesBurnedSum: {
                  $cond: [
                    { $eq: [{ $sum: '$caloriesBurned.calories' }, 0] },
                    null,
                    { $sum: '$caloriesBurned.calories' },
                  ],
                },
              },
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
                avgCaloriesIntake: { $avg: '$caloriesIntakeSum' },
                minCaloriesIntake: { $min: '$caloriesIntakeSum' },
                maxCaloriesIntake: { $max: '$caloriesIntakeSum' },
                avgCaloriesBurned: { $avg: '$caloriesBurnedSum' },
                minCaloriesBurned: { $min: '$caloriesBurnedSum' },
                maxCaloriesBurned: { $max: '$caloriesBurnedSum' },
              },
            },
            {
              $project: {
                _id: 0,
                avgBMI: { $round: ['$avgBMI', 2] },
                minBMI: { $round: ['$minBMI', 2] },
                maxBMI: { $round: ['$maxBMI', 2] },
                avgBodyFat: { $round: ['$avgBodyFat', 2] },
                minBodyFat: { $round: ['$minBodyFat', 2] },
                maxBodyFat: { $round: ['$maxBodyFat', 2] },
                avgWHR: { $round: ['$avgWHR', 2] },
                minWHR: { $round: ['$minWHR', 2] },
                maxWHR: { $round: ['$maxWHR', 2] },
                avgWeight: { $round: ['$avgWeight', 2] },
                minWeight: { $round: ['$minWeight', 2] },
                maxWeight: { $round: ['$maxWeight', 2] },
                avgHips: { $round: ['$avgHips', 2] },
                minHips: { $round: ['$minHips', 2] },
                maxHips: { $round: ['$maxHips', 2] },
                avgNeck: { $round: ['$avgNeck', 2] },
                minNeck: { $round: ['$minNeck', 2] },
                maxNeck: { $round: ['$maxNeck', 2] },
                avgWaist: { $round: ['$avgWaist', 2] },
                minWaist: { $round: ['$minWaist', 2] },
                maxWaist: { $round: ['$maxWaist', 2] },
                avgCaloriesIntake: { $round: ['$avgCaloriesIntake', 2] },
                minCaloriesIntake: { $round: ['$minCaloriesIntake', 2] },
                maxCaloriesIntake: { $round: ['$maxCaloriesIntake', 2] },
                avgCaloriesBurned: { $round: ['$avgCaloriesBurned', 2] },
                minCaloriesBurned: { $round: ['$minCaloriesBurned', 2] },
                maxCaloriesBurned: { $round: ['$maxCaloriesBurned', 2] },
              },
            },
          ]).exec();

        if(result.length === 0) {
            return res.status(404).json({
                message: 'No matching documents',
                metrics: null,
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

export const removeFieldFromTracker = async (req, res) => {
    try {
        const {
            userId,
            field,
        } = req.body;

        const updated = await Tracker.updateOne({
            userId: userId,
        }, {
            $unset: {
                [field]: 1,
            }
        })

        res.status(200).json({
            updated: updated,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}