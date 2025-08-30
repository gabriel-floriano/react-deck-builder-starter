import React from 'react';
import styled from 'styled-components';
import type { EffectType } from '../../types/card';

interface CardEffectProps {
  type: EffectType;
  value: number;
  'aria-label'?: string;
}

const StyledCardEffect = styled.span<{ type: EffectType }>`
  font-size: 1.2rem;
  font-weight: 600;
  background: ${({ type }) =>
    type === 'cost'
      ? 'radial-gradient(circle,rgba(0, 42, 255, 0.45) 0%, rgba(0, 21, 125, 0.45) 60%, rgba(0, 21, 125, 0.45) 70%, rgba(11, 69, 140, 0.45) 85%, rgba(0, 21, 125, 0.45) 100%)'
      : type === 'attack'
      ? 'linear-gradient(90deg, #ff6a3d, #ffb347)'
      : type === 'heal'
      ? 'linear-gradient(90deg, #a8ff78, #78ffd6)'
      : '#f3f4f6'};
  color: ${({ type }) => (type === 'cost' ? 'white' : '#222')};
  border-radius: ${({ type }) => (type === 'cost' ? '180px' : '6px')};
  padding: 0.2rem 0.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CardEffect: React.FC<CardEffectProps> = ({ type, value, ...rest }) => {
  return (
    <StyledCardEffect type={type} {...rest}>
      {value}
    </StyledCardEffect>
  );
};

export default React.memo(CardEffect);
