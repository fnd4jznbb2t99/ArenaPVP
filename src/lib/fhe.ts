/**
 * FHE Encryption Utilities for FHE Lottery
 * Uses Zama Relayer SDK 0.2.0 via CDN
 */

import { getAddress, toHex } from 'viem';

// Declare global relayerSDK from CDN
declare global {
  interface Window {
    relayerSDK?: {
      initSDK: () => Promise<void>;
      createInstance: (config: Record<string, unknown>) => Promise<any>;
      SepoliaConfig: Record<string, unknown>;
    };
    ethereum?: any;
    okxwallet?: any;
  }
}

const SDK_URL = 'https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs';

let fheInstance: any = null;
let fheInstancePromise: Promise<any> | null = null;
let sdkPromise: Promise<any> | null = null;

/**
 * Dynamically load Zama FHE SDK from CDN
 */
const loadSdk = async (): Promise<any> => {
  if (typeof window === 'undefined') {
    throw new Error('FHE SDK requires browser environment');
  }

  if (window.relayerSDK) {
    console.log('✅ SDK already loaded');
    return window.relayerSDK;
  }

  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${SDK_URL}"]`) as HTMLScriptElement | null;
      if (existing) {
        console.log('⏳ SDK script tag exists, waiting...');
        // Wait a bit for SDK to initialize
        const checkInterval = setInterval(() => {
          if (window.relayerSDK) {
            clearInterval(checkInterval);
            resolve(window.relayerSDK);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          if (window.relayerSDK) {
            resolve(window.relayerSDK);
          } else {
            reject(new Error('SDK script exists but window.relayerSDK not initialized'));
          }
        }, 5000);
        return;
      }

      console.log('📦 Loading SDK from CDN...');
      const script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;

      script.onload = () => {
        console.log('📦 Script loaded, waiting for SDK initialization...');
        // Give SDK time to initialize
        setTimeout(() => {
          if (window.relayerSDK) {
            console.log('✅ SDK initialized');
            resolve(window.relayerSDK);
          } else {
            console.error('❌ window.relayerSDK still undefined after load');
            reject(new Error('relayerSDK unavailable after load'));
          }
        }, 500);
      };

      script.onerror = () => {
        console.error('❌ Failed to load SDK script');
        reject(new Error('Failed to load FHE SDK'));
      };

      document.body.appendChild(script);
    });
  }

  return sdkPromise;
};

/**
 * Ensure handle and proof are present in encryption result and convert to hex
 */
const ensureHandlePayload = (handles: unknown[], inputProof: Uint8Array): { handle: `0x${string}`; proof: `0x${string}` } => {
  if (!Array.isArray(handles) || handles.length === 0) {
    throw new Error('Encryption did not return any handles');
  }
  if (!inputProof) {
    throw new Error('Encryption did not return inputProof');
  }

  return {
    handle: toHex(handles[0] as Uint8Array),
    proof: toHex(inputProof),
  };
};

/**
 * Initialize FHE instance with Sepolia network configuration
 */
export async function initializeFHE(provider?: any): Promise<any> {
  if (fheInstance) {
    return fheInstance;
  }

  if (typeof window === 'undefined') {
    throw new Error('FHE SDK requires browser environment');
  }

  const ethereumProvider = provider ||
    window.ethereum ||
    (window as any).okxwallet?.provider ||
    (window as any).okxwallet ||
    (window as any).coinbaseWalletExtension;

  if (!ethereumProvider) {
    throw new Error('Ethereum provider not found. Please connect your wallet first.');
  }

  console.log('🔌 Using Ethereum provider:', {
    isOKX: !!(window as any).okxwallet,
    isMetaMask: !!(window.ethereum as any)?.isMetaMask,
  });

  const sdk = await loadSdk();
  if (!sdk) {
    throw new Error('FHE SDK not available');
  }

  await sdk.initSDK();

  const config = {
    ...sdk.SepoliaConfig,
    network: ethereumProvider,
  };

  fheInstance = await sdk.createInstance(config);
  console.log('✅ FHE instance initialized for Sepolia');

  return fheInstance;
}

/**
 * Encrypt a uint32 value (for lottery numbers)
 */
export const encryptUint32 = async (
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ handle: string; proof: string }> => {
  if (value < 0 || value > 4294967295) {
    throw new Error('Value out of range for uint32 encryption');
  }

  console.log(`🔒 Encrypting uint32: ${value}`);
  const fhe = await initializeFHE();
  const checksumContract = getAddress(contractAddress);
  const checksumUser = getAddress(userAddress);

  const input = fhe.createEncryptedInput(checksumContract, checksumUser);
  input.add32(value);

  console.log('⏳ Encrypting...');
  const result = await input.encrypt();
  console.log('📦 Encryption result:', result);

  const { handles, inputProof } = result;
  const payload = ensureHandlePayload(handles, inputProof);

  console.log('✅ Encrypted uint32 successfully');
  console.log('📝 Handle:', payload.handle);
  console.log('📝 Proof length:', payload.proof.length);

  return payload;
};

/**
 * Check if FHE is initialized
 */
export function isFheInitialized(): boolean {
  return fheInstance !== null;
}

/**
 * Reset FHE instance (for testing or network changes)
 */
export function resetFheInstance(): void {
  fheInstance = null;
  fheInstancePromise = null;
}

// Backwards compatibility alias
export const initFHE = initializeFHE;
