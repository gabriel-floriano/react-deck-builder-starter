import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import CardWrapper from './CardWrapper';
import { useHand, useHandActions, useSelectedIndex, useCardTarget } from '../../store/handStore';
import { useDrawPile, usePilesActions } from '../../store/pilesStore';
import { useSelectedEntityId, useEntityActions } from '../../store/entityStore';

const HandContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-end;
  padding: 8px;
`;

const Hand: React.FC = () => {
  const hand = useHand();
  const selectedIndex = useSelectedIndex();
  const target = useCardTarget();
  const { selectCard, clearSelection, setTarget, useCard, discardCard, drawCard } = useHandActions();
  const selectedEntityId = useSelectedEntityId();
  const { dealDamage } = useEntityActions();
  const drawPile = useDrawPile();
  const { shuffleDraw, drawEmptyShuffleDiscard, discardCard: pilesDiscardCard, drawCardFromPile } = usePilesActions();

  const handleDraw = useCallback(() => {
    if (hand.length >= 7) return;
    let currentDrawPile = drawPile;
    if (currentDrawPile.length === 0) {
      drawEmptyShuffleDiscard();
      currentDrawPile = useDrawPile();
      if (currentDrawPile.length === 0) return;
    }
    const card = currentDrawPile[0];
    drawCard(card);
    drawCardFromPile();
  }, [hand.length, drawPile, drawCard, drawEmptyShuffleDiscard, drawCardFromPile]);

  const handleDiscard = useCallback(() => {
    if (selectedIndex === null) return;
    const card = hand[selectedIndex];
    discardCard(selectedIndex);
    pilesDiscardCard(card);
    clearSelection();
  }, [selectedIndex, hand, discardCard, pilesDiscardCard, clearSelection]);

  const handleUseCard = useCallback(() => {
    if (selectedIndex === null || !selectedEntityId) return;
    const card = hand[selectedIndex];

    const attackEffect = card.effects?.find(e => e.type === 'attack');
    if (attackEffect) {
      dealDamage(selectedEntityId, attackEffect.value);
    }
    setTarget(selectedEntityId);
    useCard(selectedIndex);
    pilesDiscardCard(card);
    clearSelection();
  }, [selectedIndex, selectedEntityId, setTarget, useCard, pilesDiscardCard, hand, dealDamage, clearSelection]);

  const onCardClick = useCallback(
    (idx: number) => {
      if (selectedIndex === idx) {
        clearSelection();
      } else {
        selectCard(idx);
      }
    },
    [selectedIndex, clearSelection, selectCard]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCardClick(idx);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = selectedIndex === null ? 0 : Math.min(hand.length - 1, selectedIndex + 1);
        selectCard(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = selectedIndex === null ? 0 : Math.max(0, selectedIndex - 1);
        selectCard(prev);
      } else if (e.key === 'Escape') {
        clearSelection();
      } else if (e.key === 'd') {
        handleDiscard();
      } else if (e.key === 'u') {
        handleUseCard();
      }
    },
    [onCardClick, selectedIndex, selectCard, clearSelection, hand.length, handleDiscard, handleUseCard]
  );

  React.useEffect(() => {
    if (hand.length < 3 && drawPile.length > 0) {
      const card = drawPile[0];
      drawCard(card);
      drawCardFromPile();
    }
  }, [hand.length, drawPile.length, drawPile, drawCard, drawCardFromPile]);

  return (
    <HandContainer role="listbox" aria-label="Player hand" aria-activedescendant={selectedIndex?.toString()}>
      {hand.map((card, index) => (
        <CardWrapper
          key={card.id}
          index={index}
          length={hand.length}
          selected={selectedIndex === index}
          isAnyCardSelected={selectedIndex !== null}
          onClick={() => onCardClick(index)}
          onKeyDown={(e) => onKeyDown(e, index)}
        >
          <Card {...card} selected={selectedIndex === index} />
        </CardWrapper>
      ))}
    </HandContainer>
  );
};

export default React.memo(Hand);
