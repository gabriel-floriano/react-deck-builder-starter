import React from 'react';
import styled from 'styled-components';
import CardEffect from './CardEffect';

interface CardHeaderProps {
  name: string;
  cost: number;
}

const CardHeaderContainer = styled.header`
  background: #3f3f37d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  color: #fff;
`;

const CardName = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
`;

const CardHeader: React.FC<CardHeaderProps> = ({ name, cost }) => {
  return (
    <CardHeaderContainer>
      <CardEffect type="cost" value={cost} aria-label={`Mana cost ${cost}`} />
      <CardName title={name}>{name}</CardName>
    </CardHeaderContainer>
  );
};

export default React.memo(CardHeader);
