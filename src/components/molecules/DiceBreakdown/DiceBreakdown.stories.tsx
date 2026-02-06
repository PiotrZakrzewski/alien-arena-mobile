import type { Meta, StoryObj } from '@storybook/react';
import { DiceBreakdown } from './DiceBreakdown';

const meta = {
  title: 'Molecules/DiceBreakdown',
  component: DiceBreakdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DiceBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleRoll: Story = {
  args: {
    sources: [
      { label: 'STR', count: 3 },
      { label: 'CLOSE COMBAT', count: 2 },
    ],
    stressDice: 1,
    totalBaseDice: 5,
  },
};

export const WithWeaponBonus: Story = {
  args: {
    sources: [
      { label: 'STR', count: 3 },
      { label: 'CLOSE COMBAT', count: 2 },
      { label: 'KNIFE', count: 1 },
    ],
    stressDice: 2,
    totalBaseDice: 6,
  },
};

export const WithPenalties: Story = {
  args: {
    sources: [
      { label: 'AGI', count: 4 },
      { label: 'RANGED COMBAT', count: 3 },
      { label: 'RIFLE', count: 2 },
      { label: 'COVER', count: -2 },
      { label: 'RANGE', count: -1 },
    ],
    stressDice: 1,
    totalBaseDice: 6,
  },
};

export const ManyModifiers: Story = {
  args: {
    sources: [
      { label: 'STR', count: 5 },
      { label: 'CLOSE COMBAT', count: 3 },
      { label: 'MACHETE', count: 1 },
      { label: 'OVERWATCH', count: 1 },
      { label: 'DARKNESS', count: -1 },
      { label: 'INJURY', count: -2 },
    ],
    stressDice: 3,
    totalBaseDice: 7,
  },
};

export const ZeroStressDice: Story = {
  args: {
    sources: [
      { label: 'AGI', count: 3 },
      { label: 'MOBILITY', count: 2 },
    ],
    stressDice: 0,
    totalBaseDice: 5,
  },
};
