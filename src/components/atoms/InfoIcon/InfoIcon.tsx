import { useState } from 'react';
import './InfoIcon.css';

export interface InfoIconProps {
  tooltip: string;
}

export function InfoIcon({ tooltip }: InfoIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

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
        <div className="info-icon__tooltip" role="tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
}
