import type { Character } from '../state/types';

export interface DiceSource {
  label: string;
  count: number;
}

export interface DicePoolResult {
  sources: DiceSource[];
  baseDiceCount: number;
  stressDiceCount: number;
}

export function calculateAttackPool(
  attacker: Character,
  attackType: 'close-attack' | 'ranged-attack',
  stressLevel: number,
  targetHasCover: boolean,
  _zoneDistance: number,
): DicePoolResult {
  const sources: DiceSource[] = [];
  let baseDice = 0;

  // Base stat
  if (attackType === 'close-attack') {
    sources.push({ label: 'STRENGTH', count: attacker.strength });
    baseDice += attacker.strength;
    const skill = attacker.skills['closeCombat'] || 0;
    if (skill > 0) {
      sources.push({ label: 'CLOSE COMBAT', count: skill });
      baseDice += skill;
    }
  } else {
    sources.push({ label: 'AGILITY', count: attacker.agility });
    baseDice += attacker.agility;
    const skill = attacker.skills['rangedCombat'] || 0;
    if (skill > 0) {
      sources.push({ label: 'RANGED COMBAT', count: skill });
      baseDice += skill;
    }
  }

  // Weapon modifier
  if (attacker.weapon.modifier > 0) {
    sources.push({ label: 'WEAPON MOD', count: attacker.weapon.modifier });
    baseDice += attacker.weapon.modifier;
  }

  // Cover penalty for ranged
  if (attackType === 'ranged-attack' && targetHasCover) {
    sources.push({ label: 'TARGET COVER', count: -1 });
    baseDice -= 1;
  }

  // Minimum 1 base die
  baseDice = Math.max(1, baseDice);

  return {
    sources,
    baseDiceCount: baseDice,
    stressDiceCount: stressLevel,
  };
}

export function calculateDefensePool(
  defender: Character,
  defenseType: 'close-combat' | 'mobility',
  stressLevel: number,
): DicePoolResult {
  const sources: DiceSource[] = [];
  let baseDice = 0;

  if (defenseType === 'close-combat') {
    sources.push({ label: 'STRENGTH', count: defender.strength });
    baseDice += defender.strength;
    const skill = defender.skills['closeCombat'] || 0;
    if (skill > 0) {
      sources.push({ label: 'CLOSE COMBAT', count: skill });
      baseDice += skill;
    }
  } else {
    sources.push({ label: 'AGILITY', count: defender.agility });
    baseDice += defender.agility;
    const skill = defender.skills['mobility'] || 0;
    if (skill > 0) {
      sources.push({ label: 'MOBILITY', count: skill });
      baseDice += skill;
    }
  }

  baseDice = Math.max(1, baseDice);

  return {
    sources,
    baseDiceCount: baseDice,
    stressDiceCount: stressLevel,
  };
}
