import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/chat', {
        message: input
      });
      
      const aiMessage = { 
        text: response.data.response || response.data.answer || 'No response', 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        text: 'Error: Could not connect to AI service. Make sure it\'s running on port 5001.', 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px 60px', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      height: '85vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <h1 style={{ color: '#fff', fontSize: '36px', marginBottom: '10px' }}>
        AI Chat
      </h1>
      <p style={{ color: '#b8b8b8', marginBottom: '30px' }}>
        Chat with AI powered by Llama 3.2 (Ollama)
      </p>

      <div className='card' style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px', 
          marginBottom: '20px' 
        }}>
          {messages.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              color: '#7a7a7a', 
              marginTop: '50px' 
            }}>
              <FaRobot size={50} style={{ marginBottom: '20px' }} />
              <p>Start a conversation with AI</p>
              <p style={{ fontSize: '12px', marginTop: '10px' }}>
                Powered by Ollama + LangChain
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: '15px',
                padding: '15px',
                background: msg.sender === 'user' 
                  ? 'rgba(255,107,53,0.2)' 
                  : 'rgba(0,212,255,0.2)',
                borderRadius: '12px',
                maxWidth: '80%',
                marginLeft: msg.sender === 'user' ? 'auto' : '0',
                marginRight: msg.sender === 'ai' ? 'auto' : '0'
              }}
            >
              <p style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
              </p>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: '15px',
                background: 'rgba(0,212,255,0.2)',
                borderRadius: '12px',
                maxWidth: '80%'
              }}
            >
              <p style={{ color: '#fff', margin: 0 }}>
                <FaRobot style={{ marginRight: '10px' }} />
                AI is thinking...
              </p>
            </motion.div>
          )}
        </div>

        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your message...'
            disabled={loading}
            style={{
              flex: 1,
              padding: '15px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button
            type='submit'
            disabled={loading || !input.trim()}
            className='login-btn'
            style={{ 
              minWidth: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                <FaPaperPlane />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
