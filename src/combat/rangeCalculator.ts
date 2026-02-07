import type { RangeZone, Weapon } from '../state/types';

export function getZoneDistance(a: number, b: number): number {
  return Math.abs(a - b);
}

export function zoneDistanceToRange(distance: number): RangeZone {
  if (distance === 0) return 'adjacent';
  if (distance === 1) return 'short';
  return 'medium';
}

const RANGE_ORDER: RangeZone[] = ['adjacent', 'short', 'medium', 'long', 'extreme'];

function rangeIndex(range: RangeZone): number {
  return RANGE_ORDER.indexOf(range);
}

export function getEffectiveRange(distance: number, engaged: boolean): RangeZone {
  if (distance === 0) return engaged ? 'adjacent' : 'short';
  if (distance === 1) return 'short';
  return 'medium';
}

export function isWeaponInRange(weapon: Weapon, distance: number, engaged: boolean): boolean {
  const actualRange = getEffectiveRange(distance, engaged);
  const actualIdx = rangeIndex(actualRange);
  return actualIdx >= rangeIndex(weapon.minRange) && actualIdx <= rangeIndex(weapon.maxRange);
}
