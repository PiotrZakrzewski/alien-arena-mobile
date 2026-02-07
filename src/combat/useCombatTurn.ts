import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '../state';
import type { CombatActionType, CharacterRole } from '../state/types';
import { getLegalActions } from './legalActions';
import type { LegalAction } from './legalActions';
import { getZoneDistance } from './rangeCalculator';
import { calculateAttackPool, calculateDefensePool } from './dicePoolCalculator';
import type { DiceSource } from './dicePoolCalculator';
import { rollDice, countSuccesses, resolveAttack } from './rollResolver';
import { checkPanic } from './stressResolver';
import { decideAction } from './ai/aiDecisionTree';
import type { PushState } from '../components/organisms/DiceRollResult';

export interface EffectLine {
  text: string;
  type: 'damage' | 'move' | 'cover' | 'panic' | 'info';
}

export interface DiceRollData {
  title: string;
  sources: DiceSource[];
  stressDice: number;
  baseDiceResults: number[];
  stressDiceResults: number[];
  pushState: PushState | null;
  successText: string;
  failureText: string;
}

export function useCombatTurn() {
  const game = useGame();
  const { combatState, playerCharacter, enemyCharacter } = game;

  const [diceRollData, setDiceRollData] = useState<DiceRollData | null>(null);
  const [effectLines, setEffectLines] = useState<EffectLine[]>([]);
  const [pendingAttack, setPendingAttack] = useState<{
    attackType: 'close-attack' | 'ranged-attack';
    attacker: CharacterRole;
    defender: CharacterRole;
    attackBaseDice: number[];
    attackStressDice: number[];
    defenseBaseDice: number[];
    defenseStressDice: number[];
    pushed: boolean;
  } | null>(null);
  const [winner, setWinner] = useState<CharacterRole | null>(null);
  const [moveSelecting, setMoveSelecting] = useState(false);
  // Track how many actions were spent this turn locally to avoid stale state reads
  const [actionsSpentThisTurn, setActionsSpentThisTurn] = useState(0);

  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, []);

  // Reset local action counter when turn changes
  const currentTurnRef = useRef(combatState?.currentTurn);
  if (combatState && combatState.currentTurn !== currentTurnRef.current) {
    currentTurnRef.current = combatState.currentTurn;
    setActionsSpentThisTurn(0);
  }

  const isPlayerTurn = combatState?.currentTurn === 'player';
  const subPhase = combatState?.subPhase ?? 'turn-announce';
  const round = combatState?.round ?? 1;

  const currentCharacter = isPlayerTurn ? playerCharacter : enemyCharacter;
  const opponentCharacter = isPlayerTurn ? enemyCharacter : playerCharacter;

  const currentRole: CharacterRole = isPlayerTurn ? 'player' : 'enemy';
  const opponentRole: CharacterRole = isPlayerTurn ? 'enemy' : 'player';

  // Build full state object for getLegalActions
  const fullState = {
    playerCharacter,
    enemyCharacter,
    combatSetup: game.combatSetup,
    combatState,
    phase: game.phase,
  };

  const legalActions: LegalAction[] = combatState ? getLegalActions(fullState) : [];

  // Check if combat is over
  const isCombatOver = winner !== null;

  // Effective actions remaining: use reducer state minus locally tracked spent actions
  // This avoids stale reads when multiple dispatches happen in one callback
  const effectiveActionsRemaining = (combatState?.actionsRemaining ?? 0);

  // --- Sub-phase transitions ---

  const startTurn = useCallback(() => {
    if (!combatState) return;
    game.setCombatSubPhase('action-select');
  }, [combatState, game]);

  const executeMove = useCallback((role: CharacterRole, zoneIndex: number) => {
    if (!combatState || !currentCharacter) return;
    game.moveCharacter(role, zoneIndex);
    game.spendAction(false);
    setActionsSpentThisTurn(prev => prev + 1);
    game.logCombat(`${role === 'player' ? playerCharacter?.name : enemyCharacter?.name} moves to ${combatState.zoneMap.zones[zoneIndex].name}`);
    setEffectLines([{ text: `Moved to ${combatState.zoneMap.zones[zoneIndex].name}`, type: 'move' }]);
    game.setCombatSubPhase('effect');
    setMoveSelecting(false);
  }, [combatState, currentCharacter, game, playerCharacter, enemyCharacter]);

  const executeCover = useCallback((role: CharacterRole) => {
    if (!combatState) return;
    game.setCover(role, true);
    game.spendAction(false);
    setActionsSpentThisTurn(prev => prev + 1);
    game.logCombat(`${role === 'player' ? playerCharacter?.name : enemyCharacter?.name} takes cover`);
    setEffectLines([{ text: 'Took partial cover', type: 'cover' }]);
    game.setCombatSubPhase('effect');
  }, [combatState, game, playerCharacter, enemyCharacter]);

  const executeAttack = useCallback((attackType: 'close-attack' | 'ranged-attack') => {
    if (!combatState || !currentCharacter || !opponentCharacter) return;

    const attacker = currentCharacter;
    const defender = opponentCharacter;
    const attackerStress = currentRole === 'player' ? combatState.playerStress : combatState.enemyStress;
    const defenderStress = opponentRole === 'player' ? combatState.playerStress : combatState.enemyStress;
    const defenderCover = opponentRole === 'player' ? combatState.playerCover : combatState.enemyCover;
    const attackerZone = currentRole === 'player' ? combatState.playerZoneIndex : combatState.enemyZoneIndex;
    const defenderZone = opponentRole === 'player' ? combatState.playerZoneIndex : combatState.enemyZoneIndex;
    const distance = getZoneDistance(attackerZone, defenderZone);

    const attackPool = calculateAttackPool(attacker, attackType, attackerStress, defenderCover, distance);
    const defenseType = attackType === 'close-attack' ? 'close-combat' as const : 'mobility' as const;
    const defensePool = calculateDefensePool(defender, defenseType, defenderStress);

    const attackBaseDice = rollDice(attackPool.baseDiceCount);
    const attackStressDice = rollDice(attackPool.stressDiceCount);
    const defenseBaseDice = rollDice(defensePool.baseDiceCount);
    const defenseStressDice = rollDice(defensePool.stressDiceCount);

    game.spendAction(true);
    setActionsSpentThisTurn(prev => prev + 1);

    setPendingAttack({
      attackType,
      attacker: currentRole,
      defender: opponentRole,
      attackBaseDice,
      attackStressDice,
      defenseBaseDice,
      defenseStressDice,
      pushed: false,
    });

    const title = attackType === 'close-attack' ? 'CLOSE COMBAT ATTACK' : 'RANGED ATTACK';
    setDiceRollData({
      title,
      sources: attackPool.sources,
      stressDice: attackerStress,
      baseDiceResults: attackBaseDice,
      stressDiceResults: attackStressDice,
      pushState: { allowed: true },
      successText: 'Strong attack — now the defender rolls...',
      failureText: 'No successes — defender may escape unharmed.',
    });

    game.logCombat(`${attacker.name} attacks with ${attackType === 'close-attack' ? 'close combat' : 'ranged weapon'}`);
    game.setCombatSubPhase('dice-roll');
  }, [combatState, currentCharacter, opponentCharacter, currentRole, opponentRole, game]);

  const selectAction = useCallback((type: CombatActionType, moveToZone?: number) => {
    if (!combatState) return;

    switch (type) {
      case 'move':
        if (moveToZone !== undefined) {
          executeMove(currentRole, moveToZone);
        } else {
          setMoveSelecting(true);
        }
        break;
      case 'close-attack':
        executeAttack('close-attack');
        break;
      case 'ranged-attack':
        executeAttack('ranged-attack');
        break;
      case 'partial-cover':
        executeCover(currentRole);
        break;
    }
  }, [combatState, currentRole, executeMove, executeAttack, executeCover]);

  const onZoneClickForMove = useCallback((zoneIndex: number) => {
    if (!moveSelecting) return;
    const moveAction = legalActions.find(a => a.type === 'move' && a.available);
    if (moveAction?.moveOptions?.includes(zoneIndex)) {
      executeMove(currentRole, zoneIndex);
    }
  }, [moveSelecting, legalActions, currentRole, executeMove]);

  const onPush = useCallback(() => {
    if (!pendingAttack || pendingAttack.pushed) return;

    // Push: +1 stress, re-roll non-successes from base dice only
    game.updateStress(pendingAttack.attacker, 1);

    const newBaseDice = pendingAttack.attackBaseDice.map(v =>
      v === 6 ? v : Math.floor(Math.random() * 6) + 1
    );
    const newStressDice = [
      ...pendingAttack.attackStressDice,
      Math.floor(Math.random() * 6) + 1, // extra stress die from push
    ];

    const updated = {
      ...pendingAttack,
      attackBaseDice: newBaseDice,
      attackStressDice: newStressDice,
      pushed: true,
    };
    setPendingAttack(updated);

    setDiceRollData(prev => prev ? {
      ...prev,
      baseDiceResults: newBaseDice,
      stressDiceResults: newStressDice,
      stressDice: prev.stressDice + 1,
      pushState: { allowed: false, reason: 'Already pushed' },
    } : null);
  }, [pendingAttack, game]);

  const resolveAttackResult = useCallback(() => {
    if (!pendingAttack || !combatState) return;

    const attacker = pendingAttack.attacker === 'player' ? playerCharacter : enemyCharacter;
    const defender = pendingAttack.defender === 'player' ? playerCharacter : enemyCharacter;
    if (!attacker || !defender) return;

    const attackSuccesses = countSuccesses(pendingAttack.attackBaseDice) + countSuccesses(pendingAttack.attackStressDice);
    const defenseSuccesses = countSuccesses(pendingAttack.defenseBaseDice) + countSuccesses(pendingAttack.defenseStressDice);

    const result = resolveAttack(attackSuccesses, defenseSuccesses, attacker.weapon, defender.armor, defender.health);

    const lines: EffectLine[] = [];

    if (result.hit) {
      lines.push({ text: `${attacker.name} hits ${defender.name}!`, type: 'info' });
      lines.push({ text: `Damage: ${result.rawDamage} (${result.armorAbsorbed} absorbed by armor)`, type: 'damage' });
      lines.push({ text: `${defender.name} takes ${result.netDamage} damage`, type: 'damage' });
      game.updateHealth(pendingAttack.defender, -result.netDamage);

      if (result.targetBroken) {
        lines.push({ text: `${defender.name} is BROKEN!`, type: 'damage' });
        setWinner(pendingAttack.attacker);
      }
    } else {
      lines.push({ text: `${attacker.name}'s attack misses!`, type: 'info' });
    }

    // Check for panic from attacker's stress dice
    const attackerPanic = checkPanic(pendingAttack.attackStressDice);
    if (attackerPanic) {
      lines.push({ text: `${attacker.name} PANICS!`, type: 'panic' });
      game.updateStress(pendingAttack.attacker, 1);
    }

    // Check for panic from defender's stress dice
    const defenderPanic = checkPanic(pendingAttack.defenseStressDice);
    if (defenderPanic) {
      lines.push({ text: `${defender.name} PANICS!`, type: 'panic' });
      game.updateStress(pendingAttack.defender, 1);
    }

    game.logCombat(lines.map(l => l.text).join(' | '));
    setEffectLines(lines);
    setPendingAttack(null);
    setDiceRollData(null);
    game.setCombatSubPhase('effect');
  }, [pendingAttack, combatState, playerCharacter, enemyCharacter, game]);

  const onDiceRollContinue = useCallback(() => {
    resolveAttackResult();
  }, [resolveAttackResult]);

  const onEffectContinue = useCallback(() => {
    if (!combatState) return;

    // Check for combat end
    if (winner) {
      game.endCombat(winner);
      return;
    }

    // Use effectiveActionsRemaining which accounts for spent actions.
    // After spendAction dispatch, state may not have updated yet in the same render.
    // We use actionsSpentThisTurn to compute: started with 2, spent N, so remaining = 2 - N.
    const realActionsLeft = 2 - actionsSpentThisTurn;

    if (realActionsLeft > 0) {
      game.setCombatSubPhase('action-select');
    } else {
      game.advanceTurn();
      setActionsSpentThisTurn(0);
    }
    setEffectLines([]);
    setMoveSelecting(false);
  }, [combatState, winner, game, actionsSpentThisTurn]);

  // --- Refs for AI auto-play to avoid stale closures ---
  const startTurnRef = useRef(startTurn);
  const selectActionRef = useRef(selectAction);
  const onDiceRollContinueRef = useRef(onDiceRollContinue);
  const onEffectContinueRef = useRef(onEffectContinue);
  const fullStateRef = useRef(fullState);

  startTurnRef.current = startTurn;
  selectActionRef.current = selectAction;
  onDiceRollContinueRef.current = onDiceRollContinue;
  onEffectContinueRef.current = onEffectContinue;
  fullStateRef.current = fullState;

  // --- Enemy AI auto-play ---
  useEffect(() => {
    if (!combatState || isPlayerTurn || isCombatOver) return;

    if (subPhase === 'turn-announce') {
      aiTimerRef.current = setTimeout(() => {
        startTurnRef.current();
      }, 1200);
    } else if (subPhase === 'action-select') {
      aiTimerRef.current = setTimeout(() => {
        const decision = decideAction(fullStateRef.current);
        game.logCombat(`AI: ${decision.reasoning}`);
        selectActionRef.current(decision.action, decision.moveToZone);
      }, 800);
    } else if (subPhase === 'dice-roll') {
      aiTimerRef.current = setTimeout(() => {
        onDiceRollContinueRef.current();
      }, 2000);
    } else if (subPhase === 'effect') {
      aiTimerRef.current = setTimeout(() => {
        onEffectContinueRef.current();
      }, 1500);
    }

    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, [subPhase, isPlayerTurn, isCombatOver, combatState, game]);

  // Move target zones for zone map highlighting
  const moveAction = legalActions.find(a => a.type === 'move' && a.available);
  const highlightedZones = moveSelecting && moveAction?.moveOptions ? moveAction.moveOptions : undefined;

  return {
    // Derived state
    currentCharacter,
    isPlayerTurn,
    subPhase,
    legalActions,
    round,
    combatState,

    // Sub-phase transitions
    startTurn,
    selectAction,
    onDiceRollContinue,
    onEffectContinue,
    onPush,

    // Dice roll data
    diceRollData,

    // Effect display
    effectLines,

    // Zone map interaction
    moveSelecting,
    highlightedZones,
    onZoneClickForMove,

    // Combat end
    isCombatOver,
    winner,

    // Expose effective actions remaining for UI
    effectiveActionsRemaining,
  };
}
