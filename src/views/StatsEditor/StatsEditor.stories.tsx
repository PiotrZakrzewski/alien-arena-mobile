import type { Meta, StoryObj } from '@storybook/react';
import { StatsEditor } from './StatsEditor';
import { GameProvider, Character } from '../../state';

const samplePlayer: Character = {
  id: 'char-story-1',
  presetId: 'marine',
  name: 'MARINE',
  description: 'Trained for frontline combat. Reliable with any weapon, unshakeable under fire.',
  career: 'marine',
  strength: 4,
  agility: 3,
  wits: 2,
  empathy: 2,
  health: 4,
  maxHealth: 4,
  resolve: 2,
  skills: {},
  weapon: { type: 'unarmed', modifier: 0, damage: 1, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
  armor: { rating: 0 },
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
