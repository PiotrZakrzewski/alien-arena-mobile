import type { Zone } from '../../../state/types';
import type { StatusBarProps } from '../../atoms/StatusBar';
import { StatusBar } from '../../atoms/StatusBar';
import { ZoneMap } from '../../molecules/ZoneMap';
import './CombatHud.css';

export interface CombatHudProps {
  round: number;
  player: StatusBarProps;
  enemy: StatusBarProps;
  zones: Zone[];
  playerZoneIndex: number;
  enemyZoneIndex: number;
  highlightedZones?: number[];
  onZoneClick?: (zoneIndex: number) => void;
}

export function CombatHud({
  round,
  player,
  enemy,
  zones,
  playerZoneIndex,
  enemyZoneIndex,
  highlightedZones,
  onZoneClick,
}: CombatHudProps) {
  return (
    <div className="combat-hud" aria-label="Combat heads-up display">
      <div className="combat-hud__round">ROUND {round}</div>
      <StatusBar {...player} />
      <ZoneMap
        zones={zones}
        playerZoneIndex={playerZoneIndex}
        enemyZoneIndex={enemyZoneIndex}
        highlightedZones={highlightedZones}
        onZoneClick={onZoneClick}
      />
      <StatusBar {...enemy} />
    </div>
  );
}
