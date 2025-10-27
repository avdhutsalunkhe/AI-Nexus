import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaBrain, FaTrash, FaCopy, FaDownload, FaExpand, FaMicrophone, FaStop, FaPause, FaPlay, FaLightbulb, FaCode, FaImage, FaFileAlt } from 'react-icons/fa';
import axios from '../utils/axios';
import '../styles/chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useRAG, setUseRAG] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Explain AI Nexus features",
    "How to integrate blockchain?",
    "What is RAG system?",
    "Setup guide for beginners"
  ]);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e, customMessage = null) => {
    e?.preventDefault();
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    const userMessage = { 
      role: 'user', 
      content: messageToSend, 
      timestamp: new Date(),
      id: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const { data } = await axios.post('/api/chat/message', { 
        message: messageToSend,
        useRAG 
      });
      
      // Simulate typing effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const aiMessage = { 
        role: 'ai', 
        content: data.aiResponse, 
        timestamp: new Date(),
        model: data.model,
        ragUsed: data.ragUsed,
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMsg = { 
        role: 'ai', 
        content: 'Error connecting to AI service. Make sure Flask server is running on port 5001.', 
        timestamp: new Date(),
        id: Date.now() + 1,
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(null, suggestion);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // Show toast notification
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      setMessages([]);
    }
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.txt`;
    a.click();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      filter: 'blur(10px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const typingVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className={`chat-wrapper ${fullscreen ? 'fullscreen' : ''} ${theme}`}>
      {/* Enhanced Header */}
      <motion.div 
        className="chat-header-enhanced"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-left">
          <motion.div 
            className="ai-avatar-container"
            animate={{ 
              boxShadow: loading 
                ? ['0 0 0 0 rgba(255, 107, 53, 0.7)', '0 0 0 20px rgba(255, 107, 53, 0)']
                : '0 0 0 0 rgba(255, 107, 53, 0)'
            }}
            transition={{ duration: 1.5, repeat: loading ? Infinity : 0 }}
          >
            <FaRobot className="ai-avatar-icon" />
          </motion.div>
          <div className="header-info">
            <h1 className="chat-title">AI Nexus Assistant</h1>
            <div className="chat-subtitle">
              <span className="status-indicator"></span>
              <span>Powered by Ollama Llama 3.2</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rag-toggle-btn"
            onClick={() => setUseRAG(!useRAG)}
          >
            <FaBrain className={useRAG ? 'active' : ''} />
            <span>RAG {useRAG ? 'ON' : 'OFF'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn"
            onClick={exportChat}
            title="Export Chat"
          >
            <FaDownload />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn"
            onClick={clearChat}
            title="Clear Chat"
          >
            <FaTrash />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-btn"
            onClick={() => setFullscreen(!fullscreen)}
            title="Toggle Fullscreen"
          >
            <FaExpand />
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <FaRobot /> Chat
        </button>
        <button 
          className={`tab-btn ${activeTab === 'prompts' ? 'active' : ''}`}
          onClick={() => setActiveTab('prompts')}
        >
          <FaLightbulb /> Prompts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaFileAlt /> History
        </button>
      </div>
      
      {/* Main Chat Container */}
      <div className="chat-container-enhanced" ref={chatContainerRef}>
        {/* Messages Area */}
        <div className="messages-area">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="empty-state-icon"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <FaRobot size={80} />
                </motion.div>
                <h2 className="empty-state-title">Welcome to AI Nexus</h2>
                <p className="empty-state-subtitle">
                  Start a conversation with our intelligent assistant
                </p>
                
                {/* Suggestion Pills */}
                <div className="suggestion-pills">
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      className="suggestion-pill"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <FaLightbulb />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div 
                  key={msg.id}
                  className={`message-wrapper ${msg.role}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  onMouseEnter={() => setHoveredMessage(msg.id)}
                  onMouseLeave={() => setHoveredMessage(null)}
                >
                  <div className={`message-container ${msg.role} ${msg.isError ? 'error' : ''}`}>
                    <motion.div 
                      className="message-avatar"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {msg.role === 'ai' ? (
                        <FaRobot className="avatar-icon ai" />
                      ) : (
                        <FaUser className="avatar-icon user" />
                      )}
                    </motion.div>
                    
                    <div className="message-content-wrapper">
                      <div className="message-header-info">
                        <span className="message-sender">
                          {msg.role === 'ai' ? 'AI Assistant' : 'You'}
                        </span>
                        <span className="message-time">
                          {msg.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <div className="message-bubble">
                        <p className="message-text">{msg.content}</p>
                        
                        {msg.ragUsed && (
                          <motion.div 
                            className="rag-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <FaBrain />
                            <span>RAG Enhanced</span>
                          </motion.div>
                        )}

                        {msg.model && (
                          <div className="model-badge">
                            <FaCode />
                            <span>{msg.model}</span>
                          </div>
                        )}
                      </div>

                      {/* Message Actions */}
                      <AnimatePresence>
                        {hoveredMessage === msg.id && (
                          <motion.div 
                            className="message-actions"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button 
                              className="action-btn"
                              onClick={() => copyMessage(msg.content)}
                              title="Copy message"
                            >
                              <FaCopy />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                className="message-wrapper ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="message-container ai">
                  <div className="message-avatar">
                    <FaRobot className="avatar-icon ai" />
                  </div>
                  <div className="message-content-wrapper">
                    <div className="typing-indicator">
                      <motion.span variants={typingVariants} animate="animate" />
                      <motion.span variants={typingVariants} animate="animate" style={{ animationDelay: '0.2s' }} />
                      <motion.span variants={typingVariants} animate="animate" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <motion.div 
          className="input-area-enhanced"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={sendMessage} className="input-form">
            <div className="input-container">
              <motion.button
                type="button"
                className="input-action-btn"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                title="Attach file"
              >
                <FaImage />
              </motion.button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={loading}
                className="message-input"
              />

              <motion.button
                type="button"
                className={`input-action-btn voice-btn ${isRecording ? 'recording' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleRecording}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </motion.button>

              <motion.button 
                type="submit"
                disabled={loading || !input.trim()}
                className="send-btn-enhanced"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
                <span>Send</span>
              </motion.button>
            </div>

            {/* Character Counter */}
            <div className="input-footer">
              <span className="char-counter">{input.length} / 2000</span>
              <span className="input-hint">
                Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Particles Background Effect */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
