import type { Meta, StoryObj } from '@storybook/react';
import { StatsEditor } from './StatsEditor';
import { GameProvider, Character } from '../../state';

const samplePlayer: Character = {
  id: 'char-story-1',
  presetId: 'ripley',
  name: 'RIPLEY',
  description: 'Resourceful warrant officer. Balances quick reflexes with steady nerves under pressure.',
  strength: 3,
  agility: 4,
  health: 10,
  maxHealth: 10,
  skills: {},
  items: {},
  talents: {},
};

const meta = {
  title: 'Views/StatsEditor',
  component: StatsEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: samplePlayer,
          phase: 'stats',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof StatsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
