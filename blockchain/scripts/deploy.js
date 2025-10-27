const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying DataStorage contract...");
  
  const DataStorage = await hre.ethers.getContractFactory("DataStorage");
  const dataStorage = await DataStorage.deploy();
  await dataStorage.deployed();
  
  console.log("DataStorage deployed to:", dataStorage.address);
  
  const contractData = {
    address: dataStorage.address,
    chainId: 31337
  };
  
  const backendPath = path.join(__dirname, "../../backend/config");
  if (!fs.existsSync(backendPath)) {
    fs.mkdirSync(backendPath, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(backendPath, "contract-address.json"),
    JSON.stringify(contractData, null, 2)
  );
  
  console.log("Contract saved!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
