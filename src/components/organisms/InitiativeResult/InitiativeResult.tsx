import { useCallback, useEffect, useState } from 'react';
import { InitiativeCard } from '../../atoms/InitiativeCard';
import './InitiativeResult.css';

export interface InitiativeResultProps {
  playerCard: number;
  enemyCard: number;
  playerName: string;
  enemyName: string;
  animate?: boolean;
  onContinue?: () => void;
}

export function InitiativeResult({
  playerCard,
  enemyCard,
  playerName,
  enemyName,
  animate = true,
  onContinue,
}: InitiativeResultProps) {
  const [drawing, setDrawing] = useState(animate);
  const [revealed, setRevealed] = useState(!animate);

  const handleReveal = useCallback(() => {
    setDrawing(false);
    setRevealed(true);
  }, []);

  useEffect(() => {
    if (!animate) return;

    const timer = setTimeout(handleReveal, 800);
    return () => clearTimeout(timer);
  }, [animate, handleReveal]);

  const winner = playerCard < enemyCard ? 'player' : 'enemy';
  const winnerName = winner === 'player' ? playerName : enemyName;

  return (
    <section className="initiative-result" aria-label="Initiative">
      <h2 className="initiative-result__title">INITIATIVE</h2>

      <div className="initiative-result__cards">
        <div className="initiative-result__side">
          <span className="initiative-result__name initiative-result__name--player">
            {playerName}
          </span>
          <InitiativeCard
            value={playerCard}
            variant="player"
            isDrawing={drawing}
            isWinner={revealed && winner === 'player'}
          />
        </div>

        <span className="initiative-result__vs">VS</span>

        <div className="initiative-result__side">
          <span className="initiative-result__name initiative-result__name--enemy">
            {enemyName}
          </span>
          <InitiativeCard
            value={enemyCard}
            variant="enemy"
            isDrawing={drawing}
            isWinner={revealed && winner === 'enemy'}
          />
        </div>
      </div>

      {revealed && (
        <div className="initiative-result__outcome">
          <span
            className={`initiative-result__winner initiative-result__winner--${winner}`}
          >
            {winnerName} GOES FIRST
          </span>
        </div>
      )}

      {revealed && onContinue && (
        <div className="initiative-result__continue">
          <button
            className="initiative-result__continue-button"
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
