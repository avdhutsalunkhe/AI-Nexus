
import React from 'react';

export default function APIReference(){
  return (
    <div className='container'>
      <h1 style={{color:'#ff6b35',marginBottom:'20px'}}>API Reference</h1>
      
      <div className='card'>
        <h3>Authentication Endpoints</h3>
        <div style={{color:'#b8b8b8',lineHeight:'2'}}>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/auth/register</p>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/auth/login</p>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/auth/logout</p>
        </div>
      </div>

      <div className='card'>
        <h3>AI Endpoints</h3>
        <div style={{color:'#b8b8b8',lineHeight:'2'}}>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/ai/chat - Chat with LLM</p>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/ai/rag - Query RAG system</p>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/ai/cv - Computer vision analysis</p>
        </div>
      </div>

      <div className='card'>
        <h3>Blockchain Endpoints</h3>
        <div style={{color:'#b8b8b8',lineHeight:'2'}}>
          <p><strong style={{color:'#00d4ff'}}>POST</strong> /api/blockchain/store - Store on IPFS</p>
          <p><strong style={{color:'#00d4ff'}}>GET</strong> /api/blockchain/retrieve/:hash - Retrieve data</p>
        </div>
      </div>

      <div className='card'>
        <h3>Example Request</h3>
        <pre style={{background:'rgba(0,0,0,0.3)',padding:'15px',borderRadius:'8px',color:'#00d4ff',overflow:'auto'}}>
{`fetch('/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    message: 'Hello AI'
  })
})`}
        </pre>
      </div>
    </div>
  );
}
