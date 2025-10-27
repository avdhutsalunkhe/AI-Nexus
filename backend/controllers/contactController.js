// @desc Send contact message
// @route POST /api/contact
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Phase 4 could integrate email service
    console.log('Contact message:', { name, email, message });
    
    res.json({ 
      success: true,
      message: 'Message received! We will get back to you soon.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
