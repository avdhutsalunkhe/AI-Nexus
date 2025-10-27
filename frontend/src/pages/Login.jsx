import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from '../utils/axios';

export default function Login(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <div className='hero-section'>
      <div className='hero-content'>
        <h1>Welcome to <span className='highlight'>AI Nexus</span></h1>
        <h2>Open-Source Edition</h2>
        <p>Decentralized AI platform combining MERN stack, Machine Learning, RAG, Blockchain, and Web3 technologies.</p>
        <button className='join-btn' onClick={()=>navigate('/register')}>Join Us Today</button>
      </div>

      <div className='login-card'>
        <h3>Login</h3>
        {error && <div style={{background:'rgba(220,53,69,0.2)',color:'#ff6b6b',padding:'10px',borderRadius:'8px',marginBottom:'15px',fontSize:'14px'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required disabled={loading}/>
          </div>
          <div className='input-group'>
            <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required disabled={loading}/>
          </div>
          <button type='submit' className='login-btn' disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className='signup-link'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </div>

        <div className='login-with'>Or login with</div>
        <div className='social-icons'>
          <a onClick={handleGoogleLogin} style={{cursor:'pointer'}}><FaGoogle /></a>
          <a onClick={handleGitHubLogin} style={{cursor:'pointer'}}><FaGithub /></a>
          <a href='#'><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
}
