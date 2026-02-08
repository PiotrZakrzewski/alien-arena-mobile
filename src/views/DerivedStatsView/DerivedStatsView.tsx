import { NameDisplay } from '../../components/atoms/NameDisplay';
import { CombatStatsPanel } from '../../components/organisms/CombatStatsPanel';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import './DerivedStatsView.css';

export function DerivedStatsView() {
  const { playerCharacter, setPhase } = useGame();

  if (!playerCharacter) {
    return null;
  }

  return (
    <div className="derived-stats">
      <header className="derived-stats__header">
        <NameDisplay name={playerCharacter.name} />
        <span className="derived-stats__subtitle">ATTRIBUTES</span>
      </header>
      <CombatStatsPanel
        strength={playerCharacter.strength}
        agility={playerCharacter.agility}
        wits={playerCharacter.wits}
        empathy={playerCharacter.empathy}
        readOnly
      />
      <section className="derived-stats__section">
        <div className="derived-stats__item">
          <span className="derived-stats__label">HEALTH</span>
          <span className="derived-stats__value">{playerCharacter.maxHealth}</span>
          <span className="derived-stats__formula">(STR + AGI) / 2</span>
        </div>
        <div className="derived-stats__item">
          <span className="derived-stats__label">RESOLVE</span>
          <span className="derived-stats__value">{playerCharacter.resolve}</span>
          <span className="derived-stats__formula">(WIT + EMP) / 2</span>
        </div>
      </section>
      <div className="derived-stats__footer">
        <PhaseNavigation
          onBack={() => setPhase('stats')}
          backLabel="Stats"
          onNext={() => setPhase('skills')}
          nextLabel="Skills"
        />
      </div>
    </div>
  );
}
