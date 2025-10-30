// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint32, ebool, externalEuint32 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title FHE Lottery
/// @notice 
contract FHELottery is SepoliaConfig {
    struct Ticket {
        address buyer;
        euint32 number;
    }

    struct LotteryRound {
        string name;
        uint256 drawTime;
        bool drawn;
        euint32 winningNumber;
        Ticket[] tickets;
        address[] winners;
    }

    LotteryRound[] public rounds;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /// @notice 
    function createRound(string calldata name, uint256 drawTime) external onlyAdmin {
        require(drawTime > block.timestamp, "Draw time must be in future");

        rounds.push();
        LotteryRound storage r = rounds[rounds.length - 1];
        r.name = name;
        r.drawTime = drawTime;
        r.drawn = false;
        r.winningNumber = FHE.asEuint32(0);
    }

    /// @notice 
    function buyTicket(uint256 roundId, externalEuint32 number, bytes memory proof) external {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];
        require(!round.drawn, "Already drawn");
        require(block.timestamp < round.drawTime, "Round closed");

        euint32 cipherNumber = FHE.fromExternal(number, proof);

        round.tickets.push(Ticket({
            buyer: msg.sender,
            number: cipherNumber
        }));

        FHE.allow(cipherNumber, msg.sender);
        FHE.allowThis(cipherNumber);
    }

    /// @notice Draw the winning number and save it (winners determined off-chain or via gateway)
    function draw(uint256 roundId, uint32 plainWinningNumber) external onlyAdmin {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];
        require(!round.drawn, "Already drawn");
        require(block.timestamp >= round.drawTime, "Cannot draw before draw time");

        euint32 winningCipher = FHE.asEuint32(plainWinningNumber);
        round.winningNumber = winningCipher;
        FHE.allowThis(winningCipher);

        round.drawn = true;
    }

    /// @notice Add winner addresses (called by admin after off-chain verification)
    function addWinners(uint256 roundId, address[] calldata winnerAddresses) external onlyAdmin {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];
        require(round.drawn, "Not drawn yet");

        for (uint256 i = 0; i < winnerAddresses.length; i++) {
            round.winners.push(winnerAddresses[i]);
        }
    }

    /// @notice 
    function getRound(uint256 roundId) external view returns (
        string memory name,
        uint32 winningNumber,
        uint256 drawTime,
        bool drawn,
        uint256 ticketCount,
        uint256 winnerCount
    ) {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];

        uint32 winNum = 0;
        if (round.drawn) {
            winNum = uint32(uint256(euint32.unwrap(round.winningNumber)));
        }

        return (
            round.name,
            winNum,
            round.drawTime,
            round.drawn,
            round.tickets.length,
            round.winners.length
        );
    }

    /// @notice 
    function getWinners(uint256 roundId) external view returns (address[] memory) {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];
        require(round.drawn, "Winners visible only after draw");
        return round.winners;
    }

    /// @notice
    function roundsCount() external view returns (uint256) {
        return rounds.length;
    }

    /// @notice Get user's ticket indices for a specific round
    function getUserTickets(uint256 roundId, address user) external view returns (uint256[] memory) {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];

        // First pass: count tickets
        uint256 ticketCount = 0;
        for (uint256 i = 0; i < round.tickets.length; i++) {
            if (round.tickets[i].buyer == user) {
                ticketCount++;
            }
        }

        // Second pass: collect indices
        uint256[] memory ticketIndices = new uint256[](ticketCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < round.tickets.length; i++) {
            if (round.tickets[i].buyer == user) {
                ticketIndices[currentIndex] = i;
                currentIndex++;
            }
        }

        return ticketIndices;
    }

    /// @notice Check if user is winner in a round
    function isWinner(uint256 roundId, address user) external view returns (bool) {
        require(roundId < rounds.length, "Round not exist");
        LotteryRound storage round = rounds[roundId];
        require(round.drawn, "Not drawn yet");

        for (uint256 i = 0; i < round.winners.length; i++) {
            if (round.winners[i] == user) {
                return true;
            }
        }
        return false;
    }
}
