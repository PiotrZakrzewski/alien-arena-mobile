import { IconButton } from '../../atoms/IconButton';
import { StatValue } from '../../atoms/StatValue';
import './StatEditor.css';

export interface StatEditorProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  readOnly?: boolean;
}

export function StatEditor({
  value,
  onChange,
  min = 1,
  max = 5,
  label,
  readOnly = false,
}: StatEditorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange?.(value + 1);
    }
  };

  if (readOnly) {
    return (
      <div className="stat-editor" role="group" aria-label={`${label} value`}>
        <StatValue value={value} />
      </div>
    );
  }

  return (
    <div className="stat-editor" role="group" aria-label={`${label} editor`}>
      <IconButton
        icon="minus"
        onClick={handleDecrease}
        disabled={value <= min}
        label={`Decrease ${label}`}
      />
      <StatValue value={value} />
      <IconButton
        icon="plus"
        onClick={handleIncrease}
        disabled={value >= max}
        label={`Increase ${label}`}
      />
    </div>
  );
}
