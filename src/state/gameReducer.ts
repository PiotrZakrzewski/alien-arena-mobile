import { GameState, GameAction, Character, CharacterRole, CombatState } from './types';

export const initialGameState: GameState = {
  playerCharacter: null,
  combatSetup: { combatType: 'normal', advantageSide: null },
  combatState: null,
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
        combatState: null,
        phase: 'character-select',
      };
    }

    // --- Combat actions ---

    case 'INIT_COMBAT': {
      const { zoneMap, turnOrder } = action.payload;
      const combatState: CombatState = {
        zoneMap,
        playerZoneIndex: 0,
        enemyZoneIndex: 2,
        playerStress: 0,
        enemyStress: 0,
        playerCover: false,
        enemyCover: false,
        currentTurn: turnOrder[0],
        round: 1,
        subPhase: 'turn-announce',
        actionsRemaining: 2,
        fullActionUsed: false,
        turnOrder,
        combatLog: [],
      };
      return { ...state, combatState, phase: 'combat' };
    }

    case 'SET_COMBAT_SUB_PHASE': {
      if (!state.combatState) return state;
      return { ...state, combatState: { ...state.combatState, subPhase: action.payload } };
    }

    case 'MOVE_CHARACTER': {
      if (!state.combatState) return state;
      const { role, zoneIndex } = action.payload;
      const zoneKey = role === 'player' ? 'playerZoneIndex' : 'enemyZoneIndex';
      const coverKey = role === 'player' ? 'playerCover' : 'enemyCover';
      return {
        ...state,
        combatState: {
          ...state.combatState,
          [zoneKey]: zoneIndex,
          [coverKey]: false, // moving clears cover
        },
      };
    }

    case 'SET_COVER': {
      if (!state.combatState) return state;
      const coverKey = action.payload.role === 'player' ? 'playerCover' : 'enemyCover';
      return {
        ...state,
        combatState: { ...state.combatState, [coverKey]: action.payload.hasCover },
      };
    }

    case 'UPDATE_HEALTH': {
      const { role, delta } = action.payload;
      return updateCharacterSlot(state, role, (char) => ({
        ...char,
        health: Math.max(0, Math.min(char.maxHealth, char.health + delta)),
      }));
    }

    case 'UPDATE_STRESS': {
      if (!state.combatState) return state;
      const { role, delta } = action.payload;
      const char = role === 'player' ? state.playerCharacter : state.enemyCharacter;
      if (!char || char.health <= 0) return state; // ignore if broken
      const stressKey = role === 'player' ? 'playerStress' : 'enemyStress';
      const current = state.combatState[stressKey];
      return {
        ...state,
        combatState: {
          ...state.combatState,
          [stressKey]: Math.max(0, Math.min(10, current + delta)),
        },
      };
    }

    case 'SPEND_ACTION': {
      if (!state.combatState) return state;
      return {
        ...state,
        combatState: {
          ...state.combatState,
          actionsRemaining: state.combatState.actionsRemaining - 1,
          fullActionUsed: action.payload.isFull ? true : state.combatState.fullActionUsed,
        },
      };
    }

    case 'ADVANCE_TURN': {
      if (!state.combatState) return state;
      const cs = state.combatState;
      const currentIdx = cs.turnOrder.indexOf(cs.currentTurn);
      const nextIdx = (currentIdx + 1) % cs.turnOrder.length;
      const nextTurn = cs.turnOrder[nextIdx];
      const newRound = nextIdx === 0 ? cs.round + 1 : cs.round;
      const newCoverKey = nextTurn === 'player' ? 'playerCover' : 'enemyCover';
      return {
        ...state,
        combatState: {
          ...cs,
          currentTurn: nextTurn,
          round: newRound,
          subPhase: 'turn-announce',
          actionsRemaining: 2,
          fullActionUsed: false,
          [newCoverKey]: false, // new actor's cover clears at start of their turn
        },
      };
    }

    case 'LOG_COMBAT': {
      if (!state.combatState) return state;
      return {
        ...state,
        combatState: {
          ...state.combatState,
          combatLog: [...state.combatState.combatLog, action.payload.message],
        },
      };
    }

    case 'END_COMBAT':
      return { ...state, phase: 'result' };

    default:
      return state;
  }
}
