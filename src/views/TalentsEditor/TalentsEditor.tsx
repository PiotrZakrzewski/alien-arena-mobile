import { NameDisplay } from '../../components/atoms/NameDisplay';
import { StatRow } from '../../components/molecules/StatRow';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import { TALENT_DEFINITIONS } from '../../data';
import './TalentsEditor.css';

export function TalentsEditor() {
  const { playerCharacter, updateTalent, setPhase } = useGame();

  if (!playerCharacter) {
    return null;
  }

  const availableTalents = TALENT_DEFINITIONS.filter(
    (t) => t.careers === 'all' || t.careers.includes(playerCharacter.career),
  );

  const handleTalentChange = (talentKey: string, value: number) => {
    updateTalent('player', talentKey, value);
  };

  const handleBack = () => {
    setPhase('items');
  };

  const handleNext = () => {
    setPhase('combat');
  };

  return (
    <div className="talents-editor">
      <header className="talents-editor__header">
        <NameDisplay name={playerCharacter.name} />
        <span className="talents-editor__subtitle">TALENTS</span>
      </header>
      <section className="talents-editor__list" aria-label="Talents">
        {availableTalents.map((talent) => (
          <StatRow
            key={talent.key}
            label={talent.label}
            tooltip={talent.description}
            value={playerCharacter.talents[talent.key] ?? 0}
            onChange={(value) => handleTalentChange(talent.key, value)}
            min={0}
            max={talent.maxStacks}
          />
        ))}
      </section>
      <div className="talents-editor__footer">
        <PhaseNavigation
          onBack={handleBack}
          backLabel="Items"
          onNext={handleNext}
          nextLabel="Combat"
        />
      </div>
    </div>
  );
}
