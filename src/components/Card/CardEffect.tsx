import React from 'react';
import styled from 'styled-components';

interface CardEffectProps {
    type: 'attack' | 'heal' | 'cost';
    value: number;
}

const StyledCardEffect = styled.span<{ type: 'attack' | 'heal' | 'cost' }>`
    font-size: 1.2rem;
    font-weight: 500;
    background: ${({ type }) =>
        type === 'cost' ? 'radial-gradient(circle,rgba(0, 42, 255, 0.45) 0%, rgba(0, 21, 125, 0.45) 60%, rgba(0, 21, 125, 0.45) 70%, rgba(11, 69, 140, 0.45) 85%, rgba(0, 21, 125, 0.45) 100%);' :
        type === 'attack' ? 'linear-gradient(90deg, #ff6a3d, #ffb347)' :
        type === 'heal' ? 'linear-gradient(90deg, #a8ff78, #78ffd6)' :
        '#f3f4f6'};
    color: ${({type}) => type === 'cost' ? 'white' : '#222'};
    border-radius: ${({type}) => type === 'cost' ? '180px' : '4px'};
    padding: 0.4px 0.6rem;
`;

const CardEffect: React.FC<CardEffectProps> = ({
    type,
    value,
}) => {
    return (
        <StyledCardEffect type={type}>
            {value}
        </StyledCardEffect>
    );
};

export default CardEffect;