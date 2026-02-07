import { ProgressButton } from '../../atoms/ProgressButton';
import './EffectSummary.css';

export interface EffectLineData {
  text: string;
  type: 'damage' | 'move' | 'cover' | 'panic' | 'info';
}

export interface EffectSummaryProps {
  lines: EffectLineData[];
  onContinue: () => void;
}

export function EffectSummary({ lines, onContinue }: EffectSummaryProps) {
  return (
    <div className="effect-summary" aria-label="Effect summary">
      <div className="effect-summary__lines">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`effect-summary__line effect-summary__line--${line.type}`}
            aria-label={`${line.type}: ${line.text}`}
          >
            {line.text}
          </div>
        ))}
      </div>
      <ProgressButton label="CONTINUE" onClick={onContinue} />
    </div>
  );
}
