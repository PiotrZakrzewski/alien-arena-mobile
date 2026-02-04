import './App.css'
import { CharacterSelector, Character } from './views'

const characters: Character[] = [
  { id: '1', name: 'RIPLEY', strength: 3, agility: 4 },
  { id: '2', name: 'DALLAS', strength: 4, agility: 3 },
  { id: '3', name: 'ASH', strength: 2, agility: 5 },
  { id: '4', name: 'LAMBERT', strength: 2, agility: 4 },
]

function App() {
  const handleProgress = (updatedCharacters: Character[], currentIndex: number) => {
    console.log('Progress to Skills with:', { updatedCharacters, currentIndex })
  }

  return (
    <CharacterSelector
      characters={characters}
      onProgress={handleProgress}
    />
  )
}

export default App
