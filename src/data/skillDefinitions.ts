export interface SkillDefinition {
  key: string;
  label: string;
  baseStat: 'strength' | 'agility';
  description: string;
}

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  {
    key: 'closeCombat',
    label: 'CLOSE COMBAT',
    baseStat: 'strength',
    description: 'Melee attacks, defense against close combat, and grappling. Used at Adjacent range.',
  },
  {
    key: 'rangedCombat',
    label: 'RANGED COMBAT',
    baseStat: 'agility',
    description: 'Firing ranged weapons at Short range or beyond. Opposed by target Mobility when dodging.',
  },
  {
    key: 'mobility',
    label: 'MOBILITY',
    baseStat: 'agility',
    description: 'Dodge ranged attacks, break free from grapples, jump and climb.',
  },
  {
    key: 'stamina',
    label: 'STAMINA',
    baseStat: 'strength',
    description: 'Resist stun damage and survive hazardous conditions.',
  },
];
