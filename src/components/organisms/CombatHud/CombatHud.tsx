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
  mapExpanded: boolean;
  onToggleMap: () => void;
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
  mapExpanded,
  onToggleMap,
}: CombatHudProps) {
  return (
    <div className="combat-hud" aria-label="Combat heads-up display">
      <div className="combat-hud__top-row">
        <div className="combat-hud__round">ROUND {round}</div>
        <button
          className="combat-hud__map-toggle"
          onClick={onToggleMap}
          type="button"
        >
          MAP {mapExpanded ? '▲' : '▼'}
        </button>
      </div>
      <StatusBar {...player} />
      <StatusBar {...enemy} />
      {mapExpanded && (
        <ZoneMap
          zones={zones}
          playerZoneIndex={playerZoneIndex}
          enemyZoneIndex={enemyZoneIndex}
          highlightedZones={highlightedZones}
          onZoneClick={onZoneClick}
        />
      )}
    </div>
  );
}
