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
}


const rarityStyles = {
    common: css`
        border: 2px solid #ccccccc9;
    `,
    rare: css`
        border: 2px solid #dfce34ff;
    `,
    epic: css`
        border: 2px solid #a855f7;
    `,
    legendary: css`
        border: 2px solid #ff2119ff;
    `,
};

const CardContainer = styled.div<{rarity: CardProps['rarity']}>`
    background-image: url(https://media.istockphoto.com/id/182154211/photo/old-paper-textere.jpg?s=612x612&w=0&k=20&c=u674siwSw4ff0Wdqs8Z3RehcXJLnx-40mZ21z19ra78=);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
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
    rarity = 'common'
}) => {
    return (
        <CardContainer rarity={rarity}>
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