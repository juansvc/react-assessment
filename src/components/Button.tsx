import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  large: css`
    padding: ${({ theme }) => `${theme.space.md} ${theme.space.xl}`};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ size = 'medium' }) => sizeStyles[size]};
  ${({ variant = 'primary' }) => variantStyles[variant]};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;