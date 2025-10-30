const hre = require("hardhat");

async function main() {
  const contractAddress = "0xeA9ac7b02551ae9C81E4E7070E2a2C4c17a9A487";

  console.log("Creating lottery round...");
  console.log("Contract address:", contractAddress);

  const FHELottery = await hre.ethers.getContractAt("FHELottery", contractAddress);

  // Create round with draw time 7 days from now
  const drawTime = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
  const roundName = "First Round";

  console.log("Round name:", roundName);
  console.log("Draw time:", new Date(drawTime * 1000).toISOString());

  const tx = await FHELottery.createRound(roundName, drawTime);
  console.log("Transaction hash:", tx.hash);

  await tx.wait();
  console.log("✅ Round created successfully!");

  // Get total rounds
  const roundsCount = await FHELottery.roundsCount();
  console.log("Total rounds:", roundsCount.toString());

  // Get round info
  const roundInfo = await FHELottery.getRound(roundsCount - 1n);
  console.log("\nRound Info:");
  console.log("- Name:", roundInfo[0]);
  console.log("- Winning Number:", roundInfo[1].toString());
  console.log("- Draw Time:", new Date(Number(roundInfo[2]) * 1000).toISOString());
  console.log("- Drawn:", roundInfo[3]);
  console.log("- Ticket Count:", roundInfo[4].toString());
  console.log("- Winner Count:", roundInfo[5].toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
