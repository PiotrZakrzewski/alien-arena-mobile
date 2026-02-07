import './ActionButton.css';

export interface ActionButtonProps {
  label: string;
  description: string;
  speed: 'quick' | 'full';
  disabled?: boolean;
  disabledReason?: string;
  onClick: () => void;
}

export function ActionButton({
  label,
  description,
  speed,
  disabled = false,
  disabledReason,
  onClick,
}: ActionButtonProps) {
  const speedTag = speed === 'quick' ? '[Q]' : '[F]';

  return (
    <button
      className={`action-button ${disabled ? 'action-button--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      title={disabled && disabledReason ? disabledReason : undefined}
    >
      <div className="action-button__header">
        <span className="action-button__speed" aria-label={`${speed} action`}>
          {speedTag}
        </span>
        <span className="action-button__label">{label}</span>
      </div>
      <div className="action-button__description">{description}</div>
      {disabled && disabledReason && (
        <div className="action-button__reason">{disabledReason}</div>
      )}
    </button>
  );
}
