import { InfoIcon } from '../../atoms/InfoIcon';
import { StatLabel } from '../../atoms/StatLabel';
import { StatEditor } from '../StatEditor';
import './StatRow.css';

export interface StatRowProps {
  label: string;
  tooltip: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  readOnly?: boolean;
}

export function StatRow({
  label,
  tooltip,
  value,
  onChange,
  min = 1,
  max = 5,
  readOnly = false,
}: StatRowProps) {
  return (
    <div className="stat-row">
      <div className="stat-row__header">
        <InfoIcon tooltip={tooltip} />
        <StatLabel label={label} />
      </div>
      <StatEditor
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        label={label}
        readOnly={readOnly}
      />
    </div>
  );
}
