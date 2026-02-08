import { NameDisplay } from '../../components/atoms/NameDisplay';
import { CombatStatsPanel } from '../../components/organisms/CombatStatsPanel';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import './StatsEditor.css';

export function StatsEditor() {
  const { playerCharacter, updateStat, setPhase } = useGame();

  if (!playerCharacter) {
    return null;
  }

  const handleStrengthChange = (value: number) => {
    updateStat('player', 'strength', value);
  };

  const handleAgilityChange = (value: number) => {
    updateStat('player', 'agility', value);
  };

  const handleWitsChange = (value: number) => {
    updateStat('player', 'wits', value);
  };

  const handleEmpathyChange = (value: number) => {
    updateStat('player', 'empathy', value);
  };

  const handleBack = () => {
    setPhase('character-select');
  };

  const handleNext = () => {
    setPhase('derived-stats');
  };

  return (
    <div className="stats-editor">
      <header className="stats-editor__header">
        <NameDisplay name={playerCharacter.name} />
        <span className="stats-editor__subtitle">STATS</span>
      </header>
      <CombatStatsPanel
        strength={playerCharacter.strength}
        agility={playerCharacter.agility}
        wits={playerCharacter.wits}
        empathy={playerCharacter.empathy}
        onStrengthChange={handleStrengthChange}
        onAgilityChange={handleAgilityChange}
        onWitsChange={handleWitsChange}
        onEmpathyChange={handleEmpathyChange}
      />
      <div className="stats-editor__footer">
        <PhaseNavigation
          onBack={handleBack}
          backLabel="Back"
          onNext={handleNext}
          nextLabel="Next"
        />
      </div>
    </div>
  );
}
