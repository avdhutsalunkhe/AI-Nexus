import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import axios from '../utils/axios';

export default function ContactUs(){
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/contact', formData);
      setStatus(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1 style={{color:'#ff6b35',marginBottom:'20px'}}>Contact Us</h1>
      
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'30px'}}>
        <div className='card'>
          <h3>Get in Touch</h3>
          
          {status && (
            <div style={{
              padding:'10px',
              marginBottom:'15px',
              background: status.includes('Error') ? 'rgba(220,53,69,0.2)' : 'rgba(76,175,80,0.2)',
              color: status.includes('Error') ? '#ff6b6b' : '#4caf50',
              borderRadius:'8px',
              fontSize:'14px'
            }}>
              {status}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <input 
                type='text' 
                placeholder='Your Name' 
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                required
                disabled={loading}
              />
            </div>
            <div className='input-group'>
              <input 
                type='email' 
                placeholder='Your Email' 
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                required
                disabled={loading}
              />
            </div>
            <div className='input-group'>
              <textarea 
                placeholder='Your Message' 
                value={formData.message}
                onChange={(e)=>setFormData({...formData,message:e.target.value})}
                required
                disabled={loading}
                rows='5'
                style={{
                  width:'100%',
                  padding:'12px 15px',
                  background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:'8px',
                  color:'#fff',
                  fontSize:'14px',
                  outline:'none',
                  resize:'vertical'
                }}
              />
            </div>
            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className='card'>
          <h3>Connect With Us</h3>
          <div style={{marginTop:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'15px',marginBottom:'20px',color:'#b8b8b8'}}>
              <FaEnvelope size={24} style={{color:'#ff6b35'}}/>
              <span>support@ainexus.dev</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'15px',marginBottom:'20px',color:'#b8b8b8'}}>
              <FaGithub size={24} style={{color:'#ff6b35'}}/>
              <a href='https://github.com' style={{color:'#b8b8b8'}}>github.com/ai-nexus</a>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'15px',marginBottom:'20px',color:'#b8b8b8'}}>
              <FaDiscord size={24} style={{color:'#ff6b35'}}/>
              <span>Join our Discord community</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'15px',color:'#b8b8b8'}}>
              <FaTwitter size={24} style={{color:'#ff6b35'}}/>
              <span>@ainexus_dev</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
