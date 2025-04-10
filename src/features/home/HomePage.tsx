import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.md};
  
  ${({ theme }) => theme.mq.md} {
    font-size: calc(${({ theme }) => theme.fontSizes.xxxl} * 1.5);
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.space.lg};
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};
  
  ${({ theme }) => theme.mq.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${({ theme }) => theme.mq.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-grow: 1;
`;

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <>
      <HeroSection>
        <HeroTitle>Welcome to the React Assessment</HeroTitle>
        <HeroSubtitle>
          A modern single-page application built with React and TypeScript
        </HeroSubtitle>
        <Button 
          size="large" 
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Login to Continue'}
        </Button>
      </HeroSection>
      
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Key Features</h2>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>User Authentication</FeatureTitle>
            <FeatureDescription>
              Secure login functionality with token-based authentication
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Data Fetching</FeatureTitle>
            <FeatureDescription>
              Efficient API integration using React Query for data management
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Dynamic Rendering</FeatureTitle>
            <FeatureDescription>
              Content updates based on user interactions and state changes
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Responsive Design</FeatureTitle>
            <FeatureDescription>
              Optimized layout for various screen sizes using modern CSS techniques
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </section>
    </>
  );
};