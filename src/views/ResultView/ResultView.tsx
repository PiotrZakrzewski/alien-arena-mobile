import { useGame } from '../../state';
import './ResultView.css';

export function ResultView() {
  const { playerCharacter, enemyCharacter, combatState, resetCombat } = useGame();

  if (!playerCharacter || !enemyCharacter) {
    return null;
  }

  const playerWon = enemyCharacter.health <= 0;
  const round = combatState?.round ?? 0;

  return (
    <div className="result-view">
      <div
        className={`result-view__outcome ${
          playerWon ? 'result-view__outcome--victory' : 'result-view__outcome--defeat'
        }`}
      >
        {playerWon ? 'VICTORY' : 'DEFEAT'}
      </div>

      <div className="result-view__stats">
        <div className="result-view__stat">
          {playerCharacter.name}: {playerCharacter.health}/{playerCharacter.maxHealth} HP
        </div>
        <div className="result-view__stat">
          {enemyCharacter.name}: {enemyCharacter.health}/{enemyCharacter.maxHealth} HP
        </div>
        {round > 0 && (
          <div className="result-view__stat">
            COMBAT LASTED {round} {round === 1 ? 'ROUND' : 'ROUNDS'}
          </div>
        )}
      </div>

      <button
        className="result-view__button"
        onClick={resetCombat}
        type="button"
      >
        PLAY AGAIN &gt;&gt;
      </button>
    </div>
  );
}
