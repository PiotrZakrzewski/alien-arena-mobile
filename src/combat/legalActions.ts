import type { GameState, CombatActionType } from '../state/types';
import { getZoneDistance, isWeaponInRange } from './rangeCalculator';

export interface LegalAction {
  type: CombatActionType;
  speed: 'quick' | 'full';
  available: boolean;
  reason?: string;
  moveOptions?: number[];
}

export function getLegalActions(state: GameState): LegalAction[] {
  const combat = state.combatState;
  if (!combat) return [];

  const isPlayer = combat.currentTurn === 'player';
  const character = isPlayer ? state.playerCharacter : state.enemyCharacter;
  if (!character) return [];

  const myZone = isPlayer ? combat.playerZoneIndex : combat.enemyZoneIndex;
  const theirZone = isPlayer ? combat.enemyZoneIndex : combat.playerZoneIndex;
  const myCover = isPlayer ? combat.playerCover : combat.enemyCover;
  const myHealth = character.health;
  const isBroken = myHealth <= 0;

  if (combat.actionsRemaining === 0) return [];

  const actions: LegalAction[] = [];

  // Move — quick action. Adjacent zone (index ± 1 within [0,2])
  const moveOptions: number[] = [];
  if (myZone > 0) moveOptions.push(myZone - 1);
  if (myZone < 2) moveOptions.push(myZone + 1);

  if (moveOptions.length > 0) {
    actions.push({
      type: 'move',
      speed: 'quick',
      available: true,
      moveOptions,
    });
  }

  // If broken, only move is allowed
  if (isBroken) return actions;

  const distance = getZoneDistance(myZone, theirZone);

  // Close attack — full action, requires same zone + close/unarmed weapon
  const canCloseAttack = distance === 0 && (character.weapon.type === 'close' || character.weapon.type === 'unarmed');
  if (canCloseAttack) {
    if (combat.fullActionUsed) {
      actions.push({ type: 'close-attack', speed: 'full', available: false, reason: 'Full action already used' });
    } else {
      actions.push({ type: 'close-attack', speed: 'full', available: true });
    }
  }

  // Ranged attack — full action, requires ranged weapon + in range
  if (character.weapon.type === 'ranged') {
    const inRange = isWeaponInRange(character.weapon, distance);
    if (inRange) {
      if (combat.fullActionUsed) {
        actions.push({ type: 'ranged-attack', speed: 'full', available: false, reason: 'Full action already used' });
      } else {
        actions.push({ type: 'ranged-attack', speed: 'full', available: true });
      }
    } else {
      actions.push({ type: 'ranged-attack', speed: 'full', available: false, reason: 'Target out of range' });
    }
  }

  // Partial cover — quick action, zone must be cluttered, not already in cover
  const currentZone = combat.zoneMap.zones[myZone];
  if (currentZone.cluttered) {
    if (myCover) {
      actions.push({ type: 'partial-cover', speed: 'quick', available: false, reason: 'Already in cover' });
    } else {
      actions.push({ type: 'partial-cover', speed: 'quick', available: true });
    }
  }

  return actions;
}
