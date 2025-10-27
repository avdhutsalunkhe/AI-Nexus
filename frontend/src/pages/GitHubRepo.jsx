
import React, { useEffect } from 'react';

export default function GitHubRepo(){
  useEffect(() => {
    window.location.href = 'https://github.com/yourusername/ai-nexus';
  }, []);

  return (
    <div className='container'>
      <div className='card' style={{textAlign:'center'}}>
        <h2>Redirecting to GitHub...</h2>
        <p style={{color:'#b8b8b8',marginTop:'15px'}}>
          If not redirected, <a href='https://github.com/yourusername/ai-nexus' style={{color:'#ff6b35'}}>click here</a>
        </p>
      </div>
    </div>
  );
}
