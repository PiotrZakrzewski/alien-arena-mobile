keep CLAUDE.md up to date, esp any global choices like architecture, patterns, requirements, graphical design etc
# Alien Arena Mobile

Mobile web application simulating combat in Alien RPG Evolved Edition. Built step by step using modular blocks in Storybook.

## Current Deliverable: Talents Editor

### Component Architecture (Atomic Design)

```
src/
├── components/
│   ├── atoms/           # Indivisible building blocks
│   ├── molecules/       # Composed from atoms
│   ├── organisms/       # Complex UI sections
│   └── index.ts         # Barrel exports
├── data/                # Static game data
│   ├── skillDefinitions.ts      # Skill registry
│   ├── characterPresets.ts      # Static character templates
│   ├── characterFactory.ts      # Preset → Character factory
│   ├── equipmentDefinitions.ts  # Weapon/armor constants & defaults
│   ├── talentDefinitions.ts     # Talent registry (career-filtered)
│   └── index.ts                 # Barrel exports
├── state/               # Global state management
│   ├── types.ts         # State & action types
│   ├── gameReducer.ts   # Reducer logic
│   ├── GameContext.tsx  # React context provider
│   ├── useGame.ts       # Custom hook for state access
│   └── index.ts         # Barrel exports
└── views/               # Full screens
```

### Atoms
- **IconButton** - Reusable button with icon (chevrons, +/-)
- **InfoIcon** - "i" icon that shows tooltip on tap/hover
- **NameDisplay** - Character name display
- **ProgressButton** - CTA button to proceed
- **StatLabel** - Text label for a stat ("STR", "AGI")
- **StatValue** - Displays numeric value (0-5)

### Molecules
- **NavigationChevrons** - Left/right arrows (2x IconButton)
- **StatEditor** - Plus/minus with value; supports `readOnly` mode (value only, no buttons)
- **StatRow** - Full stat control (InfoIcon + StatLabel + StatEditor); supports `readOnly` passthrough
- **SkillRow** - Skill control with base stat badge (InfoIcon + StatLabel + badge + StatEditor)

### Organisms
- **CharacterHeader** - Navigation + name display
- **CombatStatsPanel** - STR and AGI stat rows; supports `readOnly` prop
- **SkillsPanel** - All skill rows from SKILL_DEFINITIONS
- **PhaseNavigation** - Back/Next buttons for phase transitions

### Views
- **CharacterSelector** - Browse presets with description text, select copies preset to active character
- **StatsEditor** - Editable STR/AGI stats for selected character
- **SkillsEditor** - Editable skills for selected character
- **ItemsEditor** - Weapon type/stats and armor rating editor
- **TalentsEditor** - Career-filtered talent picker with stackable talents

## Data Layer

### Careers
```ts
type Career = 'marine' | 'marshal' | 'roughneck' | 'officer' | 'kid' | 'medic';
```
Each career is a preset with combat-appropriate stats. 6 careers replace the original movie-character presets.

### Character Presets (src/data/characterPresets.ts)
Static, read-only templates. Never mutated at runtime. One preset per career.
```ts
interface CharacterPreset {
  id: string;           // 'marine'
  name: string;         // 'MARINE'
  description: string;  // Short flavor text for preset browsing
  career: Career;       // Career type for talent filtering
  strength: number;
  agility: number;
  maxHealth: number;
  skills: Record<string, number>;
}
```

### Character Factory (src/data/characterFactory.ts)
```ts
function createCharacterFromPreset(preset: CharacterPreset): Character
```
Deep-copies a preset into a full Character with initialized health, default weapon (unarmed), no armor, empty talents.

### Skill Definitions (src/data/skillDefinitions.ts)
```ts
interface SkillDefinition {
  key: string;                        // 'closeCombat'
  label: string;                      // 'CLOSE COMBAT'
  baseStat: 'strength' | 'agility';   // For display badge
  description: string;                // Tooltip text
}

const SKILL_DEFINITIONS: SkillDefinition[] = [
  { key: 'closeCombat', label: 'CLOSE COMBAT', baseStat: 'strength', ... },
  { key: 'rangedCombat', label: 'RANGED COMBAT', baseStat: 'agility', ... },
  { key: 'mobility', label: 'MOBILITY', baseStat: 'agility', ... },
  { key: 'stamina', label: 'STAMINA', baseStat: 'strength', ... },
];
```

### Talent Definitions (src/data/talentDefinitions.ts)
```ts
interface TalentDefinition {
  key: string;                      // 'overkill'
  label: string;                    // 'OVERKILL'
  description: string;              // Tooltip text
  maxStacks: number;                // 1 or 3
  careers: Career[] | 'all';        // Which careers can select this talent
}
```
7 career-specific talents (1-2 per career) + 3 general talents (available to all).
Stackable talents (seenItAll, weaponSpecialist) allow values up to maxStacks (3).

