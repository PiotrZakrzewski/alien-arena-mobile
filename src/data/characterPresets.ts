export interface CharacterPreset {
  id: string;
  name: string;
  description: string;
  strength: number;
  agility: number;
  maxHealth: number;
  skills: Record<string, number>;
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    id: 'ripley',
    name: 'RIPLEY',
    description: 'Resourceful warrant officer. Balances quick reflexes with steady nerves under pressure.',
    strength: 3,
    agility: 4,
    maxHealth: 10,
    skills: {},
  },
  {
    id: 'dallas',
    name: 'DALLAS',
    description: 'Seasoned captain built for endurance. Relies on brute force when diplomacy fails.',
    strength: 4,
    agility: 3,
    maxHealth: 12,
    skills: {},
  },
  {
    id: 'ash',
    name: 'ASH',
    description: 'Science officer with uncanny precision. Fragile frame but exceptional reaction speed.',
    strength: 2,
    agility: 5,
    maxHealth: 8,
    skills: {},
  },
  {
    id: 'lambert',
    name: 'LAMBERT',
    description: 'Navigator trained in evasion. Light on her feet but not built for a prolonged fight.',
    strength: 2,
    agility: 4,
    maxHealth: 9,
    skills: {},
  },
];
