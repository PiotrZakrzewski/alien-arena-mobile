import './App.css'
import { GameProvider, useGame } from './state'
import { CharacterSelector, SkillsEditor } from './views'

function PhaseRouter() {
  const { phase } = useGame()

  switch (phase) {
    case 'character-select':
      return <CharacterSelector />
    case 'skills':
      return <SkillsEditor />
    case 'items':
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-terminal)',
          fontSize: 'var(--text-xl)',
        }}>
          ITEMS SCREEN PLACEHOLDER
        </div>
      )
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
