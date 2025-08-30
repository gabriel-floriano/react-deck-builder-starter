import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { CardData } from '../types/card';

export type DeckState = {
  cards: CardData[];
};

export type DeckAction =
  | { type: 'add_card'; payload: CardData }
  | { type: 'remove_card'; payload: { id: string } }
  | { type: 'set_deck'; payload: CardData[] };

const initialState: DeckState = { cards: [] };

function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'add_card':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'remove_card':
      return { ...state, cards: state.cards.filter(c => c.id !== action.payload.id) };
    case 'set_deck':
      return { ...state, cards: action.payload };
    default:
      return state;
  }
}

const DeckStateCtx = createContext<DeckState | null>(null);
const DeckDispatchCtx = createContext<React.Dispatch<DeckAction> | null>(null);

export const DeckProvider: React.FC<{ initialDeck?: CardData[]; children: React.ReactNode }> = ({ initialDeck = [], children }) => {
  const [state, dispatch] = useReducer(deckReducer, initialState);
  React.useEffect(() => {
    if (initialDeck.length) {
      dispatch({ type: 'set_deck', payload: initialDeck });
    }
  }, [initialDeck]);
  return (
    <DeckStateCtx.Provider value={state}>
      <DeckDispatchCtx.Provider value={dispatch}>{children}</DeckDispatchCtx.Provider>
    </DeckStateCtx.Provider>
  );
};

export const useDeckSelector = <T,>(selector: (s: DeckState) => T): T => {
  const state = useContext(DeckStateCtx);
  if (!state) throw new Error('useDeckSelector must be used within DeckProvider');
  return useMemo(() => selector(state), [state, selector]);
};

export const useDeckActions = () => {
  const dispatch = useContext(DeckDispatchCtx);
  if (!dispatch) throw new Error('useDeckActions must be used within DeckProvider');
  return {
    addCard: (card: CardData) => dispatch({ type: 'add_card', payload: card }),
  removeCard: (id: string) => dispatch({ type: 'remove_card', payload: { id } }),
    setDeck: (cards: CardData[]) => dispatch({ type: 'set_deck', payload: cards }),
  };
};

export const useDeck = () => useDeckSelector(s => s.cards);
