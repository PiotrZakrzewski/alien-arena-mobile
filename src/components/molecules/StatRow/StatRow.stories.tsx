import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StatRow } from './StatRow';

const meta = {
  title: 'Molecules/StatRow',
  component: StatRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The stat label (e.g., STR, AGI)',
    },
    tooltip: {
      control: 'text',
      description: 'Explanation of what the stat does',
    },
    value: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current stat value',
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '80px 40px 20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Strength: Story = {
  args: {
    label: 'STR',
    tooltip: 'Raw physical power and endurance. Base attribute for Close Combat and Stamina rolls.',
    value: 3,
  },
};

export const Agility: Story = {
  args: {
    label: 'AGI',
    tooltip: 'Speed and reflexes. Base attribute for Ranged Combat and Mobility rolls. Determines initiative.',
    value: 4,
  },
};
