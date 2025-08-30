import EntityList from './components/EntityList';
import styled from 'styled-components';
import Hand from './components/Hand';
import { DeckProvider } from './store/deckStore';
import { PilesProvider } from './store/pilesStore';
import { HandProvider } from './store/handStore';
import { EntityProvider } from './store/entityStore';
const initialEntities = [
  {
    id: 'enemy-1',
    name: 'Skeleton',
    health: 20,
    mana: 5,
    intention: 'Attack',
    initiative: 1,
  },
  {
    id: 'enemy-2',
    name: 'Zombie',
    health: 25,
    mana: 3,
    intention: 'Defend',
    initiative: 2,
  },
  {
    id: 'player',
    name: 'Player',
    health: 30,
    mana: 10,
    intention: 'Play Card',
    initiative: 3,
  },
];
import type { CardData } from './types/card';

const id = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const initialCards: CardData[] = [
  {
    id: id('Slash'),
    name: 'Slash',
    cost: 2,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 damage to target creature.',
    imageUrl:
      'https://png.pngtree.com/recommend-works/png-clipart/20241109/ourmid/pngtree-sword-fire-slash-curve-light-effects-rays-png-image_14331371.png',
    rarity: 'common',
  },
  {
    id: id('Fireball'),
    name: 'Fireball',
    cost: 4,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage to target creature.',
    imageUrl: 'https://skyrim.wiki.fextralife.com/file/Skyrim/Fire_spell.png',
    rarity: 'rare',
  },
  {
    id: id('Eruption'),
    name: 'Eruption',
    cost: 9,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage all creatures and destroy the terrain.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/2/21/ER_Icon_Spell_Gelmir%27s_Fury.png',
    rarity: 'epic',
  },
  {
    id: id('Bewitched Flame'),
    name: 'Bewitched Flame',
    cost: 1,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 fire damage to target creature and curses it.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/1/10/ER_Icon_Spell_Rykard%27s_Rancor.png',
    rarity: 'legendary',
  },
  {
    id: id('Slash2'),
    name: 'Slash',
    cost: 2,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 damage to target creature.',
    imageUrl:
      'https://png.pngtree.com/recommend-works/png-clipart/20241109/ourmid/pngtree-sword-fire-slash-curve-light-effects-rays-png-image_14331371.png',
    rarity: 'common',
  },
  {
    id: id('Fireball2'),
    name: 'Fireball',
    cost: 4,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage to target creature.',
    imageUrl: 'https://skyrim.wiki.fextralife.com/file/Skyrim/Fire_spell.png',
    rarity: 'rare',
  },
  {
    id: id('Eruption2'),
    name: 'Eruption',
    cost: 9,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage all creatures and destroy the terrain.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/2/21/ER_Icon_Spell_Gelmir%27s_Fury.png',
    rarity: 'epic',
  },
  {
    id: id('Bewitched Flame2'),
    name: 'Bewitched Flame',
    cost: 1,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 fire damage to target creature and curses it.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/1/10/ER_Icon_Spell_Rykard%27s_Rancor.png',
    rarity: 'legendary',
  },
  {
    id: id('Slash3'),
    name: 'Slash',
    cost: 2,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 damage to target creature.',
    imageUrl:
      'https://png.pngtree.com/recommend-works/png-clipart/20241109/ourmid/pngtree-sword-fire-slash-curve-light-effects-rays-png-image_14331371.png',
    rarity: 'common',
  },
  {
    id: id('Fireball3'),
    name: 'Fireball',
    cost: 4,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage to target creature.',
    imageUrl: 'https://skyrim.wiki.fextralife.com/file/Skyrim/Fire_spell.png',
    rarity: 'rare',
  },
  {
    id: id('Eruption3'),
    name: 'Eruption',
    cost: 9,
    effects: [{ type: 'attack', value: 6 }],
    description: 'Deal 6 fire damage all creatures and destroy the terrain.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/2/21/ER_Icon_Spell_Gelmir%27s_Fury.png',
    rarity: 'epic',
  },
  {
    id: id('Bewitched Flame3'),
    name: 'Bewitched Flame',
    cost: 1,
    effects: [{ type: 'attack', value: 2 }],
    description: 'Deal 2 fire damage to target creature and curses it.',
    imageUrl: 'https://static.wikia.nocookie.net/eldenring/images/1/10/ER_Icon_Spell_Rykard%27s_Rancor.png',
    rarity: 'legendary',
  },
];

const GameScreen = styled.section`
  height: 98vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
`;

const EntityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  height: 65vh;
`;

const HandContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  gap: 8px; 
`;

function App() {
  return (
    <EntityProvider initialEntities={initialEntities}>
      <DeckProvider initialDeck={initialCards}>
        <PilesProvider deckCards={initialCards}>
          <HandProvider>
            <GameScreen>
              <EntityContainer>
                <EntityList />
              </EntityContainer>
              <HandContainer>
                <Hand />
              </HandContainer>
            </GameScreen>
          </HandProvider>
        </PilesProvider>
      </DeckProvider>
    </EntityProvider>
  );
}

export default App;
