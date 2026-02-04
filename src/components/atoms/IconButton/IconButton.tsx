import './IconButton.css';

export type IconType = 'chevron-left' | 'chevron-right' | 'plus' | 'minus';

export interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const iconPaths: Record<IconType, string> = {
  'chevron-left': 'M15 18l-6-6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
  'plus': 'M12 5v14M5 12h14',
  'minus': 'M5 12h14',
};

export function IconButton({ icon, onClick, disabled = false, label }: IconButtonProps) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      type="button"
    >
      <svg
        className="icon-button__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={iconPaths[icon]} />
      </svg>
    </button>
  );
}
