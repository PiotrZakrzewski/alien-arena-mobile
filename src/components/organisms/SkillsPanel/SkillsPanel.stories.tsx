import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SkillsPanel } from './SkillsPanel';

const meta = {
  title: 'Organisms/SkillsPanel',
  component: SkillsPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSkillChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '80px 20px', width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkillsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    skills: {
      closeCombat: 0,
      rangedCombat: 0,
      mobility: 0,
      stamina: 0,
    },
  },
};

export const Mixed: Story = {
  args: {
    skills: {
      closeCombat: 2,
      rangedCombat: 3,
      mobility: 1,
      stamina: 4,
    },
  },
};

export const MaxedOut: Story = {
  args: {
    skills: {
      closeCombat: 5,
      rangedCombat: 5,
      mobility: 5,
      stamina: 5,
    },
  },
};
