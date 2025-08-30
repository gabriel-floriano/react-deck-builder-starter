import React from 'react';
import styled from 'styled-components';
import { useDrawPile, useDiscardPile, usePilesActions } from '../store/pilesStore';

const PilesContainer = styled.div`
  background: #222;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  margin: 8px 0;
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const PilesView: React.FC = () => {
  const drawPile = useDrawPile();
  const discardPile = useDiscardPile();
  const { shuffleDraw, drawEmptyShuffleDiscard } = usePilesActions();

  return (
    <PilesContainer>
      <h3>Draw Pile ({drawPile.length})</h3>
      <button onClick={shuffleDraw}>Shuffle Draw Pile</button>
      {drawPile.map(card => (
        <CardRow key={card.id}>
          <span>{card.name}</span>
        </CardRow>
      ))}
      <h3>Discard Pile ({discardPile.length})</h3>
      <button onClick={drawEmptyShuffleDiscard}>Shuffle Discard Into Draw</button>
      {discardPile.map(card => (
        <CardRow key={card.id}>
          <span>{card.name}</span>
        </CardRow>
      ))}
    </PilesContainer>
  );
};

export default PilesView;
