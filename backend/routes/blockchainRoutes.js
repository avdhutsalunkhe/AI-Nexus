import express from 'express';
import { storeData, getRecords } from '../controllers/blockchainController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/store', protect, storeData);
router.get('/records', protect, getRecords);

export default router;
