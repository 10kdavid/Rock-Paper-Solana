import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useConnection,
  useWallet as useSolanaWallet,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextValue {
  balance: number;
  connected: boolean;
  publicKey: string | null;
  connectWallet: (providerName?: string) => void;
  disconnectWallet: () => void;
  openWalletModal: () => void;
}

const WalletContext = createContext<WalletContextValue>({
  balance: 0,
  connected: false,
  publicKey: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  openWalletModal: () => {}
});

export const useWallet = () => useContext(WalletContext);

export interface WalletProviderProps {
  children: ReactNode;
}

const WalletContextProvider = ({ children }: WalletProviderProps) => {
  const { wallet, connect, disconnect, connected, publicKey } = useSolanaWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState(0);

  // Open the wallet modal
  const openWalletModal = () => {
    setVisible(true);
  };

  // Connect to wallet based on provider name
  const connectWallet = async (providerName?: string) => {
    try {
      if (providerName) {
        // Check if Phantom is installed if that's requested
        if (providerName === 'phantom') {
          const isPhantomInstalled = window?.solana?.isPhantom || false;
          if (!isPhantomInstalled) {
            window.open('https://phantom.app/', '_blank');
            return;
          }
        }
      }
      
      // Just open the modal to let user choose wallet
      openWalletModal();
      
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Fetch and update balance when connected
  useEffect(() => {
    if (connected && publicKey) {
      const fetchBalance = async () => {
        try {
          const walletBalance = await connection.getBalance(publicKey);
          setBalance(walletBalance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };

      fetchBalance();
      // Set up interval to update balance
      const intervalId = setInterval(fetchBalance, 15000);
      
      return () => clearInterval(intervalId);
    } else {
      setBalance(0);
    }
  }, [connected, publicKey, connection]);

  return (
    <WalletContext.Provider 
      value={{ 
        balance, 
        connected, 
        publicKey: publicKey?.toString() || null, 
        connectWallet, 
        disconnectWallet,
        openWalletModal
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  // Set up Solana network
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);

  // Initialize wallet adapters
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}; 