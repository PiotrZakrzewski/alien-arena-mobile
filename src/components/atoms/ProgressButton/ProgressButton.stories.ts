import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProgressButton } from './ProgressButton';

const meta = {
  title: 'Atoms/ProgressButton',
  component: ProgressButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ProgressButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Skills',
  },
};

export const Continue: Story = {
  args: {
    label: 'Continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Skills',
    disabled: true,
  },
};
