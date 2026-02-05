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
    description: 'Skill in melee fighting, grappling, and hand-to-hand combat.',
  },
  {
    key: 'rangedCombat',
    label: 'RANGED COMBAT',
    baseStat: 'agility',
    description: 'Proficiency with firearms, thrown weapons, and ranged attacks.',
  },
  {
    key: 'mobility',
    label: 'MOBILITY',
    baseStat: 'agility',
    description: 'Ability to move quickly, dodge attacks, and navigate obstacles.',
  },
  {
    key: 'stamina',
    label: 'STAMINA',
    baseStat: 'strength',
    description: 'Physical endurance and resistance to fatigue and injury.',
  },
];
