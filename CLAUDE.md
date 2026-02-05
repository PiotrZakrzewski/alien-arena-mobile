keep CLAUDE.md up to date, esp any global choices like architecture, patterns, requirements, graphical design etc
# Alien Arena Mobile

Mobile web application simulating combat in Alien RPG Evolved Edition. Built step by step using modular blocks in Storybook.

## Current Deliverable: Skills Editor

### Component Architecture (Atomic Design)

```
src/
├── components/
│   ├── atoms/           # Indivisible building blocks
│   ├── molecules/       # Composed from atoms
│   ├── organisms/       # Complex UI sections
│   └── index.ts         # Barrel exports
├── data/                # Static game data
│   └── skillDefinitions.ts  # Skill registry
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
- **StatEditor** - Plus/minus with value (IconButton + StatValue + IconButton)
- **StatRow** - Full stat control (InfoIcon + StatLabel + StatEditor)
- **SkillRow** - Skill control with base stat badge (InfoIcon + StatLabel + badge + StatEditor)

### Organisms
- **CharacterHeader** - Navigation + name display
- **CombatStatsPanel** - STR and AGI stat rows
- **SkillsPanel** - All skill rows from SKILL_DEFINITIONS
- **PhaseNavigation** - Back/Next buttons for phase transitions

### Views
- **CharacterSelector** - Full character selection screen with state management
- **SkillsEditor** - Skills editing screen for selected character

## Data Layer

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

## State Management

React Context + useReducer pattern for global game state.

### GameState
```ts
{
  characters: Character[]      // All characters with stats
  playerCharacterId: string    // Selected player
  enemyCharacterId: string     // Selected enemy
  phase: 'character-select' | 'skills' | 'items' | 'combat' | 'result'
}
```

### Character
```ts
{
  id, name, strength, agility, health, maxHealth,
  skills: Record<string, number>  // { closeCombat: 0, rangedCombat: 2, ... }
}
```

### Usage
```tsx
import { useGame } from './state'

const { characters, playerCharacter, updateCharacter, updateSkill, setPhase } = useGame()
```

## Navigation Flow

```
CharacterSelector → [Select] → SkillsEditor → [Items] → ItemsEditor (future)
                              ← [Back] ←
```

- App.tsx routes based on `phase` state
- Character selection calls `selectPlayer(id)` + `setPhase('skills')`
- Back returns to `character-select` (selection persists via `playerCharacterId`)

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
