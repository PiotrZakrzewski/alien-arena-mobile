import { createContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction } from './types';
import { gameReducer, initialGameState } from './gameReducer';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextValue | null>(null);

interface GameProviderProps {
  children: ReactNode;
  initialState?: Partial<GameState>;
}

export function GameProvider({ children, initialState }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    ...initialState,
  });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
