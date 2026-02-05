import { useContext, useCallback } from 'react';
import { GameContext } from './GameContext';
import { Character, CharacterRole, GamePhase } from './types';

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const selectCharacter = useCallback(
    (role: CharacterRole, character: Character) => {
      dispatch({ type: 'SELECT_CHARACTER', payload: { role, character } });
    },
    [dispatch]
  );

  const updateStat = useCallback(
    (role: CharacterRole, stat: 'strength' | 'agility', value: number) => {
      dispatch({ type: 'UPDATE_STAT', payload: { role, stat, value } });
    },
    [dispatch]
  );

  const updateSkill = useCallback(
    (role: CharacterRole, skillKey: string, value: number) => {
      dispatch({ type: 'UPDATE_SKILL', payload: { role, skillKey, value } });
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

  return {
    // State
    playerCharacter: state.playerCharacter,
    enemyCharacter: state.enemyCharacter,
    phase: state.phase,

    // Actions
    selectCharacter,
    updateStat,
    updateSkill,
    setPhase,
    resetCombat,
  };
}
