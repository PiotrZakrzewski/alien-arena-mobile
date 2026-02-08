import { CharacterPreset } from './characterPresets';
import { WEAPON_DEFAULTS } from './equipmentDefinitions';
import { Character } from '../state/types';

let nextId = 1;

export function createCharacterFromPreset(preset: CharacterPreset): Character {
  const maxHealth = Math.ceil((preset.strength + preset.agility) / 2);
  const resolve = Math.ceil((preset.wits + preset.empathy) / 2);
  return {
    id: `char-${nextId++}`,
    presetId: preset.id,
    name: preset.name,
    description: preset.description,
    career: preset.career,
    strength: preset.strength,
    agility: preset.agility,
    wits: preset.wits,
    empathy: preset.empathy,
    health: maxHealth,
    maxHealth,
    resolve,
    skills: { ...preset.skills },
    weapon: { ...WEAPON_DEFAULTS.unarmed },
    armor: { rating: 0 },
    talents: {},
  };
}
