import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InitiativeResult } from './InitiativeResult';

const meta = {
  title: 'Organisms/InitiativeResult',
  component: InitiativeResult,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onContinue: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px 0', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InitiativeResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerWins: Story = {
  args: {
    playerCard: 3,
    enemyCard: 8,
    playerName: 'MARINE',
    enemyName: 'ROUGHNECK',
    animate: false,
  },
};

export const EnemyWins: Story = {
  args: {
    playerCard: 9,
    enemyCard: 2,
    playerName: 'MARSHAL',
    enemyName: 'OFFICER',
    animate: false,
  },
};

export const CloseCall: Story = {
  args: {
    playerCard: 5,
    enemyCard: 6,
    playerName: 'KID',
    enemyName: 'MEDIC',
    animate: false,
  },
};

export const ExtremeCards: Story = {
  args: {
    playerCard: 1,
    enemyCard: 10,
    playerName: 'MARINE',
    enemyName: 'ROUGHNECK',
    animate: false,
  },
};

export const Animated: Story = {
  args: {
    playerCard: 4,
    enemyCard: 7,
    playerName: 'MARINE',
    enemyName: 'ROUGHNECK',
    animate: true,
  },
};

export const Static: Story = {
  args: {
    playerCard: 6,
    enemyCard: 3,
    playerName: 'OFFICER',
    enemyName: 'KID',
    animate: false,
    onContinue: undefined,
  },
};
