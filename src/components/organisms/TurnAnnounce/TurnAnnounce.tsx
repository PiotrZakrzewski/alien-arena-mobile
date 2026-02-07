import { ProgressButton } from '../../atoms/ProgressButton';
import './TurnAnnounce.css';

export interface TurnAnnounceProps {
  characterName: string;
  round: number;
  isPlayer: boolean;
  onContinue: () => void;
}

export function TurnAnnounce({
  characterName,
  round,
  isPlayer,
  onContinue,
}: TurnAnnounceProps) {
  return (
    <div
      className={`turn-announce ${isPlayer ? 'turn-announce--player' : 'turn-announce--enemy'}`}
      aria-label={`Round ${round}, ${characterName}'s turn`}
    >
      <div className="turn-announce__round">ROUND {round}</div>
      <div className="turn-announce__name">{characterName}&apos;S TURN</div>
      <ProgressButton label="CONTINUE" onClick={onContinue} />
    </div>
  );
}
