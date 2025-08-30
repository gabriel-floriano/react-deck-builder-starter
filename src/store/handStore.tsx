import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { CardData } from '../types/card';

export type HandState = {
  hand: CardData[];
  selectedIndex: number | null;
  target: string | null;
};

export type HandAction =
  | { type: 'draw_card'; payload: CardData }
  | { type: 'select_card'; payload: number | null }
  | { type: 'discard_card'; payload: number }
  | { type: 'set_target'; payload: string | null }
  | { type: 'use_card'; payload: number }
  | { type: 'clear_selection' };

const MAX_HAND = 7;
const initialState: HandState = { hand: [], selectedIndex: null, target: null };

function handReducer(state: HandState, action: HandAction): HandState {
  switch (action.type) {
    case 'draw_card':
      if (state.hand.length >= MAX_HAND) return state;
      return { ...state, hand: [...state.hand, action.payload] };
    case 'select_card':
      return { ...state, selectedIndex: action.payload };
    case 'discard_card': {
      const nextHand = state.hand.filter((_, i) => i !== action.payload);
      let selectedIndex = state.selectedIndex;
      if (selectedIndex !== null) {
        if (action.payload === selectedIndex) selectedIndex = null;
        else if (action.payload < selectedIndex) selectedIndex = Math.max(0, selectedIndex - 1);
        if (nextHand.length === 0) selectedIndex = null;
      }
      return { ...state, hand: nextHand, selectedIndex };
    }
    case 'set_target':
      return { ...state, target: action.payload };
    case 'use_card': {
      const nextHand = state.hand.filter((_, i) => i !== action.payload);
      return { ...state, hand: nextHand, selectedIndex: null, target: null };
    }
    case 'clear_selection':
      return { ...state, selectedIndex: null, target: null };
    default:
      return state;
  }
}

const HandStateCtx = createContext<HandState | null>(null);
const HandDispatchCtx = createContext<React.Dispatch<HandAction> | null>(null);

export const HandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(handReducer, initialState);
  return (
    <HandStateCtx.Provider value={state}>
      <HandDispatchCtx.Provider value={dispatch}>{children}</HandDispatchCtx.Provider>
    </HandStateCtx.Provider>
  );
};

export const useHandSelector = <T,>(selector: (s: HandState) => T): T => {
  const state = useContext(HandStateCtx);
  if (!state) throw new Error('useHandSelector must be used within HandProvider');
  return useMemo(() => selector(state), [state, selector]);
};

export const useHandActions = () => {
  const dispatch = useContext(HandDispatchCtx);
  if (!dispatch) throw new Error('useHandActions must be used within HandProvider');
  return {
    drawCard: (card: CardData) => dispatch({ type: 'draw_card', payload: card }),
    selectCard: (index: number | null) => dispatch({ type: 'select_card', payload: index }),
    discardCard: (index: number) => dispatch({ type: 'discard_card', payload: index }),
    setTarget: (target: string | null) => dispatch({ type: 'set_target', payload: target }),
    useCard: (index: number) => dispatch({ type: 'use_card', payload: index }),
    clearSelection: () => dispatch({ type: 'clear_selection' }),
  };
};

export const useHand = () => useHandSelector(s => s.hand);
export const useSelectedIndex = () => useHandSelector(s => s.selectedIndex);
export const useCardTarget = () => useHandSelector(s => s.target);
