import { css } from 'styled-components';
import type { Rarity } from '../../types/card';

export const rarityColors: Record<Rarity, string> = {
  common: '#ccccccc9',
  rare: '#dfce34ff',
  epic: '#a855f7',
  legendary: '#ff2119ff',
};

export const rarityStyles: Record<Rarity, ReturnType<typeof css>> = {
  common: css`border: 2px solid ${rarityColors.common};`,
  rare: css`border: 2px solid ${rarityColors.rare};`,
  epic: css`border: 2px solid ${rarityColors.epic};`,
  legendary: css`border: 2px solid ${rarityColors.legendary};`,
};

export const paperBackground =
  'url(https://media.istockphoto.com/id/182154211/photo/old-paper-textere.jpg?s=612x612&w=0&k=20&c=u674siwSw4ff0Wdqs8Z3RehcXJLnx-40mZ21z19ra78=)';
