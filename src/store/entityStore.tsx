import React, { createContext, useContext, useReducer, useMemo } from 'react';

export interface Entity {
  id: string;
  name: string;
  health: number;
  mana: number;
  intention?: string;
  initiative?: number;
}

export type EntityState = {
  entities: Entity[];
  selectedEntityId: string | null;
};

export type EntityAction =
  | { type: 'set_entities'; payload: Entity[] }
  | { type: 'select_entity'; payload: string | null }
  | { type: 'deal_damage'; payload: { id: string; amount: number } }
  | { type: 'set_intention'; payload: { id: string; intention: string } }
  | { type: 'set_initiative'; payload: { id: string; initiative: number } };

const initialState: EntityState = {
  entities: [],
  selectedEntityId: null,
};

function entityReducer(state: EntityState, action: EntityAction): EntityState {
  switch (action.type) {
    case 'set_entities':
      return { ...state, entities: action.payload };
    case 'select_entity':
      return { ...state, selectedEntityId: action.payload };
    case 'deal_damage':
      return {
        ...state,
        entities: state.entities.map(e =>
          e.id === action.payload.id
            ? { ...e, health: Math.max(0, e.health - action.payload.amount) }
            : e
        ),
      };
    case 'set_intention':
      return {
        ...state,
        entities: state.entities.map(e =>
          e.id === action.payload.id ? { ...e, intention: action.payload.intention } : e
        ),
      };
    case 'set_initiative':
      return {
        ...state,
        entities: state.entities.map(e =>
          e.id === action.payload.id ? { ...e, initiative: action.payload.initiative } : e
        ),
      };
    default:
      return state;
  }
}

const EntityStateCtx = createContext<EntityState | null>(null);
const EntityDispatchCtx = createContext<React.Dispatch<EntityAction> | null>(null);

export const EntityProvider: React.FC<{ initialEntities?: Entity[]; children: React.ReactNode }> = ({ initialEntities = [], children }) => {
  const [state, dispatch] = useReducer(entityReducer, { ...initialState, entities: initialEntities });
  return (
    <EntityStateCtx.Provider value={state}>
      <EntityDispatchCtx.Provider value={dispatch}>{children}</EntityDispatchCtx.Provider>
    </EntityStateCtx.Provider>
  );
};

export const useEntitySelector = <T,>(selector: (s: EntityState) => T): T => {
  const state = useContext(EntityStateCtx);
  if (!state) throw new Error('useEntitySelector must be used within EntityProvider');
  return useMemo(() => selector(state), [state, selector]);
};

export const useEntityActions = () => {
  const dispatch = useContext(EntityDispatchCtx);
  if (!dispatch) throw new Error('useEntityActions must be used within EntityProvider');
  return {
    setEntities: (entities: Entity[]) => dispatch({ type: 'set_entities', payload: entities }),
    selectEntity: (id: string | null) => dispatch({ type: 'select_entity', payload: id }),
    dealDamage: (id: string, amount: number) => dispatch({ type: 'deal_damage', payload: { id, amount } }),
    setIntention: (id: string, intention: string) => dispatch({ type: 'set_intention', payload: { id, intention } }),
    setInitiative: (id: string, initiative: number) => dispatch({ type: 'set_initiative', payload: { id, initiative } }),
  };
};

export const useEntities = () => useEntitySelector(s => s.entities);
export const useSelectedEntityId = () => useEntitySelector(s => s.selectedEntityId);
