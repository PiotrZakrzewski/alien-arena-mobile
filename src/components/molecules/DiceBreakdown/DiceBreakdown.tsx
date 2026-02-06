import './DiceBreakdown.css';

export interface DiceSource {
  label: string;
  count: number;
}

export interface DiceBreakdownProps {
  sources: DiceSource[];
  stressDice: number;
  totalBaseDice: number;
}

export function DiceBreakdown({ sources, stressDice, totalBaseDice }: DiceBreakdownProps) {
  const positive = sources.filter((s) => s.count > 0);
  const negative = sources.filter((s) => s.count < 0);

  return (
    <div className="dice-breakdown" aria-label="Dice pool breakdown">
      {positive.length > 0 && (
        <div className="dice-breakdown__line dice-breakdown__line--positive">
          {positive.map((source, i) => (
            <span key={source.label}>
              {i > 0 && <span className="dice-breakdown__operator"> + </span>}
              <span className="dice-breakdown__label">{source.label}</span>
              <span className="dice-breakdown__count"> {source.count > 0 ? `+${source.count}` : source.count}</span>
            </span>
          ))}
        </div>
      )}
      {negative.map((source) => (
        <div key={source.label} className="dice-breakdown__line dice-breakdown__line--negative">
          <span className="dice-breakdown__operator">&minus; </span>
          <span className="dice-breakdown__label">{source.label}</span>
          <span className="dice-breakdown__count"> {Math.abs(source.count)}</span>
        </div>
      ))}
      <div className="dice-breakdown__separator" />
      <div className="dice-breakdown__total">
        <span className="dice-breakdown__total-base">{totalBaseDice} BASE DICE</span>
        {stressDice > 0 && (
          <>
            <span className="dice-breakdown__total-plus"> + </span>
            <span className="dice-breakdown__total-stress">{stressDice} STRESS DICE</span>
          </>
        )}
      </div>
    </div>
  );
}
