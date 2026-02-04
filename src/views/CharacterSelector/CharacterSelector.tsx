import { useState } from 'react';
import { CharacterHeader } from '../../components/organisms/CharacterHeader';
import { CombatStatsPanel } from '../../components/organisms/CombatStatsPanel';
import { ProgressButton } from '../../components/atoms/ProgressButton';
import './CharacterSelector.css';

export interface Character {
  id: string;
  name: string;
  strength: number;
  agility: number;
}

export interface CharacterSelectorProps {
  characters: Character[];
  initialIndex?: number;
  onProgress?: (characters: Character[], currentIndex: number) => void;
}

export function CharacterSelector({
  characters,
  initialIndex = 0,
  onProgress,
}: CharacterSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [editedCharacters, setEditedCharacters] = useState<Character[]>(characters);

  const currentCharacter = editedCharacters[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < editedCharacters.length - 1;

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
    setEditedCharacters((prev) =>
      prev.map((char, idx) =>
        idx === currentIndex ? { ...char, strength: value } : char
      )
    );
  };

  const handleAgilityChange = (value: number) => {
    setEditedCharacters((prev) =>
      prev.map((char, idx) =>
        idx === currentIndex ? { ...char, agility: value } : char
      )
    );
  };

  const handleProgress = () => {
    onProgress?.(editedCharacters, currentIndex);
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
        <ProgressButton label="Skills" onClick={handleProgress} />
      </div>
    </div>
  );
}
