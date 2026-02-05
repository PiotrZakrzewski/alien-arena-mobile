import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SkillRow } from './SkillRow';

const meta = {
  title: 'Molecules/SkillRow',
  component: SkillRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The skill label',
    },
    tooltip: {
      control: 'text',
      description: 'Explanation of what the skill does',
    },
    baseStat: {
      control: 'select',
      options: ['strength', 'agility'],
      description: 'The base stat for this skill',
    },
    value: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Current skill value',
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '80px 40px 20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkillRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CloseCombat: Story = {
  args: {
    label: 'CLOSE COMBAT',
    tooltip: 'Skill in melee fighting, grappling, and hand-to-hand combat.',
    baseStat: 'strength',
    value: 2,
  },
};

export const RangedCombat: Story = {
  args: {
    label: 'RANGED COMBAT',
    tooltip: 'Proficiency with firearms, thrown weapons, and ranged attacks.',
    baseStat: 'agility',
    value: 3,
  },
};

export const ZeroValue: Story = {
  args: {
    label: 'MOBILITY',
    tooltip: 'Ability to move quickly, dodge attacks, and navigate obstacles.',
    baseStat: 'agility',
    value: 0,
  },
};

export const MaxValue: Story = {
  args: {
    label: 'STAMINA',
    tooltip: 'Physical endurance and resistance to fatigue and injury.',
    baseStat: 'strength',
    value: 5,
  },
};
