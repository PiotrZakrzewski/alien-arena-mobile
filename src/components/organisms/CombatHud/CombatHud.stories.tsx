import type { Meta, StoryObj } from '@storybook/react';
import { CombatHud } from './CombatHud';

const meta = {
  title: 'Organisms/CombatHud',
  component: CombatHud,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '20px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CombatHud>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockZones = [
  { id: 'zone-0', name: 'ZONE 1', cluttered: true },
  { id: 'zone-1', name: 'ZONE 2', cluttered: false },
  { id: 'zone-2', name: 'ZONE 3', cluttered: true },
];

export const RoundOne: Story = {
  args: {
    round: 1,
    player: {
      name: 'MARINE',
      health: 8,
      maxHealth: 8,
      stress: 0,
      variant: 'player',
      hasCover: false,
      isBroken: false,
    },
    enemy: {
      name: 'XENOMORPH',
      health: 10,
      maxHealth: 10,
      stress: 0,
      variant: 'enemy',
      hasCover: false,
      isBroken: false,
    },
    zones: mockZones,
    playerZoneIndex: 0,
    enemyZoneIndex: 2,
    mapExpanded: true,
    onToggleMap: () => {},
  },
};

export const MidCombat: Story = {
  args: {
    round: 3,
    player: {
      name: 'MARINE',
      health: 4,
      maxHealth: 8,
      stress: 5,
      variant: 'player',
      hasCover: true,
      isBroken: false,
    },
    enemy: {
      name: 'XENOMORPH',
      health: 6,
      maxHealth: 10,
      stress: 0,
      variant: 'enemy',
      hasCover: false,
      isBroken: false,
    },
    zones: mockZones,
    playerZoneIndex: 1,
    enemyZoneIndex: 1,
    mapExpanded: true,
    onToggleMap: () => {},
  },
};

export const EngagedInMelee: Story = {
  args: {
    round: 2,
    player: {
      name: 'MARINE',
      health: 6,
      maxHealth: 8,
      stress: 2,
      variant: 'player',
      hasCover: false,
      isBroken: false,
      isEngaged: true,
    },
    enemy: {
      name: 'XENOMORPH',
      health: 8,
      maxHealth: 10,
      stress: 0,
      variant: 'enemy',
      hasCover: false,
      isBroken: false,
      isEngaged: true,
    },
    zones: mockZones,
    playerZoneIndex: 1,
    enemyZoneIndex: 1,
    engaged: true,
    mapExpanded: true,
    onToggleMap: () => {},
  },
};
