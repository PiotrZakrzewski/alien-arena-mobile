keep CLAUDE.md up to date, esp any global choices like architecture, patterns, requirements, graphical design etc
# Alien Arena Mobile

Mobile web application simulating combat in Alien RPG Evolved Edition. Built step by step using modular blocks in Storybook.

## Current Deliverable: Full Combat System

### Component Architecture (Atomic Design)

```
src/
├── components/
│   ├── atoms/           # Indivisible building blocks
│   ├── molecules/       # Composed from atoms
│   ├── organisms/       # Complex UI sections
│   └── index.ts         # Barrel exports
├── combat/              # Combat logic (pure functions + orchestration hook)
│   ├── legalActions.ts          # Legal action calculator
│   ├── rangeCalculator.ts       # Zone distance & weapon range checks
│   ├── dicePoolCalculator.ts    # Attack/defense dice pool computation
│   ├── rollResolver.ts          # Dice rolling & attack resolution
│   ├── stressResolver.ts        # Panic detection
│   ├── useCombatTurn.ts         # Combat turn orchestrator hook
│   ├── ai/
│   │   └── aiDecisionTree.ts    # Enemy AI decision tree
│   └── index.ts                 # Barrel exports
├── data/                # Static game data
│   ├── skillDefinitions.ts      # Skill registry
│   ├── characterPresets.ts      # Static character templates
│   ├── characterFactory.ts      # Preset → Character factory
│   ├── equipmentDefinitions.ts  # Weapon/armor constants & defaults
│   ├── talentDefinitions.ts     # Talent registry (career-filtered)
│   ├── zoneMapDefinitions.ts    # Zone map presets & action definitions
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
- **Die** - Single d6 die face, normal (green) or stress (amber) variant, success highlight, rolling animation
- **InitiativeCard** - Single initiative card (1-10), player (green) or enemy (red) variant, winner highlight, drawing animation
- **ZoneCell** - Rectangular zone cell with name, clutter indicator, character markers
- **StatusBar** - Compact health/stress/cover/broken status line
- **ActionButton** - Terminal button with [Q]/[F] speed tag

### Molecules
- **NavigationChevrons** - Left/right arrows (2x IconButton)
- **StatEditor** - Plus/minus with value; supports `readOnly` mode (value only, no buttons)
- **StatRow** - Full stat control (InfoIcon + StatLabel + StatEditor); supports `readOnly` passthrough
- **SkillRow** - Skill control with base stat badge (InfoIcon + StatLabel + badge + StatEditor)
- **DiceBreakdown** - Shows dice pool sources with positive/negative modifiers and base+stress totals
- **DicePool** - Sorted grid of Die atoms with rolling animation; successes first, normal before stress
- **ZoneMap** - Horizontal row of 3 ZoneCells with dashed connectors, click-to-move support

### Organisms
- **CharacterHeader** - Navigation + name display
- **CombatStatsPanel** - STR and AGI stat rows; supports `readOnly` prop
- **SkillsPanel** - All skill rows from SKILL_DEFINITIONS
- **PhaseNavigation** - Back/Next buttons for phase transitions
- **DiceRollResult** - Full dice roll panel: breakdown, pool, success count, push mechanics, context text
- **InitiativeResult** - Initiative comparison: two cards side-by-side with names, VS separator, winner text, continue button
- **CombatHud** - Round indicator + 2 StatusBars + ZoneMap (always visible during combat)
- **ActionSelect** - Action selection panel with actions remaining, legal actions as ActionButtons, move zone sub-selection
- **TurnAnnounce** - "ROUND X — NAME'S TURN" announcement overlay
- **EffectSummary** - Color-coded effect lines (damage/move/cover/panic/info) + continue button

### Views
- **CharacterSelector** - Browse presets with description text, select copies preset to active character
- **StatsEditor** - Editable STR/AGI stats for selected character
- **SkillsEditor** - Editable skills for selected character
- **ItemsEditor** - Weapon type/stats and armor rating editor
- **TalentsEditor** - Career-filtered talent picker with stackable talents
- **CombatSetupView** - Combat type selector (normal/surprise/ambush) with advantage side picker
- **InitiativeView** - Draws initiative cards based on combat setup; surprise/ambush gives card #1 to advantaged side
- **CombatView** - Turn-based combat with zone map, action selection, dice rolling, AI auto-play
- **ResultView** - Victory/defeat screen with final stats and play again button

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

### Combat Setup Types
```ts
type CombatType = 'normal' | 'surprise' | 'ambush';

