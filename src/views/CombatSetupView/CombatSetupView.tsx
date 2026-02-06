import { useState } from 'react';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import type { CombatType, CharacterRole } from '../../state/types';
import './CombatSetupView.css';

const COMBAT_TYPES: { value: CombatType; label: string; description: string }[] = [
  { value: 'normal', label: 'NORMAL', description: 'Both sides draw random initiative cards.' },
  { value: 'surprise', label: 'SURPRISE', description: 'Surprising side automatically gets initiative card #1.' },
  { value: 'ambush', label: 'AMBUSH', description: 'Ambusher gets card #1, +2 attack dice, target cannot defend.' },
];

export function CombatSetupView() {
  const { combatSetup, setCombatSetup, setPhase } = useGame();
  const [combatType, setCombatType] = useState<CombatType>(combatSetup.combatType);
  const [advantageSide, setAdvantageSide] = useState<CharacterRole | null>(combatSetup.advantageSide);

  const needsAdvantage = combatType !== 'normal';
  const isValid = !needsAdvantage || advantageSide !== null;

  const handleTypeSelect = (type: CombatType) => {
    setCombatType(type);
    if (type === 'normal') {
      setAdvantageSide(null);
    }
  };

  const handleBack = () => {
    setPhase('talents');
  };

  const handleNext = () => {
    if (!isValid) return;
    setCombatSetup({ combatType, advantageSide });
    setPhase('initiative');
  };

  return (
    <div className="combat-setup">
      <header className="combat-setup__header">
        <h1 className="combat-setup__title">COMBAT SETUP</h1>
      </header>

      <section className="combat-setup__types" aria-label="Combat type">
        {COMBAT_TYPES.map((ct) => (
          <button
            key={ct.value}
            className={`combat-setup__type-btn${combatType === ct.value ? ' combat-setup__type-btn--selected' : ''}`}
            onClick={() => handleTypeSelect(ct.value)}
            aria-pressed={combatType === ct.value}
          >
            <span className="combat-setup__type-label">{ct.label}</span>
            <span className="combat-setup__type-desc">{ct.description}</span>
          </button>
        ))}
      </section>

      {needsAdvantage && (
        <section className="combat-setup__advantage" aria-label="Advantage side">
          <span className="combat-setup__advantage-label">WHO HAS THE ADVANTAGE?</span>
          <div className="combat-setup__advantage-buttons">
            <button
              className={`combat-setup__side-btn${advantageSide === 'player' ? ' combat-setup__side-btn--selected' : ''}`}
              onClick={() => setAdvantageSide('player')}
              aria-pressed={advantageSide === 'player'}
            >
              PLAYER
            </button>
            <button
              className={`combat-setup__side-btn${advantageSide === 'enemy' ? ' combat-setup__side-btn--selected' : ''}`}
              onClick={() => setAdvantageSide('enemy')}
              aria-pressed={advantageSide === 'enemy'}
            >
              ENEMY
            </button>
          </div>
        </section>
      )}

      <div className="combat-setup__footer">
        <PhaseNavigation
          onBack={handleBack}
          backLabel="Talents"
          onNext={handleNext}
          nextLabel="Fight!"
          nextDisabled={!isValid}
        />
      </div>
    </div>
  );
}
