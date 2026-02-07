import type { Zone } from '../../../state/types';
import { ZoneCell } from '../../atoms/ZoneCell';
import './ZoneMap.css';

export interface ZoneMapProps {
  zones: Zone[];
  playerZoneIndex: number;
  enemyZoneIndex: number;
  highlightedZones?: number[];
  onZoneClick?: (zoneIndex: number) => void;
}

export function ZoneMap({
  zones,
  playerZoneIndex,
  enemyZoneIndex,
  highlightedZones = [],
  onZoneClick,
}: ZoneMapProps) {
  return (
    <div className="zone-map" aria-label="Combat zone map">
      {zones.map((zone, index) => (
        <div key={zone.id} className="zone-map__item">
          <ZoneCell
            name={zone.name}
            cluttered={zone.cluttered}
            hasPlayer={index === playerZoneIndex}
            hasEnemy={index === enemyZoneIndex}
            highlighted={highlightedZones.includes(index)}
            onClick={onZoneClick ? () => onZoneClick(index) : undefined}
          />
          {index < zones.length - 1 && (
            <div className="zone-map__connector" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
