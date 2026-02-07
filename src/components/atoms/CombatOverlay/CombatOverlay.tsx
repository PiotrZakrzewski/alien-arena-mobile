import type { ReactNode, MouseEvent } from 'react';
import './CombatOverlay.css';

export interface CombatOverlayProps {
  children: ReactNode;
  onTap?: () => void;
}

export function CombatOverlay({ children, onTap }: CombatOverlayProps) {
  const handleBackgroundClick = onTap
    ? (e: MouseEvent) => {
        if (e.target === e.currentTarget) onTap();
      }
    : undefined;

  return (
    <div className="combat-overlay" onClick={handleBackgroundClick}>
      <div
        className="combat-overlay__inner"
        onClick={onTap ? (e: MouseEvent) => e.stopPropagation() : undefined}
      >
        {children}
      </div>
    </div>
  );
}
