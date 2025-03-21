import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarContainer = styled.aside`
  width: 60px;
  min-height: 100vh;
  background-color: var(--secondary-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-right: 1px solid var(--border-color);
`;

interface NavItemProps {
  isActive?: boolean;
}

const NavItemWrapper = styled.a<NavItemProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: ${props => props.isActive ? 'var(--text-primary)' : 'var(--text-secondary)'};
  font-size: 24px;
  border-radius: 4px;
  background-color: ${props => props.isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: var(--text-primary);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const Sidebar = () => {
  const router = useRouter();
  
  const navItems: NavItem[] = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/games', icon: '🎮', label: 'Games' },
    { path: '/wallet', icon: '💰', label: 'Wallet' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
    { path: '/stats', icon: '📊', label: 'Statistics' },
    { path: '/help', icon: '❓', label: 'Help' },
  ];

  return (
    <SidebarContainer>
      {navItems.map((item) => (
        <Link key={item.path} href={item.path} passHref>
          <NavItemWrapper 
            title={item.label} 
            isActive={router.pathname === item.path}
          >
            {item.icon}
          </NavItemWrapper>
        </Link>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar; 