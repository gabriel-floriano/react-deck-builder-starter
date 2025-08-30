import React from 'react';
import styled, { css } from 'styled-components';
import CardHeader from './CardHeader';
import CardStats from './CardStats';

interface CardProps {
    name: string;
    cost: number;
    effects?: Array<{
        type: 'attack' | 'heal';
        value: number;
    }>;
    description?: string;
    imageUrl?: string;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
    selected: boolean;
}

const rarityColors = {
    common: '#ccccccc9',
    rare: '#dfce34ff',
    epic: '#a855f7',
    legendary: '#ff2119ff',
};

const rarityStyles = {
    common: css`
        border: 2px solid ${rarityColors.common};
    `,
    rare: css`
        border: 2px solid ${rarityColors.rare};
    `,
    epic: css`
        border: 2px solid ${rarityColors.epic};
    `,
    legendary: css`
        border: 2px solid ${rarityColors.legendary};
    `,
};

const CardContainer = styled.div<{rarity: CardProps['rarity'], selected: boolean}>`
    background-image: url(https://media.istockphoto.com/id/182154211/photo/old-paper-textere.jpg?s=612x612&w=0&k=20&c=u674siwSw4ff0Wdqs8Z3RehcXJLnx-40mZ21z19ra78=);
    border-radius: 12px;
    box-shadow: ${({ selected, rarity }) =>
        selected
        ? `0 8px 48px ${rarityColors[rarity || 'common']}`
        : '0 2px 8px rgba(0,0,0,0.12)'};
    width: 260px;
    overflow: hidden;
    ${(props) => props.rarity && rarityStyles[props.rarity]}
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardImage = styled.div`
    text-align: center;
    padding: 10px;
    img { width: 100%; }
`;

const Card: React.FC<CardProps> = ({
    name,
    cost,
    effects,
    description,
    imageUrl,
    rarity = 'common',
    selected,
}) => {
    return (
        <CardContainer rarity={rarity} selected={selected}>
            <CardHeader name={name} cost={cost} />
            {imageUrl && (
                <CardImage>
                    <img src={imageUrl} alt={name} />
                </CardImage>
            )}
            <CardStats description={description} effects={effects} />
        </CardContainer>
    );
};

export default Card;