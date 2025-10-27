
import React from 'react';

export default function Documentation(){
  return (
    <div className='container'>
      <h1 style={{color:'#ff6b35',marginBottom:'20px'}}>Documentation</h1>
      
      <div className='card'>
        <h3>Getting Started</h3>
        <p style={{color:'#b8b8b8',lineHeight:'1.8'}}>
          Welcome to AI Nexus documentation. This guide will help you set up and use the platform.
        </p>
      </div>

      <div className='card'>
        <h3>Installation</h3>
        <pre style={{background:'rgba(0,0,0,0.3)',padding:'15px',borderRadius:'8px',color:'#00d4ff',overflow:'auto'}}>
git clone https://github.com/yourname/ai-nexus
cd ai-nexus
docker compose up -d
        </pre>
      </div>

      <div className='card'>
        <h3>Features</h3>
        <ul style={{color:'#b8b8b8',lineHeight:'2'}}>
          <li>🤖 AI/ML Integration with Ollama and LangChain</li>
          <li>🔗 Blockchain storage using IPFS and Hardhat</li>
          <li>🔐 Secure JWT authentication</li>
          <li>📊 RAG system with ChromaDB</li>
          <li>🌐 Web3 ready with MetaMask support</li>
        </ul>
      </div>

      <div className='card'>
        <h3>Tech Stack</h3>
        <p style={{color:'#b8b8b8',lineHeight:'1.8'}}>
          Frontend: React + Framer Motion + Three.js<br/>
          Backend: Node.js + Express + MongoDB<br/>
          AI: Python + Flask + Ollama<br/>
          Blockchain: Solidity + Hardhat + IPFS<br/>
          Auth: Keycloak / Passport.js
        </p>
      </div>
    </div>
  );
}