## State Management

React Context + useReducer pattern for global game state. State uses direct character slots (not arrays) — designed to be serialized/deserialized directly for persistence.

### GameState
```ts
{
  playerCharacter: Character | null   // Active player instance
  enemyCharacter: Character | null    // Active enemy instance
  phase: 'character-select' | 'stats' | 'skills' | 'items' | 'talents' | 'combat' | 'result'
}
```

### Character (mutable instance)
```ts
{
  id: string;              // Unique instance ID
  presetId: string;        // Links back to template
  name: string;
  description: string;     // Copied from preset
  career: Career;          // Career type (copied from preset)
  strength: number;
  agility: number;
  health: number;
  maxHealth: number;
  skills: Record<string, number>;
  weapon: Weapon;          // Equipped weapon (unarmed/close/ranged)
  armor: Armor;            // Equipped armor (rating 0-3)
  talents: Record<string, number>;  // Key = talent key, value = stack count
}
```

### Equipment Types
```ts
type RangeZone = 'adjacent' | 'short' | 'medium' | 'long' | 'extreme';

interface Weapon {
  type: 'unarmed' | 'close' | 'ranged';
  modifier: number;      // bonus dice: 0-1 (close), 0-3 (ranged)
  damage: number;        // base damage: 1 (unarmed), 1-3 (close), 1-4 (ranged)
  minRange: RangeZone;   // minimum effective range
  maxRange: RangeZone;   // maximum range
  armorPiercing: boolean;
}

interface Armor {
  rating: number;  // 0 = none, 1-3 for personal armor
}
```

Close combat weapons always have range Adjacent/Adjacent.
Ranged weapons have variable min/max range.
Armor piercing reduces target armor by 1 step.

### Actions
All character-mutating actions take a `role: 'player' | 'enemy'` field.

| Action | Purpose |
|--------|---------|
| `SELECT_CHARACTER` | Clone preset → slot |
| `UPDATE_STAT` | Edit strength/agility on active character |
| `UPDATE_SKILL` | Edit a skill on active character |
| `SET_WEAPON` | Replace weapon on active character |
| `SET_ARMOR` | Replace armor on active character |
| `UPDATE_TALENT` | Edit a talent stack on active character |
| `SET_PHASE` | Navigate phases |
| `RESET_COMBAT` | Restore health, reset phase |

### Usage
```tsx
import { useGame } from './state'

const { playerCharacter, selectCharacter, updateStat, updateSkill, updateTalent, setWeapon, setArmor, setPhase } = useGame()
```

## Navigation Flow

```
CharacterSelector → [Select] → StatsEditor → [Skills] → SkillsEditor → [Items] → ItemsEditor → [Talents] → TalentsEditor → [Combat] → Combat
                              ← [Back] ←    ← [Stats] ←              ← [Skills] ←          ← [Items] ←
```

- App.tsx routes based on `phase` state
- Each phase has its own dedicated view — one concern per screen (mobile-first)
- CharacterSelector browses presets (description text), select creates Character and navigates to stats
- StatsEditor edits STR/AGI, SkillsEditor edits skills — each view is standalone
- Back navigates to previous phase, Next to following phase

## Design System

### Aesthetic
Retro Sci-Fi Terminal - inspired by 80s computer interfaces from the original Alien film. Clean without scan line effects.

### Color Palette (Phosphor Green)
- `--color-bg`: #0a0a0a (deep black)
- `--color-bg-elevated`: #111111
- `--color-primary`: #33FF33 (phosphor green)
- `--color-primary-dim`: #1a8f1a
- `--color-primary-bright`: #66FF66
- `--color-danger`: #FF3333
- `--color-warning`: #FFB000 (amber)

### Typography
- **Font**: VT323 (Google Fonts) - authentic retro terminal/CRT aesthetic
- **Fallback**: monospace
- Text rendered uppercase with letter-spacing for terminal feel

### Responsive Breakpoints
- Mobile: default (375px)
- Mobile Large: 480px
- Tablet: 768px

## Development

### Commands
- `npm run dev` - Run the app locally
- `npm run storybook` - Browse components in Storybook
- `npm run build` - Production build

### Conventions
- Each component has its own folder with `.tsx`, `.css`, `index.ts`, and `.stories.ts(x)`
- Story files using JSX decorators must use `.stories.tsx` extension
- CSS uses BEM naming (e.g., `.stat-row__header`)
- All components export types alongside components
