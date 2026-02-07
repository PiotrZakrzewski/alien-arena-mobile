import { useState } from 'react';
import type { CombatActionType } from '../../../state/types';
import type { LegalAction } from '../../../combat/legalActions';
import { COMBAT_ACTION_DEFINITIONS } from '../../../data/zoneMapDefinitions';
import { ActionButton } from '../../atoms/ActionButton';
import './ActionSelect.css';

export interface ActionSelectProps {
  actionsRemaining: number;
  legalActions: LegalAction[];
  onSelectAction: (type: CombatActionType, moveToZone?: number) => void;
  onPass: () => void;
}

export function ActionSelect({
  actionsRemaining,
  legalActions,
  onSelectAction,
  onPass,
}: ActionSelectProps) {
  const [selectedMove, setSelectedMove] = useState<CombatActionType | null>(null);

  const handleActionClick = (action: LegalAction) => {
    if (action.type === 'move' && action.moveOptions && action.moveOptions.length > 0) {
      // Show move zone selection
      setSelectedMove('move');
    } else {
      // Execute action directly
      onSelectAction(action.type);
      setSelectedMove(null);
    }
  };

  const handleZoneSelect = (zoneIndex: number) => {
    if (selectedMove === 'move') {
      onSelectAction('move', zoneIndex);
      setSelectedMove(null);
    }
  };

  const handleBackFromZoneSelect = () => {
    setSelectedMove(null);
  };

  // If move is selected, show zone selection
  const moveAction = legalActions.find((a) => a.type === 'move');
  if (selectedMove === 'move' && moveAction?.moveOptions) {
    return (
      <div className="action-select" aria-label="Zone selection">
        <div className="action-select__header">
          ACTIONS REMAINING: {actionsRemaining}
        </div>
        <div className="action-select__subtitle">SELECT DESTINATION ZONE</div>
        <div className="action-select__actions">
          {moveAction.moveOptions.map((zoneIndex) => (
            <ActionButton
              key={zoneIndex}
              label={`ZONE ${zoneIndex}`}
              description={`Move to zone ${zoneIndex}`}
              speed="quick"
              onClick={() => handleZoneSelect(zoneIndex)}
            />
          ))}
        </div>
        <button
          className="action-select__back"
          onClick={handleBackFromZoneSelect}
          type="button"
        >
          &lt; BACK
        </button>
      </div>
    );
  }

  return (
    <div className="action-select" aria-label="Action selection">
      <div className="action-select__header">
        ACTIONS REMAINING: {actionsRemaining}
      </div>
      <div className="action-select__actions">
        {legalActions.map((action) => {
          const definition = COMBAT_ACTION_DEFINITIONS.find(
            (def) => def.type === action.type
          );
          if (!definition) return null;

          return (
            <ActionButton
              key={action.type}
              label={definition.label}
              description={definition.description}
              speed={action.speed}
              disabled={!action.available}
              disabledReason={action.reason}
              onClick={() => handleActionClick(action)}
            />
          );
        })}
      </div>
      <button
        className="action-select__pass"
        onClick={onPass}
        type="button"
      >
        PASS &gt;&gt;
      </button>
    </div>
  );
}
