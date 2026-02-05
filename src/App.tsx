import './App.css'
import { GameProvider, useGame } from './state'
import { CharacterSelector, StatsEditor, SkillsEditor } from './views'

const PLACEHOLDER_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  color: 'var(--color-primary)',
  fontFamily: 'var(--font-terminal)',
  fontSize: 'var(--text-xl)',
} as const

function PhaseRouter() {
  const { phase } = useGame()

  switch (phase) {
    case 'character-select':
      return <CharacterSelector />
    case 'stats':
      return <StatsEditor />
    case 'skills':
      return <SkillsEditor />
    case 'items':
      return <div style={PLACEHOLDER_STYLE}>ITEMS SCREEN PLACEHOLDER</div>
    case 'talents':
      return <div style={PLACEHOLDER_STYLE}>TALENTS SCREEN PLACEHOLDER</div>
    case 'combat':
    case 'result':
    default:
      return <CharacterSelector />
  }
}

function App() {
  return (
    <GameProvider>
      <PhaseRouter />
    </GameProvider>
  )
}

export default App
