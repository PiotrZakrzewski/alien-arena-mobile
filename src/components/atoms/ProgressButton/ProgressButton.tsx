import './ProgressButton.css';

export interface ProgressButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ProgressButton({ label, onClick, disabled = false }: ProgressButtonProps) {
  return (
    <button
      className="progress-button"
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className="progress-button__label">{label}</span>
      <span className="progress-button__arrow" aria-hidden="true">
        &gt;&gt;
      </span>
    </button>
  );
}
