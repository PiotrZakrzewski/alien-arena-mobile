import { NameDisplay } from '../../components/atoms/NameDisplay';
import { SkillsPanel } from '../../components/organisms/SkillsPanel';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import './SkillsEditor.css';

export function SkillsEditor() {
  const { playerCharacter, updateSkill, setPhase } = useGame();

  if (!playerCharacter) {
    return null;
  }

  const handleSkillChange = (skillKey: string, value: number) => {
    updateSkill('player', skillKey, value);
  };

  const handleBack = () => {
    setPhase('stats');
  };

  const handleNext = () => {
    setPhase('items');
  };

  return (
    <div className="skills-editor">
      <header className="skills-editor__header">
        <NameDisplay name={playerCharacter.name} />
        <span className="skills-editor__subtitle">SKILLS</span>
      </header>
      <SkillsPanel
        skills={playerCharacter.skills}
        onSkillChange={handleSkillChange}
      />
      <div className="skills-editor__footer">
        <PhaseNavigation
          onBack={handleBack}
          backLabel="Stats"
          onNext={handleNext}
          nextLabel="Items"
        />
      </div>
    </div>
  );
}
