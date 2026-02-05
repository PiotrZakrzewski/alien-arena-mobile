import { Career } from '../state/types';

export interface TalentDefinition {
  key: string;
  label: string;
  description: string;
  maxStacks: number;
  careers: Career[] | 'all';
}

export const TALENT_DEFINITIONS: TalentDefinition[] = [
  {
    key: 'overkill',
    label: 'OVERKILL',
    description: 'On panic 9+: enter overkill mode. Must attack until all enemies in sight broken. All PCs in zone make panic roll.',
    maxStacks: 1,
    careers: ['marine'],
  },
  {
    key: 'subdue',
    label: 'SUBDUE',
    description: '+2 dice when grappling.',
    maxStacks: 1,
    careers: ['marshal'],
  },
  {
    key: 'resilient',
    label: 'RESILIENT',
    description: 'Roll Strength (attribute only, no skill) when taking damage to reduce it. Cannot be pushed.',
    maxStacks: 1,
    careers: ['roughneck'],
  },
  {
    key: 'trueGrit',
    label: 'TRUE GRIT',
    description: 'Can push Strength-based skills twice (+1 stress per push).',
    maxStacks: 1,
    careers: ['roughneck'],
  },
  {
    key: 'fieldCommander',
    label: 'FIELD COMMANDER',
    description: 'Use COMMAND as quick action instead of full.',
    maxStacks: 1,
    careers: ['officer'],
  },
  {
    key: 'nimble',
    label: 'NIMBLE',
    description: 'Can push Agility-based skills twice (+1 stress per push).',
    maxStacks: 1,
    careers: ['kid'],
  },
  {
    key: 'fieldSurgery',
    label: 'FIELD SURGERY',
    description: '+2 dice to MEDICAL AID for first aid.',
    maxStacks: 1,
    careers: ['medic'],
  },
  {
    key: 'haymaker',
    label: 'HAYMAKER',
    description: '+2 dice to close combat attack. Can also make unarmed attack as quick action (-2 dice).',
    maxStacks: 1,
    careers: 'all',
  },
  {
    key: 'seenItAll',
    label: 'SEEN IT ALL',
    description: '+1 Resolve.',
    maxStacks: 3,
    careers: 'all',
  },
  {
    key: 'weaponSpecialist',
    label: 'WEAPON SPECIALIST',
    description: '+2 dice with a specific weapon model. Can take multiple times for different weapons.',
    maxStacks: 3,
    careers: 'all',
  },
];
