import { useState, useRef, useEffect, useCallback } from 'react';
import './InfoIcon.css';

const DISMISS_EVENT = 'infoicon:dismiss';

export interface InfoIconProps {
  tooltip: string;
}

export function InfoIcon({ tooltip }: InfoIconProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => setIsVisible(false), []);

  const handleToggle = () => {
    if (!isVisible) {
      // Close any other open tooltips first
      document.dispatchEvent(new CustomEvent(DISMISS_EVENT));
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener(DISMISS_EVENT, dismiss);
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener(DISMISS_EVENT, dismiss);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isVisible, dismiss]);

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
    <div className="info-icon" ref={containerRef}>
      <button
        className="info-icon__button"
        onClick={handleToggle}
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
