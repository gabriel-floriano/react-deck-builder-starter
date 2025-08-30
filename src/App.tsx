import './App.css'
import Hand from './components/Hand'


function App() {

const cardList = [{
  name: "Slash",
  cost: 2,
  effects: [{ type: 'attack' as const, value: 2 }],
  description: "Deal 2 damage to target creature.",
  imageUrl: "https://png.pngtree.com/recommend-works/png-clipart/20241109/ourmid/pngtree-sword-fire-slash-curve-light-effects-rays-png-image_14331371.png",
  rarity: "common" as const
}, {
  name: "Fireball",
  cost: 4,
  effects: [{ type: 'attack' as const, value: 6 }],
  description: "Deal 6 fire damage to target creature.",
  imageUrl: "https://skyrim.wiki.fextralife.com/file/Skyrim/Fire_spell.png",
  rarity: "rare" as const
}, {
  name: "Eruption",
  cost: 9,
  effects: [{ type: 'attack' as const, value: 6 }],
  description: "Deal 6 fire damage all creatures and destroy the terrain.",
  imageUrl: "https://static.wikia.nocookie.net/eldenring/images/2/21/ER_Icon_Spell_Gelmir%27s_Fury.png",
  rarity: "epic" as const
}, {
  name: "Bewitched Flame",
  cost: 1,
  effects: [{ type: 'attack' as const, value: 2 }],
  description: "Deal 2 fire damage to target creature and curses it.",
  imageUrl: "https://static.wikia.nocookie.net/eldenring/images/1/10/ER_Icon_Spell_Rykard%27s_Rancor.png",
  rarity: "legendary" as const
}];


  return (
    <Hand cardList={cardList} />
  )
}

export default App
