import express from 'express';
import { createTracker, deleteTracker, editTracker, getTrackedDates, getTrackerByDay, getTrackerMetrics, getUserTrackers, removeFieldFromTracker } from '../controllers/trackers.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.get('/getTrackerByDay/:day', verifyToken, getTrackerByDay);
router.post('/createTracker', verifyToken, createTracker);
router.patch('/updateTracker/:id', verifyToken, editTracker);
router.delete('/deleteTracker/:id', verifyToken, deleteTracker);
router.get('/getTrackedDates/:id', verifyToken, getTrackedDates);
router.get('/getUserTrackers/:id', verifyToken, getUserTrackers);
router.get('/getTrackerMetrics/:userId', verifyToken, getTrackerMetrics);
router.patch('/removeFieldFromTracker', verifyToken, removeFieldFromTracker);

export default router;