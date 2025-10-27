// @desc Get dashboard stats
// @route GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    // Mock stats for now - Phase 3 will connect real data
    const stats = {
      aiSessions: 247,
      blockchainRecords: 89,
      storageUsed: 45.2,
      uptime: 99.9,
      recentActivity: [
        { id: 1, type: 'AI Chat', description: 'Completed RAG query', timestamp: new Date(Date.now() - 2*60000) },
        { id: 2, type: 'Blockchain', description: 'Stored on IPFS', timestamp: new Date(Date.now() - 15*60000) },
        { id: 3, type: 'API Call', description: 'ML model inference', timestamp: new Date(Date.now() - 60*60000) }
      ]
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user activity log
// @route GET /api/dashboard/activity
export const getUserActivity = async (req, res) => {
  try {
    // Mock activity - Phase 3 will store real logs
    const activity = [
      { date: new Date(), action: 'Login', details: 'Successful login' },
      { date: new Date(Date.now() - 3600000), action: 'AI Query', details: 'Asked about blockchain' }
    ];
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
