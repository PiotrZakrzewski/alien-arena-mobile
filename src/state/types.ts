export type RangeZone = 'adjacent' | 'short' | 'medium' | 'long' | 'extreme';

export interface Weapon {
  type: 'unarmed' | 'close' | 'ranged';
  modifier: number;
  damage: number;
  minRange: RangeZone;
  maxRange: RangeZone;
  armorPiercing: boolean;
}

export interface Armor {
  rating: number;
}

export interface Character {
  id: string;
  presetId: string;
  name: string;
  description: string;
  strength: number;
  agility: number;
  health: number;
  maxHealth: number;
  skills: Record<string, number>;
  weapon: Weapon;
  armor: Armor;
  talents: Record<string, number>;
}

export type CharacterRole = 'player' | 'enemy';

export type GamePhase = 'character-select' | 'stats' | 'skills' | 'items' | 'talents' | 'combat' | 'result';

export interface GameState {
  playerCharacter: Character | null;
  enemyCharacter: Character | null;
  phase: GamePhase;
}

export type GameAction =
  | { type: 'SELECT_CHARACTER'; payload: { role: CharacterRole; character: Character } }
  | { type: 'UPDATE_STAT'; payload: { role: CharacterRole; stat: 'strength' | 'agility'; value: number } }
  | { type: 'UPDATE_SKILL'; payload: { role: CharacterRole; skillKey: string; value: number } }
  | { type: 'SET_WEAPON'; payload: { role: CharacterRole; weapon: Weapon } }
  | { type: 'SET_ARMOR'; payload: { role: CharacterRole; armor: Armor } }
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'RESET_COMBAT' };
