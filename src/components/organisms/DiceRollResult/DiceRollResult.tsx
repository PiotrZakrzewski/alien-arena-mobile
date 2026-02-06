import { useCallback, useState } from 'react';
import { DiceBreakdown } from '../../molecules/DiceBreakdown';
import { DicePool } from '../../molecules/DicePool';
import type { DiceSource } from '../../molecules/DiceBreakdown';
import type { DieResult } from '../../molecules/DicePool';
import './DiceRollResult.css';

export type PushState =
  | { allowed: true }
  | { allowed: false; reason: string };

export interface DiceRollResultProps {
  title: string;
  sources: DiceSource[];
  stressDice: number;
  baseDiceResults: number[];
  stressDiceResults: number[];
  pushState: PushState | null;
  onPush?: () => void;
  successText: string;
  failureText: string;
  animate?: boolean;
  onContinue?: () => void;
}

export function DiceRollResult({
  title,
  sources,
  stressDice,
  baseDiceResults,
  stressDiceResults,
  pushState,
  onPush,
  successText,
  failureText,
  animate = true,
  onContinue,
}: DiceRollResultProps) {
  const [animating, setAnimating] = useState(animate);
  const [revealed, setRevealed] = useState(!animate);

  const handleAnimationComplete = useCallback(() => {
    setAnimating(false);
    setRevealed(true);
  }, []);

  const totalBaseDice = baseDiceResults.length;
  const successCount =
    baseDiceResults.filter((v) => v === 6).length +
    stressDiceResults.filter((v) => v === 6).length;

  const dice: DieResult[] = [
    ...baseDiceResults.map((value) => ({ value, variant: 'normal' as const })),
    ...stressDiceResults.map((value) => ({ value, variant: 'stress' as const })),
  ];

  return (
    <section className="dice-roll-result" aria-label={title}>
      <h2 className="dice-roll-result__title">{title}</h2>

      <DiceBreakdown
        sources={sources}
        stressDice={stressDice}
        totalBaseDice={totalBaseDice}
      />

      <DicePool
        dice={dice}
        animate={animating}
        onAnimationComplete={handleAnimationComplete}
      />

      {revealed && (
        <div className="dice-roll-result__outcome">
          <div
            className={`dice-roll-result__count ${
              successCount > 0
                ? 'dice-roll-result__count--success'
                : 'dice-roll-result__count--failure'
            }`}
          >
            {successCount === 0 ? 'NO SUCCESSES' : `${successCount} ${successCount === 1 ? 'SUCCESS' : 'SUCCESSES'}`}
          </div>
          <div className="dice-roll-result__context">
            {successCount > 0 ? successText : failureText}
          </div>
        </div>
      )}

      {revealed && pushState && (
        <div className="dice-roll-result__push">
          {pushState.allowed ? (
            <button
              className="dice-roll-result__push-button"
              onClick={onPush}
              type="button"
            >
              PUSH THE ROLL
            </button>
          ) : (
            <div className="dice-roll-result__push-blocked">
              Cannot push: {pushState.reason}
            </div>
          )}
        </div>
      )}

      {revealed && onContinue && (
        <div className="dice-roll-result__continue">
          <button
            className="dice-roll-result__continue-button"
            onClick={onContinue}
            type="button"
          >
            <span>CONTINUE</span>
            <span aria-hidden="true"> &gt;&gt;</span>
          </button>
        </div>
      )}
    </section>
  );
}
