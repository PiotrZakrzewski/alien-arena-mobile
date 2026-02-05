import type { Meta, StoryObj } from '@storybook/react';
import { CharacterSelector } from './CharacterSelector';
import { GameProvider } from '../../state';

const meta = {
  title: 'Views/CharacterSelector',
  component: CharacterSelector,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameProvider>
        <Story />
      </GameProvider>
    ),
  ],
} satisfies Meta<typeof CharacterSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
