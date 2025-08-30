import React from 'react';
import styled from 'styled-components';
import CardEffect from './CardEffect';
import type { CardEffect as Effect } from '../../types/card';

interface CardStatsProps {
  description?: string;
  effects?: Effect[];
}

const CardStatsContainer = styled.section`
  height: 100%;
  padding: 12px;
  background: #f9f9f99f;
  border-top: 1px solid #8d8d8d9f;
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardDescription = styled.p`
  margin-top: 0px;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 10px;
  padding: 4px;
  border: 1px solid #eee;
  border-image: linear-gradient(
    rgba(0, 0, 0, 0), 
    grey, 
    rgba(0, 0, 0, 0)
  ) 1 100%;
`;

const CardEffectsContainer = styled.section`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const CardStats: React.FC<CardStatsProps> = ({ description, effects }) => {
  return (
    <CardStatsContainer aria-label="Card stats">
      {description && (
        <CardDescription>
          {description}
        </CardDescription>
      )}
      {effects && effects.length > 0 && (
        <CardEffectsContainer>
          {effects.map((effect, index) => (
            <CardEffect key={`${effect.type}-${index}`} type={effect.type} value={effect.value} />
          ))}
        </CardEffectsContainer>
      )}
    </CardStatsContainer>
  );
};

export default React.memo(CardStats);
