import type { GameState, CombatActionType } from '../../state/types';
import { getLegalActions } from '../legalActions';

export interface AIDecision {
  action: CombatActionType;
  moveToZone?: number;
  reasoning: string;
}

export function decideAction(state: GameState): AIDecision {
  const legalActions = getLegalActions(state);
  const available = legalActions.filter((a) => a.available);

  if (available.length === 0) {
    // Shouldn't happen if called correctly, but fallback
    return { action: 'move', reasoning: 'No actions available' };
  }

  const combat = state.combatState!;
  const enemy = state.enemyCharacter!;
  const isBroken = enemy.health <= 0;

  const find = (type: CombatActionType) => available.find((a) => a.type === type);

  // 1. Broken: move away from player if possible
  if (isBroken) {
    const move = find('move');
    if (move && move.moveOptions) {
      const playerZone = combat.playerZoneIndex;
      const awayZone = move.moveOptions.find((z) => Math.abs(z - playerZone) > Math.abs(combat.enemyZoneIndex - playerZone));
      if (awayZone !== undefined) {
        return { action: 'move', moveToZone: awayZone, reasoning: 'Broken — retreating from player' };
      }
      // Can't move further away, just move somewhere
      return { action: 'move', moveToZone: move.moveOptions[0], reasoning: 'Broken — attempting to flee' };
    }
    return { action: 'move', reasoning: 'Broken — no movement possible' };
  }

  // 2. Same zone + close weapon: close attack
  const closeAttack = find('close-attack');
  if (closeAttack) {
    return { action: 'close-attack', reasoning: 'Target in melee range — attacking' };
  }

  // 3. Ranged weapon + target in range + not same zone: ranged attack
  const rangedAttack = find('ranged-attack');
  if (rangedAttack && combat.playerZoneIndex !== combat.enemyZoneIndex) {
    return { action: 'ranged-attack', reasoning: 'Target in firing range — opening fire' };
  }

  // 4. Ranged weapon + target not in range: move toward optimal range
  if (enemy.weapon.type === 'ranged' && !rangedAttack) {
    const move = find('move');
    if (move && move.moveOptions) {
      // Move toward player
      const toward = move.moveOptions.reduce((best, z) =>
        Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
      );
      return { action: 'move', moveToZone: toward, reasoning: 'Moving to get target in range' };
    }
  }

  // 5. Close weapon + not same zone: move toward player
  if ((enemy.weapon.type === 'close' || enemy.weapon.type === 'unarmed') && combat.playerZoneIndex !== combat.enemyZoneIndex) {
    const move = find('move');
    if (move && move.moveOptions) {
      const toward = move.moveOptions.reduce((best, z) =>
        Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
      );
      return { action: 'move', moveToZone: toward, reasoning: 'Closing distance to target' };
    }
  }

  // 6. Cluttered zone + no cover + only quick actions left: take cover
  const cover = find('partial-cover');
  if (cover && combat.fullActionUsed) {
    return { action: 'partial-cover', reasoning: 'Taking cover with remaining action' };
  }

  // 7. Fallback: move toward player
  const move = find('move');
  if (move && move.moveOptions) {
    const toward = move.moveOptions.reduce((best, z) =>
      Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
    );
    return { action: 'move', moveToZone: toward, reasoning: 'Advancing toward target' };
  }

  // 8. Last resort: take cover if available
  if (cover) {
    return { action: 'partial-cover', reasoning: 'No other options — taking cover' };
  }

  // Nothing available (shouldn't reach here)
  return { action: 'move', reasoning: 'No viable actions' };
}
