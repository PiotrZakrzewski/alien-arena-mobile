import type { Meta, StoryObj } from '@storybook/react';
import { InfoIcon } from './InfoIcon';

const meta = {
  title: 'Atoms/InfoIcon',
  component: InfoIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tooltip: {
      control: 'text',
      description: 'The tooltip text to display',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '80px 40px 20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Strength: Story = {
  args: {
    tooltip: 'Raw physical power and endurance. Base attribute for Close Combat and Stamina rolls.',
  },
};

export const Agility: Story = {
  args: {
    tooltip: 'Speed and reflexes. Base attribute for Ranged Combat and Mobility rolls. Determines initiative.',
  },
};
