import type { Meta, StoryObj } from '@storybook/react';
import { StatLabel } from './StatLabel';

const meta = {
  title: 'Atoms/StatLabel',
  component: StatLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The stat label text',
    },
  },
} satisfies Meta<typeof StatLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Strength: Story = {
  args: {
    label: 'STR',
  },
};

export const Agility: Story = {
  args: {
    label: 'AGI',
  },
};
