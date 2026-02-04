keep CLAUDE.md up to date, esp any global choices like architecture, patterns, requirements, graphical design etc
# Alien Arena Mobile

Mobile web application simulating combat in Alien RPG Evolved Edition. Built step by step using modular blocks in Storybook.

## Current Deliverable: Character Selector

### Component Architecture (Atomic Design)

```
src/
├── components/
│   ├── atoms/           # Indivisible building blocks
│   ├── molecules/       # Composed from atoms
│   ├── organisms/       # Complex UI sections
│   └── index.ts         # Barrel exports
└── views/               # Full screens
```

### Atoms
- **IconButton** - Reusable button with icon (chevrons, +/-)
- **InfoIcon** - "i" icon that shows tooltip on tap/hover
- **NameDisplay** - Character name display
- **ProgressButton** - CTA button to proceed
- **StatLabel** - Text label for a stat ("STR", "AGI")
- **StatValue** - Displays numeric value (1-5)

### Molecules
- **NavigationChevrons** - Left/right arrows (2x IconButton)
- **StatEditor** - Plus/minus with value (IconButton + StatValue + IconButton)
- **StatRow** - Full stat control (InfoIcon + StatLabel + StatEditor)

### Organisms
- **CharacterHeader** - Navigation + name display
- **CombatStatsPanel** - STR and AGI stat rows

### Views
- **CharacterSelector** - Full character selection screen with state management

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
