import React from 'react';

export default function About(){
  return (
    <div className='container'>
      <h2>About AI Nexus</h2>
      <div className='card'>
        <p>AI Nexus is a fully open-source platform combining MERN stack, AI/ML, RAG, blockchain, and Web3 technologies.</p>
        <p style={{marginTop:'1rem'}}>Built with: React, Node.js, Flask, MongoDB, Ollama, Hardhat, IPFS.</p>
      </div>
    </div>
  );
}