import React from 'react';
import styled from 'styled-components';
import { getAngleByIndexAndSize } from '../../utils/geometry';

const StyledCardWrapper = styled.div<{
    index: number;
    length: number;
    selected: boolean;
    isAnyCardSelected: boolean;
}>`
    transform: ${({ index, length, selected }) =>
        selected ? `rotate(0deg) scale(1.25) translateY(-20px)` : `rotate(${getAngleByIndexAndSize(index, length)}deg) scale(0.85)`};

    margin-left: ${({ index, length }) => {
        if (index === 0) return 0;

        const baseOverlap = 70;
        const overlap = baseOverlap * (length / 9); 

        return `-${overlap}px`;
    }};

    margin-right: ${({ index, length }) => {
    if (index === length - 1) return 0;

        const baseOverlap = 70;
        const overlap = baseOverlap * (length / 9); 

        return `-${overlap}px`;
    }};

    margin-bottom: ${({ index, length }) => {
    if (length <= 1) return 0;

    const center = (length - 1) / 2;

    const distanceFromCenter = Math.abs(index - center) / center;

    const intensity = 1 - distanceFromCenter;

    const maxOverlap = Math.min(80, length * center);
    const overlapAmount = maxOverlap * intensity;

    return `${overlapAmount}px`;
    }};

    z-index: ${({ index, length, selected }) => (selected ? 1000 : (index - length) * -1)};
    transition: all 0.3s ease;
    cursor: pointer;

    ${({ isAnyCardSelected }) =>
        !isAnyCardSelected &&
        `
        &:hover {
            transform: rotate(0deg) scale(1.1) translateY(-10px);
            z-index: 1000;
            box-shadow: 0 40px 60px rgba(0, 0, 0, 1);
        }
    `}
`;

export interface CardWrapperProps {
  index: number;
  length: number;
  selected: boolean;
  isAnyCardSelected: boolean;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  index,
  length,
  selected,
  isAnyCardSelected,
  onClick,
  onKeyDown,
  children,
}) => (
  <StyledCardWrapper
    index={index}
    length={length}
    selected={selected}
    isAnyCardSelected={isAnyCardSelected}
    onClick={onClick}
    onKeyDown={onKeyDown}
    role="button"
    tabIndex={0}
    aria-pressed={selected}
    aria-label={`Card ${index + 1} ${selected ? '(selected)' : ''}`}
  >
    {children}
  </StyledCardWrapper>
);

export default React.memo(CardWrapper);
