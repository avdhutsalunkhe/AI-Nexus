import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (token && name && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify({ name, email, token }));
      
      setTimeout(() => {
        navigate('/dashboard');
        window.location.reload();
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>
      <h2>Authentication Successful! ??</h2>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
