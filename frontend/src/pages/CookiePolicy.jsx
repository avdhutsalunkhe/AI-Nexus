
import React from 'react';

export default function CookiePolicy(){
  return (
    <div className='container'>
      <h1 style={{color:'#ff6b35',marginBottom:'20px'}}>Cookie Policy</h1>
      
      <div className='card'>
        <h3>What Are Cookies?</h3>
        <p style={{color:'#b8b8b8',lineHeight:'1.8'}}>
          Cookies are small text files stored on your device to enhance user experience and analyze site usage.
        </p>
      </div>

      <div className='card'>
        <h3>Cookies We Use</h3>
        <ul style={{color:'#b8b8b8',lineHeight:'2'}}>
          <li><strong>Essential Cookies:</strong> Required for authentication and session management</li>
          <li><strong>Performance Cookies:</strong> Help us understand how users interact with the platform</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
        </ul>
      </div>

      <div className='card'>
        <h3>Managing Cookies</h3>
        <p style={{color:'#b8b8b8',lineHeight:'1.8'}}>
          You can control and delete cookies through your browser settings. Note that disabling 
          essential cookies may affect platform functionality.
        </p>
      </div>

      <div className='card'>
        <h3>Third-Party Cookies</h3>
        <p style={{color:'#b8b8b8',lineHeight:'1.8'}}>
          We do not use third-party tracking cookies. All data remains local or on your infrastructure.
        </p>
      </div>
    </div>
  );
}
