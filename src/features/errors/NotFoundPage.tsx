import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.md};
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1;
`;

const ErrorMessage = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 30rem;
`;

export const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <ErrorDescription>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorDescription>
      <Button as={Link} to="/" size="large">
        Return to Home
      </Button>
    </NotFoundContainer>
  );
};