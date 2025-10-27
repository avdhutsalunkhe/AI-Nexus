import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// @desc Health check
// @route GET /api/health
router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// @desc API Info
// @route GET /api/info
router.get('/info', (req, res) => {
  res.json({
    name: 'AI Nexus API',
    version: '1.0.0',
    description: 'Full-stack AI platform with blockchain integration',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

export default router;
