import type { Meta, StoryObj } from '@storybook/react';
import { NameDisplay } from './NameDisplay';

const meta = {
  title: 'Atoms/NameDisplay',
  component: NameDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The character name to display',
    },
  },
} satisfies Meta<typeof NameDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'RIPLEY',
  },
};

export const LongName: Story = {
  args: {
    name: 'DALLAS MCARTHUR',
  },
};

export const ShortName: Story = {
  args: {
    name: 'ASH',
  },
};
