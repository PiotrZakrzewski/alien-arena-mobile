import type { Meta, StoryObj } from '@storybook/react';
import { ZoneCell } from './ZoneCell';

const meta = {
  title: 'Atoms/ZoneCell',
  component: ZoneCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Zone name',
    },
    cluttered: {
      control: 'boolean',
      description: 'Whether zone has clutter',
    },
    hasPlayer: {
      control: 'boolean',
      description: 'Whether player is in zone',
    },
    hasEnemy: {
      control: 'boolean',
      description: 'Whether enemy is in zone',
    },
    highlighted: {
      control: 'boolean',
      description: 'Whether zone is highlighted',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ZoneCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'ADJACENT',
    cluttered: false,
    hasPlayer: false,
    hasEnemy: false,
    highlighted: false,
  },
};

export const WithPlayer: Story = {
  args: {
    name: 'SHORT',
    cluttered: false,
    hasPlayer: true,
    hasEnemy: false,
    highlighted: false,
  },
};

export const WithEnemy: Story = {
  args: {
    name: 'MEDIUM',
    cluttered: false,
    hasPlayer: false,
    hasEnemy: true,
    highlighted: false,
  },
};

export const BothCharacters: Story = {
  args: {
    name: 'ADJACENT',
    cluttered: false,
    hasPlayer: true,
    hasEnemy: true,
    highlighted: false,
  },
};

export const Highlighted: Story = {
  args: {
    name: 'SHORT',
    cluttered: false,
    hasPlayer: false,
    hasEnemy: false,
    highlighted: true,
  },
};

export const Cluttered: Story = {
  args: {
    name: 'MEDIUM',
    cluttered: true,
    hasPlayer: false,
    hasEnemy: false,
    highlighted: false,
  },
};

export const ClutteredWithBoth: Story = {
  args: {
    name: 'ADJACENT',
    cluttered: true,
    hasPlayer: true,
    hasEnemy: true,
    highlighted: false,
  },
};

export const HighlightedWithPlayer: Story = {
  args: {
    name: 'SHORT',
    cluttered: false,
    hasPlayer: true,
    hasEnemy: false,
    highlighted: true,
  },
};

export const Clickable: Story = {
  args: {
    name: 'MEDIUM',
    cluttered: false,
    hasPlayer: false,
    hasEnemy: false,
    highlighted: false,
    onClick: () => alert('Zone clicked!'),
  },
};
