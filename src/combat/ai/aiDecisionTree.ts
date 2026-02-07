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

  // 1. Broken: disengage first if engaged, then flee
  if (isBroken) {
    const disengage = find('disengage');
    if (disengage) {
      return { action: 'disengage', reasoning: 'Broken — disengaging before retreating' };
    }
    const move = find('move');
    if (move && move.moveOptions) {
      const playerZone = combat.playerZoneIndex;
      const awayZone = move.moveOptions.find((z) => Math.abs(z - playerZone) > Math.abs(combat.enemyZoneIndex - playerZone));
      if (awayZone !== undefined) {
        return { action: 'move', moveToZone: awayZone, reasoning: 'Broken — retreating from player' };
      }
      return { action: 'move', moveToZone: move.moveOptions[0], reasoning: 'Broken — attempting to flee' };
    }
    return { action: 'move', reasoning: 'Broken — no movement possible' };
  }

  // 2. Close weapon + engaged: close attack
  const closeAttack = find('close-attack');
  if (closeAttack) {
    return { action: 'close-attack', reasoning: 'Engaged with target — attacking' };
  }

  // 3. Close weapon + same zone + not engaged: engage first
  const hasCloseWeapon = enemy.weapon.type === 'close' || enemy.weapon.type === 'unarmed';
  if (hasCloseWeapon && combat.playerZoneIndex === combat.enemyZoneIndex && !combat.engaged) {
    const engage = find('engage');
    if (engage) {
      return { action: 'engage', reasoning: 'Same zone — engaging for melee' };
    }
  }

  // 4. Ranged weapon + engaged: disengage
  if (enemy.weapon.type === 'ranged' && combat.engaged) {
    const disengage = find('disengage');
    if (disengage) {
      return { action: 'disengage', reasoning: 'Engaged — disengaging to fire' };
    }
  }

  // 5. Ranged weapon + in range + not engaged: ranged attack
  const rangedAttack = find('ranged-attack');
  if (rangedAttack) {
    return { action: 'ranged-attack', reasoning: 'Target in firing range — opening fire' };
  }

  // 6. Ranged weapon + target not in range: move toward optimal range
  if (enemy.weapon.type === 'ranged' && !rangedAttack) {
    const move = find('move');
    if (move && move.moveOptions) {
      const toward = move.moveOptions.reduce((best, z) =>
        Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
      );
      return { action: 'move', moveToZone: toward, reasoning: 'Moving to get target in range' };
    }
  }

  // 7. Close weapon + not same zone: move toward player
  if (hasCloseWeapon && combat.playerZoneIndex !== combat.enemyZoneIndex) {
    const move = find('move');
    if (move && move.moveOptions) {
      const toward = move.moveOptions.reduce((best, z) =>
        Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
      );
      return { action: 'move', moveToZone: toward, reasoning: 'Closing distance to target' };
    }
  }

  // 8. Cluttered zone + no cover + only quick actions left: take cover
  const cover = find('partial-cover');
  if (cover && combat.fullActionUsed) {
    return { action: 'partial-cover', reasoning: 'Taking cover with remaining action' };
  }

  // 9. Fallback: move toward player
  const move = find('move');
  if (move && move.moveOptions) {
    const toward = move.moveOptions.reduce((best, z) =>
      Math.abs(z - combat.playerZoneIndex) < Math.abs(best - combat.playerZoneIndex) ? z : best
    );
    return { action: 'move', moveToZone: toward, reasoning: 'Advancing toward target' };
  }

  // 10. Last resort: take cover if available
  if (cover) {
    return { action: 'partial-cover', reasoning: 'No other options — taking cover' };
  }

  // Nothing available (shouldn't reach here)
  return { action: 'move', reasoning: 'No viable actions' };
}
