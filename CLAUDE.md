# Alien Arena Mobile

Mobile web application simulating combat in Alien RPG Evolved Edition. Built step by step using modular blocks in Storybook.

## Current Deliverable: Character Selector

### Components

- **Name Display** - Shows the character's name
- **Navigation Chevrons** - Left/right arrows to swipe between characters
- **Combat Stats** - Two stats displayed below the name:
  - Strength (1-5)
  - Agility (1-5)
- **Info Icons** - Displayed above each stat, containing explanations of how the stats work in combat
- **Stat Editors** - Plus/minus buttons to adjust Strength and Agility values
- **Progress Button** - Advances to the next section (Skills)

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
