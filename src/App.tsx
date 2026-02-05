import './App.css'
import { GameProvider, Character, useGame } from './state'
import { CharacterSelector, SkillsEditor } from './views'

const initialCharacters: Character[] = [
  { id: '1', name: 'RIPLEY', strength: 3, agility: 4, health: 10, maxHealth: 10, skills: {} },
  { id: '2', name: 'DALLAS', strength: 4, agility: 3, health: 12, maxHealth: 12, skills: {} },
  { id: '3', name: 'ASH', strength: 2, agility: 5, health: 8, maxHealth: 8, skills: {} },
  { id: '4', name: 'LAMBERT', strength: 2, agility: 4, health: 9, maxHealth: 9, skills: {} },
]

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
    <GameProvider initialState={{ characters: initialCharacters }}>
      <PhaseRouter />
    </GameProvider>
  )
}

export default App
