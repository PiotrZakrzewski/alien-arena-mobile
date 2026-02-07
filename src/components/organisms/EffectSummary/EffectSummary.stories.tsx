import type { Meta, StoryObj } from '@storybook/react';
import { EffectSummary } from './EffectSummary';

const meta = {
  title: 'Organisms/EffectSummary',
  component: EffectSummary,
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
} satisfies Meta<typeof EffectSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DamageResult: Story = {
  args: {
    lines: [
      { text: 'RANGED ATTACK HIT!', type: 'info' },
      { text: 'XENOMORPH TAKES 4 DAMAGE', type: 'damage' },
      { text: 'XENOMORPH: 6/10 HP', type: 'info' },
    ],
    onContinue: () => console.log('Continue clicked'),
  },
};

export const MoveResult: Story = {
  args: {
    lines: [
      { text: 'MARINE MOVES TO CORRIDOR', type: 'move' },
      { text: 'NOW IN ZONE 1', type: 'info' },
    ],
    onContinue: () => console.log('Continue clicked'),
  },
};

export const PanicResult: Story = {
  args: {
    lines: [
      { text: 'STRESS LEVEL CRITICAL!', type: 'panic' },
      { text: 'MARINE IS BROKEN', type: 'panic' },
      { text: 'CAN ONLY MOVE UNTIL RALLIED', type: 'info' },
    ],
    onContinue: () => console.log('Continue clicked'),
  },
};

export const MixedEffects: Story = {
  args: {
    lines: [
      { text: 'MARINE TAKES PARTIAL COVER', type: 'cover' },
      { text: 'COVER ACTIVE: +2 TO DEFENSE', type: 'info' },
      { text: 'XENOMORPH ATTACKS!', type: 'damage' },
      { text: 'ATTACK MISSES!', type: 'info' },
    ],
    onContinue: () => console.log('Continue clicked'),
  },
};
