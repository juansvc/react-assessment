import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const LoginContainer = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.md};
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
`;

const LoginForm = styled.form`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const LoginHelp = styled.p`
  margin-top: ${({ theme }) => theme.space.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{email?: string; password?: string}>({});
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  return (
    <LoginContainer>
      <Card>
        <LoginTitle>Login</LoginTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={formErrors.email}
            fullWidth
            placeholder="Enter your email"
            disabled={loading}
            autoComplete="email"
          />
          
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            fullWidth
            placeholder="Enter your password"
            disabled={loading}
            autoComplete="current-password"
          />
          
          <Button 
            type="submit" 
            fullWidth 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </LoginForm>
        
        <LoginHelp>
          For this assessment, you can use any email and password combination.
        </LoginHelp>
      </Card>
    </LoginContainer>
  );
};