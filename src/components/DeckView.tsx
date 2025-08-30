import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeck, useDeckActions } from '../store/deckStore';
import type { CardData } from '../types/card';

const DeckContainer = styled.div`
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

const DeckView: React.FC = () => {
  const deck = useDeck();
  const { addCard, removeCard } = useDeckActions();
  const [newCardName, setNewCardName] = useState('');

  const handleAddCard = () => {
    if (!newCardName.trim()) return;
    const card: CardData = {
      id: newCardName.toLowerCase().replace(/\s+/g, '-'),
      name: newCardName,
      cost: 1,
      effects: [{ type: 'attack', value: 1 }],
      description: 'Custom card',
      rarity: 'common',
    };
    addCard(card);
    setNewCardName('');
  };

  return (
    <DeckContainer>
      <h3>Deck ({deck.length} cards)</h3>
      <div>
        <input
          type="text"
          value={newCardName}
          onChange={e => setNewCardName(e.target.value)}
          placeholder="Card name"
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      {deck.map(card => (
        <CardRow key={card.id}>
          <span>{card.name}</span>
          <button onClick={() => removeCard(card.id)}>Remove</button>
        </CardRow>
      ))}
    </DeckContainer>
  );
};

export default DeckView;
