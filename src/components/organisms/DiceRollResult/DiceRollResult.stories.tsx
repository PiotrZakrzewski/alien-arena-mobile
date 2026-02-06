import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DiceRollResult } from './DiceRollResult';

const meta = {
  title: 'Organisms/DiceRollResult',
  component: DiceRollResult,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onPush: fn(),
    onContinue: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '40px 0', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DiceRollResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CloseCombatHit: Story = {
  args: {
    title: 'CLOSE COMBAT ATTACK',
    sources: [
      { label: 'STR', count: 3 },
      { label: 'CLOSE COMBAT', count: 2 },
      { label: 'KNIFE', count: 1 },
    ],
    stressDice: 2,
    baseDiceResults: [6, 4, 3, 6, 1, 2],
    stressDiceResults: [3, 1],
    pushState: { allowed: true },
    successText: 'Hit! Base damage 2 + 1 extra success',
    failureText: 'Miss! Target dodges the attack',
    animate: false,
  },
};

export const RangedAttackBlocked: Story = {
  args: {
    title: 'RANGED COMBAT ATTACK',
    sources: [
      { label: 'AGI', count: 4 },
      { label: 'RANGED COMBAT', count: 3 },
      { label: 'RIFLE', count: 2 },
      { label: 'COVER', count: -2 },
      { label: 'RANGE', count: -1 },
    ],
    stressDice: 2,
    baseDiceResults: [5, 3, 2, 4, 1, 6],
    stressDiceResults: [1, 4],
    pushState: { allowed: false, reason: 'Stress die showed 1' },
    successText: 'Hit! Base damage 3 applied to target',
    failureText: 'Miss! The shot goes wide',
    animate: false,
  },
};

export const AfterPush: Story = {
  args: {
    title: 'CLOSE COMBAT ATTACK (PUSHED)',
    sources: [
      { label: 'STR', count: 3 },
      { label: 'CLOSE COMBAT', count: 2 },
    ],
    stressDice: 3,
    baseDiceResults: [6, 6, 4, 6, 2],
    stressDiceResults: [5, 1, 3],
    pushState: { allowed: false, reason: 'Already pushed' },
    successText: 'Hit! Base damage 1 + 2 extra successes',
    failureText: 'Miss! Target dodges the attack',
    animate: false,
  },
};

export const AllSuccesses: Story = {
  args: {
    title: 'CLOSE COMBAT ATTACK',
    sources: [
      { label: 'STR', count: 5 },
      { label: 'CLOSE COMBAT', count: 3 },
    ],
    stressDice: 0,
    baseDiceResults: [6, 6, 6, 6, 6, 6, 6, 6],
    stressDiceResults: [],
    pushState: null,
    successText: 'Critical hit! Devastating blow!',
    failureText: 'Miss!',
    animate: false,
  },
};

export const AllFailures: Story = {
  args: {
    title: 'RANGED COMBAT ATTACK',
    sources: [
      { label: 'AGI', count: 2 },
      { label: 'RANGED COMBAT', count: 1 },
    ],
    stressDice: 1,
    baseDiceResults: [2, 4, 3],
    stressDiceResults: [5],
    pushState: { allowed: true },
    successText: 'Hit!',
    failureText: 'Miss! The shot goes wide. No damage dealt.',
    animate: false,
  },
};

export const MaxDicePool: Story = {
  args: {
    title: 'CLOSE COMBAT ATTACK',
    sources: [
      { label: 'STR', count: 5 },
      { label: 'CLOSE COMBAT', count: 3 },
      { label: 'MACHETE', count: 1 },
    ],
    stressDice: 3,
    baseDiceResults: [6, 5, 3, 6, 2, 1, 4, 3, 6],
    stressDiceResults: [6, 1, 4],
    pushState: { allowed: false, reason: 'Stress die showed 1' },
    successText: 'Hit! Base damage 3 + 3 extra successes',
    failureText: 'Miss!',
    animate: false,
  },
};

export const NoPushOption: Story = {
  args: {
    title: 'STAMINA CHECK',
    sources: [
      { label: 'STR', count: 3 },
      { label: 'STAMINA', count: 2 },
    ],
    stressDice: 0,
    baseDiceResults: [6, 3, 4, 2, 5],
    stressDiceResults: [],
    pushState: null,
    successText: 'Endured! No damage taken.',
    failureText: 'Failed! Take 1 damage.',
    animate: false,
  },
};

export const Animated: Story = {
  args: {
    title: 'CLOSE COMBAT ATTACK',
    sources: [
      { label: 'STR', count: 3 },
      { label: 'CLOSE COMBAT', count: 2 },
    ],
    stressDice: 1,
    baseDiceResults: [6, 3, 5, 2, 4],
    stressDiceResults: [6],
    pushState: { allowed: true },
    successText: 'Hit! Base damage 2 + 1 extra success',
    failureText: 'Miss!',
    animate: true,
  },
};
