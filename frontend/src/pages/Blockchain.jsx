import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCube, FaUpload, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { connectWallet, storeOnBlockchain, getMyRecords } from '../utils/web3';

export default function Blockchain() {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (wallet) {
      loadRecords();
    }
  }, [wallet]);

  const handleConnectWallet = async () => {
    try {
      const { signer, address } = await connectWallet();
      setWallet({ signer, address });
      setMessage(`Connected: ${address.substring(0,6)}...${address.substring(38)}`);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const loadRecords = async () => {
    try {
      const data = await getMyRecords(wallet.signer);
      setRecords(data);
    } catch (error) {
      console.error('Load records error:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !wallet) return;

    setUploading(true);
    setMessage('');

    try {
      const mockIpfsHash = 'Qm' + Math.random().toString(36).substring(2, 15);
      const txHash = await storeOnBlockchain(wallet.signer, mockIpfsHash, description || file.name);
      
      setMessage(`Success! TX: ${txHash.substring(0,10)}...`);
      setFile(null);
      setDescription('');
      loadRecords();
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', fontSize: '36px', marginBottom: '10px' }}>Blockchain Storage</h1>
      <p style={{ color: '#b8b8b8', marginBottom: '30px' }}>
        Store data on Ethereum blockchain (Local Hardhat Network)
      </p>

      {!wallet && (
        <button onClick={handleConnectWallet} className='login-btn' style={{ marginBottom: '30px' }}>
          <FaWallet style={{ marginRight: '10px' }} />
          Connect MetaMask
        </button>
      )}

      {wallet && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          <motion.div className='card' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '20px' }}>
              <FaUpload style={{ marginRight: '10px' }} />
              Upload to Blockchain
            </h3>
            
            <form onSubmit={handleUpload}>
              <input
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  width: '100%',
                  padding: '15px',
                  marginBottom: '15px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <input
                type='text'
                placeholder='Description (optional)'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  marginBottom: '15px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <button type='submit' className='login-btn' disabled={uploading || !file}>
                {uploading ? 'Storing on Blockchain...' : 'Store on Blockchain'}
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: '15px',
                padding: '10px',
                background: message.includes('Success') ? 'rgba(76,175,80,0.2)' : 'rgba(220,53,69,0.2)',
                color: message.includes('Success') ? '#4caf50' : '#ff6b6b',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                {message}
              </div>
            )}
          </motion.div>

          <motion.div className='card' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '20px' }}>
              <FaCube style={{ marginRight: '10px' }} />
              Your Records ({records.length})
            </h3>
            
            {records.length === 0 ? (
              <p style={{ color: '#b8b8b8' }}>No records yet. Upload your first file!</p>
            ) : (
              records.map((record) => (
                <div key={record.id} style={{
                  padding: '15px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheckCircle style={{ color: '#4caf50' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>
                        {record.description}
                      </p>
                      <p style={{ color: '#b8b8b8', fontSize: '12px' }}>
                        IPFS: {record.ipfsHash}
                      </p>
                      <p style={{ color: '#7a7a7a', fontSize: '11px' }}>
                        {record.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
