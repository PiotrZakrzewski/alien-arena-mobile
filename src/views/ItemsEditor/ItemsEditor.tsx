import { NameDisplay } from '../../components/atoms/NameDisplay';
import { InfoIcon } from '../../components/atoms/InfoIcon';
import { StatLabel } from '../../components/atoms/StatLabel';
import { StatEditor } from '../../components/molecules/StatEditor';
import { PhaseNavigation } from '../../components/organisms/PhaseNavigation';
import { useGame } from '../../state';
import type { Weapon, RangeZone } from '../../state/types';
import {
  WEAPON_DEFAULTS,
  WEAPON_LIMITS,
  MIN_RANGE_OPTIONS,
  MAX_RANGE_OPTIONS,
  RANGE_ZONE_LABELS,
} from '../../data/equipmentDefinitions';
import './ItemsEditor.css';

const WEAPON_TYPES: Weapon['type'][] = ['unarmed', 'close', 'ranged'];

const WEAPON_TYPE_LABELS: Record<Weapon['type'], string> = {
  unarmed: 'NONE',
  close: 'CLOSE',
  ranged: 'RANGED',
};

function WeaponTypeSelector({
  value,
  onChange,
}: {
  value: Weapon['type'];
  onChange: (type: Weapon['type']) => void;
}) {
  return (
    <div className="weapon-type-selector" role="radiogroup" aria-label="Weapon type">
      {WEAPON_TYPES.map((type) => (
        <button
          key={type}
          className={`weapon-type-selector__btn ${type === value ? 'weapon-type-selector__btn--active' : ''}`}
          onClick={() => onChange(type)}
          aria-pressed={type === value}
          type="button"
        >
          {WEAPON_TYPE_LABELS[type]}
        </button>
      ))}
    </div>
  );
}

function RangeSelector({
  label,
  tooltip,
  value,
  options,
  onChange,
}: {
  label: string;
  tooltip: string;
  value: RangeZone;
  options: RangeZone[];
  onChange: (zone: RangeZone) => void;
}) {
  return (
    <div className="range-selector">
      <div className="range-selector__header">
        <InfoIcon tooltip={tooltip} />
        <StatLabel label={label} />
      </div>
      <div className="range-selector__buttons" role="radiogroup" aria-label={label}>
        {options.map((zone) => (
          <button
            key={zone}
            className={`range-selector__btn ${zone === value ? 'range-selector__btn--active' : ''}`}
            onClick={() => onChange(zone)}
            aria-pressed={zone === value}
            type="button"
          >
            {RANGE_ZONE_LABELS[zone]}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  tooltip,
  value,
  onChange,
}: {
  label: string;
  tooltip: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-row__header">
        <InfoIcon tooltip={tooltip} />
        <StatLabel label={label} />
      </div>
      <button
        className={`toggle-row__btn ${value ? 'toggle-row__btn--on' : ''}`}
        onClick={() => onChange(!value)}
        aria-pressed={value}
        type="button"
      >
        {value ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export function ItemsEditor() {
  const { playerCharacter, setWeapon, setArmor, setPhase } = useGame();

  if (!playerCharacter) {
    return null;
  }

  const { weapon, armor } = playerCharacter;
  const limits = WEAPON_LIMITS[weapon.type];

  const handleWeaponTypeChange = (type: Weapon['type']) => {
    setWeapon('player', { ...WEAPON_DEFAULTS[type] });
  };

  const handleModifierChange = (value: number) => {
    setWeapon('player', { ...weapon, modifier: value });
  };

  const handleDamageChange = (value: number) => {
    setWeapon('player', { ...weapon, damage: value });
  };

  const handleArmorPiercingChange = (value: boolean) => {
    setWeapon('player', { ...weapon, armorPiercing: value });
  };

  const handleMinRangeChange = (zone: RangeZone) => {
    setWeapon('player', { ...weapon, minRange: zone });
  };

  const handleMaxRangeChange = (zone: RangeZone) => {
    setWeapon('player', { ...weapon, maxRange: zone });
  };

  const handleArmorRatingChange = (value: number) => {
    setArmor('player', { rating: value });
  };

  const handleBack = () => {
    setPhase('skills');
  };

  const handleNext = () => {
    setPhase('talents');
  };

  const showWeaponStats = weapon.type !== 'unarmed';
  const showRangeSelectors = weapon.type === 'ranged';

  return (
    <div className="items-editor">
      <header className="items-editor__header">
        <NameDisplay name={playerCharacter.name} />
        <span className="items-editor__subtitle">ITEMS</span>
      </header>

      <section className="items-editor__section">
        <h2 className="items-editor__section-title">WEAPON</h2>
        <WeaponTypeSelector
          value={weapon.type}
          onChange={handleWeaponTypeChange}
        />

        {showWeaponStats && (
          <div className="items-editor__weapon-stats">
            <div className="items-editor__stat-row">
              <div className="items-editor__stat-header">
                <InfoIcon tooltip="Bonus dice added to attack roll" />
                <StatLabel label="MOD" />
              </div>
              <StatEditor
                value={weapon.modifier}
                onChange={handleModifierChange}
                min={0}
                max={limits.maxModifier}
                label="Modifier"
              />
            </div>

            <div className="items-editor__stat-row">
              <div className="items-editor__stat-header">
                <InfoIcon tooltip="Base damage dealt on hit" />
                <StatLabel label="DMG" />
              </div>
              <StatEditor
                value={weapon.damage}
                onChange={handleDamageChange}
                min={1}
                max={limits.maxDamage}
                label="Damage"
              />
            </div>

            <ToggleRow
              label="AP"
              tooltip="Armor piercing: reduces target armor rating by 1"
              value={weapon.armorPiercing}
              onChange={handleArmorPiercingChange}
            />

            {showRangeSelectors && (
              <>
                <RangeSelector
                  label="MIN RNG"
                  tooltip="Minimum effective range. Below this: -2 dice per band"
                  value={weapon.minRange}
                  options={MIN_RANGE_OPTIONS}
                  onChange={handleMinRangeChange}
                />
                <RangeSelector
                  label="MAX RNG"
                  tooltip="Maximum range. Weapon cannot be used beyond this"
                  value={weapon.maxRange}
                  options={MAX_RANGE_OPTIONS}
                  onChange={handleMaxRangeChange}
                />
              </>
            )}
          </div>
        )}
      </section>

      <section className="items-editor__section">
        <h2 className="items-editor__section-title">ARMOR</h2>
        <div className="items-editor__stat-row">
          <div className="items-editor__stat-header">
            <InfoIcon tooltip="Reduces incoming damage. AP weapons reduce this by 1" />
            <StatLabel label="RATING" />
          </div>
          <StatEditor
            value={armor.rating}
            onChange={handleArmorRatingChange}
            min={0}
            max={3}
            label="Armor rating"
          />
        </div>
      </section>

      <div className="items-editor__footer">
        <PhaseNavigation
          onBack={handleBack}
          backLabel="Skills"
          onNext={handleNext}
          nextLabel="Talents"
        />
      </div>
    </div>
  );
}
