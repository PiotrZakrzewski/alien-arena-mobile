import { useState } from 'react';
import { CharacterHeader } from '../../components/organisms/CharacterHeader';
import { ProgressButton } from '../../components/atoms/ProgressButton';
import { useGame } from '../../state';
import { CHARACTER_PRESETS, createCharacterFromPreset } from '../../data';
import './CharacterSelector.css';

export function CharacterSelector() {
  const { selectCharacter, setPhase } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPreset = CHARACTER_PRESETS[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < CHARACTER_PRESETS.length - 1;

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

  const handleProgress = () => {
    if (currentPreset) {
      const character = createCharacterFromPreset(currentPreset);
      selectCharacter('player', character);
      setPhase('stats');
    }
  };

  if (!currentPreset) {
    return null;
  }

  return (
    <div className="character-selector">
      <CharacterHeader
        name={currentPreset.name}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
      <p className="character-selector__description">
        {currentPreset.description}
      </p>
      <div className="character-selector__footer">
        <ProgressButton label="Select" onClick={handleProgress} />
      </div>
    </div>
  );
}
