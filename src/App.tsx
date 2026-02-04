import './App.css'
import { GameProvider, Character } from './state'
import { CharacterSelector } from './views'

const initialCharacters: Character[] = [
  { id: '1', name: 'RIPLEY', strength: 3, agility: 4, health: 10, maxHealth: 10 },
  { id: '2', name: 'DALLAS', strength: 4, agility: 3, health: 12, maxHealth: 12 },
  { id: '3', name: 'ASH', strength: 2, agility: 5, health: 8, maxHealth: 8 },
  { id: '4', name: 'LAMBERT', strength: 2, agility: 4, health: 9, maxHealth: 9 },
]

function App() {
  return (
    <GameProvider initialState={{ characters: initialCharacters }}>
      <CharacterSelector />
    </GameProvider>
  )
}

export default App
