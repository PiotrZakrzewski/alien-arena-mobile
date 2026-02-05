export interface Character {
  id: string;
  name: string;
  strength: number;
  agility: number;
  health: number;
  maxHealth: number;
  skills: Record<string, number>;
}

export type GamePhase = 'character-select' | 'skills' | 'items' | 'combat' | 'result';

export interface GameState {
  characters: Character[];
  playerCharacterId: string | null;
  enemyCharacterId: string | null;
  phase: GamePhase;
}

export type GameAction =
  | { type: 'SET_CHARACTERS'; payload: Character[] }
  | { type: 'SELECT_PLAYER'; payload: string }
  | { type: 'SELECT_ENEMY'; payload: string }
  | { type: 'UPDATE_CHARACTER'; payload: { id: string; changes: Partial<Character> } }
  | { type: 'UPDATE_SKILL'; payload: { characterId: string; skillKey: string; value: number } }
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'RESET_COMBAT' };
