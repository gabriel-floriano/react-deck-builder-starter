import React from 'react';
import styled from 'styled-components';
import CardHeader from './CardHeader';
import CardStats from './CardStats';
import type { CardData } from '../../types/card';
import { rarityColors, rarityStyles, paperBackground } from './cardStyles';

interface CardProps extends CardData {
  selected: boolean;
}

const CardContainer = styled.article<{ rarity: CardData['rarity']; selected: boolean }>`
  background-image: ${paperBackground};
  border-radius: 12px;
  box-shadow: ${({ selected, rarity }) =>
    selected ? `0 8px 26px ${rarityColors[rarity || 'common']}` : '0 2px 8px rgba(0,0,0,0.12)'};

  width: 24vh;
  height: 44vh;
  overflow: hidden;
  ${({ rarity }) => rarity && rarityStyles[rarity]}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  user-select: none;
`;

const CardImage = styled.img`
  padding: 10px;
  height: 20vh;
`;

const Card: React.FC<CardProps> = ({ name, cost, effects, description, imageUrl, rarity = 'common', selected }) => {
  return (
    <CardContainer rarity={rarity} selected={selected} aria-selected={selected} role="group">
      <CardHeader name={name} cost={cost} />
      {imageUrl && (
        <CardImage src={imageUrl} alt={`${name} artwork`} loading="lazy" />
      )}
      <CardStats description={description} effects={effects} />
    </CardContainer>
  );
};

export default React.memo(Card);
