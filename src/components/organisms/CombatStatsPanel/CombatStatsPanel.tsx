import { StatRow } from '../../molecules/StatRow';
import './CombatStatsPanel.css';

export interface CombatStatsPanelProps {
  strength: number;
  agility: number;
  onStrengthChange?: (value: number) => void;
  onAgilityChange?: (value: number) => void;
  readOnly?: boolean;
}

const STAT_TOOLTIPS = {
  strength: 'Raw physical power and endurance. Base attribute for Close Combat and Stamina rolls.',
  agility: 'Speed and reflexes. Base attribute for Ranged Combat and Mobility rolls. Determines initiative.',
};

export function CombatStatsPanel({
  strength,
  agility,
  onStrengthChange,
  onAgilityChange,
  readOnly = false,
}: CombatStatsPanelProps) {
  return (
    <section className="combat-stats-panel" aria-label="Combat Stats">
      <StatRow
        label="STR"
        tooltip={STAT_TOOLTIPS.strength}
        value={strength}
        onChange={onStrengthChange}
        readOnly={readOnly}
      />
      <StatRow
        label="AGI"
        tooltip={STAT_TOOLTIPS.agility}
        value={agility}
        onChange={onAgilityChange}
        readOnly={readOnly}
      />
    </section>
  );
}
