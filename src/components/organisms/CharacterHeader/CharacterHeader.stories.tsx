import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CharacterHeader } from './CharacterHeader';

const meta = {
  title: 'Organisms/CharacterHeader',
  component: CharacterHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Character name to display',
    },
    hasPrev: {
      control: 'boolean',
      description: 'Whether there is a previous character',
    },
    hasNext: {
      control: 'boolean',
      description: 'Whether there is a next character',
    },
  },
  args: {
    onPrev: fn(),
    onNext: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'RIPLEY',
    hasPrev: true,
    hasNext: true,
  },
};

export const FirstCharacter: Story = {
  args: {
    name: 'DALLAS',
    hasPrev: false,
    hasNext: true,
  },
};

export const LastCharacter: Story = {
  args: {
    name: 'ASH',
    hasPrev: true,
    hasNext: false,
  },
};

export const LongName: Story = {
  args: {
    name: 'DALLAS MCARTHUR',
    hasPrev: true,
    hasNext: true,
  },
};
