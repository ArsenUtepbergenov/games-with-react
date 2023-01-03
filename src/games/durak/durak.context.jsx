import { createContext, useReducer } from 'react'

export const DurakContext = createContext()

function Reducer(state, action) {
  switch (action.type) {
    case 'addToRoundFromPlayer':
      state.player.delete(...action.payload)
      return { ...state, round: new Set([...state.round, ...action.payload]) }
    case 'addToRoundFromOpponent':
      state.opponent.delete(...action.payload)
      return { ...state, round: new Set([...state.round, ...action.payload]) }
    case 'clearRound':
      return { ...state, round: [] }
    case 'addToPlayer':
      return { ...state, player: new Set([...state.player, ...action.payload]) }
    case 'addToOpponent':
      return {
        ...state,
        opponent: new Set([...state.opponent, ...action.payload]),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function DurakProvider({ children }) {
  const [cards, dispatch] = useReducer(Reducer, {
    round: new Set(),
    player: new Set(),
    opponent: new Set(),
  })
  const value = { cards, dispatch }

  return <DurakContext.Provider value={value}>{children}</DurakContext.Provider>
}
