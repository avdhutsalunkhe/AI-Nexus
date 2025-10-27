import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ABI = [
  "function storeRecord(string memory _ipfsHash, string memory _description) public returns (uint256)",
  "function getRecord(uint256 _id) public view returns (tuple(string ipfsHash, address owner, uint256 timestamp, string description))",
  "function getMyRecords() public view returns (uint256[])",
  "function recordCount() public view returns (uint256)"
];

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (error) {
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  } else {
    throw new Error('MetaMask not installed');
  }
};

export const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const storeOnBlockchain = async (signer, ipfsHash, description) => {
  const contract = getContract(signer);
  const tx = await contract.storeRecord(ipfsHash, description);
  await tx.wait();
  return tx.hash;
};

export const getMyRecords = async (signer) => {
  const contract = getContract(signer);
  const recordIds = await contract.getMyRecords();
  
  const records = [];
  for (let id of recordIds) {
    const record = await contract.getRecord(id);
    records.push({
      id: id.toString(),
      ipfsHash: record.ipfsHash,
      owner: record.owner,
      timestamp: new Date(record.timestamp * 1000),
      description: record.description
    });
  }
  return records;
};
