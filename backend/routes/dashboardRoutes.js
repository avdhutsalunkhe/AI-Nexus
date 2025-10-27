import express from 'express';
import { getDashboardStats, getUserActivity } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/activity', protect, getUserActivity);

export default router;
