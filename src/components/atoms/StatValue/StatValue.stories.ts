import type { Meta, StoryObj } from '@storybook/react';
import { StatValue } from './StatValue';

const meta = {
  title: 'Atoms/StatValue',
  component: StatValue,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'The numeric stat value (1-5)',
    },
  },
} satisfies Meta<typeof StatValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimum: Story = {
  args: {
    value: 1,
  },
};

export const Medium: Story = {
  args: {
    value: 3,
  },
};

export const Maximum: Story = {
  args: {
    value: 5,
  },
};
