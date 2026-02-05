import type { Meta, StoryObj } from '@storybook/react';
import { SkillsEditor } from './SkillsEditor';
import { GameProvider, Character } from '../../state';

const samplePlayer: Character = {
  id: 'char-story-1',
  presetId: 'ripley',
  name: 'RIPLEY',
  strength: 3,
  agility: 4,
  health: 10,
  maxHealth: 10,
  skills: { closeCombat: 2, rangedCombat: 3, mobility: 1, stamina: 2 },
  items: {},
  talents: {},
};

const meta = {
  title: 'Views/SkillsEditor',
  component: SkillsEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: samplePlayer,
          phase: 'skills',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof SkillsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptySkills: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: { ...samplePlayer, skills: {} },
          phase: 'skills',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};
