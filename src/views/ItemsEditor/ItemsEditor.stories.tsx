import type { Meta, StoryObj } from '@storybook/react';
import { ItemsEditor } from './ItemsEditor';
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
  skills: { closeCombat: 2, rangedCombat: 3, mobility: 1, stamina: 2 },
  weapon: { type: 'unarmed', modifier: 0, damage: 1, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
  armor: { rating: 0 },
  talents: {},
};

const meta = {
  title: 'Views/ItemsEditor',
  component: ItemsEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: samplePlayer,
          phase: 'items',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof ItemsEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCloseWeapon: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: {
            ...samplePlayer,
            weapon: { type: 'close', modifier: 1, damage: 2, minRange: 'adjacent', maxRange: 'adjacent', armorPiercing: false },
          },
          phase: 'items',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};

export const WithRangedWeapon: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          playerCharacter: {
            ...samplePlayer,
            weapon: { type: 'ranged', modifier: 2, damage: 3, minRange: 'short', maxRange: 'long', armorPiercing: true },
            armor: { rating: 2 },
          },
          phase: 'items',
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};
