import { Career } from '../state/types';

export interface CharacterPreset {
  id: string;
  name: string;
  description: string;
  career: Career;
  strength: number;
  agility: number;
  maxHealth: number;
  skills: Record<string, number>;
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    id: 'marine',
    name: 'MARINE',
    description: 'Trained for frontline combat. Reliable with any weapon, unshakeable under fire.',
    career: 'marine',
    strength: 4,
    agility: 3,
    maxHealth: 4,
    skills: {},
  },
  {
    id: 'marshal',
    name: 'MARSHAL',
    description: 'Frontier law officer. Skilled at subduing suspects and maintaining order.',
    career: 'marshal',
    strength: 3,
    agility: 3,
    maxHealth: 3,
    skills: {},
  },
  {
    id: 'roughneck',
    name: 'ROUGHNECK',
    description: 'Blue-collar spacer built like a bulldozer. Takes a beating and keeps going.',
    career: 'roughneck',
    strength: 5,
    agility: 2,
    maxHealth: 4,
    skills: {},
  },
  {
    id: 'officer',
    name: 'OFFICER',
    description: 'Born leader who keeps the crew together. Commands respect under pressure.',
    career: 'officer',
    strength: 3,
    agility: 3,
    maxHealth: 3,
    skills: {},
  },
  {
    id: 'kid',
    name: 'KID',
    description: 'Young and quick. What they lack in strength they make up in reflexes and luck.',
    career: 'kid',
    strength: 2,
    agility: 5,
    maxHealth: 4,
    skills: {},
  },
  {
    id: 'medic',
    name: 'MEDIC',
    description: 'Combat medic trained to save lives under fire. Steady hands in the worst conditions.',
    career: 'medic',
    strength: 3,
    agility: 4,
    maxHealth: 4,
    skills: {},
  },
];
