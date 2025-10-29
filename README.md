# FHE Lottery - Privacy-Preserving Lottery DApp

A fully homomorphic encryption (FHE) powered lottery system where lottery numbers remain encrypted, ensuring complete privacy for participants.

## Features

✅ **FHE Encrypted Lottery Numbers** - Your numbers stay private until reveal
✅ **Multiple Lottery Rounds** - Create and participate in different rounds
✅ **Real-time Round Status** - View active, closed, and drawn rounds
✅ **Winner Verification** - Fair and transparent winner selection
✅ **Beautiful UI** - Modern, responsive design with glassmorphism effects

## Technology Stack

### Smart Contracts
- Solidity 0.8.24
- Zama fhEVM 0.8.0
- Hardhat development environment

### Frontend
- React + TypeScript + Vite
- Wagmi v2 + RainbowKit
- shadcn/ui components
- Zama Relayer SDK 0.2.0
- Tailwind CSS

## Quick Start

### Prerequisites
- Node.js >= 18
- Yarn or npm
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

### Installation

```bash
# Install dependencies
yarn install

# Install contract dependencies
cd contracts
yarn install
cd ..
```

### Deploy Contract

1. **Configure environment**:
```bash
cd contracts
cp .env.example .env
# Edit .env and add your private key
```

2. **Deploy to Sepolia**:
```bash
yarn deploy:sepolia
```

3. **Note the contract address** from the output

### Configure Frontend

1. **Create frontend .env**:
```bash
cp .env.example .env
```

2. **Update contract address**:
```env
VITE_CONTRACT_ADDRESS=0x... # Your deployed contract address
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### Run Development Server

```bash
yarn dev
```

Visit http://localhost:8080

## How It Works

### FHE Encryption Flow

1. **User enters lottery number** (0-999999)
2. **Frontend encrypts** the number using Zama FHE SDK
3. **Encrypted number + proof** submitted to contract
4. **Number stays encrypted** on-chain
5. **Admin draws winning number** (plaintext)
6. **Contract compares** encrypted tickets with winning number
7. **Winners determined** off-chain or via gateway
8. **Winners publicly announced**

### Smart Contract Functions

#### For Users
- `buyTicket(roundId, encryptedNumber, proof)` - Buy ticket with FHE encrypted number

#### For Admin
- `createRound(name, drawTime)` - Create new lottery round
- `draw(roundId, winningNumber)` - Set winning number and mark as drawn
- `addWinners(roundId, winners[])` - Add verified winners

#### View Functions
- `getRound(roundId)` - Get round information
- `getWinners(roundId)` - Get list of winners (after draw)
- `roundsCount()` - Total number of rounds

## Project Structure

```
ArenaPVP/
├── contracts/               # Smart contracts
│   ├── src/
│   │   └── ArenaPVP.sol    # Main FHELottery contract
│   ├── scripts/
│   │   └── deploy.js       # Deployment script
│   └── hardhat.config.js
│
├── src/                    # Frontend
│   ├── components/
│   │   ├── ActiveRounds.tsx      # Display lottery rounds
│   │   ├── BuyTicketDialog.tsx   # FHE encrypted ticket purchase
│   │   ├── Hero.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/
│   │   └── useLottery.ts   # Contract interaction hooks
│   ├── lib/
│   │   └── fhe.ts          # FHE encryption utilities
│   └── contracts/
│       ├── constants.ts
│       └── FHELotteryABI.json
│
└── README.md
```

## FHE Implementation Details

### Encryption

```typescript
// Frontend: Encrypt lottery number
import { encryptUint32 } from '@/lib/fhe';

const { handle, proof } = await encryptUint32(
  lotteryNumber,
  contractAddress,
  userAddress
);
```

### Contract Processing

```solidity
// Contract: Import and store encrypted number
euint32 cipherNumber = FHE.fromExternal(number, proof);
round.tickets.push(Ticket({
    buyer: msg.sender,
    number: cipherNumber
}));
```

### Key Features

- **Privacy**: Numbers remain encrypted until reveal
- **Fairness**: Winning number comparison done homomorphically
- **Transparency**: Winners publicly verifiable after draw
- **Security**: FHE ensures no one can see ticket numbers

## Development

### Compile Contracts

```bash
cd contracts
npx hardhat compile
```

### Run Tests

```bash
cd contracts
npx hardhat test
```

### Deploy Locally

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy to local
npx hardhat run scripts/deploy.js --network localhost
```

## Configuration

### CORS Headers

The project requires specific CORS headers for SharedArrayBuffer support (FHE WASM):

```typescript
// vite.config.ts
server: {
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  },
}
```

### Network Configuration

Sepolia testnet is pre-configured. To use other networks:

1. Add network to `contracts/hardhat.config.js`
2. Update frontend `.env` with RPC URL and Chain ID
3. Deploy contract to new network

## Troubleshooting

### Issue: FHE Encryption Fails

**Cause**: Relayer might be down or CORS headers missing

**Solution**:
- Check browser console for errors
- Verify CORS headers in dev tools
- Wait for relayer recovery

### Issue: Transaction Reverts

**Possible causes**:
- Round doesn't exist
- Round already drawn
- Past deadline
- Invalid lottery number range

**Solution**: Check round status and number validity

### Issue: Contract Not Found

**Solution**:
- Verify contract address in `.env`
- Ensure you're on Sepolia network
- Check wallet connection

## Security Considerations

1. **Private Key**: Never commit `.env` files
2. **Admin Access**: Only admin can create rounds and draw
3. **Number Range**: Validated on-chain (0-999999)
4. **FHE Proof**: Verified by contract

## Roadmap

- [ ] Add prize pool management
- [ ] Implement automatic winner verification via gateway
- [ ] Multi-chain support
- [ ] NFT tickets
- [ ] History and statistics

## License

MIT

## Resources

- [Zama Documentation](https://docs.zama.ai/)
- [fhEVM Documentation](https://docs.zama.ai/fhevm)
- [Relayer SDK](https://docs.zama.ai/fhevm/relayer-sdk)
- [Hardhat](https://hardhat.org/)
- [Wagmi](https://wagmi.sh/)

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Zama FHE technology