interface CombatSetup {
  combatType: CombatType;
  advantageSide: CharacterRole | null;  // who surprises/ambushes; null for normal
}
```

### GameState
```ts
{
  playerCharacter: Character | null   // Active player instance
  enemyCharacter: Character | null    // Active enemy instance
  combatSetup: CombatSetup            // Combat type and advantage side
  combatState: CombatState | null     // Active combat state (null until INIT_COMBAT)
  phase: 'character-select' | 'stats' | 'skills' | 'items' | 'talents' | 'combat-setup' | 'initiative' | 'combat' | 'result'
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
| `SET_COMBAT_SETUP` | Set combat type and advantage side |
| `SET_PHASE` | Navigate phases |
| `RESET_COMBAT` | Restore health, reset phase, clear combatState |
| `INIT_COMBAT` | Create CombatState (player zone 0, enemy zone 2) |
| `SET_COMBAT_SUB_PHASE` | Transition combat sub-phase |
| `MOVE_CHARACTER` | Update zone position, clears cover |
| `SET_COVER` | Set/clear cover flag |
| `UPDATE_HEALTH` | Apply damage/healing (clamped 0–max) |
| `UPDATE_STRESS` | Change stress level (clamped 0–10, ignored if broken) |
| `SPEND_ACTION` | Decrement actionsRemaining, set fullActionUsed if full |
| `ADVANCE_TURN` | Switch turn, reset actions, bump round |
| `LOG_COMBAT` | Append to combat log |
| `END_COMBAT` | Set phase to result |

### Usage
```tsx
import { useGame } from './state'

const { playerCharacter, combatSetup, combatState, selectCharacter, updateStat, updateSkill, updateTalent, setWeapon, setArmor, setCombatSetup, setPhase, initCombat, setCombatSubPhase, moveCharacter, setCover, updateHealth, updateStress, spendAction, advanceTurn, logCombat, endCombat } = useGame()
```

## Combat System

### Zone-Based Positioning
- 3 zones per map (pre-configured presets in `zoneMapDefinitions.ts`)
- Player starts at zone 0, enemy at zone 2
- Movement: adjacent zones only (±1 index)
- Zone distance: 0 = adjacent, 1 = short, 2 = medium
- Some zones are "cluttered" (allow partial cover)

### CombatState
```ts
interface CombatState {
  zoneMap: ZoneMap;
  playerZoneIndex: number;         // 0, 1, or 2
  enemyZoneIndex: number;
  playerStress: number;
  enemyStress: number;
  playerCover: boolean;
  enemyCover: boolean;
  currentTurn: CharacterRole;
  round: number;
  subPhase: CombatSubPhase;        // 'turn-announce' | 'action-select' | 'dice-roll' | 'effect' | 'turn-end'
  actionsRemaining: number;        // starts at 2
  fullActionUsed: boolean;
  turnOrder: CharacterRole[];
  combatLog: string[];
}
```

### Action Economy (per ALIEN RPG rules)
Each turn: 2 action points. Full action costs 1 point + sets `fullActionUsed`. Quick action costs 1 point.

| Action | Speed | Requirements |
|--------|-------|-------------|
| Move | Quick | Adjacent zone exists |
| Close Attack | Full | Same zone + close/unarmed weapon |
| Ranged Attack | Full | Ranged weapon + target in range |
| Partial Cover | Quick | Cluttered zone + not already in cover |

### Combat Sub-Phase State Machine
```
turn-announce → action-select (player) or auto-AI (enemy)
  → [if move/cover] → effect → check-actions-remaining
  → [if attack] → dice-roll → effect → check-actions-remaining
check-actions-remaining:
  → [actions left] → action-select / AI again
  → [no actions] → advance-turn → next turn-announce
  → [someone broken] → end-combat → result phase
```

### Dice Mechanics
- Attack pool: base stat + skill + weapon modifier − cover penalty (min 1 die)
- Defense pool: base stat + skill
- Stress dice: added equal to stress level, panic on any 1
- Push: re-roll non-successes in base dice, +1 stress die, once per roll
- Success = die shows 6
- Hit = attack successes > defense successes
- Damage = weapon.damage + (net successes − 1) − armor rating

### AI Decision Tree (`src/combat/ai/aiDecisionTree.ts`)
Priority-based: broken→retreat, same zone→close attack, in range→ranged attack, move toward target, take cover, fallback move.

### Combat Turn Orchestrator (`src/combat/useCombatTurn.ts`)
Central hook connecting reducer, legal actions, dice resolution, and AI. Uses refs to avoid stale closures in AI auto-play useEffect. Tracks actions spent locally to handle batched React state updates.

## Navigation Flow

```
CharacterSelector → [Select] → StatsEditor → [Skills] → SkillsEditor → [Items] → ItemsEditor → [Talents] → TalentsEditor → [Setup] → CombatSetupView → [Fight!] → InitiativeView → [Continue] → CombatView → [Result] → ResultView → [Play Again] → CharacterSelector
                              ← [Back] ←    ← [Stats] ←              ← [Skills] ←          ← [Items] ←                          ← [Talents] ←
```

- App.tsx routes based on `phase` state
- Each phase has its own dedicated view — one concern per screen (mobile-first)
- CharacterSelector browses presets (description text), select creates Character and navigates to stats
- StatsEditor edits STR/AGI, SkillsEditor edits skills — each view is standalone
- Back navigates to previous phase, Next to following phase
- Combat ends when either character reaches 0 HP → ResultView
- Play Again resets health, clears combat state, returns to character select

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
