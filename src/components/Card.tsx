import styled from 'styled-components';

interface CardProps {
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: 'none' | 'small' | 'medium' | 'large';
}

const getPadding = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'none':
      return '0';
    case 'small':
      return ({ theme }) => theme.space.sm;
    case 'large':
      return ({ theme }) => theme.space.xl;
    case 'medium':
    default:
      return ({ theme }) => theme.space.lg;
  }
};

const getShadow = (elevation: CardProps['elevation']) => {
  switch (elevation) {
    case 'none':
      return 'none';
    case 'small':
      return ({ theme }) => theme.shadows.sm;
    case 'large':
      return ({ theme }) => theme.shadows.lg;
    case 'medium':
    default:
      return ({ theme }) => theme.shadows.md;
  }
};

export const Card = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ elevation = 'medium' }) => getShadow(elevation)};
  padding: ${({ padding = 'medium' }) => getPadding(padding)};
`;