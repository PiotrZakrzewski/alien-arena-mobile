import { CharacterPreset } from './characterPresets';
import { Character } from '../state/types';

let nextId = 1;

export function createCharacterFromPreset(preset: CharacterPreset): Character {
  return {
    id: `char-${nextId++}`,
    presetId: preset.id,
    name: preset.name,
    strength: preset.strength,
    agility: preset.agility,
    health: preset.maxHealth,
    maxHealth: preset.maxHealth,
    skills: { ...preset.skills },
    items: {},
    talents: {},
  };
}
