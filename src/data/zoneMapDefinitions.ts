import type { ZoneMap, CombatActionType } from '../state/types';

export interface CombatActionDefinition {
  type: CombatActionType;
  label: string;
  description: string;
  speed: 'quick' | 'full';
}

export const ZONE_MAP_PRESETS: ZoneMap[] = [
  {
    id: 'default',
    name: 'COMBAT ZONE',
    zones: [
      { id: 'zone-0', name: 'ZONE 1', cluttered: true },
      { id: 'zone-1', name: 'ZONE 2', cluttered: false },
      { id: 'zone-2', name: 'ZONE 3', cluttered: true },
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
  {
    type: 'engage',
    label: 'ENGAGE',
    description: 'Close to melee range',
    speed: 'quick',
  },
  {
    type: 'disengage',
    label: 'DISENGAGE',
    description: 'Pull back within zone',
    speed: 'quick',
  },
];
