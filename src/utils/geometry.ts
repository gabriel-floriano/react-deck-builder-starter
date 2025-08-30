/**
 * Fan-out rotation for a hand of cards.
 * Handles edge cases like length === 1 (no rotation).
 */
export const getAngleByIndexAndSize = (index: number, length: number): number => {
  if (length <= 1) return 0;
  const center = (length - 1) / 2;
  const offset = index - center;
  const maxRotation = Math.min(45, length * 2);
  const rotation = (offset / center) * (maxRotation / 2);
  return rotation;
};
