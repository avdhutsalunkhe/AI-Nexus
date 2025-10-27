import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaTachometerAlt, FaCube, FaUser, FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar(){
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      <nav style={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className='logo'>AI Nexus</div>
        
        {!isMobile ? (
          <>
            <ul className='nav-links'>
              <li><Link to='/'><FaHome style={{marginRight:'5px'}}/>Home</Link></li>
              <li><Link to='/chat'><FaComments style={{marginRight:'5px'}}/>Chat</Link></li>
              <li><Link to='/dashboard'><FaTachometerAlt style={{marginRight:'5px'}}/>Dashboard</Link></li>
              <li><Link to='/blockchain'><FaCube style={{marginRight:'5px'}}/>Blockchain</Link></li>
            </ul>
            <div className='search-container'>
              {!user ? (
                <Link to='/login'><button><FaUser style={{marginRight:'5px'}}/>Login</button></Link>
              ) : (
                <>
                  <span style={{color:'#fff',marginRight:'10px'}}>👋 {user.name}</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </>
        ) : (
          <div style={{display:'flex',alignItems:'center',gap:'15px'}}>
            {user && <span style={{color:'#fff',fontSize:'14px'}}><FaUser/></span>}
            <div onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} style={{fontSize:'24px',cursor:'pointer',color:'#ff6b35'}}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Upgraded Mobile Menu */}
      {isMobile && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: '60px', // margin from top
            right: isMobileMenuOpen ? '0' : '-100%',
            width: '250px',
            height: 'calc(100% - 60px)',
            background: '#fff', // white background
            color: '#333',
            transition: 'right 0.35s ease-in-out',
            boxShadow: '-5px 0 12px rgba(0,0,0,0.2)',
            borderRadius: '12px 0 0 12px',
            zIndex: 999,
            padding: '20px 0',
            textAlign: 'center',
          }}
        >
          <ul className='nav-links' style={{flexDirection:'column',gap:'20px',listStyle:'none',padding:'0'}}>
            <li><Link to='/' onClick={()=>setIsMobileMenuOpen(false)} style={{color:'#333',textDecoration:'none'}}>Home</Link></li>
            <li><Link to='/chat' onClick={()=>setIsMobileMenuOpen(false)} style={{color:'#333',textDecoration:'none'}}>Chat</Link></li>
            <li><Link to='/dashboard' onClick={()=>setIsMobileMenuOpen(false)} style={{color:'#333',textDecoration:'none'}}>Dashboard</Link></li>
            <li><Link to='/blockchain' onClick={()=>setIsMobileMenuOpen(false)} style={{color:'#333',textDecoration:'none'}}>Blockchain</Link></li>
            {!user ? (
              <li><Link to='/login' onClick={()=>setIsMobileMenuOpen(false)} style={{color:'#333',textDecoration:'none'}}>Login</Link></li>
            ) : (
              <li><button className='login-btn' onClick={handleLogout} style={{
                background:'#ff6b35',
                color:'#fff',
                border:'none',
                borderRadius:'6px',
                padding:'8px 16px',
                cursor:'pointer',
                fontWeight:'600',
              }}>Logout</button></li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
