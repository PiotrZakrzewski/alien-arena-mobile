import { GameState, GameAction, Character, CharacterRole } from './types';

export const initialGameState: GameState = {
  playerCharacter: null,
  combatSetup: { combatType: 'normal', advantageSide: null },
  enemyCharacter: {
    id: 'enemy-1',
    presetId: 'roughneck',
    name: 'ENEMY',
    description: 'Blue-collar spacer built like a bulldozer. Takes a beating and keeps going.',
    career: 'roughneck',
    strength: 5,
    agility: 2,
    health: 11,
    maxHealth: 11,
    skills: { closeCombat: 3, stamina: 2 },
    weapon: { type: 'close', modifier: 1, damage: 2, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
    armor: { rating: 1 },
    talents: {},
  },
  phase: 'character-select',
};

function getSlotKey(role: CharacterRole): 'playerCharacter' | 'enemyCharacter' {
  return role === 'player' ? 'playerCharacter' : 'enemyCharacter';
}

function updateCharacterSlot(
  state: GameState,
  role: CharacterRole,
  updater: (char: Character) => Character,
): GameState {
  const key = getSlotKey(role);
  const current = state[key];
  if (!current) return state;
  return { ...state, [key]: updater(current) };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CHARACTER': {
      const key = getSlotKey(action.payload.role);
      return { ...state, [key]: action.payload.character };
    }

    case 'UPDATE_STAT':
      return updateCharacterSlot(state, action.payload.role, (char) => ({
        ...char,
        [action.payload.stat]: action.payload.value,
      }));

    case 'UPDATE_SKILL':
      return updateCharacterSlot(state, action.payload.role, (char) => ({
        ...char,
        skills: {
          ...char.skills,
          [action.payload.skillKey]: action.payload.value,
        },
      }));

    case 'UPDATE_TALENT':
      return updateCharacterSlot(state, action.payload.role, (char) => ({
        ...char,
        talents: {
          ...char.talents,
          [action.payload.talentKey]: action.payload.value,
        },
      }));

    case 'SET_WEAPON':
      return updateCharacterSlot(state, action.payload.role, (char) => ({
        ...char,
        weapon: action.payload.weapon,
      }));

    case 'SET_ARMOR':
      return updateCharacterSlot(state, action.payload.role, (char) => ({
        ...char,
        armor: action.payload.armor,
      }));

    case 'SET_COMBAT_SETUP':
      return { ...state, combatSetup: action.payload };

    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'RESET_COMBAT': {
      const resetHealth = (char: Character | null) =>
        char ? { ...char, health: char.maxHealth } : null;
      return {
        ...state,
        playerCharacter: resetHealth(state.playerCharacter),
        enemyCharacter: resetHealth(state.enemyCharacter),
        phase: 'character-select',
      };
    }

    default:
      return state;
  }
}
