import FHELotteryABI from './FHELotteryABI.json';

// Contract addresses from environment variables
export const CONTRACTS = {
  FHELottery: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
};

// ABIs
export const ABIS = {
  FHELottery: FHELotteryABI,
};

// Chain configuration
export const SEPOLIA_CHAIN_ID = Number(import.meta.env.VITE_SEPOLIA_CHAIN_ID) || 11155111;
