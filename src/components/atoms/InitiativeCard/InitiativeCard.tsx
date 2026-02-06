import { useEffect, useState } from 'react';
import './InitiativeCard.css';

export interface InitiativeCardProps {
  value: number;
  variant: 'player' | 'enemy';
  isDrawing?: boolean;
  isWinner?: boolean;
}

export function InitiativeCard({
  value,
  variant,
  isDrawing = false,
  isWinner = false,
}: InitiativeCardProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isDrawing) {
      setDisplayValue(value);
      return;
    }

    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 10) + 1);
    }, 60);

    return () => clearInterval(interval);
  }, [isDrawing, value]);

  const className = [
    'initiative-card',
    `initiative-card--${variant}`,
    isWinner ? 'initiative-card--winner' : '',
    isDrawing ? 'initiative-card--drawing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={className}
      aria-label={`${variant} initiative card showing ${value}`}
    >
      {displayValue}
    </span>
  );
}
