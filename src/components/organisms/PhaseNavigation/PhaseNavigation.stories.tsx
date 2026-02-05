import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PhaseNavigation } from './PhaseNavigation';

const meta = {
  title: 'Organisms/PhaseNavigation',
  component: PhaseNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onNext: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhaseNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NextOnly: Story = {
  args: {
    nextLabel: 'Items',
  },
};

export const WithBack: Story = {
  args: {
    onBack: fn(),
    backLabel: 'Back',
    nextLabel: 'Items',
  },
};

export const CustomLabels: Story = {
  args: {
    onBack: fn(),
    backLabel: 'Characters',
    nextLabel: 'Continue',
  },
};

export const NextDisabled: Story = {
  args: {
    onBack: fn(),
    backLabel: 'Back',
    nextLabel: 'Items',
    nextDisabled: true,
  },
};
