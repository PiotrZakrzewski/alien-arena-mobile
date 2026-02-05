export interface Character {
  id: string;
  presetId: string;
  name: string;
  strength: number;
  agility: number;
  health: number;
  maxHealth: number;
  skills: Record<string, number>;
  items: Record<string, number>;
  talents: Record<string, number>;
}

export type CharacterRole = 'player' | 'enemy';

export type GamePhase = 'character-select' | 'skills' | 'items' | 'combat' | 'result';

export interface GameState {
  playerCharacter: Character | null;
  enemyCharacter: Character | null;
  phase: GamePhase;
}

export type GameAction =
  | { type: 'SELECT_CHARACTER'; payload: { role: CharacterRole; character: Character } }
  | { type: 'UPDATE_STAT'; payload: { role: CharacterRole; stat: 'strength' | 'agility'; value: number } }
  | { type: 'UPDATE_SKILL'; payload: { role: CharacterRole; skillKey: string; value: number } }
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'RESET_COMBAT' };
