import { NameDisplay } from '../../atoms/NameDisplay';
import { NavigationChevrons } from '../../molecules/NavigationChevrons';
import './CharacterHeader.css';

export interface CharacterHeaderProps {
  name: string;
  onPrev: () => void;
  onNext: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function CharacterHeader({
  name,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: CharacterHeaderProps) {
  return (
    <header className="character-header">
      <NavigationChevrons
        onPrev={onPrev}
        onNext={onNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
      <NameDisplay name={name} />
    </header>
  );
}
