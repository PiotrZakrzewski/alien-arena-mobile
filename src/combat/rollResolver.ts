import type { Weapon, Armor } from '../state/types';

// --- Deterministic dice queue for testing ---
const diceQueue: number[] = [];

export function queueDice(values: number[]): void {
  diceQueue.push(...values);
}

export function clearDiceQueue(): void {
  diceQueue.length = 0;
}

export function getDiceQueueLength(): number {
  return diceQueue.length;
}

export function rollDice(count: number): number[] {
  return Array.from({ length: count }, () => {
    if (diceQueue.length > 0) return diceQueue.shift()!;
    return Math.floor(Math.random() * 6) + 1;
  });
}

export function countSuccesses(results: number[]): number {
  return results.filter((v) => v === 6).length;
}

export interface AttackResult {
  hit: boolean;
  rawDamage: number;
  armorAbsorbed: number;
  netDamage: number;
  targetBroken: boolean;
}

export function resolveAttack(
  attackSuccesses: number,
  defenseSuccesses: number,
  weapon: Weapon,
  targetArmor: Armor,
  targetHealth: number,
): AttackResult {
  const netSuccesses = attackSuccesses - defenseSuccesses;

  if (netSuccesses <= 0) {
    return { hit: false, rawDamage: 0, armorAbsorbed: 0, netDamage: 0, targetBroken: false };
  }

  const rawDamage = weapon.damage + (netSuccesses - 1); // base damage + extra successes
  const effectiveArmor = weapon.armorPiercing
    ? Math.max(0, targetArmor.rating - 1)
    : targetArmor.rating;
  const armorAbsorbed = Math.min(effectiveArmor, rawDamage);
  const netDamage = rawDamage - armorAbsorbed;
  const remainingHealth = targetHealth - netDamage;

  return {
    hit: true,
    rawDamage,
    armorAbsorbed,
    netDamage,
    targetBroken: remainingHealth <= 0,
  };
}
