import { useEffect, useState } from 'react';
import './Die.css';

export interface DieProps {
  value: number;
  variant: 'normal' | 'stress';
  isRolling?: boolean;
}

export function Die({ value, variant, isRolling = false }: DieProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isRolling) {
      setDisplayValue(value);
      return;
    }

    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 6) + 1);
    }, 60);

    return () => clearInterval(interval);
  }, [isRolling, value]);

  const isSuccess = !isRolling && value === 6;

  const className = [
    'die',
    `die--${variant}`,
    isSuccess ? 'die--success' : '',
    isRolling ? 'die--rolling' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className} aria-label={`${variant} die showing ${value}`}>
      {displayValue}
    </span>
  );
}
