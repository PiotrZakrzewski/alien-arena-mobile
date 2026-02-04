import { IconButton } from '../../atoms/IconButton';
import './NavigationChevrons.css';

export interface NavigationChevronsProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function NavigationChevrons({
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: NavigationChevronsProps) {
  return (
    <div className="navigation-chevrons">
      <IconButton
        icon="chevron-left"
        onClick={onPrev}
        disabled={!hasPrev}
        label="Previous character"
      />
      <IconButton
        icon="chevron-right"
        onClick={onNext}
        disabled={!hasNext}
        label="Next character"
      />
    </div>
  );
}
