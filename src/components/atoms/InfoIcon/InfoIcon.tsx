import { useState, useRef, useEffect } from 'react';
import './InfoIcon.css';

export interface InfoIconProps {
  tooltip: string;
}

export function InfoIcon({ tooltip }: InfoIconProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const rect = el.getBoundingClientRect();
    const margin = 8;

    if (rect.left < margin) {
      el.style.left = `${margin - rect.left}px`;
      el.style.transform = 'none';
    } else if (rect.right > window.innerWidth - margin) {
      el.style.left = `${window.innerWidth - margin - rect.right}px`;
      el.style.transform = 'none';
    }
  }, [isVisible]);

  return (
    <div className="info-icon">
      <button
        className="info-icon__button"
        onClick={handleToggle}
        onBlur={handleBlur}
        aria-label="Show information"
        aria-expanded={isVisible}
        type="button"
      >
        <span className="info-icon__symbol">i</span>
      </button>
      {isVisible && (
        <div className="info-icon__tooltip" role="tooltip" ref={tooltipRef}>
          {tooltip}
        </div>
      )}
    </div>
  );
}
