import { useState } from 'react';
import { queueDice, clearDiceQueue, getDiceQueueLength } from '../../../combat/rollResolver';
import './DebugDicePanel.css';

export function DebugDicePanel() {
  const [input, setInput] = useState('');
  const [queued, setQueued] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const handleQueue = () => {
    const values = input
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => n >= 1 && n <= 6);
    if (values.length > 0) {
      queueDice(values);
      setQueued(getDiceQueueLength());
      setInput('');
    }
  };

  const handleClear = () => {
    clearDiceQueue();
    setQueued(0);
  };

  if (collapsed) {
    return (
      <button
        className="debug-dice-panel__toggle"
        onClick={() => setCollapsed(false)}
        type="button"
      >
        DEBUG {queued > 0 && `(${queued})`}
      </button>
    );
  }

  return (
    <div className="debug-dice-panel">
      <div className="debug-dice-panel__header">
        <span>DEBUG DICE</span>
        <button
          className="debug-dice-panel__close"
          onClick={() => setCollapsed(true)}
          type="button"
        >
          X
        </button>
      </div>
      <div className="debug-dice-panel__body">
        <input
          className="debug-dice-panel__input"
          type="text"
          placeholder="e.g. 6 1 3 4 6 2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleQueue()}
        />
        <div className="debug-dice-panel__actions">
          <button
            className="debug-dice-panel__btn"
            onClick={handleQueue}
            type="button"
          >
            QUEUE
          </button>
          <button
            className="debug-dice-panel__btn debug-dice-panel__btn--clear"
            onClick={handleClear}
            type="button"
          >
            CLEAR
          </button>
        </div>
        <div className="debug-dice-panel__status">
          {queued} dice queued
        </div>
        <div className="debug-dice-panel__hint">
          Enter d6 values (1-6) separated by spaces or commas.
          They will be consumed in order by the next rolls
          (base dice first, then stress dice, then defense dice).
        </div>
      </div>
    </div>
  );
}
