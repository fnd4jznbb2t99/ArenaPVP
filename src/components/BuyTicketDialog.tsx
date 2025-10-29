import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useLottery } from '@/hooks/useLottery';
import { encryptUint32, initializeFHE } from '@/lib/fhe';
import { CONTRACTS } from '@/contracts/constants';
import { toast } from 'sonner';
import { Loader2, Lock, Ticket } from 'lucide-react';

interface BuyTicketDialogProps {
  open: boolean;
  onClose: () => void;
  roundId: bigint;
  roundName: string;
}

export const BuyTicketDialog = ({ open, onClose, roundId, roundName }: BuyTicketDialogProps) => {
  const { address, isConnected } = useAccount();
  const { buyTicket, isPending, isConfirming, isConfirmed } = useLottery();

  const [lotteryNumber, setLotteryNumber] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleBuyTicket = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet');
      return;
    }

    const number = parseInt(lotteryNumber);
    if (isNaN(number) || number < 0 || number > 999999) {
      toast.error('Please enter a valid lottery number (0-999999)');
      return;
    }

    try {
      setIsEncrypting(true);
      toast.info('Initializing FHE encryption...');

      // Initialize FHE
      await initializeFHE();

      toast.info('Encrypting your lottery number... 🔒');

      // Encrypt the lottery number
      const { handle, proof } = await encryptUint32(
        number,
        CONTRACTS.FHELottery,
        address
      );

      toast.success('Number encrypted! Submitting transaction...');

      // Buy ticket with encrypted number
      await buyTicket(roundId, handle as `0x${string}`, proof as `0x${string}`);

      toast.info('Transaction submitted! Waiting for confirmation...');
    } catch (error: any) {
      console.error('Buy ticket error:', error);
      toast.error(`Failed to buy ticket: ${error.message}`);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Reset and close
  const handleClose = () => {
    if (!isPending && !isEncrypting) {
      setLotteryNumber('');
      onClose();
    }
  };

  // Show success message
  if (isConfirmed) {
    setTimeout(() => {
      toast.success('Ticket purchased successfully! 🎉');
      handleClose();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Buy Ticket for {roundName}
          </DialogTitle>
          <DialogDescription>
            Enter your lucky number. It will be encrypted using FHE before submission, ensuring complete privacy.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="number" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Lottery Number (0-999999)
            </Label>
            <Input
              id="number"
              type="number"
              placeholder="Enter your lucky number"
              value={lotteryNumber}
              onChange={(e) => setLotteryNumber(e.target.value)}
              disabled={isPending || isEncrypting || isConfirming}
              min={0}
              max={999999}
            />
            <p className="text-xs text-muted-foreground">
              ✨ Your number will be fully encrypted before submission
            </p>
          </div>

          {isEncrypting && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm">Encrypting your number with FHE...</span>
            </div>
          )}

          {(isPending || isConfirming) && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm">
                {isPending ? 'Confirm in your wallet...' : 'Waiting for confirmation...'}
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending || isEncrypting || isConfirming}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBuyTicket}
            disabled={!lotteryNumber || isPending || isEncrypting || isConfirming || !isConnected}
            className="gradient-primary"
          >
            {isEncrypting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Encrypting...
              </>
            ) : isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Buying...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Buy Encrypted Ticket
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
