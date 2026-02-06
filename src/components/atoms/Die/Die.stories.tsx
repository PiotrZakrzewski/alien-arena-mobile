import type { Meta, StoryObj } from '@storybook/react';
import { Die } from './Die';

const meta = {
  title: 'Atoms/Die',
  component: Die,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Die face value (1-6)',
    },
    variant: {
      control: 'radio',
      options: ['normal', 'stress'],
      description: 'Normal (green) or stress (amber)',
    },
    isRolling: {
      control: 'boolean',
      description: 'Whether the die is animating',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Die>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalOne: Story = {
  args: { value: 1, variant: 'normal' },
};

export const NormalThree: Story = {
  args: { value: 3, variant: 'normal' },
};

export const NormalSuccess: Story = {
  args: { value: 6, variant: 'normal' },
};

export const StressOne: Story = {
  args: { value: 1, variant: 'stress' },
};

export const StressThree: Story = {
  args: { value: 3, variant: 'stress' },
};

export const StressSuccess: Story = {
  args: { value: 6, variant: 'stress' },
};

export const Rolling: Story = {
  args: { value: 4, variant: 'normal', isRolling: true },
};

export const RollingStress: Story = {
  args: { value: 4, variant: 'stress', isRolling: true },
};

export const AllNormalValues: Story = {
  args: { value: 1, variant: 'normal' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-bg)', padding: '20px' }}>
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <Die key={v} value={v} variant="normal" />
      ))}
    </div>
  ),
};

export const AllStressValues: Story = {
  args: { value: 1, variant: 'stress' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-bg)', padding: '20px' }}>
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <Die key={v} value={v} variant="stress" />
      ))}
    </div>
  ),
};
