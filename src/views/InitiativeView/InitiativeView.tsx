import { useMemo } from 'react';
import { InitiativeResult } from '../../components/organisms/InitiativeResult';
import { useGame } from '../../state';
import type { CombatSetup, CharacterRole } from '../../state/types';
import { ZONE_MAP_PRESETS } from '../../data/zoneMapDefinitions';
import './InitiativeView.css';

function drawCard(): number {
  return Math.floor(Math.random() * 10) + 1;
}

function drawUniqueCards(): [number, number] {
  const a = drawCard();
  let b = drawCard();
  while (b === a) {
    b = drawCard();
  }
  return [a, b];
}

function drawCards(setup: CombatSetup): [number, number] {
  if (setup.combatType === 'normal') {
    return drawUniqueCards();
  }
  const other = Math.floor(Math.random() * 9) + 2; // 2-10
  return setup.advantageSide === 'player'
    ? [1, other]
    : [other, 1];
}

export function InitiativeView() {
  const { playerCharacter, enemyCharacter, combatSetup, initCombat } = useGame();

  const [playerCard, enemyCard] = useMemo(() => drawCards(combatSetup), [combatSetup]);

  if (!playerCharacter || !enemyCharacter) {
    return null;
  }

  const handleContinue = () => {
    // Pick a random zone map
    const zoneMap = ZONE_MAP_PRESETS[Math.floor(Math.random() * ZONE_MAP_PRESETS.length)];
    // Lower card goes first
    const turnOrder: CharacterRole[] = playerCard < enemyCard
      ? ['player', 'enemy']
      : ['enemy', 'player'];
    initCombat(zoneMap, turnOrder);
  };

  return (
    <div className="initiative-view">
      <InitiativeResult
        playerCard={playerCard}
        enemyCard={enemyCard}
        playerName={playerCharacter.name}
        enemyName={enemyCharacter.name}
        onContinue={handleContinue}
      />
    </div>
  );
}
