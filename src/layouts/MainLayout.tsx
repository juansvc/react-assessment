import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.space.md} 0`};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.space.lg} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo to="/">React Assessment</Logo>
          <Nav>
            <NavLink to="/">Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <Button variant="outline" size="small" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="small" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Nav>
        </HeaderContent>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <p>&copy; {new Date().getFullYear()} React Assessment</p>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};