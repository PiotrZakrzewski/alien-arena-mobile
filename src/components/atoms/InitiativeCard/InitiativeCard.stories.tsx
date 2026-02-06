import type { Meta, StoryObj } from '@storybook/react';
import { InitiativeCard } from './InitiativeCard';

const meta = {
  title: 'Atoms/InitiativeCard',
  component: InitiativeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Card value (1-10)',
    },
    variant: {
      control: 'radio',
      options: ['player', 'enemy'],
      description: 'Player (green) or enemy (red)',
    },
    isDrawing: {
      control: 'boolean',
      description: 'Whether the card is animating',
    },
    isWinner: {
      control: 'boolean',
      description: 'Whether this card won initiative',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InitiativeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerLow: Story = {
  args: { value: 2, variant: 'player' },
};

export const PlayerHigh: Story = {
  args: { value: 9, variant: 'player' },
};

export const EnemyLow: Story = {
  args: { value: 1, variant: 'enemy' },
};

export const EnemyHigh: Story = {
  args: { value: 10, variant: 'enemy' },
};

export const PlayerWinner: Story = {
  args: { value: 3, variant: 'player', isWinner: true },
};

export const EnemyWinner: Story = {
  args: { value: 2, variant: 'enemy', isWinner: true },
};

export const PlayerDrawing: Story = {
  args: { value: 5, variant: 'player', isDrawing: true },
};

export const EnemyDrawing: Story = {
  args: { value: 5, variant: 'enemy', isDrawing: true },
};

export const AllPlayerValues: Story = {
  args: { value: 1, variant: 'player' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', backgroundColor: 'var(--color-bg)', padding: '20px' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
        <InitiativeCard key={v} value={v} variant="player" />
      ))}
    </div>
  ),
};

export const AllEnemyValues: Story = {
  args: { value: 1, variant: 'enemy' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', backgroundColor: 'var(--color-bg)', padding: '20px' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
        <InitiativeCard key={v} value={v} variant="enemy" />
      ))}
    </div>
  ),
};
