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

// --- Zone & Combat types ---

export interface Zone {
  id: string;
  name: string;
  cluttered: boolean;
}

export interface ZoneMap {
  id: string;
  name: string;
  zones: [Zone, Zone, Zone];
}

export type CombatSubPhase = 'turn-announce' | 'action-select' | 'dice-roll' | 'effect' | 'turn-end';
export type CombatActionType = 'move' | 'close-attack' | 'ranged-attack' | 'partial-cover' | 'engage' | 'disengage';

export interface CombatState {
  zoneMap: ZoneMap;
  playerZoneIndex: number;
  enemyZoneIndex: number;
  playerStress: number;
  enemyStress: number;
  playerCover: boolean;
  enemyCover: boolean;
  currentTurn: CharacterRole;
  round: number;
  subPhase: CombatSubPhase;
  actionsRemaining: number;
  fullActionUsed: boolean;
  turnOrder: CharacterRole[];
  engaged: boolean;
  combatLog: string[];
}

// --- Game state ---

export type GamePhase = 'character-select' | 'stats' | 'skills' | 'items' | 'talents' | 'combat-setup' | 'initiative' | 'combat' | 'result';

export interface GameState {
  playerCharacter: Character | null;
  enemyCharacter: Character | null;
  combatSetup: CombatSetup;
  combatState: CombatState | null;
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
  | { type: 'RESET_COMBAT' }
  | { type: 'INIT_COMBAT'; payload: { zoneMap: ZoneMap; turnOrder: CharacterRole[] } }
  | { type: 'SET_COMBAT_SUB_PHASE'; payload: CombatSubPhase }
  | { type: 'MOVE_CHARACTER'; payload: { role: CharacterRole; zoneIndex: number } }
  | { type: 'SET_COVER'; payload: { role: CharacterRole; hasCover: boolean } }
  | { type: 'UPDATE_HEALTH'; payload: { role: CharacterRole; delta: number } }
  | { type: 'UPDATE_STRESS'; payload: { role: CharacterRole; delta: number } }
  | { type: 'SPEND_ACTION'; payload: { isFull: boolean } }
  | { type: 'ADVANCE_TURN' }
  | { type: 'LOG_COMBAT'; payload: { message: string } }
  | { type: 'SET_ENGAGED'; payload: { engaged: boolean } }
  | { type: 'END_COMBAT'; payload: { winner: CharacterRole } };
