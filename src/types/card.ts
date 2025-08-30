export type EffectType = 'attack' | 'heal' | 'cost';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CardEffect {
  type: EffectType;
  value: number;
}

export interface CardData {
  id: string;
  name: string;
  cost: number;
  effects?: CardEffect[];
  description?: string;
  imageUrl?: string;
  rarity?: Rarity;
}
