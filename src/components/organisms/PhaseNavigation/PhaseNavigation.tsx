import './PhaseNavigation.css';

export interface PhaseNavigationProps {
  onBack?: () => void;
  backLabel?: string;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}

export function PhaseNavigation({
  onBack,
  backLabel = 'Back',
  onNext,
  nextLabel,
  nextDisabled = false,
}: PhaseNavigationProps) {
  return (
    <nav className="phase-navigation" aria-label="Phase Navigation">
      {onBack && (
        <button
          className="phase-navigation__button phase-navigation__button--back"
          onClick={onBack}
          type="button"
        >
          <span className="phase-navigation__arrow" aria-hidden="true">
            &lt;&lt;
          </span>
          <span className="phase-navigation__label">{backLabel}</span>
        </button>
      )}
      <button
        className="phase-navigation__button phase-navigation__button--next"
        onClick={onNext}
        disabled={nextDisabled}
        type="button"
      >
        <span className="phase-navigation__label">{nextLabel}</span>
        <span className="phase-navigation__arrow" aria-hidden="true">
          &gt;&gt;
        </span>
      </button>
    </nav>
  );
}
