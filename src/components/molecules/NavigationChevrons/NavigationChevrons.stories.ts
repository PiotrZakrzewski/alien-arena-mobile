import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NavigationChevrons } from './NavigationChevrons';

const meta = {
  title: 'Molecules/NavigationChevrons',
  component: NavigationChevrons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasPrev: {
      control: 'boolean',
      description: 'Whether there is a previous character to navigate to',
    },
    hasNext: {
      control: 'boolean',
      description: 'Whether there is a next character to navigate to',
    },
  },
  args: {
    onPrev: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof NavigationChevrons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasPrev: true,
    hasNext: true,
  },
};

export const FirstCharacter: Story = {
  args: {
    hasPrev: false,
    hasNext: true,
  },
};

export const LastCharacter: Story = {
  args: {
    hasPrev: true,
    hasNext: false,
  },
};

export const SingleCharacter: Story = {
  args: {
    hasPrev: false,
    hasNext: false,
  },
};
