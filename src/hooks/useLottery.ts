import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, ABIS } from '../contracts/constants';

export function useLottery() {
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  /**
   * Buy a ticket with encrypted number
   */
  const buyTicket = async (
    roundId: bigint,
    encryptedNumber: `0x${string}`,
    proof: `0x${string}`
  ) => {
    return writeContract({
      address: CONTRACTS.FHELottery,
      abi: ABIS.FHELottery,
      functionName: 'buyTicket',
      args: [roundId, encryptedNumber, proof],
    });
  };

  return {
    buyTicket,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error: writeError,
  };
}

/**
 * Hook to get round information
 */
export function useRound(roundId: bigint) {
  return useReadContract({
    address: CONTRACTS.FHELottery,
    abi: ABIS.FHELottery,
    functionName: 'getRound',
    args: [roundId],
  });
}

/**
 * Hook to get rounds count
 */
export function useRoundsCount() {
  return useReadContract({
    address: CONTRACTS.FHELottery,
    abi: ABIS.FHELottery,
    functionName: 'roundsCount',
  });
}

/**
 * Hook to get winners
 */
export function useWinners(roundId: bigint) {
  return useReadContract({
    address: CONTRACTS.FHELottery,
    abi: ABIS.FHELottery,
    functionName: 'getWinners',
    args: [roundId],
  });
}

/**
 * Hook to get user's tickets for a round
 */
export function useUserTickets(roundId: bigint, userAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACTS.FHELottery,
    abi: ABIS.FHELottery,
    functionName: 'getUserTickets',
    args: roundId !== undefined && userAddress ? [roundId, userAddress] : undefined,
    query: {
      enabled: roundId !== undefined && !!userAddress,
    },
  });
}

/**
 * Hook to check if user is winner
 */
export function useIsWinner(roundId: bigint, userAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACTS.FHELottery,
    abi: ABIS.FHELottery,
    functionName: 'isWinner',
    args: roundId !== undefined && userAddress ? [roundId, userAddress] : undefined,
    query: {
      enabled: roundId !== undefined && !!userAddress,
    },
  });
}
