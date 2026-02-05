import type { Meta, StoryObj } from '@storybook/react';
import { TalentsEditor } from './TalentsEditor';
import { GameProvider, Character } from '../../state';

const makePlayer = (overrides: Partial<Character> = {}): Character => ({
  id: 'char-story-1',
  presetId: 'marine',
  name: 'MARINE',
  description: 'Trained for frontline combat. Reliable with any weapon, unshakeable under fire.',
  career: 'marine',
  strength: 4,
  agility: 3,
  health: 10,
  maxHealth: 10,
  skills: {},
  weapon: { type: 'unarmed', modifier: 0, damage: 1, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
  armor: { rating: 0 },
  talents: {},
  ...overrides,
});

const meta = {
  title: 'Views/TalentsEditor',
  component: TalentsEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: makePlayer(),
          phase: 'talents',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof TalentsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Marine: Story = {};

export const Roughneck: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: makePlayer({
            presetId: 'roughneck',
            name: 'ROUGHNECK',
            description: 'Blue-collar spacer built like a bulldozer. Takes a beating and keeps going.',
            career: 'roughneck',
            strength: 5,
            agility: 2,
            maxHealth: 11,
            health: 11,
          }),
          phase: 'talents',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};

export const Kid: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: makePlayer({
            presetId: 'kid',
            name: 'KID',
            description: 'Young and quick. What they lack in strength they make up in reflexes and luck.',
            career: 'kid',
            strength: 2,
            agility: 5,
            maxHealth: 8,
            health: 8,
          }),
          phase: 'talents',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};

export const WithTalentsSelected: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: makePlayer({
            talents: { overkill: 1, seenItAll: 2 },
          }),
          phase: 'talents',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};
