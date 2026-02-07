import { useGame } from '../../state';
import { useCombatTurn } from '../../combat/useCombatTurn';
import { CombatHud } from '../../components/organisms/CombatHud';
import { TurnAnnounce } from '../../components/organisms/TurnAnnounce';
import { ActionSelect } from '../../components/organisms/ActionSelect';
import { DiceRollResult } from '../../components/organisms/DiceRollResult';
import { EffectSummary } from '../../components/organisms/EffectSummary';
import './CombatView.css';

export function CombatView() {
  const { combatState, playerCharacter, enemyCharacter } = useGame();
  const turn = useCombatTurn();

  if (!combatState || !playerCharacter || !enemyCharacter) {
    return null;
  }

  return (
    <div className="combat-view">
      <div className="combat-view__hud">
        <CombatHud
          round={turn.round}
          player={{
            name: playerCharacter.name,
            health: playerCharacter.health,
            maxHealth: playerCharacter.maxHealth,
            stress: combatState.playerStress,
            variant: 'player',
            hasCover: combatState.playerCover,
            isBroken: playerCharacter.health <= 0,
          }}
          enemy={{
            name: enemyCharacter.name,
            health: enemyCharacter.health,
            maxHealth: enemyCharacter.maxHealth,
            stress: combatState.enemyStress,
            variant: 'enemy',
            hasCover: combatState.enemyCover,
            isBroken: enemyCharacter.health <= 0,
          }}
          zones={[...combatState.zoneMap.zones]}
          playerZoneIndex={combatState.playerZoneIndex}
          enemyZoneIndex={combatState.enemyZoneIndex}
          highlightedZones={turn.highlightedZones}
          onZoneClick={turn.moveSelecting ? turn.onZoneClickForMove : undefined}
        />
      </div>

      <div className="combat-view__content">
        {turn.subPhase === 'turn-announce' && (
          <TurnAnnounce
            characterName={turn.currentCharacter?.name ?? ''}
            round={turn.round}
            isPlayer={turn.isPlayerTurn}
            onContinue={turn.startTurn}
          />
        )}

        {turn.subPhase === 'action-select' && turn.isPlayerTurn && (
          <ActionSelect
            actionsRemaining={turn.effectiveActionsRemaining}
            legalActions={turn.legalActions}
            onSelectAction={turn.selectAction}
          />
        )}

        {turn.subPhase === 'action-select' && !turn.isPlayerTurn && (
          <div style={{ textAlign: 'center', color: 'var(--color-danger)', padding: '40px' }}>
            <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ENEMY IS DECIDING...
            </p>
          </div>
        )}

        {turn.subPhase === 'dice-roll' && turn.diceRollData && (
          <DiceRollResult
            title={turn.diceRollData.title}
            sources={turn.diceRollData.sources}
            stressDice={turn.diceRollData.stressDice}
            baseDiceResults={turn.diceRollData.baseDiceResults}
            stressDiceResults={turn.diceRollData.stressDiceResults}
            pushState={turn.isPlayerTurn ? turn.diceRollData.pushState : null}
            onPush={turn.isPlayerTurn ? turn.onPush : undefined}
            successText={turn.diceRollData.successText}
            failureText={turn.diceRollData.failureText}
            animate={true}
            onContinue={turn.onDiceRollContinue}
          />
        )}

        {turn.subPhase === 'effect' && (
          <EffectSummary
            lines={turn.effectLines}
            onContinue={turn.onEffectContinue}
          />
        )}
      </div>
    </div>
  );
}
