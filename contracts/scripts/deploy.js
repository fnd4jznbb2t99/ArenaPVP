const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying FHE Lottery Contract...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy FHELottery
  console.log("Deploying FHELottery...");
  const FHELottery = await hre.ethers.getContractFactory("FHELottery");
  const lottery = await FHELottery.deploy();
  await lottery.waitForDeployment();
  const lotteryAddress = await lottery.getAddress();
  console.log("✅ FHELottery deployed to:", lotteryAddress);

  // Create test round
  console.log("\n📝 Creating test round...");
  const deadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days from now
  const tx = await lottery.createRound("First Round", deadline);
  await tx.wait();
  console.log("✅ Test round created with deadline:", new Date(deadline * 1000).toLocaleString());

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    FHELottery: lotteryAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    testRoundDeadline: deadline
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `${hre.network.name}.json`;
  fs.writeFileSync(
    path.join(deploymentsDir, filename),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📋 === Deployment Summary ===");
  console.log("Network:", hre.network.name);
  console.log("FHELottery:", lotteryAddress);
  console.log("Deployer:", deployer.address);
  console.log(`\n💾 Deployment saved to: deployments/${filename}`);

  console.log("\n📝 Next steps:");
  console.log(`1. Update frontend .env with:`);
  console.log(`   VITE_CONTRACT_ADDRESS=${lotteryAddress}`);
  console.log(`2. Start frontend: cd .. && npm run dev`);
  console.log(`3. Buy tickets with encrypted numbers!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
