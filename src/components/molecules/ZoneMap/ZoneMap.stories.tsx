import type { Meta, StoryObj } from '@storybook/react';
import type { Zone } from '../../../state/types';
import { ZoneMap } from './ZoneMap';

const mockZones: Zone[] = [
  { id: 'zone-0', name: 'ADJACENT', cluttered: false },
  { id: 'zone-1', name: 'SHORT', cluttered: false },
  { id: 'zone-2', name: 'MEDIUM', cluttered: false },
];

const mockClutteredZones: Zone[] = [
  { id: 'zone-0', name: 'ADJACENT', cluttered: true },
  { id: 'zone-1', name: 'SHORT', cluttered: true },
  { id: 'zone-2', name: 'MEDIUM', cluttered: true },
];

const meta = {
  title: 'Molecules/ZoneMap',
  component: ZoneMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    playerZoneIndex: {
      control: { type: 'number', min: 0, max: 2 },
      description: 'Zone index where player is located',
    },
    enemyZoneIndex: {
      control: { type: 'number', min: 0, max: 2 },
      description: 'Zone index where enemy is located',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ZoneMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPositions: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 0,
    enemyZoneIndex: 2,
  },
};

export const SameZone: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 1,
    enemyZoneIndex: 1,
  },
};

export const HighlightedMoveTargets: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 0,
    enemyZoneIndex: 2,
    highlightedZones: [1],
  },
};

export const AllCluttered: Story = {
  args: {
    zones: mockClutteredZones,
    playerZoneIndex: 0,
    enemyZoneIndex: 2,
  },
};

export const PlayerAdvancing: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 1,
    enemyZoneIndex: 2,
    highlightedZones: [0, 2],
  },
};

export const MixedClutter: Story = {
  args: {
    zones: [
      { id: 'zone-0', name: 'ADJACENT', cluttered: true },
      { id: 'zone-1', name: 'SHORT', cluttered: false },
      { id: 'zone-2', name: 'MEDIUM', cluttered: true },
    ],
    playerZoneIndex: 0,
    enemyZoneIndex: 1,
  },
};

export const Interactive: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 0,
    enemyZoneIndex: 2,
    highlightedZones: [1],
    onZoneClick: (index: number) => {
      alert(`Zone ${index} clicked!`);
    },
  },
};

export const EnemyRetreat: Story = {
  args: {
    zones: mockZones,
    playerZoneIndex: 1,
    enemyZoneIndex: 1,
    highlightedZones: [0, 2],
  },
};
