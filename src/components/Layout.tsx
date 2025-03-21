import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  overflow-y: auto;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Navbar />
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 