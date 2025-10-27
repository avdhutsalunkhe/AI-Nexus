
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <div className='container' style={{textAlign:'center',paddingTop:'80px'}}>
      <h1 style={{fontSize:'72px',color:'#ff6b35',marginBottom:'20px'}}>404</h1>
      <h2 style={{color:'#fff',marginBottom:'20px'}}>Page Not Found</h2>
      <p style={{color:'#b8b8b8',marginBottom:'30px'}}>
        The page you're looking for doesn't exist.
      </p>
      <Link to='/'><button className='join-btn'>Go Home</button></Link>
    </div>
  );
}
