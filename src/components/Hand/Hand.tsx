import styled from 'styled-components';
import Card from '../Card';

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

function Hand({ cardList }: HandProps) {

const HandContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const getAngleByIndexAndSize = ({ index, length }: { index: number, length: number }) => {
    const center = (length - 1) / 2;
    const offset = index - center;
    const maxRotation = Math.min(45, length * 2);
    const rotation = (offset / center) * (maxRotation / 2);
    return rotation * 1.5;
}

const CardWrapper = styled.div<{index: number, length: number}>`
  transform: rotate(${({ index, length }) => getAngleByIndexAndSize({ index, length })}deg);
  padding-top: ${({ index, length }) => {
    const center = (length - 1) / 2;
    const offset = index - center;
    const maxPadding = Math.min(60, length * 3);
    return (Math.abs(offset) * (maxPadding / center)) * 2;
  }}px;
  margin-left: ${({ index, length }) => {
    if (index === 0) return 0;
    const overlapAmount = Math.min(80, length * 8);
    return `-${overlapAmount * 2}px`;
  }};
  z-index: ${({ index, length }) => (index - length) * -1};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: rotate(0deg) scale(1.2) translateY(-20px);
    z-index: 1000;
    margin-left: ${({ index }) => index === 0 ? '40px' : '40px'};
    margin-right: 40px;
  }
`;

  return (
    <HandContainer>
      {cardList.map((card, index) => (
        <CardWrapper key={index} index={index} length={cardList.length}>
          <Card {...card} />
        </CardWrapper>
      ))}
    </HandContainer>
  )
}

export default Hand;
