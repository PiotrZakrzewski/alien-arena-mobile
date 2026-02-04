import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['chevron-left', 'chevron-right', 'plus', 'minus'],
      description: 'The icon to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the button',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChevronLeft: Story = {
  args: {
    icon: 'chevron-left',
    label: 'Previous character',
  },
};

export const ChevronRight: Story = {
  args: {
    icon: 'chevron-right',
    label: 'Next character',
  },
};

export const Plus: Story = {
  args: {
    icon: 'plus',
    label: 'Increase value',
  },
};

export const Minus: Story = {
  args: {
    icon: 'minus',
    label: 'Decrease value',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'chevron-left',
    label: 'Previous character',
    disabled: true,
  },
};
