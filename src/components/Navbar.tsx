import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useWallet } from '@/contexts/WalletContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 70px;
  background-color: var(--primary-bg);
  border-bottom: 1px solid var(--border-color);
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  span {
    margin-left: 5px;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const WalletButton = styled.button`
  background-color: var(--wallet-button);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: var(--wallet-button-hover);
  }
`;

const WalletIcon = styled.span`
  font-size: 1.1rem;
`;

const WalletDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WalletBalance = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-green);
`;

const WalletAddress = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const Navbar = () => {
  const { connected, balance, publicKey, openWalletModal, disconnectWallet } = useWallet();
  const [showMenu, setShowMenu] = useState(false);
  
  // Format the wallet address with ellipsis in the middle
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <NavbarContainer>
      <Link href="/" passHref>
        <Logo>
          ✂️ <span>Rock Paper Solana</span>
        </Logo>
      </Link>
      
      <NavActions>
        {connected ? (
          <WalletDisplayContainer>
            <WalletInfo>
              <WalletBalance>{balance.toFixed(4)} SOL</WalletBalance>
              <WalletAddress>{formatAddress(publicKey)}</WalletAddress>
            </WalletInfo>
            <WalletButton onClick={disconnectWallet}>
              <WalletIcon>🔌</WalletIcon>
              Disconnect
            </WalletButton>
          </WalletDisplayContainer>
        ) : (
          <WalletButton onClick={openWalletModal}>
            <WalletIcon>👛</WalletIcon>
            Connect Wallet
          </WalletButton>
        )}
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar; 