import type { Meta, StoryObj } from '@storybook/react';
import { StatusBar } from './StatusBar';

const meta = {
  title: 'Atoms/StatusBar',
  component: StatusBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Character name',
    },
    health: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current health',
    },
    maxHealth: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum health',
    },
    stress: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current stress level',
    },
    variant: {
      control: 'radio',
      options: ['player', 'enemy'],
      description: 'Player (green) or enemy (red)',
    },
    hasCover: {
      control: 'boolean',
      description: 'Whether character has cover',
    },
    isBroken: {
      control: 'boolean',
      description: 'Whether character is broken',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px', minWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerHealthy: Story = {
  args: {
    name: 'MARINE',
    health: 7,
    maxHealth: 7,
    stress: 0,
    variant: 'player',
    hasCover: false,
    isBroken: false,
  },
};

export const PlayerDamaged: Story = {
  args: {
    name: 'MARINE',
    health: 3,
    maxHealth: 7,
    stress: 2,
    variant: 'player',
    hasCover: false,
    isBroken: false,
  },
};

export const PlayerWithCover: Story = {
  args: {
    name: 'MARINE',
    health: 5,
    maxHealth: 7,
    stress: 1,
    variant: 'player',
    hasCover: true,
    isBroken: false,
  },
};

export const PlayerBroken: Story = {
  args: {
    name: 'MARINE',
    health: 1,
    maxHealth: 7,
    stress: 7,
    variant: 'player',
    hasCover: false,
    isBroken: true,
  },
};

export const EnemyHealthy: Story = {
  args: {
    name: 'XENOMORPH',
    health: 8,
    maxHealth: 8,
    stress: 0,
    variant: 'enemy',
    hasCover: false,
    isBroken: false,
  },
};

export const EnemyDamaged: Story = {
  args: {
    name: 'XENOMORPH',
    health: 3,
    maxHealth: 8,
    stress: 1,
    variant: 'enemy',
    hasCover: false,
    isBroken: false,
  },
};

export const EnemyBroken: Story = {
  args: {
    name: 'XENOMORPH',
    health: 2,
    maxHealth: 8,
    stress: 6,
    variant: 'enemy',
    hasCover: false,
    isBroken: true,
  },
};

export const PlayerCritical: Story = {
  args: {
    name: 'OFFICER',
    health: 1,
    maxHealth: 6,
    stress: 5,
    variant: 'player',
    hasCover: true,
    isBroken: true,
  },
};
