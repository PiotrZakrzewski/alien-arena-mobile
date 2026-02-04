import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StatEditor } from './StatEditor';

const meta = {
  title: 'Molecules/StatEditor',
  component: StatEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current stat value',
    },
    min: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum allowed value',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the stat',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof StatEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    label: 'Strength',
  },
};

export const Minimum: Story = {
  args: {
    value: 1,
    label: 'Strength',
  },
};

export const Maximum: Story = {
  args: {
    value: 5,
    label: 'Strength',
  },
};
