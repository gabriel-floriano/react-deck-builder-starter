import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { CardData } from '../types/card';

export type PilesState = {
  drawPile: CardData[];
  discardPile: CardData[];
};

export type PilesAction =
  | { type: 'init_from_deck'; payload: CardData[] }
  | { type: 'shuffle_draw' }
  | { type: 'draw_empty_shuffle_discard' }
  | { type: 'discard_card'; payload: CardData }
  | { type: 'draw_card' }
  | { type: 'draw_card_from_pile' };

const initialState: PilesState = { drawPile: [], discardPile: [] };

function shuffle(cards: CardData[]): CardData[] {
  return [...cards].sort(() => Math.random() - 0.5);
}

function pilesReducer(state: PilesState, action: PilesAction): PilesState {
  switch (action.type) {
    case 'init_from_deck':
      return { drawPile: shuffle(action.payload), discardPile: [] };
    case 'shuffle_draw':
      return { ...state, drawPile: shuffle(state.drawPile) };
    case 'draw_empty_shuffle_discard':
      return { drawPile: shuffle(state.discardPile), discardPile: [] };
    case 'discard_card':
      return { ...state, discardPile: [...state.discardPile, action.payload] };
    case 'draw_card': {
      if (state.drawPile.length === 0) {
        return { drawPile: shuffle(state.discardPile), discardPile: [] };
      }
      return state;
    }
    case 'draw_card_from_pile': {
      if (state.drawPile.length === 0) {
        return { drawPile: shuffle(state.discardPile), discardPile: [] };
      }
      return { ...state, drawPile: state.drawPile.slice(1) };
    }
    default:
      return state;
  }
}

const PilesStateCtx = createContext<PilesState | null>(null);
const PilesDispatchCtx = createContext<React.Dispatch<PilesAction> | null>(null);

export const PilesProvider: React.FC<{ deckCards?: CardData[]; children: React.ReactNode }> = ({ deckCards = [], children }) => {
  const [state, dispatch] = useReducer(pilesReducer, { ...initialState });
  React.useEffect(() => {
    if (deckCards.length) dispatch({ type: 'init_from_deck', payload: deckCards });
  }, [deckCards]);
  return (
    <PilesStateCtx.Provider value={state}>
      <PilesDispatchCtx.Provider value={dispatch}>{children}</PilesDispatchCtx.Provider>
    </PilesStateCtx.Provider>
  );
};

export const usePilesSelector = <T,>(selector: (s: PilesState) => T): T => {
  const state = useContext(PilesStateCtx);
  if (!state) throw new Error('usePilesSelector must be used within PilesProvider');
  return useMemo(() => selector(state), [state, selector]);
};

export const usePilesActions = () => {
  const dispatch = useContext(PilesDispatchCtx);
  if (!dispatch) throw new Error('usePilesActions must be used within PilesProvider');
  return {
    shuffleDraw: () => dispatch({ type: 'shuffle_draw' }),
    drawEmptyShuffleDiscard: () => dispatch({ type: 'draw_empty_shuffle_discard' }),
    discardCard: (card: CardData) => dispatch({ type: 'discard_card', payload: card }),
    drawCard: () => dispatch({ type: 'draw_card' }),
    drawCardFromPile: () => dispatch({ type: 'draw_card_from_pile' }),
  };
};

export const useDrawPile = () => usePilesSelector(s => s.drawPile);
export const useDiscardPile = () => usePilesSelector(s => s.discardPile);
