import './ZoneCell.css';

export interface ZoneCellProps {
  name: string;
  cluttered: boolean;
  hasPlayer: boolean;
  hasEnemy: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

export function ZoneCell({
  name,
  cluttered,
  hasPlayer,
  hasEnemy,
  highlighted = false,
  onClick,
}: ZoneCellProps) {
  const className = [
    'zone-cell',
    highlighted ? 'zone-cell--highlighted' : '',
    onClick ? 'zone-cell--clickable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`Zone ${name}${cluttered ? ' cluttered' : ''}${
        hasPlayer ? ' player present' : ''
      }${hasEnemy ? ' enemy present' : ''}`}
    >
      <div className="zone-cell__header">
        <span className="zone-cell__name">{name}</span>
        {cluttered && <span className="zone-cell__clutter">[CLUTTER]</span>}
      </div>
      <div className="zone-cell__markers">
        {hasPlayer && <span className="zone-cell__marker zone-cell__marker--player" />}
        {hasEnemy && <span className="zone-cell__marker zone-cell__marker--enemy" />}
      </div>
    </div>
  );
}
