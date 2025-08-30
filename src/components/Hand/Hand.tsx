import styled from 'styled-components';
import Card from '../Card';
import CardWrapper from './CardWrapper';

interface HandProps {
    cardList: Array<{
        name: string;
        cost: number;
        effects?: Array<{
            type: 'attack' | 'heal';
            value: number;
        }>;
        description?: string;
        imageUrl?: string;
        rarity?: 'common' | 'rare' | 'epic' | 'legendary';
    }>;
}


import { useState } from 'react';

const HandContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;


function Hand({ cardList }: HandProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <HandContainer>
      {cardList.map((card, index) => (
        <CardWrapper
          key={index}
          index={index}
          length={cardList.length}
          selected={selectedIndex === index}
          isAnyCardSelected={selectedIndex !== null}
          onClick={() => setSelectedIndex(index)}
        >
          <Card
            {...card}
            selected={selectedIndex === index}
          />
        </CardWrapper>
      ))}
    </HandContainer>
  );
}

export default Hand;
