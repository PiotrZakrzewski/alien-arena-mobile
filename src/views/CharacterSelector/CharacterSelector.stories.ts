import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CharacterSelector } from './CharacterSelector';

const sampleCharacters = [
  { id: '1', name: 'RIPLEY', strength: 3, agility: 4 },
  { id: '2', name: 'DALLAS', strength: 4, agility: 3 },
  { id: '3', name: 'ASH', strength: 2, agility: 5 },
  { id: '4', name: 'LAMBERT', strength: 2, agility: 4 },
];

const meta = {
  title: 'Views/CharacterSelector',
  component: CharacterSelector,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Initial character index to display',
    },
  },
  args: {
    onProgress: fn(),
  },
} satisfies Meta<typeof CharacterSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    characters: sampleCharacters,
    initialIndex: 0,
  },
};

export const MiddleCharacter: Story = {
  args: {
    characters: sampleCharacters,
    initialIndex: 1,
  },
};

export const LastCharacter: Story = {
  args: {
    characters: sampleCharacters,
    initialIndex: 3,
  },
};

export const SingleCharacter: Story = {
  args: {
    characters: [{ id: '1', name: 'RIPLEY', strength: 3, agility: 4 }],
    initialIndex: 0,
  },
};
