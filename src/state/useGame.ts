import { useContext, useCallback } from 'react';
import { GameContext } from './GameContext';
import { Character, CharacterRole, GamePhase, Weapon, Armor, CombatSetup, CombatSubPhase, ZoneMap } from './types';

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
    (role: CharacterRole, stat: 'strength' | 'agility' | 'wits' | 'empathy', value: number) => {
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

  const updateTalent = useCallback(
    (role: CharacterRole, talentKey: string, value: number) => {
      dispatch({ type: 'UPDATE_TALENT', payload: { role, talentKey, value } });
    },
    [dispatch]
  );

  const setWeapon = useCallback(
    (role: CharacterRole, weapon: Weapon) => {
      dispatch({ type: 'SET_WEAPON', payload: { role, weapon } });
    },
    [dispatch]
  );

  const setArmor = useCallback(
    (role: CharacterRole, armor: Armor) => {
      dispatch({ type: 'SET_ARMOR', payload: { role, armor } });
    },
    [dispatch]
  );

  const setCombatSetup = useCallback(
    (setup: CombatSetup) => {
      dispatch({ type: 'SET_COMBAT_SETUP', payload: setup });
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

  // --- Combat dispatchers ---

  const initCombat = useCallback(
    (zoneMap: ZoneMap, turnOrder: CharacterRole[]) => {
      dispatch({ type: 'INIT_COMBAT', payload: { zoneMap, turnOrder } });
    },
    [dispatch]
  );

  const setCombatSubPhase = useCallback(
    (subPhase: CombatSubPhase) => {
      dispatch({ type: 'SET_COMBAT_SUB_PHASE', payload: subPhase });
    },
    [dispatch]
  );

  const moveCharacter = useCallback(
    (role: CharacterRole, zoneIndex: number) => {
      dispatch({ type: 'MOVE_CHARACTER', payload: { role, zoneIndex } });
    },
    [dispatch]
  );

  const setCover = useCallback(
    (role: CharacterRole, hasCover: boolean) => {
      dispatch({ type: 'SET_COVER', payload: { role, hasCover } });
    },
    [dispatch]
  );

  const updateHealth = useCallback(
    (role: CharacterRole, delta: number) => {
      dispatch({ type: 'UPDATE_HEALTH', payload: { role, delta } });
    },
    [dispatch]
  );

  const updateStress = useCallback(
    (role: CharacterRole, delta: number) => {
      dispatch({ type: 'UPDATE_STRESS', payload: { role, delta } });
    },
    [dispatch]
  );

  const spendAction = useCallback(
    (isFull: boolean) => {
      dispatch({ type: 'SPEND_ACTION', payload: { isFull } });
    },
    [dispatch]
  );

  const advanceTurn = useCallback(() => {
    dispatch({ type: 'ADVANCE_TURN' });
  }, [dispatch]);

  const logCombat = useCallback(
    (message: string) => {
      dispatch({ type: 'LOG_COMBAT', payload: { message } });
    },
    [dispatch]
  );

  const setEngaged = useCallback(
    (engaged: boolean) => {
      dispatch({ type: 'SET_ENGAGED', payload: { engaged } });
    },
    [dispatch]
  );

  const endCombat = useCallback(
    (winner: CharacterRole) => {
      dispatch({ type: 'END_COMBAT', payload: { winner } });
    },
    [dispatch]
  );

  return {
    // State
    playerCharacter: state.playerCharacter,
    enemyCharacter: state.enemyCharacter,
    combatSetup: state.combatSetup,
    combatState: state.combatState,
    phase: state.phase,

    // Actions
    selectCharacter,
    updateStat,
    updateSkill,
    updateTalent,
    setWeapon,
    setArmor,
    setCombatSetup,
    setPhase,
    resetCombat,

    // Combat actions
    initCombat,
    setCombatSubPhase,
    moveCharacter,
    setCover,
    setEngaged,
    updateHealth,
    updateStress,
    spendAction,
    advanceTurn,
    logCombat,
    endCombat,
  };
}
