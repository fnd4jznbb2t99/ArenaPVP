const hre = require("hardhat");

async function main() {
  const contractAddress = "0xeA9ac7b02551ae9C81E4E7070E2a2C4c17a9A487";

  console.log("Creating multiple lottery rounds...");
  console.log("Contract address:", contractAddress);

  const FHELottery = await hre.ethers.getContractAt("FHELottery", contractAddress);

  const rounds = [
    {
      name: "Weekly Lottery #1",
      daysFromNow: 7,
    },
    {
      name: "Weekly Lottery #2",
      daysFromNow: 14,
    },
    {
      name: "Monthly Jackpot",
      daysFromNow: 30,
    },
  ];

  for (const round of rounds) {
    const drawTime = Math.floor(Date.now() / 1000) + (round.daysFromNow * 24 * 60 * 60);

    console.log(`\nCreating round: ${round.name}`);
    console.log("Draw time:", new Date(drawTime * 1000).toISOString());

    try {
      const tx = await FHELottery.createRound(round.name, drawTime);
      console.log("Transaction hash:", tx.hash);

      await tx.wait();
      console.log("✅ Round created successfully!");
    } catch (error) {
      console.error("❌ Failed to create round:", error.message);
    }
  }

  // Get total rounds
  const roundsCount = await FHELottery.roundsCount();
  console.log("\n📊 Total rounds:", roundsCount.toString());

  // List all rounds
  console.log("\n📋 All rounds:");
  for (let i = 0; i < roundsCount; i++) {
    const roundInfo = await FHELottery.getRound(i);
    console.log(`\nRound #${i}:`);
    console.log("- Name:", roundInfo[0]);
    console.log("- Draw Time:", new Date(Number(roundInfo[2]) * 1000).toISOString());
    console.log("- Drawn:", roundInfo[3]);
    console.log("- Tickets:", roundInfo[4].toString());
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
