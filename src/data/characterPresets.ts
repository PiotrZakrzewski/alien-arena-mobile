export interface CharacterPreset {
  id: string;
  name: string;
  strength: number;
  agility: number;
  maxHealth: number;
  skills: Record<string, number>;
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  { id: 'ripley', name: 'RIPLEY', strength: 3, agility: 4, maxHealth: 10, skills: {} },
  { id: 'dallas', name: 'DALLAS', strength: 4, agility: 3, maxHealth: 12, skills: {} },
  { id: 'ash', name: 'ASH', strength: 2, agility: 5, maxHealth: 8, skills: {} },
  { id: 'lambert', name: 'LAMBERT', strength: 2, agility: 4, maxHealth: 9, skills: {} },
];
