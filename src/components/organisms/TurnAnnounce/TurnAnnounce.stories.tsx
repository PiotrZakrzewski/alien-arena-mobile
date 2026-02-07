import type { Meta, StoryObj } from '@storybook/react';
import { TurnAnnounce } from './TurnAnnounce';

const meta = {
  title: 'Organisms/TurnAnnounce',
  component: TurnAnnounce,
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
} satisfies Meta<typeof TurnAnnounce>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerTurn: Story = {
  args: {
    characterName: 'MARINE',
    round: 1,
    isPlayer: true,
    onContinue: () => console.log('Continue clicked'),
  },
};

export const EnemyTurn: Story = {
  args: {
    characterName: 'XENOMORPH',
    round: 1,
    isPlayer: false,
    onContinue: () => console.log('Continue clicked'),
  },
};

export const LaterRound: Story = {
  args: {
    characterName: 'MARINE',
    round: 5,
    isPlayer: true,
    onContinue: () => console.log('Continue clicked'),
  },
};
