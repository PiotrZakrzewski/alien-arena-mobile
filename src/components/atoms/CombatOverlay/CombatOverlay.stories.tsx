import type { Meta, StoryObj } from '@storybook/react';
import { CombatOverlay } from './CombatOverlay';

const meta: Meta<typeof CombatOverlay> = {
  title: 'Atoms/CombatOverlay',
  component: CombatOverlay,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CombatOverlay>;

export const Default: Story = {
  render: () => (
    <CombatOverlay>
      <div style={{
        fontFamily: 'var(--font-terminal)',
        color: 'var(--color-primary)',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>OVERLAY CONTENT</h2>
        <p>This is a full-screen overlay</p>
      </div>
    </CombatOverlay>
  ),
};

export const WithTapToDismiss: Story = {
  render: () => (
    <CombatOverlay onTap={() => alert('Tapped background!')}>
      <div style={{
        fontFamily: 'var(--font-terminal)',
        color: 'var(--color-primary)',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '40px',
        border: '2px solid var(--color-primary)',
        borderRadius: '8px',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>TAP OUTSIDE TO DISMISS</h2>
        <p>Clicking inside this box does nothing</p>
        <p style={{ color: 'var(--color-primary-dim)', marginTop: '1rem' }}>
          Click the background to trigger onTap
        </p>
      </div>
    </CombatOverlay>
  ),
};
