import React from 'react';
import styled from 'styled-components';
import { useEntities, useSelectedEntityId, useEntityActions } from '../store/entityStore';
import { useHand, useSelectedIndex, useHandActions } from '../store/handStore';

const EntityCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${({ selected }) => (selected ? '#f00' : '#333')};
  border-radius: 8px;
  padding: 12px;
  margin: 8px;
  background: #222;
  color: #fff;
  min-width: 120px;
  cursor: pointer;
`;

const Stat = styled.div`
  font-size: 0.9em;
  margin: 2px 0;
`;

const EntityList: React.FC = () => {
  const entities = useEntities();
  const selectedId = useSelectedEntityId();
  const { selectEntity, dealDamage } = useEntityActions();
  const hand = useHand();
  const selectedCardIndex = useSelectedIndex();
  const { useCard, clearSelection } = useHandActions();

  const handleEntityClick = (entityId: string) => {
    selectEntity(entityId);
    if (selectedCardIndex !== null) {
      const card = hand[selectedCardIndex];

      const attackEffect = card.effects?.find(e => e.type === 'attack');
      if (attackEffect) {
        dealDamage(entityId, attackEffect.value);
      }
      useCard(selectedCardIndex);
      clearSelection();
    }
  };

  return (
    <>
      {entities.map(entity => (
        <EntityCard
          key={entity.id}
          selected={selectedId === entity.id}
          onClick={() => handleEntityClick(entity.id)}
          tabIndex={0}
          aria-label={`Select ${entity.name}`}
        >
          <div><strong>{entity.name}</strong></div>
          <Stat>Health: {entity.health}</Stat>
          <Stat>Mana: {entity.mana}</Stat>
          <Stat>Intention: {entity.intention}</Stat>
          <Stat>Initiative: {entity.initiative}</Stat>
        </EntityCard>
      ))}
    </>
  );
};

export default EntityList;
