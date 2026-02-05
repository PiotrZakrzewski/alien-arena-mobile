import { GameState, GameAction } from './types';

export const initialGameState: GameState = {
  characters: [],
  playerCharacterId: null,
  enemyCharacterId: null,
  phase: 'character-select',
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
      };

    case 'SELECT_PLAYER':
      return {
        ...state,
        playerCharacterId: action.payload,
      };

    case 'SELECT_ENEMY':
      return {
        ...state,
        enemyCharacterId: action.payload,
      };

    case 'UPDATE_CHARACTER':
      return {
        ...state,
        characters: state.characters.map((char) =>
          char.id === action.payload.id
            ? { ...char, ...action.payload.changes }
            : char
        ),
      };

    case 'UPDATE_SKILL':
      return {
        ...state,
        characters: state.characters.map((char) =>
          char.id === action.payload.characterId
            ? {
                ...char,
                skills: {
                  ...char.skills,
                  [action.payload.skillKey]: action.payload.value,
                },
              }
            : char
        ),
      };

    case 'SET_PHASE':
      return {
        ...state,
        phase: action.payload,
      };

    case 'RESET_COMBAT':
      return {
        ...state,
        characters: state.characters.map((char) => ({
          ...char,
          health: char.maxHealth,
        })),
        phase: 'character-select',
      };

    default:
      return state;
  }
}
