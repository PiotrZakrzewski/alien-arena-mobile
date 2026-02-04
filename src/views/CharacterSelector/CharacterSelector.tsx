import { useState } from 'react';
import { CharacterHeader } from '../../components/organisms/CharacterHeader';
import { CombatStatsPanel } from '../../components/organisms/CombatStatsPanel';
import { ProgressButton } from '../../components/atoms/ProgressButton';
import { useGame } from '../../state';
import './CharacterSelector.css';

export function CharacterSelector() {
  const { characters, updateCharacter, selectPlayer, setPhase } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCharacter = characters[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < characters.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleStrengthChange = (value: number) => {
    if (currentCharacter) {
      updateCharacter(currentCharacter.id, { strength: value });
    }
  };

  const handleAgilityChange = (value: number) => {
    if (currentCharacter) {
      updateCharacter(currentCharacter.id, { agility: value });
    }
  };

  const handleProgress = () => {
    if (currentCharacter) {
      selectPlayer(currentCharacter.id);
      setPhase('combat');
    }
  };

  if (!currentCharacter) {
    return null;
  }

  return (
    <div className="character-selector">
      <CharacterHeader
        name={currentCharacter.name}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
      <CombatStatsPanel
        strength={currentCharacter.strength}
        agility={currentCharacter.agility}
        onStrengthChange={handleStrengthChange}
        onAgilityChange={handleAgilityChange}
      />
      <div className="character-selector__footer">
        <ProgressButton label="Select" onClick={handleProgress} />
      </div>
    </div>
  );
}
