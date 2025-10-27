import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from '../utils/axios';

export default function Register(){
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      alert('Registration successful! Welcome to AI Nexus.');
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='hero-section'>
      <div className='hero-content'>
        <h1>Join <span className='highlight'>AI Nexus</span></h1>
        <h2>Start Building Today</h2>
        <p>Create your free account and access powerful AI tools, decentralized storage, and Web3 integration.</p>
      </div>

      <div className='login-card'>
        <h3>Register</h3>
        {error && <div style={{background:'rgba(220,53,69,0.2)',color:'#ff6b6b',padding:'10px',borderRadius:'8px',marginBottom:'15px',fontSize:'14px'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input type='text' placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)} required disabled={loading}/>
          </div>
          <div className='input-group'>
            <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required disabled={loading}/>
          </div>
          <div className='input-group'>
            <input type='password' placeholder='Password (min 6 chars)' value={password} onChange={(e)=>setPassword(e.target.value)} required minLength='6' disabled={loading}/>
          </div>
          <button type='submit' className='login-btn' disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className='signup-link'>
          Already have an account? <Link to='/login'>Login</Link>
        </div>

        <div className='login-with'>Or sign up with</div>
        <div className='social-icons'>
          <a href='#'><FaGoogle /></a>
          <a href='#'><FaGithub /></a>
          <a href='#'><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
}
