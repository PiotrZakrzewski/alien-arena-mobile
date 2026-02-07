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

export function isWeaponInRange(weapon: Weapon, distance: number): boolean {
  const actualRange = zoneDistanceToRange(distance);
  const actualIdx = rangeIndex(actualRange);
  return actualIdx >= rangeIndex(weapon.minRange) && actualIdx <= rangeIndex(weapon.maxRange);
}
