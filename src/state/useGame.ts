import { useContext, useCallback } from 'react';
import { GameContext } from './GameContext';
import { Character, GamePhase } from './types';

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const setCharacters = useCallback(
    (characters: Character[]) => {
      dispatch({ type: 'SET_CHARACTERS', payload: characters });
    },
    [dispatch]
  );

  const selectPlayer = useCallback(
    (characterId: string) => {
      dispatch({ type: 'SELECT_PLAYER', payload: characterId });
    },
    [dispatch]
  );

  const selectEnemy = useCallback(
    (characterId: string) => {
      dispatch({ type: 'SELECT_ENEMY', payload: characterId });
    },
    [dispatch]
  );

  const updateCharacter = useCallback(
    (id: string, changes: Partial<Character>) => {
      dispatch({ type: 'UPDATE_CHARACTER', payload: { id, changes } });
    },
    [dispatch]
  );

  const setPhase = useCallback(
    (phase: GamePhase) => {
      dispatch({ type: 'SET_PHASE', payload: phase });
    },
    [dispatch]
  );

  const resetCombat = useCallback(() => {
    dispatch({ type: 'RESET_COMBAT' });
  }, [dispatch]);

  // Derived state
  const playerCharacter = state.characters.find(
    (c) => c.id === state.playerCharacterId
  );
  const enemyCharacter = state.characters.find(
    (c) => c.id === state.enemyCharacterId
  );

  return {
    // State
    characters: state.characters,
    playerCharacter,
    enemyCharacter,
    phase: state.phase,

    // Actions
    setCharacters,
    selectPlayer,
    selectEnemy,
    updateCharacter,
    setPhase,
    resetCombat,
  };
}
