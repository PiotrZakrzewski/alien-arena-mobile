import './StatusBar.css';

export interface StatusBarProps {
  name: string;
  health: number;
  maxHealth: number;
  stress: number;
  variant: 'player' | 'enemy';
  hasCover?: boolean;
  isBroken?: boolean;
  isEngaged?: boolean;
}

export function StatusBar({
  name,
  health,
  maxHealth,
  stress,
  variant,
  hasCover = false,
  isBroken = false,
  isEngaged = false,
}: StatusBarProps) {
  const className = [
    'status-bar',
    `status-bar--${variant}`,
    isBroken ? 'status-bar--broken' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      aria-label={`${name} status: ${health} out of ${maxHealth} health, ${stress} stress${
        hasCover ? ', in cover' : ''
      }${isEngaged ? ', engaged' : ''}${isBroken ? ', broken' : ''}`}
    >
      <span className="status-bar__name">{name}</span>
      <span className="status-bar__stat">
        HP: {health}/{maxHealth}
      </span>
      <span className="status-bar__stat">STRESS: {stress}</span>
      {hasCover && <span className="status-bar__badge">[COVER]</span>}
      {isEngaged && (
        <span className="status-bar__badge status-bar__badge--engaged">[ENGAGED]</span>
      )}
      {isBroken && (
        <span className="status-bar__badge status-bar__badge--broken">[BROKEN]</span>
      )}
    </div>
  );
}
