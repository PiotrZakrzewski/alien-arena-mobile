import { StatRow } from '../../molecules/StatRow';
import './CombatStatsPanel.css';

export interface CombatStatsPanelProps {
  strength: number;
  agility: number;
  onStrengthChange: (value: number) => void;
  onAgilityChange: (value: number) => void;
}

const STAT_TOOLTIPS = {
  strength: 'Strength determines your damage in melee combat and ability to resist physical effects.',
  agility: 'Agility affects your accuracy, dodge chance, and movement speed during combat.',
};

export function CombatStatsPanel({
  strength,
  agility,
  onStrengthChange,
  onAgilityChange,
}: CombatStatsPanelProps) {
  return (
    <section className="combat-stats-panel" aria-label="Combat Stats">
      <StatRow
        label="STR"
        tooltip={STAT_TOOLTIPS.strength}
        value={strength}
        onChange={onStrengthChange}
      />
      <StatRow
        label="AGI"
        tooltip={STAT_TOOLTIPS.agility}
        value={agility}
        onChange={onAgilityChange}
      />
    </section>
  );
}
