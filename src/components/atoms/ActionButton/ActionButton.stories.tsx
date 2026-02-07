import type { Meta, StoryObj } from '@storybook/react';
import { ActionButton } from './ActionButton';

const meta = {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Action label text',
    },
    description: {
      control: 'text',
      description: 'Action description text',
    },
    speed: {
      control: 'radio',
      options: ['quick', 'full'],
      description: 'Action speed type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    disabledReason: {
      control: 'text',
      description: 'Reason why the button is disabled',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px', minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuickAction: Story = {
  args: {
    label: 'MOVE',
    description: 'Move to an adjacent zone',
    speed: 'quick',
    onClick: () => console.log('Quick action clicked'),
  },
};

export const FullAction: Story = {
  args: {
    label: 'RANGED ATTACK',
    description: 'Ranged attack on target in range',
    speed: 'full',
    onClick: () => console.log('Full action clicked'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'CLOSE ATTACK',
    description: 'Melee attack on target in same zone',
    speed: 'full',
    disabled: true,
    onClick: () => console.log('Should not fire'),
  },
};

export const DisabledWithReason: Story = {
  args: {
    label: 'RANGED ATTACK',
    description: 'Ranged attack on target in range',
    speed: 'full',
    disabled: true,
    disabledReason: 'Full action already used',
    onClick: () => console.log('Should not fire'),
  },
};
