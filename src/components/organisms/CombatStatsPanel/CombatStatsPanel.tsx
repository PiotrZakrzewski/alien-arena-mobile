import { StatRow } from '../../molecules/StatRow';
import './CombatStatsPanel.css';

export interface CombatStatsPanelProps {
  strength: number;
  agility: number;
  wits?: number;
  empathy?: number;
  onStrengthChange?: (value: number) => void;
  onAgilityChange?: (value: number) => void;
  onWitsChange?: (value: number) => void;
  onEmpathyChange?: (value: number) => void;
  readOnly?: boolean;
}

const STAT_TOOLTIPS = {
  strength: 'Raw physical power and endurance. Base attribute for Close Combat and Stamina rolls.',
  agility: 'Speed and reflexes. Base attribute for Ranged Combat and Mobility rolls. Determines initiative.',
  wits: 'Mental acuity and awareness. Used for observation and quick thinking.',
  empathy: 'Social awareness and connection. Used for command and medical care.',
};

export function CombatStatsPanel({
  strength,
  agility,
  wits,
  empathy,
  onStrengthChange,
  onAgilityChange,
  onWitsChange,
  onEmpathyChange,
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
      {wits !== undefined && (
        <StatRow
          label="WIT"
          tooltip={STAT_TOOLTIPS.wits}
          value={wits}
          onChange={onWitsChange}
          readOnly={readOnly}
        />
      )}
      {empathy !== undefined && (
        <StatRow
          label="EMP"
          tooltip={STAT_TOOLTIPS.empathy}
          value={empathy}
          onChange={onEmpathyChange}
          readOnly={readOnly}
        />
      )}
    </section>
  );
}
