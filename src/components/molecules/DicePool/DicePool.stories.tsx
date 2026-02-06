import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DicePool } from './DicePool';

const meta = {
  title: 'Molecules/DicePool',
  component: DicePool,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onAnimationComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DicePool>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MixedResults: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 3, variant: 'normal' },
      { value: 6, variant: 'stress' },
      { value: 1, variant: 'normal' },
      { value: 4, variant: 'normal' },
      { value: 2, variant: 'stress' },
    ],
  },
};

export const AllSuccesses: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 6, variant: 'normal' },
      { value: 6, variant: 'normal' },
      { value: 6, variant: 'stress' },
    ],
  },
};

export const AllFailures: Story = {
  args: {
    dice: [
      { value: 1, variant: 'normal' },
      { value: 3, variant: 'normal' },
      { value: 2, variant: 'normal' },
      { value: 4, variant: 'stress' },
    ],
  },
};

export const WithStressDice: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 5, variant: 'normal' },
      { value: 3, variant: 'normal' },
      { value: 6, variant: 'stress' },
      { value: 1, variant: 'stress' },
      { value: 4, variant: 'stress' },
    ],
  },
};

export const Animated: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 2, variant: 'normal' },
      { value: 5, variant: 'normal' },
      { value: 6, variant: 'stress' },
      { value: 3, variant: 'stress' },
    ],
    animate: true,
  },
};

export const MaxDice: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 5, variant: 'normal' },
      { value: 4, variant: 'normal' },
      { value: 3, variant: 'normal' },
      { value: 2, variant: 'normal' },
      { value: 1, variant: 'normal' },
      { value: 6, variant: 'normal' },
      { value: 4, variant: 'normal' },
      { value: 6, variant: 'stress' },
      { value: 3, variant: 'stress' },
      { value: 1, variant: 'stress' },
      { value: 5, variant: 'stress' },
    ],
  },
};

export const MinimalDice: Story = {
  args: {
    dice: [
      { value: 3, variant: 'normal' },
    ],
  },
};

export const TwoDice: Story = {
  args: {
    dice: [
      { value: 6, variant: 'normal' },
      { value: 2, variant: 'stress' },
    ],
  },
};
