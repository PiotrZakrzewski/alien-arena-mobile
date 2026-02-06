export type Career = 'marine' | 'marshal' | 'roughneck' | 'officer' | 'kid' | 'medic';

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
  career: Career;
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

export type CombatType = 'normal' | 'surprise' | 'ambush';

export interface CombatSetup {
  combatType: CombatType;
  advantageSide: CharacterRole | null;
}

export type GamePhase = 'character-select' | 'stats' | 'skills' | 'items' | 'talents' | 'combat-setup' | 'initiative' | 'combat' | 'result';

export interface GameState {
  playerCharacter: Character | null;
  enemyCharacter: Character | null;
  combatSetup: CombatSetup;
  phase: GamePhase;
}

export type GameAction =
  | { type: 'SELECT_CHARACTER'; payload: { role: CharacterRole; character: Character } }
  | { type: 'UPDATE_STAT'; payload: { role: CharacterRole; stat: 'strength' | 'agility'; value: number } }
  | { type: 'UPDATE_SKILL'; payload: { role: CharacterRole; skillKey: string; value: number } }
  | { type: 'SET_WEAPON'; payload: { role: CharacterRole; weapon: Weapon } }
  | { type: 'SET_ARMOR'; payload: { role: CharacterRole; armor: Armor } }
  | { type: 'UPDATE_TALENT'; payload: { role: CharacterRole; talentKey: string; value: number } }
  | { type: 'SET_COMBAT_SETUP'; payload: CombatSetup }
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'RESET_COMBAT' };
