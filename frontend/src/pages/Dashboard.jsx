import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaRobot, FaCube } from 'react-icons/fa';
import axios from '../utils/axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUser(userInfo);

      const { data } = await axios.get('/api/dashboard/stats');
      setStats(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
      // Set fallback data if backend fails
      setStats({
        chatMessages: 0,
        blockchainRecords: 0,
        apiCalls: 0,
        activeUsers: 1
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '40px 60px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        color: '#fff',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div className="loader" style={{
            border: '4px solid rgba(255,255,255,0.1)',
            borderTop: '4px solid #ff6b35',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', marginBottom: '5px' }}>
          Welcome, {user?.name || 'User'}!
        </h1>
        <p style={{ color: '#b8b8b8' }}>Your AI Nexus Dashboard</p>
        {error && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            background: 'rgba(255,193,7,0.2)',
            color: '#ffc107',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            ?? {error} (showing cached data)
          </div>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <motion.div 
          className='card' 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.05) 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaRobot size={32} style={{ color: '#ff6b35' }} />
            <div>
              <h3 style={{ color: '#ff6b35', fontSize: '28px', margin: 0 }}>
                {stats?.chatMessages || 0}
              </h3>
              <p style={{ color: '#b8b8b8', fontSize: '14px', margin: 0 }}>Chat Messages</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className='card' 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,212,255,0.05) 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaCube size={32} style={{ color: '#00d4ff' }} />
            <div>
              <h3 style={{ color: '#00d4ff', fontSize: '28px', margin: 0 }}>
                {stats?.blockchainRecords || 0}
              </h3>
              <p style={{ color: '#b8b8b8', fontSize: '14px', margin: 0 }}>Blockchain Records</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className='card' 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0.05) 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaChartLine size={32} style={{ color: '#4caf50' }} />
            <div>
              <h3 style={{ color: '#4caf50', fontSize: '28px', margin: 0 }}>
                {stats?.apiCalls || 0}
              </h3>
              <p style={{ color: '#b8b8b8', fontSize: '14px', margin: 0 }}>API Calls</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className='card' 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'linear-gradient(135deg, rgba(156,39,176,0.2) 0%, rgba(156,39,176,0.05) 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaUsers size={32} style={{ color: '#9c27b0' }} />
            <div>
              <h3 style={{ color: '#9c27b0', fontSize: '28px', margin: 0 }}>
                {stats?.activeUsers || 1}
              </h3>
              <p style={{ color: '#b8b8b8', fontSize: '14px', margin: 0 }}>Active Users</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className='card' 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.4 }}
      >
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Recent Activity</h2>
        <div style={{ color: '#b8b8b8' }}>
          <div style={{ 
            padding: '15px', 
            background: 'rgba(255,255,255,0.03)', 
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              ? Logged in successfully - {new Date().toLocaleString()}
            </p>
          </div>
          {stats?.chatMessages > 0 && (
            <div style={{ 
              padding: '15px', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <p style={{ margin: 0, fontSize: '14px' }}>
                ?? Sent {stats.chatMessages} chat messages
              </p>
            </div>
          )}
          {stats?.blockchainRecords > 0 && (
            <div style={{ 
              padding: '15px', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '8px'
            }}>
              <p style={{ margin: 0, fontSize: '14px' }}>
                ?? Stored {stats.blockchainRecords} records on blockchain
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
