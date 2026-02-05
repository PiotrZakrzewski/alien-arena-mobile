import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CombatStatsPanel } from './CombatStatsPanel';

const meta = {
  title: 'Organisms/CombatStatsPanel',
  component: CombatStatsPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    strength: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current strength value',
    },
    agility: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current agility value',
    },
  },
  args: {
    onStrengthChange: fn(),
    onAgilityChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CombatStatsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    strength: 3,
    agility: 3,
  },
};

export const HighStrength: Story = {
  args: {
    strength: 5,
    agility: 2,
  },
};

export const HighAgility: Story = {
  args: {
    strength: 2,
    agility: 5,
  },
};

export const Balanced: Story = {
  args: {
    strength: 4,
    agility: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    strength: 3,
    agility: 4,
    readOnly: true,
  },
};
