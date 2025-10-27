import axios from 'axios';

const AI_SERVICE_URL = 'http://localhost:5001';

export const sendMessage = async (req, res) => {
  try {
    const { message, useRAG } = req.body;
    
    const endpoint = useRAG ? '/chat/rag' : '/chat';
    const { data } = await axios.post(`${AI_SERVICE_URL}${endpoint}`, { message });
    
    // TODO: Save chat history to MongoDB
    
    res.json({
      userMessage: message,
      aiResponse: data.response,
      model: data.model,
      ragUsed: data.rag_used || false,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'AI service error',
      error: error.message 
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    // TODO: Fetch from MongoDB
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
