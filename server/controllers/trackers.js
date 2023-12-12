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