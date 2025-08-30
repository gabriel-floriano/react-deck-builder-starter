import React from 'react';
import styled from 'styled-components';
import CardEffect from './CardEffect';

interface CardProps {
    name: string;
    cost: number;
}

const CardHeaderContainer = styled.div`
    background: #3f3f37d2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
`;

const CardName = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
`;

const CardHeader: React.FC<CardProps> = ({
    name,
    cost,
}) => {
    return (
        <CardHeaderContainer>
                <CardEffect type="cost" value={cost} />
                <CardName>{name}</CardName>
        </CardHeaderContainer>
    );
};

export default CardHeader;