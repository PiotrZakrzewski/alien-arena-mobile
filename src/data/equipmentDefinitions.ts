import type { RangeZone, Weapon } from '../state/types';

export const RANGE_ZONES: RangeZone[] = ['adjacent', 'short', 'medium', 'long', 'extreme'];

export const RANGE_ZONE_LABELS: Record<RangeZone, string> = {
  adjacent: 'ADJ',
  short: 'SHORT',
  medium: 'MED',
  long: 'LONG',
  extreme: 'EXT',
};

export const WEAPON_DEFAULTS: Record<Weapon['type'], Weapon> = {
  unarmed: { type: 'unarmed', modifier: 0, damage: 1, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
  close:   { type: 'close',   modifier: 0, damage: 1, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
  ranged:  { type: 'ranged',  modifier: 0, damage: 1, minRange: 'short',    maxRange: 'medium',   armorPiercing: false },
};

export const WEAPON_LIMITS: Record<Weapon['type'], { maxModifier: number; maxDamage: number }> = {
  unarmed: { maxModifier: 0, maxDamage: 1 },
  close:   { maxModifier: 2, maxDamage: 3 },
  ranged:  { maxModifier: 3, maxDamage: 4 },
};

export const MIN_RANGE_OPTIONS: RangeZone[] = ['adjacent', 'short', 'medium'];
export const MAX_RANGE_OPTIONS: RangeZone[] = ['short', 'medium', 'long', 'extreme'];

export const MAX_ARMOR_RATING = 3;
