
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';

export default function Footer(){
  return (
    <footer>
      <div className='footer-content'>
        <div className='footer-section'>
          <h4>AI Nexus</h4>
          <p>
            Open-source platform combining MERN stack, AI/ML, RAG, blockchain, 
            and Web3 technologies. Built for developers, by developers.
          </p>
          <div className='footer-social'>
            <a href='https://github.com' target='_blank' rel='noopener noreferrer'><FaGithub /></a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedin /></a>
            <a href='https://discord.com' target='_blank' rel='noopener noreferrer'><FaDiscord /></a>
          </div>
        </div>

        <div className='footer-section'>
          <h4>Quick Links</h4>
          <ul className='footer-links'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='/chat'>AI Chat</Link></li>
            <li><Link to='/blockchain'>Blockchain</Link></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>Resources</h4>
          <ul className='footer-links'>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/documentation'>Documentation</Link></li>
            <li><Link to='/api-reference'>API Reference</Link></li>
            <li><Link to='/github'>GitHub Repo</Link></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>Legal</h4>
          <ul className='footer-links'>
            <li><Link to='/privacy'>Privacy Policy</Link></li>
            <li><Link to='/terms'>Terms of Service</Link></li>
            <li><Link to='/cookie-policy'>Cookie Policy</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2025 AI Nexus . Avon Tech </p>
      </div>
    </footer>
  );
}

