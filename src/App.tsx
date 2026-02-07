import './App.css'
import { GameProvider, useGame } from './state'
import { CharacterSelector, StatsEditor, SkillsEditor, ItemsEditor, TalentsEditor, CombatSetupView, InitiativeView, CombatView, ResultView } from './views'

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
      return <ItemsEditor />
    case 'talents':
      return <TalentsEditor />
    case 'combat-setup':
      return <CombatSetupView />
    case 'initiative':
      return <InitiativeView />
    case 'combat':
      return <CombatView />
    case 'result':
      return <ResultView />
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
