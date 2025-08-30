import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { CardData, CardId } from '../types/card';

type CardsState = {
  cards: CardData[];
  selectedIndex: number | null;
};

type Action =
  | { type: 'set_cards'; payload: CardData[] }
  | { type: 'add_card'; payload: CardData }
  | { type: 'update_card'; payload: { id: CardId; patch: Partial<CardData> } }
  | { type: 'remove_card'; payload: { id: CardId } }
  | { type: 'select_index'; payload: number | null }
  | { type: 'clear_selection' };

const initialState: CardsState = { cards: [], selectedIndex: null };

function reducer(state: CardsState, action: Action): CardsState {
  switch (action.type) {
    case 'set_cards':
      return { ...state, cards: action.payload, selectedIndex: null };
    case 'add_card':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'update_card':
      return {
        ...state,
        cards: state.cards.map(c => (c.id === action.payload.id ? { ...c, ...action.payload.patch } : c)),
      };
    case 'remove_card': {
      const idx = state.cards.findIndex(c => c.id === action.payload.id);
      const next = state.cards.filter(c => c.id !== action.payload.id);

      let selectedIndex = state.selectedIndex;
      if (selectedIndex !== null) {
        if (idx === selectedIndex) selectedIndex = null;
        else if (idx < selectedIndex) selectedIndex = Math.max(0, selectedIndex - 1);
        if (next.length === 0) selectedIndex = null;
      }
      return { ...state, cards: next, selectedIndex };
    }
    case 'select_index':
      return { ...state, selectedIndex: action.payload };
    case 'clear_selection':
      return { ...state, selectedIndex: null };
    default:
      return state;
  }
}

const CardsStateCtx = createContext<CardsState | null>(null);
const CardsDispatchCtx = createContext<React.Dispatch<Action> | null>(null);

export const CardsProvider: React.FC<{ initialCards?: CardData[]; children: React.ReactNode }> = ({
  initialCards = [],
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, cards: initialCards });
  return (
    <CardsStateCtx.Provider value={state}>
      <CardsDispatchCtx.Provider value={dispatch}>{children}</CardsDispatchCtx.Provider>
    </CardsStateCtx.Provider>
  );
};

export const useCardsSelector = <T,>(selector: (s: CardsState) => T): T => {
  const state = useContext(CardsStateCtx);
  if (!state) throw new Error('useCardsSelector must be used within CardsProvider');

  return useMemo(() => selector(state), [state, selector]);
};

export const useCardsActions = () => {
  const dispatch = useContext(CardsDispatchCtx);
  if (!dispatch) throw new Error('useCardsActions must be used within CardsProvider');

  return {
    setCards: (cards: CardData[]) => dispatch({ type: 'set_cards', payload: cards }),
    addCard: (card: CardData) => dispatch({ type: 'add_card', payload: card }),
    updateCard: (id: CardId, patch: Partial<CardData>) =>
      dispatch({ type: 'update_card', payload: { id, patch } }),
    removeCard: (id: CardId) => dispatch({ type: 'remove_card', payload: { id } }),
    selectIndex: (index: number | null) => dispatch({ type: 'select_index', payload: index }),
    clearSelection: () => dispatch({ type: 'clear_selection' }),
  };
};

export const useCards = () => useCardsSelector(s => s.cards);
export const useSelectedIndex = () => useCardsSelector(s => s.selectedIndex);
