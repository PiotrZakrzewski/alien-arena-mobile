import type { Meta, StoryObj } from '@storybook/react';
import { CharacterSelector } from './CharacterSelector';
import { GameProvider, Character } from '../../state';

const sampleCharacters: Character[] = [
  { id: '1', name: 'RIPLEY', strength: 3, agility: 4, health: 10, maxHealth: 10, skills: {} },
  { id: '2', name: 'DALLAS', strength: 4, agility: 3, health: 12, maxHealth: 12, skills: {} },
  { id: '3', name: 'ASH', strength: 2, agility: 5, health: 8, maxHealth: 8, skills: {} },
  { id: '4', name: 'LAMBERT', strength: 2, agility: 4, health: 9, maxHealth: 9, skills: {} },
];

const meta = {
  title: 'Views/CharacterSelector',
  component: CharacterSelector,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider initialState={{ characters: sampleCharacters }}>
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof CharacterSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCharacter: Story = {
  decorators: [
    (Story) => (
      <GameProvider
        initialState={{
          characters: [sampleCharacters[0]],
        }}
      >
        <Story />
      </GameProvider>
    ),
  ],
};
