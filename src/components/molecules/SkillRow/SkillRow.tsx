import { InfoIcon } from '../../atoms/InfoIcon';
import { StatLabel } from '../../atoms/StatLabel';
import { StatEditor } from '../StatEditor';
import './SkillRow.css';

export interface SkillRowProps {
  label: string;
  tooltip: string;
  baseStat: 'strength' | 'agility';
  value: number;
  onChange: (value: number) => void;
}

const BASE_STAT_LABELS = {
  strength: 'STR',
  agility: 'AGI',
};

export function SkillRow({
  label,
  tooltip,
  baseStat,
  value,
  onChange,
}: SkillRowProps) {
  return (
    <div className="skill-row">
      <div className="skill-row__header">
        <InfoIcon tooltip={tooltip} />
        <StatLabel label={label} />
        <span className="skill-row__badge">{BASE_STAT_LABELS[baseStat]}</span>
      </div>
      <StatEditor
        value={value}
        onChange={onChange}
        min={0}
        max={5}
        label={label}
      />
    </div>
  );
}
