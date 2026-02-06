import { useEffect, useState } from 'react';
import { Die } from '../../atoms/Die';
import './DicePool.css';

export interface DieResult {
  value: number;
  variant: 'normal' | 'stress';
}

export interface DicePoolProps {
  dice: DieResult[];
  animate?: boolean;
  onAnimationComplete?: () => void;
}

function sortDice(dice: DieResult[]): DieResult[] {
  return [...dice].sort((a, b) => {
    const aSuccess = a.value === 6 ? 1 : 0;
    const bSuccess = b.value === 6 ? 1 : 0;

    // Successes first
    if (aSuccess !== bSuccess) return bSuccess - aSuccess;

    // Within same success group: normal before stress
    const aVariantOrder = a.variant === 'normal' ? 0 : 1;
    const bVariantOrder = b.variant === 'normal' ? 0 : 1;
    if (aVariantOrder !== bVariantOrder) return aVariantOrder - bVariantOrder;

    // Descending by value
    return b.value - a.value;
  });
}

export function DicePool({ dice, animate = false, onAnimationComplete }: DicePoolProps) {
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (!animate) {
      setIsRolling(false);
      return;
    }

    setIsRolling(true);
    const timer = setTimeout(() => {
      setIsRolling(false);
      onAnimationComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [animate, onAnimationComplete]);

  const sorted = sortDice(dice);

  return (
    <div className="dice-pool" aria-label="Dice pool">
      {sorted.map((die, i) => (
        <Die key={i} value={die.value} variant={die.variant} isRolling={isRolling} />
      ))}
    </div>
  );
}
