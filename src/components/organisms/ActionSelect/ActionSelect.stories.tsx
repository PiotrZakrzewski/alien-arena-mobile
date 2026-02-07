import type { Meta, StoryObj } from '@storybook/react';
import { ActionSelect } from './ActionSelect';

const meta = {
  title: 'Organisms/ActionSelect',
  component: ActionSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '20px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTurn: Story = {
  args: {
    actionsRemaining: 2,
    legalActions: [
      {
        type: 'move',
        speed: 'quick',
        available: true,
        moveOptions: [0, 2],
      },
      {
        type: 'ranged-attack',
        speed: 'full',
        available: true,
      },
      {
        type: 'partial-cover',
        speed: 'quick',
        available: true,
      },
    ],
    onSelectAction: (type, zone) =>
      console.log('Action selected:', type, zone ? `to zone ${zone}` : ''),
  },
};

export const QuickOnly: Story = {
  args: {
    actionsRemaining: 1,
    legalActions: [
      {
        type: 'move',
        speed: 'quick',
        available: true,
        moveOptions: [1, 2],
      },
      {
        type: 'ranged-attack',
        speed: 'full',
        available: false,
        reason: 'Full action already used',
      },
      {
        type: 'partial-cover',
        speed: 'quick',
        available: true,
      },
    ],
    onSelectAction: (type, zone) =>
      console.log('Action selected:', type, zone ? `to zone ${zone}` : ''),
  },
};

export const NoAttack: Story = {
  args: {
    actionsRemaining: 2,
    legalActions: [
      {
        type: 'move',
        speed: 'quick',
        available: true,
        moveOptions: [0, 1],
      },
      {
        type: 'ranged-attack',
        speed: 'full',
        available: false,
        reason: 'Target out of range',
      },
    ],
    onSelectAction: (type, zone) =>
      console.log('Action selected:', type, zone ? `to zone ${zone}` : ''),
  },
};
