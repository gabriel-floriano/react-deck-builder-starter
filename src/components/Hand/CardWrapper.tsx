import styled from 'styled-components';

const getAngleByIndexAndSize = ({ index, length }: { index: number, length: number }) => {
  const center = (length - 1) / 2;
  const offset = index - center;
  const maxRotation = Math.min(45, length * 2);
  const rotation = (offset / center) * (maxRotation / 2);
  return rotation * 1.5;
};

const StyledCardWrapper = styled.div<{
  index: number;
  length: number;
  selected: boolean;
  isAnyCardSelected: boolean;
}>`
  transform: ${({ index, length, selected }) =>
    selected
      ? `rotate(0deg) scale(1.25) translateY(-20px)`
      : `rotate(${getAngleByIndexAndSize({ index, length })}deg) scale(0.85)`};
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
  margin-right: ${({ index, length }) => {
    if (index === 0) return 0;
    const overlapAmount = Math.min(80, length * 8);
    return `-${overlapAmount * 2}px`;
  }};
  z-index: ${({ index, length, selected }) => (selected ? 1000 : (index - length) * -1)};
  transition: all 0.3s ease;
  cursor: pointer;
  ${({ isAnyCardSelected }) => !isAnyCardSelected && `&:hover {
    transform: rotate(0deg) scale(1.1) translateY(-10px);
    z-index: 1000;
    margin-left: 40px;
    margin-right: 40px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }`}
`;

interface CardWrapperProps {
  index: number;
  length: number;
  selected: boolean;
  isAnyCardSelected: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ index, length, selected, isAnyCardSelected, onClick, children }) => (
  <StyledCardWrapper
    index={index}
    length={length}
    selected={selected}
    isAnyCardSelected={isAnyCardSelected}
    onClick={onClick}
  >
    {children}
  </StyledCardWrapper>
);

export default CardWrapper;
