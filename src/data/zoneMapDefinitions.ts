import type { ZoneMap, CombatActionType } from '../state/types';

export interface CombatActionDefinition {
  type: CombatActionType;
  label: string;
  description: string;
  speed: 'quick' | 'full';
}

export const ZONE_MAP_PRESETS: ZoneMap[] = [
  {
    id: 'station-deck-a',
    name: 'STATION DECK A',
    zones: [
      { id: 'zone-0', name: 'CARGO BAY', cluttered: true },
      { id: 'zone-1', name: 'CORRIDOR', cluttered: false },
      { id: 'zone-2', name: 'COMMAND CENTER', cluttered: true },
    ],
  },
  {
    id: 'colony-perimeter',
    name: 'COLONY PERIMETER',
    zones: [
      { id: 'zone-0', name: 'WATCHTOWER', cluttered: false },
      { id: 'zone-1', name: 'COURTYARD', cluttered: false },
      { id: 'zone-2', name: 'BARRICADE', cluttered: true },
    ],
  },
  {
    id: 'ship-interior',
    name: 'SHIP INTERIOR',
    zones: [
      { id: 'zone-0', name: 'ENGINE ROOM', cluttered: true },
      { id: 'zone-1', name: 'MESS HALL', cluttered: true },
      { id: 'zone-2', name: 'BRIDGE', cluttered: false },
    ],
  },
];

export const COMBAT_ACTION_DEFINITIONS: CombatActionDefinition[] = [
  {
    type: 'move',
    label: 'MOVE',
    description: 'Move to an adjacent zone',
    speed: 'quick',
  },
  {
    type: 'close-attack',
    label: 'CLOSE ATTACK',
    description: 'Melee attack on target in same zone',
    speed: 'full',
  },
  {
    type: 'ranged-attack',
    label: 'RANGED ATTACK',
    description: 'Ranged attack on target in range',
    speed: 'full',
  },
  {
    type: 'partial-cover',
    label: 'TAKE COVER',
    description: 'Use zone clutter for partial cover',
    speed: 'quick',
  },
];
